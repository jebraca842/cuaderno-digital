import type { Config } from "@netlify/functions";
import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { asc, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { students, studentWork } from "../../db/schema.js";

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number
) => Promise<Buffer>;

/* -------------------------------------------------------------------------
   Acceso de la docente y firma de sesiones.
   Se pueden cambiar sin tocar el código con las variables de entorno
   TEACHER_USERNAME, TEACHER_PASSWORD y APP_SESSION_SECRET.
   ------------------------------------------------------------------------- */
const TEACHER_USERNAME = (process.env.TEACHER_USERNAME || "docente").toLowerCase();
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || "ClaseTIC2026";
const SESSION_SECRET = process.env.APP_SESSION_SECRET || "cuaderno-digital-sesion-local";
const SESSION_MS = 30 * 24 * 60 * 60 * 1000;

type Session = {
  role: "teacher" | "student";
  id: number | null;
  username: string;
  name: string;
  exp: number;
};

/* ---------------------------- Contraseñas ------------------------------- */

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltHex, keyHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const key = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length);
  return key.length === expected.length && timingSafeEqual(key, expected);
}

/* ------------------------------ Sesiones -------------------------------- */

function signPayload(payload: string): string {
  return createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

function createToken(session: Omit<Session, "exp">): string {
  const payload = Buffer.from(
    JSON.stringify({ ...session, exp: Date.now() + SESSION_MS })
  ).toString("base64url");
  return `${payload}.${signPayload(payload)}`;
}

function readSession(request: Request): Session | null {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const given = Buffer.from(signature);
  const expected = Buffer.from(signPayload(payload));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    ) as Session;
    if (!session.exp || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

/* ------------------------------ Utilidades ------------------------------ */

const json = (body: unknown, status = 200) =>
  Response.json(body, { status });

const fail = (message: string, status: number) => json({ error: message }, status);

async function readBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

const asText = (value: unknown) => (typeof value === "string" ? value : "");

function normalizeUsername(value: unknown): string {
  return asText(value).trim().toLowerCase();
}

/** Valida los datos de una cuenta; devuelve el mensaje de error o null. */
function validateAccount(
  username: string,
  password: string,
  { requirePassword }: { requirePassword: boolean }
): string | null {
  if (!username) return "Escribe un usuario para el alumno.";
  if (!/^[a-z0-9._-]{3,30}$/.test(username)) {
    return "El usuario debe tener entre 3 y 30 caracteres: sólo letras, números, punto, guion o guion bajo.";
  }
  if (username === TEACHER_USERNAME) {
    return "Ese usuario está reservado para la docente. Elige otro.";
  }
  if (!password && requirePassword) return "Escribe una contraseña para el alumno.";
  if (password && password.length < 4) {
    return "La contraseña debe tener al menos 4 caracteres.";
  }
  return null;
}

const publicStudent = (row: typeof students.$inferSelect) => ({
  id: row.id,
  name: row.name,
  username: row.username,
  createdAt: row.createdAt,
});

/* ------------------------------- Handlers ------------------------------- */

async function login(request: Request) {
  const body = await readBody(request);
  const username = normalizeUsername(body.username);
  const password = asText(body.password);

  if (!username || !password) {
    return fail("Escribe tu usuario y tu contraseña.", 400);
  }

  if (username === TEACHER_USERNAME) {
    if (password !== TEACHER_PASSWORD) {
      return fail("Usuario o contraseña incorrectos.", 401);
    }
    const user = {
      role: "teacher" as const,
      id: null,
      username: TEACHER_USERNAME,
      name: "Docente",
    };
    return json({ token: createToken(user), user });
  }

  const [found] = await db
    .select()
    .from(students)
    .where(eq(students.username, username));

  if (!found || !(await verifyPassword(password, found.passwordHash))) {
    return fail("Usuario o contraseña incorrectos.", 401);
  }

  const user = {
    role: "student" as const,
    id: found.id,
    username: found.username,
    name: found.name,
  };
  return json({ token: createToken(user), user });
}

async function listStudents() {
  const rows = await db.select().from(students).orderBy(asc(students.name));
  const counts = await db
    .select({
      studentId: studentWork.studentId,
      topics: sql<number>`count(*)::int`,
    })
    .from(studentWork)
    .groupBy(studentWork.studentId);

  const byStudent = new Map(counts.map((c) => [c.studentId, c.topics]));
  return json({
    students: rows.map((row) => ({
      ...publicStudent(row),
      topicsWithWork: byStudent.get(row.id) ?? 0,
    })),
  });
}

async function createStudent(request: Request) {
  const body = await readBody(request);
  const username = normalizeUsername(body.username);
  const password = asText(body.password);
  const name = asText(body.name).trim();

  const invalid = validateAccount(username, password, { requirePassword: true });
  if (invalid) return fail(invalid, 400);

  const [existing] = await db
    .select({ id: students.id })
    .from(students)
    .where(eq(students.username, username));
  if (existing) return fail("Ya existe un alumno con ese usuario.", 409);

  const [created] = await db
    .insert(students)
    .values({
      name: name || username,
      username,
      passwordHash: await hashPassword(password),
    })
    .returning();

  return json({ student: { ...publicStudent(created), topicsWithWork: 0 } }, 201);
}

async function updateStudent(request: Request, studentId: number) {
  const body = await readBody(request);
  const [current] = await db
    .select()
    .from(students)
    .where(eq(students.id, studentId));
  if (!current) return fail("Ese alumno ya no existe.", 404);

  const username =
    body.username === undefined ? current.username : normalizeUsername(body.username);
  const password = asText(body.password);
  const name =
    body.name === undefined ? current.name : asText(body.name).trim() || username;

  const invalid = validateAccount(username, password, { requirePassword: false });
  if (invalid) return fail(invalid, 400);

  if (username !== current.username) {
    const [taken] = await db
      .select({ id: students.id })
      .from(students)
      .where(eq(students.username, username));
    if (taken) return fail("Ya existe un alumno con ese usuario.", 409);
  }

  const [updated] = await db
    .update(students)
    .set({
      name,
      username,
      ...(password ? { passwordHash: await hashPassword(password) } : {}),
    })
    .where(eq(students.id, studentId))
    .returning();

  return json({ student: publicStudent(updated) });
}

async function deleteStudent(studentId: number) {
  const [deleted] = await db
    .delete(students)
    .where(eq(students.id, studentId))
    .returning({ id: students.id });
  if (!deleted) return fail("Ese alumno ya no existe.", 404);
  return json({ ok: true });
}

/** Devuelve el trabajo de un alumno agrupado por tema. */
async function workForStudent(studentId: number) {
  const rows = await db
    .select()
    .from(studentWork)
    .where(eq(studentWork.studentId, studentId));

  const work: Record<string, unknown> = {};
  for (const row of rows) {
    work[row.topicId] = {
      quizAnswers: row.quizAnswers ?? {},
      quizSubmitted: row.quizSubmitted === 1,
      quizScore: row.quizScore,
      quizTotal: row.quizTotal,
      organizerNotes: row.organizerNotes,
      videoNotes: row.videoNotes,
      updatedAt: row.updatedAt,
    };
  }
  return work;
}

async function saveWork(request: Request, session: Session) {
  if (session.role !== "student" || !session.id) {
    return fail("Sólo los alumnos guardan trabajo en el cuaderno.", 403);
  }

  const body = await readBody(request);
  const topicId = asText(body.topicId).trim();
  if (!topicId) return fail("Falta el tema que se quiere guardar.", 400);

  const answers = body.quizAnswers;
  const quizAnswers: Record<string, number> = {};
  if (answers && typeof answers === "object") {
    for (const [key, value] of Object.entries(answers as Record<string, unknown>)) {
      if (typeof value === "number" && Number.isInteger(value)) {
        quizAnswers[key] = value;
      }
    }
  }

  const asCount = (value: unknown) =>
    typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;

  const values = {
    studentId: session.id,
    topicId,
    quizAnswers,
    quizSubmitted: body.quizSubmitted ? 1 : 0,
    quizScore: asCount(body.quizScore),
    quizTotal: asCount(body.quizTotal),
    organizerNotes: asText(body.organizerNotes),
    videoNotes: asText(body.videoNotes),
    updatedAt: new Date(),
  };

  await db
    .insert(studentWork)
    .values(values)
    .onConflictDoUpdate({
      target: [studentWork.studentId, studentWork.topicId],
      set: {
        quizAnswers: values.quizAnswers,
        quizSubmitted: values.quizSubmitted,
        quizScore: values.quizScore,
        quizTotal: values.quizTotal,
        organizerNotes: values.organizerNotes,
        videoNotes: values.videoNotes,
        updatedAt: values.updatedAt,
      },
    });

  return json({ ok: true });
}

/* -------------------------------- Router -------------------------------- */

export default async (request: Request) => {
  const { pathname } = new URL(request.url);
  const segments = pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);
  const [resource, id, subresource] = segments;
  const method = request.method.toUpperCase();

  try {
    if (resource === "login" && method === "POST") {
      return await login(request);
    }

    const session = readSession(request);

    if (resource === "session") {
      if (!session) return fail("Tu sesión terminó. Vuelve a entrar.", 401);
      const { role, id: sessionId, username, name } = session;
      return json({ user: { role, id: sessionId, username, name } });
    }

    if (!session) return fail("Tu sesión terminó. Vuelve a entrar.", 401);

    if (resource === "work") {
      if (method === "GET") {
        if (session.role !== "student" || !session.id) {
          return fail("Sólo los alumnos tienen trabajo guardado.", 403);
        }
        return json({ work: await workForStudent(session.id) });
      }
      if (method === "PUT") return await saveWork(request, session);
      return fail("Método no permitido.", 405);
    }

    if (resource === "students") {
      if (session.role !== "teacher") {
        return fail("Sólo la docente puede administrar las cuentas.", 403);
      }

      if (!id) {
        if (method === "GET") return await listStudents();
        if (method === "POST") return await createStudent(request);
        return fail("Método no permitido.", 405);
      }

      const studentId = Number(id);
      if (!Number.isInteger(studentId) || studentId <= 0) {
        return fail("Alumno no encontrado.", 404);
      }

      if (subresource === "work" && method === "GET") {
        return json({ work: await workForStudent(studentId) });
      }
      if (!subresource && (method === "PATCH" || method === "PUT")) {
        return await updateStudent(request, studentId);
      }
      if (!subresource && method === "DELETE") {
        return await deleteStudent(studentId);
      }
      return fail("Método no permitido.", 405);
    }

    return fail("Ruta no encontrada.", 404);
  } catch (error) {
    console.error("Error en /api:", error);
    return fail("No se pudo completar la operación. Intenta de nuevo.", 500);
  }
};

export const config: Config = {
  path: "/api/*",
};
