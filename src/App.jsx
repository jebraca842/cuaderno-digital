import React, { useState, useEffect, useMemo } from "react";
import { Lock, User, LogOut, ShieldCheck, Trash2, Plus, ChevronRight, ChevronLeft, BookOpen, ListChecks, PenTool, Video, CheckCircle2, XCircle, Eye, EyeOff, Pencil, Clock, Globe } from "lucide-react";

const TEACHER = { username: "docente", password: "ClaseTIC2026" };

const TOPICS = [
  {
    id: "ciudadania",
    tag: "01",
    color: "#2E6F5E",
    title: "Ciudadanía digital",
    subtitle: "Derechos, deberes y buen uso de la tecnología",
    readings: [
      {
        title: "¿Qué es la ciudadanía digital?",
        text: `La ciudadanía digital es la capacidad de participar en la sociedad usando las tecnologías digitales de forma responsable, segura, crítica y respetuosa. Así como en la vida diaria tenemos derechos y obligaciones como ciudadanos de un país, en internet también existen normas de convivencia que debemos seguir.

Un ciudadano digital sabe comunicarse con respeto, protege su información personal, respeta los derechos de autor, verifica la información antes de compartirla y actúa con empatía hacia los demás usuarios. Ser un buen ciudadano digital no significa dejar de usar la tecnología, sino usarla con conciencia de las consecuencias que tienen nuestras acciones en línea.

Entre los pilares más importantes de la ciudadanía digital están: la alfabetización digital (saber usar las herramientas), la etiqueta digital o "netiqueta" (normas de cortesía), la seguridad digital (proteger cuentas y datos), los derechos y responsabilidades digitales, y la salud digital (uso equilibrado de las pantallas).

La identidad digital es todo lo que las demás personas pueden saber de nosotros a partir de lo que publicamos, comentamos o compartimos. Por eso es importante cuidar la llamada "huella digital", es decir, el rastro que dejamos cada vez que usamos internet, porque muchas veces esa información permanece disponible por mucho tiempo, incluso años después de haberla publicado.`,
      },
      {
        title: "Riesgos y buenas prácticas en el entorno digital",
        text: `Navegar en internet trae grandes beneficios, pero también riesgos que debemos conocer para protegernos. Entre los más comunes están el ciberacoso (agredir o humillar a otra persona por medios digitales), el phishing (engaños para robar información personal), la suplantación de identidad, la exposición de datos personales y la difusión de noticias falsas o "fake news".

El ciberacoso puede tomar muchas formas: mensajes ofensivos, exclusión de grupos, difusión de rumores o imágenes sin consentimiento. Si una persona sufre o presencia ciberacoso, lo correcto es no participar, guardar evidencia (capturas de pantalla) y avisar a un adulto de confianza o a la institución educativa.

Para protegerse, es recomendable usar contraseñas seguras y distintas para cada cuenta, activar la verificación en dos pasos, revisar la configuración de privacidad de las redes sociales, pensar antes de publicar y no compartir información sensible como domicilio, teléfono o contraseñas.

La netiqueta son las reglas de buena conducta al comunicarnos en línea: escribir con respeto, evitar el uso excesivo de mayúsculas (que se percibe como gritar), no difundir contenido sin verificar su fuente, y respetar las opiniones distintas a las nuestras. Verificar la información antes de compartirla es una responsabilidad de todo ciudadano digital, ya que ayuda a frenar la desinformación.`,
      },
    ],
    organizer: "En tu hoja de trabajo, elabora un mapa mental con el título 'Ciudadanía digital' en el centro. Traza al menos cinco ramas principales (por ejemplo: identidad digital, netiqueta, seguridad, riesgos y derechos digitales) y en cada una anota dos ejemplos o ideas clave tomadas de las lecturas.",
    video: "Anota en tu cuaderno o en el espacio de abajo los puntos clave del video presentado en clase sobre ciudadanía digital: ¿qué situación se mostró?, ¿qué riesgo o valor se destacó?, y ¿qué recomendación darías a partir de lo que viste?",
    quiz: [
      { q: "¿Qué es la ciudadanía digital?", options: ["Tener muchas cuentas en redes sociales", "La capacidad de usar la tecnología de forma responsable, segura y respetuosa", "Un tipo de identificación oficial para usar internet", "Un programa para proteger la computadora"], correct: 1, explanation: "La ciudadanía digital es la participación responsable, segura y crítica en los entornos digitales." },
      { q: "La 'huella digital' se refiere a…", options: ["Las huellas dactilares usadas para desbloquear el celular", "El rastro de información que dejamos al usar internet", "La firma electrónica de un documento", "El historial de compras en línea únicamente"], correct: 1, explanation: "La huella digital es el rastro que deja cada acción que realizamos en internet." },
      { q: "¿Cuál de las siguientes es una buena práctica de seguridad digital?", options: ["Usar la misma contraseña en todas las cuentas", "Compartir tu contraseña con amigos de confianza", "Activar la verificación en dos pasos", "Publicar tu domicilio para que te envíen paquetes"], correct: 2, explanation: "La verificación en dos pasos añade una capa extra de seguridad a tus cuentas." },
      { q: "El ciberacoso es…", options: ["Un juego en línea entre amigos", "Agredir, humillar o intimidar a alguien mediante medios digitales", "Bloquear a un contacto desconocido", "Compartir memes graciosos"], correct: 1, explanation: "El ciberacoso implica agredir o intimidar a una persona usando tecnología." },
      { q: "Si presencias un caso de ciberacoso, lo más recomendable es…", options: ["Compartir el contenido para que más personas lo vean", "Ignorarlo por completo y no hacer nada", "Guardar evidencia y avisar a un adulto de confianza", "Responder con más insultos"], correct: 2, explanation: "Guardar evidencia y reportar a un adulto responsable ayuda a detener la situación." },
      { q: "La 'netiqueta' se refiere a…", options: ["Las reglas de etiqueta para eventos formales", "Las normas de buena conducta al comunicarnos en línea", "Un tipo de virus informático", "El nombre de una red social"], correct: 1, explanation: "La netiqueta son las normas de cortesía y respeto en la comunicación digital." },
      { q: "Escribir un mensaje completamente en mayúsculas normalmente se interpreta como…", options: ["Un mensaje formal", "Estar gritando o alterado", "Una broma", "Un mensaje en otro idioma"], correct: 1, explanation: "El uso excesivo de mayúsculas se percibe como si la persona estuviera gritando." },
      { q: "¿Qué es el 'phishing'?", options: ["Un juego de pesca en línea", "Un engaño para robar información personal o contraseñas", "Un tipo de antivirus", "Una red social poco conocida"], correct: 1, explanation: "El phishing busca engañar a la víctima para obtener sus datos personales." },
    ],
  },
  {
    id: "hardware-software",
    tag: "02",
    color: "#8A5A2B",
    title: "Hardware y software",
    subtitle: "Las partes físicas y los programas de una computadora",
    readings: [
      {
        title: "¿Qué es el hardware?",
        text: `El hardware es el conjunto de componentes físicos y tangibles que forman una computadora, es decir, todo lo que podemos tocar: el teclado, el monitor, el mouse, la memoria RAM, el disco duro, la tarjeta madre, el procesador, entre otros.

El hardware se clasifica generalmente en cuatro categorías según su función:
- Dispositivos de entrada: permiten ingresar información a la computadora, como el teclado, el mouse, el micrófono o el escáner.
- Dispositivos de salida: muestran o entregan la información procesada, como el monitor, las bocinas o la impresora.
- Dispositivos de almacenamiento: guardan la información de forma temporal o permanente, como el disco duro, la unidad SSD o una memoria USB.
- Dispositivos de procesamiento: se encargan de procesar los datos, principalmente el procesador (CPU) y la tarjeta madre.

Sin hardware, no habría un lugar físico donde ejecutar los programas; es la base material sobre la cual funciona toda computadora.`,
      },
      {
        title: "¿Qué es el software?",
        text: `El software es el conjunto de programas, instrucciones y datos que permiten que el hardware funcione y realice tareas específicas. A diferencia del hardware, el software es intangible: no se puede tocar, pero sí se puede ver su resultado en la pantalla.

El software se divide principalmente en dos grandes tipos:
- Software de sistema: son los programas que permiten que la computadora funcione de manera básica, como el sistema operativo (Windows, macOS, Linux) y los controladores (drivers) de los dispositivos.
- Software de aplicación: son los programas que el usuario utiliza para realizar tareas específicas, como procesadores de texto, navegadores web, videojuegos o aplicaciones de edición de fotos.

El hardware y el software trabajan siempre juntos: el hardware sin software no puede realizar ninguna tarea útil, y el software no puede ejecutarse sin un hardware que lo soporte. Por ejemplo, para escribir un documento se necesita el teclado y el monitor (hardware) junto con un procesador de texto (software).`,
      },
    ],
    organizer: "En tu hoja de trabajo, elabora un cuadro comparativo de dos columnas: 'Hardware' y 'Software'. En cada columna anota su definición y al menos cuatro ejemplos, clasificando el hardware según su función (entrada, salida, almacenamiento o procesamiento) y el software según su tipo (de sistema o de aplicación).",
    video: "Anota en tu cuaderno o en el espacio de abajo los puntos clave del video presentado en clase sobre hardware y software: ¿qué componentes se mostraron?, ¿qué ejemplos de software se mencionaron?, y ¿cómo se relacionan entre sí?",
    quiz: [
      { q: "El hardware se define como…", options: ["Los programas instalados en la computadora", "El conjunto de componentes físicos y tangibles de una computadora", "Un tipo de virus informático", "La conexión a internet"], correct: 1, explanation: "El hardware son las partes físicas que se pueden tocar." },
    ],
  },
  {
    id: "navegador",
    tag: "03",
    color: "#1F5B75",
    title: "Navegador web",
    subtitle: "La puerta de entrada a internet",
    readings: [
      {
        title: "¿Qué es un navegador web?",
        text: `Un navegador web es un programa que permite acceder a páginas de internet. Es la herramienta que usas para ver contenido en línea.`,
      },
    ],
    organizer: "Dibuja un navegador web y etiqueta sus partes principales.",
    video: "Toma notas sobre los elementos principales del navegador.",
    quiz: [
      { q: "Un navegador web es…", options: ["Un dispositivo físico", "Un programa para acceder a internet", "Un virus", "Un archivo"], correct: 1, explanation: "El navegador es el programa que usas para ver páginas web." },
    ],
  },
];

