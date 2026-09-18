import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Cuentas de alumnos creadas por la docente en el panel de administración.
 * El usuario se guarda siempre en minúsculas para que el inicio de sesión
 * no distinga mayúsculas, como ocurría antes en el cliente.
 * La contraseña nunca se guarda en texto plano: sólo su hash (scrypt).
 */
export const students = pgTable("students", {
  id: serial().primaryKey(),
  name: text().notNull(),
  username: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Trabajo de cada alumno en cada tema: respuestas del cuestionario con su
 * calificación, el organizador gráfico y las notas del video.
 * Una sola fila por alumno y tema (se actualiza a medida que trabaja).
 */
export const studentWork = pgTable(
  "student_work",
  {
    id: serial().primaryKey(),
    studentId: integer("student_id")
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
    topicId: text("topic_id").notNull(),
    quizAnswers: jsonb("quiz_answers")
      .$type<Record<string, number>>()
      .notNull()
      .default({}),
    quizSubmitted: integer("quiz_submitted").notNull().default(0),
    quizScore: integer("quiz_score"),
    quizTotal: integer("quiz_total"),
    organizerNotes: text("organizer_notes").notNull().default(""),
    videoNotes: text("video_notes").notNull().default(""),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("student_work_student_topic_idx").on(
      table.studentId,
      table.topicId
    ),
  ]
);