const ICONS = { BookOpen, ListChecks, PenTool, Video, Clock, Globe };

function RelojDigitalComponent() {
  const [tiempo, setTiempo] = useState(new Date());
  const [zonas] = useState([
    { nombre: "Colombia", zona: "America/Bogota", color: "#2E6F5E" },
    { nombre: "México", zona: "America/Mexico_City", color: "#8A5A2B" },
    { nombre: "España", zona: "Europe/Madrid", color: "#1F5B75" },
    { nombre: "Japón", zona: "Asia/Tokyo", color: "#7A3B69" },
    { nombre: "Nueva York", zona: "America/New_York", color: "#B23A2E" },
    { nombre: "Londres", zona: "Europe/London", color: "#3B4A6B" },
  ]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const obtenerHoraZona = (zona) => {
    try {
      return new Intl.DateTimeFormat("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: zona,
        hour12: false,
      }).format(tiempo);
    } catch (e) {
      return "-- : -- : --";
    }
  };

  return (
    <div>
      <div style={S.reloqPrincipal}>
        <div style={S.reloqContenedor}>
          <div style={S.hora}>
            {tiempo.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </div>
          <div style={S.fecha}>
            {tiempo.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div style={S.zonaLocal}>Tu zona horaria local</div>
        </div>
      </div>

      <div style={S.gridReloj}>
        {zonas.map((z, idx) => (
          <div key={idx} style={{ ...S.tarjetaReloj, borderTopColor: z.color }}>
            <div style={S.tarjetaHeaderReloj}>
              <Globe size={16} color={z.color} />
              <h4 style={{ ...S.nombreZonaReloj, color: z.color }}>
                {z.nombre}
              </h4>
            </div>
            <div style={S.horaGrandeReloj}>{obtenerHoraZona(z.zona)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginScreen({ accounts, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const u = username.trim();
    if (u.toLowerCase() === TEACHER.username.toLowerCase() && password === TEACHER.password) {
      onLogin({ username: u, role: "teacher", name: "Docente" });
      return;
    }
    const found = accounts.find(
      (a) => a.username.toLowerCase() === u.toLowerCase() && a.password === password
    );
    if (found) {
      onLogin({ username: found.username, role: "student", name: found.name || found.username });
      return;
    }
    setError("Usuario o contraseña incorrectos.");
  };

  return (
    <div style={S.loginWrap}>
      <div style={S.loginCard}>
        <h1 style={S.loginTitle}>Cuaderno digital de clase</h1>
        <p style={S.loginSubtitle}>Temas de TIC</p>
        <form onSubmit={submit} style={{ marginTop: 28 }}>
          <label style={S.label}>Usuario</label>
          <input
            style={S.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="tu usuario"
            autoFocus
          />
          <label style={S.label}>Contraseña</label>
          <input
            style={S.input}
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="tu contraseña"
          />
          {error && <div style={S.errorMsg}>{error}</div>}
          <button type="submit" style={S.loginBtn}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminPanel({ accounts, setAccounts, onExit }) {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const addAccount = (e) => {
    e.preventDefault();
    if (!user.trim() || !pass) return;
    setAccounts([...accounts, { username: user, password: pass, name }]);
    setName("");
    setUser("");
    setPass("");
  };

  return (
    <div style={S.page}>
      <div style={S.topbar}>
        <span style={S.topbarBrand}>Cuaderno digital</span>
        <button style={S.logoutBtn} onClick={onExit}>
          Salir
        </button>
      </div>
      <div style={S.adminWrap}>
        <h2 style={S.adminTitle}>Panel de la docente</h2>
        <form onSubmit={addAccount} style={S.adminForm}>
          <input
            style={S.inputFlat}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del alumno"
          />
          <input
            style={S.inputFlat}
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Usuario"
          />
          <input
            style={S.inputFlat}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit" style={S.addBtn}>
            Crear cuenta
          </button>
        </form>
        <div style={S.tableWrap}>
          {accounts.map((a, i) => (
            <div style={S.tableRow} key={i}>
              <span>{a.name}</span>
              <span>{a.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopBar({ user, onLogout, onAdmin }) {
  return (
    <div style={S.topbar}>
      <span style={S.topbarBrand}>Cuaderno digital</span>
      <div style={S.topbarRight}>
        <span style={S.topbarUser}>{user.name}</span>
        {user.role === "teacher" && (
          <button style={S.topbarLink} onClick={onAdmin}>
            Admin
          </button>
        )}
        <button style={S.logoutBtn} onClick={onLogout}>
          Salir
        </button>
      </div>
    </div>
  );
}

function Quiz({ topic }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = topic.quiz.length;
  const answeredCount = Object.keys(answers).length;

  return (
    <div>
      {topic.quiz.map((q, qi) => (
        <div key={qi} style={S.qBlock}>
          <div style={S.qText}>{q.q}</div>
          <div style={S.qOptions}>
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                style={S.qOption}
                onClick={() => setAnswers({ ...answers, [qi]: oi })}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        style={S.submitBtn}
        onClick={() => setSubmitted(!submitted)}
      >
        {submitted ? "Ocultar respuestas" : "Enviar"}
      </button>
    </div>
  );
}

function TopicPage({ topic, onBack }) {
  const [tab, setTab] = useState("lecturas");

  return (
    <div style={S.topicWrap}>
      <button style={S.backBtn} onClick={onBack}>
        Volver
      </button>
      <h2 style={S.topicH2}>{topic.title}</h2>
      <p style={S.topicSub}>{topic.subtitle}</p>

      <div style={S.tabRow}>
        <button
          style={{
            ...S.tabBtn,
            borderColor: tab === "lecturas" ? topic.color : "transparent",
          }}
          onClick={() => setTab("lecturas")}
        >
          Lecturas
        </button>
        <button
          style={{
            ...S.tabBtn,
            borderColor: tab === "quiz" ? topic.color : "transparent",
          }}
          onClick={() => setTab("quiz")}
        >
          Cuestionario
        </button>
      </div>

      {tab === "lecturas" && (
        <div>
          {topic.readings.map((r, i) => (
            <div key={i}>
              <h3 style={S.readingTitle}>{r.title}</h3>
              <p style={S.readingP}>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "quiz" && <Quiz topic={topic} />}
    </div>
  );
}

function Dashboard({ onOpenTopic, onOpenClock }) {
  return (
    <div style={S.dashWrap}>
      <h2 style={S.dashTitle}>Temas de la clase</h2>
      
      <button
        onClick={onOpenClock}
        style={{
          ...S.card,
          background: "linear-gradient(135deg, #2E6F5E 0%, #1F5B75 100%)",
          color: "#fff",
          marginBottom: 30,
          border: "none",
          cursor: "pointer",
        }}
      >
        <h3 style={{ ...S.cardTitle, color: "#fff", margin: 0 }}>
          Reloj Digital Global
        </h3>
      </button>

      <div style={S.grid}>
        {TOPICS.map((t) => (
          <button key={t.id} style={S.card} onClick={() => onOpenTopic(t)}>
            <span style={{ ...S.cardTag, background: t.color }}>{t.tag}</span>
            <h3 style={S.cardTitle}>{t.title}</h3>
            <p style={S.cardSub}>{t.subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [view, setView] = useState("dashboard");
  const [activeTopic, setActiveTopic] = useState(null);

  const logout = () => {
    setUser(null);
    setView("dashboard");
  };

  if (!user) {
    return <LoginScreen accounts={accounts} onLogin={setUser} />;
  }

  if (user.role === "teacher" && view === "admin") {
    return (
      <AdminPanel
        accounts={accounts}
        setAccounts={setAccounts}
        onExit={() => setView("dashboard")}
      />
    );
  }

  return (
    <div style={S.appRoot}>
      <TopBar
        user={user}
        onLogout={logout}
        onAdmin={() => setView("admin")}
      />
      {view === "dashboard" && (
        <Dashboard
          onOpenTopic={(t) => {
            setActiveTopic(t);
            setView("topic");
          }}
          onOpenClock={() => setView("reloj")}
        />
      )}
      {view === "topic" && activeTopic && (
        <TopicPage topic={activeTopic} onBack={() => setView("dashboard")} />
      )}
      {view === "reloj" && (
        <div style={S.topicWrap}>
          <button style={S.backBtn} onClick={() => setView("dashboard")}>
            Volver
          </button>
          <h2 style={S.topicH2}>Reloj Digital Global</h2>
          <RelojDigitalComponent />
        </div>
      )}
    </div>
  );
}

const PAPER = "#FAF8F2";
const INK = "#22314A";
const LINE = "#E4DFD1";

const S = {
  appRoot: {
    minHeight: "100vh",
    background: PAPER,
    fontFamily: "sans-serif",
    color: INK,
  },
  loginWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: PAPER,
    padding: 20,
  },
  loginCard: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    border: `1px solid ${LINE}`,
    borderRadius: 10,
    padding: "36px 32px",
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 700,
    margin: "0 0 8px",
  },
  loginSubtitle: {
    fontSize: 13.5,
    color: "#6b6558",
    margin: 0,
  },
  label: {
    display: "block",
    fontSize: 12.5,
    color: "#6b6558",
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    width: "100%",
    border: `1.5px solid ${LINE}`,
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14.5,
    boxSizing: "border-box",
    background: "#FCFBF7",
  },
  errorMsg: {
    color: "#B23A2E",
    fontSize: 13,
    marginTop: 10,
  },
  loginBtn: {
    marginTop: 22,
    width: "100%",
    background: INK,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  page: {
    minHeight: "100vh",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 28px",
    borderBottom: `1px solid ${LINE}`,
    background: "#fff",
  },
  topbarBrand: {
    fontWeight: 600,
    fontSize: 15,
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  topbarUser: {
    fontSize: 13,
    color: "#6b6558",
  },
  topbarLink: {
    border: `1px solid ${LINE}`,
    background: "#fff",
    borderRadius: 20,
    padding: "6px 14px",
    fontSize: 12.5,
    cursor: "pointer",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "none",
    background: "transparent",
    color: "#B23A2E",
    cursor: "pointer",
    fontSize: 13,
  },
  dashWrap: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "44px 28px 60px",
  },
  dashTitle: {
    fontSize: 28,
    margin: "0 0 30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  card: {
    textAlign: "left",
    background: "#fff",
    border: `1px solid ${LINE}`,
    borderRadius: 10,
    padding: "20px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  cardTag: {
    color: "#fff",
    fontSize: 11.5,
    padding: "3px 8px",
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 17,
    margin: "4px 0 0",
  },
  cardSub: {
    fontSize: 13,
    color: "#6b6558",
    margin: 0,
  },
  topicWrap: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "30px 28px 70px",
  },
  backBtn: {
    border: "none",
    background: "transparent",
    color: "#6b6558",
    cursor: "pointer",
    fontSize: 13.5,
    marginBottom: 20,
  },
  topicH2: {
    fontSize: 24,
    margin: "0 0 4px",
  },
  topicSub: {
    color: "#6b6558",
    fontSize: 14,
    margin: 0,
  },
  tabRow: {
    display: "flex",
    gap: 8,
    borderBottom: `1px solid ${LINE}`,
    marginBottom: 22,
  },
  tabBtn: {
    background: "transparent",
    border: "none",
    borderBottom: "2.5px solid transparent",
    padding: "10px 4px",
    cursor: "pointer",
    fontSize: 14,
    color: "#8a8571",
  },
  readingTitle: {
    fontSize: 19,
    margin: "4px 0 14px",
  },
  readingP: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "#3a3628",
    margin: "0 0 14px",
  },
  qBlock: {
    borderBottom: `1px solid ${LINE}`,
    padding: "18px 0",
  },
  qText: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 12,
  },
  qOptions: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  qOption: {
    textAlign: "left",
    border: `1.5px solid ${LINE}`,
    background: "#fff",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14,
    cursor: "pointer",
  },
  submitBtn: {
    marginTop: 10,
    color: "#fff",
    background: INK,
    border: "none",
    borderRadius: 8,
    padding: "12px 20px",
    fontSize: 14.5,
    cursor: "pointer",
  },
  adminWrap: {
    maxWidth: 920,
    margin: "0 auto",
    padding: "34px 28px 60px",
  },
  adminTitle: {
    fontSize: 22,
    margin: "0 0 20px",
  },
  adminForm: {
    background: "#fff",
    border: `1px solid ${LINE}`,
    borderRadius: 10,
    padding: 20,
    marginBottom: 26,
  },
  inputFlat: {
    width: "100%",
    border: `1.5px solid ${LINE}`,
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 14,
    marginBottom: 10,
    boxSizing: "border-box",
    background: "#FCFBF7",
  },
  addBtn: {
    background: "#2E6F5E",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 16px",
    fontSize: 14,
    cursor: "pointer",
  },
  tableWrap: {
    background: "#fff",
    border: `1px solid ${LINE}`,
    borderRadius: 10,
  },
  tableRow: {
    display: "flex",
    padding: "13px 18px",
    borderBottom: `1px solid ${LINE}`,
    fontSize: 14,
  },
  reloqPrincipal: {
    maxWidth: 1000,
    margin: "0 auto 40px",
    display: "flex",
    justifyContent: "center",
  },
  reloqContenedor: {
    background: "#fff",
    border: "2px solid #2E6F5E",
    borderRadius: 20,
    padding: "40px 50px",
    textAlign: "center",
    minWidth: 350,
  },
  hora: {
    fontSize: 56,
    fontWeight: 700,
    color: "#2E6F5E",
    margin: "0 0 12px",
  },
  fecha: {
    fontSize: 15,
    color: "#6b6558",
    marginBottom: 8,
  },
  zonaLocal: {
    fontSize: 13,
    color: "#8a8571",
  },
  gridReloj: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
  },
  tarjetaReloj: {
    background: "#fff",
    border: `1px solid ${LINE}`,
    borderRadius: 12,
    padding: 18,
    borderTop: "4px solid #2E6F5E",
  },
  tarjetaHeaderReloj: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  nombreZonaReloj: {
    fontSize: 15,
    fontWeight: 700,
    margin: 0,
  },
  horaGrandeReloj: {
    fontSize: 32,
    fontWeight: 700,
    color: INK,
    margin: "10px 0",
  },
};
