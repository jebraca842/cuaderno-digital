import React, { useState, useEffect, useMemo } from "react";
import { Lock, User, LogOut, ShieldCheck, Trash2, Plus, ChevronRight, ChevronLeft, BookOpen, ListChecks, PenTool, Video, CheckCircle2, XCircle, Eye, EyeOff, Pencil, Clock, Globe } from "lucide-react";

/* =========================================================================
   CONFIGURACIÓN DE ACCESO DE LA DOCENTE
   ========================================================================= */
const TEACHER = { username: "docente", password: "ClaseTIC2026" };

/* =========================================================================
   CONTENIDO DE LOS 6 TEMAS
   ========================================================================= */
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
    organizer:
      "En tu hoja de trabajo, elabora un mapa mental con el título 'Ciudadanía digital' en el centro. Traza al menos cinco ramas principales (por ejemplo: identidad digital, netiqueta, seguridad, riesgos y derechos digitales) y en cada una anota dos ejemplos o ideas clave tomadas de las lecturas.",
    video:
      "Anota en tu cuaderno o en el espacio de abajo los puntos clave del video presentado en clase sobre ciudadanía digital: ¿qué situación se mostró?, ¿qué riesgo o valor se destacó?, y ¿qué recomendación darías a partir de lo que viste?",
    quiz: [
      { q: "¿Qué es la ciudadanía digital?", options: ["Tener muchas cuentas en redes sociales", "La capacidad de usar la tecnología de forma responsable, segura y respetuosa", "Un tipo de identificación oficial para usar internet", "Un programa para proteger la computadora"], correct: 1, explanation: "La ciudadanía digital es la participación responsable, segura y crítica en los entornos digitales." },
      { q: "La 'huella digital' se refiere a…", options: ["Las huellas dactilares usadas para desbloquear el celular", "El rastro de información que dejamos al usar internet", "La firma electrónica de un documento", "El historial de compras en línea únicamente"], correct: 1, explanation: "La huella digital es el rastro que deja cada acción que realizamos en internet." },
      { q: "¿Cuál de las siguientes es una buena práctica de seguridad digital?", options: ["Usar la misma contraseña en todas las cuentas", "Compartir tu contraseña con amigos de confianza", "Activar la verificación en dos pasos", "Publicar tu domicilio para que te envíen paquetes"], correct: 2, explanation: "La verificación en dos pasos añade una capa extra de seguridad a tus cuentas." },
      { q: "El ciberacoso es…", options: ["Un juego en línea entre amigos", "Agredir, humillar o intimidar a alguien mediante medios digitales", "Bloquear a un contacto desconocido", "Compartir memes graciosos"], correct: 1, explanation: "El ciberacoso implica agredir o intimidar a una persona usando tecnología." },
      { q: "Si presencias un caso de ciberacoso, lo más recomendable es…", options: ["Compartir el contenido para que más personas lo vean", "Ignorarlo por completo y no hacer nada", "Guardar evidencia y avisar a un adulto de confianza", "Responder con más insultos"], correct: 2, explanation: "Guardar evidencia y reportar a un adulto responsable ayuda a detener la situación." },
      { q: "La 'netiqueta' se refiere a…", options: ["Las reglas de etiqueta para eventos formales", "Las normas de buena conducta al comunicarnos en línea", "Un tipo de virus informático", "El nombre de una red social"], correct: 1, explanation: "La netiqueta son las normas de cortesía y respeto en la comunicación digital." },
      { q: "Escribir un mensaje completamente en mayúsculas normalmente se interpreta como…", options: ["Un mensaje formal", "Estar gritando o alterado", "Una broma", "Un mensaje en otro idioma"], correct: 1, explanation: "El uso excesivo de mayúsculas se percibe como si la persona estuviera gritando." },
      { q: "¿Qué es el 'phishing'?", options: ["Un juego de pesca en línea", "Un engaño para robar información personal o contraseñas", "Un tipo de antivirus", "Una red social poco conocida"], correct: 1, explanation: "El phishing busca engañar a la víctima para obtener sus datos personales." },
      { q: "Antes de compartir una noticia en redes sociales, un buen ciudadano digital debe…", options: ["Compartirla de inmediato si le parece interesante", "Verificar que la información sea confiable", "Cambiar el título para que tenga más 'me gusta'", "Compartirla solo si la publicó una persona famosa"], correct: 1, explanation: "Verificar la fuente ayuda a evitar la propagación de información falsa." },
      { q: "La identidad digital está formada por…", options: ["Solo la fotografía de perfil", "Todo lo que publicamos, comentamos y compartimos en línea", "Únicamente el número de teléfono", "El nombre de usuario del correo electrónico"], correct: 1, explanation: "La identidad digital incluye todo el conjunto de información que otros pueden conocer de nosotros en línea." },
      { q: "¿Cuál es un ejemplo de información que NO se debe compartir públicamente?", options: ["Tu opinión sobre una película", "Tu domicilio y número de teléfono", "Un dibujo que hiciste", "Una recomendación de un libro"], correct: 1, explanation: "Los datos personales sensibles como domicilio o teléfono deben protegerse." },
      { q: "La alfabetización digital consiste en…", options: ["Saber leer libros en formato digital solamente", "Tener conocimientos y habilidades para usar las herramientas digitales", "Tomar un curso de computación básica una sola vez", "Usar solo aplicaciones educativas"], correct: 1, explanation: "La alfabetización digital implica contar con las habilidades necesarias para usar la tecnología eficazmente." },
      { q: "¿Qué se recomienda hacer para proteger las cuentas en línea?", options: ["Usar contraseñas cortas y fáciles de recordar", "Usar contraseñas distintas y seguras para cada cuenta", "Anotar las contraseñas en un papel pegado a la pantalla", "Compartir la contraseña con el grupo de amigos"], correct: 1, explanation: "Usar contraseñas únicas y seguras reduce el riesgo de que las cuentas sean vulneradas." },
      { q: "La salud digital se relaciona con…", options: ["El uso equilibrado de las pantallas y la tecnología", "Comprar equipo de cómputo de alta gama", "Tener internet de alta velocidad", "Instalar muchas aplicaciones en el celular"], correct: 0, explanation: "La salud digital promueve un uso equilibrado y consciente del tiempo frente a pantallas." },
      { q: "Ser un buen ciudadano digital significa principalmente…", options: ["Dejar de usar la tecnología por completo", "Usar la tecnología con conciencia de las consecuencias de nuestras acciones", "Tener el celular más moderno", "Usar internet solo para tareas escolares"], correct: 1, explanation: "Ser un buen ciudadano digital implica usar la tecnología de forma consciente y responsable, no evitarla." },
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
    organizer:
      "En tu hoja de trabajo, elabora un cuadro comparativo de dos columnas: 'Hardware' y 'Software'. En cada columna anota su definición y al menos cuatro ejemplos, clasificando el hardware según su función (entrada, salida, almacenamiento o procesamiento) y el software según su tipo (de sistema o de aplicación).",
    video:
      "Anota en tu cuaderno o en el espacio de abajo los puntos clave del video presentado en clase sobre hardware y software: ¿qué componentes se mostraron?, ¿qué ejemplos de software se mencionaron?, y ¿cómo se relacionan entre sí?",
    quiz: [
      { q: "El hardware se define como…", options: ["Los programas instalados en la computadora", "El conjunto de componentes físicos y tangibles de una computadora", "Un tipo de virus informático", "La conexión a internet"], correct: 1, explanation: "El hardware son las partes físicas que se pueden tocar." },
      { q: "¿Cuál de los siguientes es un dispositivo de entrada?", options: ["Monitor", "Impresora", "Teclado", "Bocinas"], correct: 2, explanation: "El teclado permite ingresar información, por lo que es un dispositivo de entrada." },
      { q: "¿Cuál de los siguientes es un dispositivo de salida?", options: ["Mouse", "Micrófono", "Monitor", "Escáner"], correct: 2, explanation: "El monitor muestra la información procesada, por lo que es un dispositivo de salida." },
      { q: "El disco duro y la memoria USB son ejemplos de dispositivos de…", options: ["Entrada", "Salida", "Almacenamiento", "Procesamiento"], correct: 2, explanation: "Estos dispositivos guardan información de forma temporal o permanente." },
      { q: "El procesador (CPU) forma parte de los dispositivos de…", options: ["Entrada", "Salida", "Almacenamiento", "Procesamiento"], correct: 3, explanation: "El CPU se encarga de procesar los datos de la computadora." },
      { q: "El software se define como…", options: ["Los componentes físicos de la computadora", "El conjunto de programas e instrucciones que permiten el funcionamiento de la computadora", "El cable que conecta el monitor", "La fuente de poder"], correct: 1, explanation: "El software es intangible y está formado por programas e instrucciones." },
      { q: "El sistema operativo pertenece al tipo de software…", options: ["De aplicación", "De sistema", "De entretenimiento", "De almacenamiento"], correct: 1, explanation: "El sistema operativo es software de sistema porque permite el funcionamiento básico del equipo." },
      { q: "Un procesador de texto o un videojuego son ejemplos de software…", options: ["De sistema", "De aplicación", "De entrada", "De almacenamiento"], correct: 1, explanation: "Estos programas se usan para tareas específicas del usuario, por lo que son software de aplicación." },
      { q: "¿Qué característica distingue al software del hardware?", options: ["El software es tangible y el hardware no", "El software es intangible y el hardware es tangible", "Ambos son tangibles", "Ambos son intangibles"], correct: 1, explanation: "El hardware se puede tocar; el software no, aunque sus efectos se puedan observar." },
      { q: "Un 'driver' o controlador es un tipo de…", options: ["Software de aplicación", "Software de sistema", "Hardware de entrada", "Hardware de salida"], correct: 1, explanation: "Los controladores permiten que el sistema operativo se comunique con el hardware, por lo que son software de sistema." },
      { q: "Para que una computadora funcione correctamente se necesita…", options: ["Solo hardware", "Solo software", "Hardware y software trabajando juntos", "Ninguno de los dos"], correct: 2, explanation: "El hardware y el software dependen uno del otro para funcionar." },
      { q: "La tarjeta madre (motherboard) es un ejemplo de…", options: ["Software de sistema", "Software de aplicación", "Hardware", "Un tipo de licencia"], correct: 2, explanation: "La tarjeta madre es un componente físico, por lo tanto es hardware." },
      { q: "¿Cuál de estas opciones es un ejemplo de software de aplicación?", options: ["Windows", "Linux", "Un navegador web", "El BIOS"], correct: 2, explanation: "Un navegador web es un programa que el usuario utiliza para una tarea específica." },
      { q: "El micrófono y el escáner son ejemplos de dispositivos de…", options: ["Salida", "Entrada", "Almacenamiento", "Procesamiento"], correct: 1, explanation: "Ambos permiten ingresar información (sonido o imágenes) a la computadora." },
      { q: "Sin software, el hardware de una computadora…", options: ["Puede realizar tareas por sí solo sin instrucciones", "No puede realizar ninguna tarea útil", "Funciona mejor", "Se vuelve más rápido"], correct: 1, explanation: "El hardware necesita instrucciones (software) para poder realizar cualquier tarea." },
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
        title: "¿Qué es un navegador web y para qué sirve?",
        text: `Un navegador web es un programa que permite acceder a páginas de internet, visualizarlas e interactuar con ellas. Cuando escribimos una dirección (URL) o hacemos clic en un enlace, el navegador solicita la información al servidor correspondiente y la muestra en la pantalla en forma de texto, imágenes, video o audio.

Algunos de los navegadores más utilizados actualmente son Google Chrome, Mozilla Firefox, Microsoft Edge, Safari y Opera. Aunque cada uno tiene un diseño distinto, todos comparten funciones básicas similares: una barra de direcciones donde se escribe la URL, pestañas para abrir varias páginas al mismo tiempo, botones para avanzar, retroceder o recargar una página, y un menú de configuración.

La URL (Localizador Uniforme de Recursos) es la dirección única que identifica a cada página web, por ejemplo https://www.ejemplo.com. Al inicio de la URL suele aparecer "http" o "https"; esta "s" adicional indica que la conexión está cifrada y es más segura, lo cual normalmente se representa con un candado en la barra de direcciones.`,
      },
      {
        title: "Funciones y buenas prácticas al navegar",
        text: `Los navegadores incluyen varias herramientas que facilitan la navegación. Los marcadores o favoritos permiten guardar el acceso directo a páginas que visitamos con frecuencia. El historial guarda un registro de las páginas visitadas, útil para regresar a un sitio que vimos antes. Las extensiones son pequeños programas adicionales que se instalan en el navegador para ampliar sus funciones, como bloqueadores de anuncios o traductores.

El modo de navegación privada o "incógnito" permite navegar sin que el navegador guarde el historial, las cookies o los datos de formularios en ese equipo; sin embargo, esto no hace que la navegación sea anónima ante el sitio visitado o el proveedor de internet.

Las cookies son pequeños archivos que los sitios web guardan en el navegador para recordar información, como el idioma preferido o los productos en un carrito de compras. El caché almacena temporalmente partes de las páginas visitadas para que carguen más rápido la próxima vez.

Al navegar es importante verificar que los sitios sean seguros (que usen "https" y muestren el candado), evitar hacer clic en enlaces sospechosos o ventanas emergentes, mantener el navegador actualizado y cerrar sesión en equipos compartidos.`,
      },
    ],
    organizer:
      "En tu hoja de trabajo, dibuja un diagrama etiquetado de la ventana de un navegador web (puedes basarte en uno que conozcas). Señala con flechas y etiqueta al menos seis elementos: barra de direcciones, pestañas, botones de avanzar/retroceder, marcadores, menú de configuración y el candado de seguridad.",
    video:
      "Anota en tu cuaderno o en el espacio de abajo los puntos clave del video presentado en clase sobre el navegador web: ¿qué partes de la ventana se mostraron?, ¿qué función te pareció más útil?, y ¿qué recomendación de seguridad se mencionó?",
    quiz: [
      { q: "Un navegador web es…", options: ["Un dispositivo físico para conectarse a internet", "Un programa que permite acceder y visualizar páginas de internet", "El proveedor de servicio de internet", "Un tipo de sistema operativo"], correct: 1, explanation: "El navegador es el programa (software) que muestra las páginas web." },
      { q: "¿Cuál de las siguientes opciones es un navegador web?", options: ["Windows", "Google Chrome", "Microsoft Word", "Bluetooth"], correct: 1, explanation: "Google Chrome es uno de los navegadores web más utilizados." },
      { q: "La URL es…", options: ["El nombre del usuario en una red social", "La dirección única que identifica a una página web", "El nombre del navegador", "La contraseña de un sitio web"], correct: 1, explanation: "La URL es la dirección que identifica de forma única a cada página." },
      { q: "El candado que aparece en la barra de direcciones indica que…", options: ["La página está bloqueada", "La conexión está cifrada y es más segura", "El sitio tiene publicidad", "El navegador está desactualizado"], correct: 1, explanation: "El candado indica una conexión segura mediante el protocolo https." },
      { q: "Las pestañas en un navegador permiten…", options: ["Cambiar el idioma del sistema", "Abrir varias páginas web al mismo tiempo en una sola ventana", "Aumentar la velocidad de internet", "Guardar contraseñas automáticamente"], correct: 1, explanation: "Las pestañas permiten tener varias páginas abiertas simultáneamente." },
      { q: "Los marcadores o favoritos sirven para…", options: ["Borrar el historial de navegación", "Guardar accesos directos a páginas frecuentes", "Bloquear ventanas emergentes", "Traducir una página web"], correct: 1, explanation: "Los marcadores guardan enlaces a sitios que visitamos con frecuencia." },
      { q: "El historial de navegación es…", options: ["Un registro de las páginas visitadas", "La lista de contraseñas guardadas", "Un tipo de virus", "El nombre de una extensión"], correct: 0, explanation: "El historial guarda un registro de los sitios que hemos visitado." },
      { q: "El modo de navegación privada o 'incógnito'…", options: ["Hace que la navegación sea completamente anónima ante cualquier sitio", "No guarda el historial ni las cookies en ese equipo, pero no es totalmente anónimo", "Bloquea todos los sitios web", "Aumenta la velocidad de la conexión"], correct: 1, explanation: "El modo incógnito no guarda datos locales, pero el sitio o el proveedor de internet aún pueden identificar la conexión." },
      { q: "Las cookies son…", options: ["Virus que dañan la computadora", "Pequeños archivos que los sitios guardan para recordar información del usuario", "Extensiones para traducir páginas", "Anuncios publicitarios"], correct: 1, explanation: "Las cookies almacenan información como preferencias o datos de sesión." },
      { q: "Una extensión del navegador es…", options: ["Un cable adicional para el mouse", "Un programa adicional que amplía las funciones del navegador", "Un tipo de contraseña", "El nombre técnico de la URL"], correct: 1, explanation: "Las extensiones agregan funciones adicionales, como bloqueadores de anuncios." },
      { q: "El caché del navegador sirve para…", options: ["Eliminar virus", "Guardar temporalmente partes de las páginas para que carguen más rápido", "Cambiar la contraseña del wifi", "Traducir el contenido de una página"], correct: 1, explanation: "El caché almacena datos temporales para acelerar la carga de páginas visitadas antes." },
      { q: "¿Qué se recomienda antes de ingresar datos personales en un sitio web?", options: ["Verificar que use 'https' y muestre el candado de seguridad", "Compartir la página en redes sociales", "Desactivar el antivirus", "Cerrar todas las demás pestañas"], correct: 0, explanation: "Verificar la conexión segura ayuda a proteger la información personal." },
      { q: "¿Cuál de las siguientes NO es una buena práctica al navegar?", options: ["Mantener el navegador actualizado", "Hacer clic en cualquier ventana emergente sin leerla", "Verificar la seguridad del sitio", "Cerrar sesión en equipos compartidos"], correct: 1, explanation: "Hacer clic en ventanas emergentes sin revisarlas puede exponer al usuario a riesgos." },
      { q: "Los botones de 'avanzar' y 'retroceder' en un navegador permiten…", options: ["Cambiar de red wifi", "Moverse entre las páginas visitadas recientemente", "Instalar extensiones", "Cambiar el idioma del navegador"], correct: 1, explanation: "Estos botones permiten desplazarse por el historial reciente de navegación." },
      { q: "¿Cuál de los siguientes es un ejemplo de buena práctica de seguridad al navegar?", options: ["Ignorar las actualizaciones del navegador", "Evitar enlaces sospechosos y verificar la fuente de la información", "Usar la misma pestaña para todo sin cerrarla nunca", "Desactivar el candado de seguridad"], correct: 1, explanation: "Evitar enlaces sospechosos reduce el riesgo de fraudes o virus." },
    ],
  },
  {
    id: "licencias",
    tag: "04",
    color: "#7A3B69",
    title: "Licencias de software",
    subtitle: "Derechos de uso y propiedad intelectual",
    readings: [
      {
        title: "¿Qué es una licencia de software?",
        text: `Una licencia de software es un contrato o acuerdo legal entre el creador (o dueño) de un programa y la persona que lo va a usar, en el cual se establecen las condiciones y límites bajo los cuales se puede utilizar, copiar, modificar o distribuir ese software. Cuando instalamos un programa y aceptamos los términos y condiciones (conocido como EULA, "End User License Agreement"), estamos aceptando una licencia.

Existen distintos tipos de licencias según el grado de libertad que otorgan al usuario:
- Software propietario o comercial: su código no es público, requiere el pago de una licencia y el usuario solo tiene permiso de uso limitado. Ejemplos: Microsoft Office, Adobe Photoshop.
- Freeware: es software gratuito, pero su código fuente no es público y no siempre se puede modificar o redistribuir. Ejemplo: algunos lectores de PDF.
- Shareware: es software de prueba, gratuito por un tiempo limitado o con funciones reducidas, y luego se debe pagar para acceder a la versión completa.
- Software libre y de código abierto (open source): permite usar, estudiar, modificar y distribuir el código fuente libremente, normalmente sin costo. Ejemplos: Linux, LibreOffice, GIMP.

Respetar las licencias es una responsabilidad legal y ética, ya que protege el trabajo de quienes crean el software.`,
      },
      {
        title: "Propiedad intelectual y piratería",
        text: `La propiedad intelectual es el derecho legal que protege las creaciones de la mente humana, como programas, música, libros o imágenes, otorgando a su autor el control sobre cómo se usan y distribuyen. En el caso del software, este derecho se protege principalmente mediante las licencias y las leyes de derechos de autor.

La piratería informática consiste en copiar, distribuir o usar software sin la autorización del titular de los derechos, es decir, sin pagar o sin cumplir con los términos de la licencia correspondiente. Esto puede traer consecuencias legales, exponer al equipo a virus o software malicioso, y afecta económicamente a los desarrolladores.

Las licencias Creative Commons son un tipo especial de licencia, muy usada en contenido creativo (imágenes, música, textos), que permite a los autores decidir de forma flexible qué usos permiten sobre su obra: por ejemplo, permitir compartirla siempre citando al autor, o prohibir su uso comercial.

Como usuarios responsables, debemos instalar software desde fuentes oficiales, verificar el tipo de licencia antes de usar o compartir un programa, y dar crédito a los autores cuando corresponda. Elegir software de código abierto o con licencias claras es también una forma de fomentar el desarrollo tecnológico ético.`,
      },
    ],
    organizer:
      "En tu hoja de trabajo, elabora una tabla con cuatro columnas: 'Tipo de licencia', 'Definición', 'Ejemplo' y '¿Se puede modificar el código?'. Completa una fila para cada tipo de licencia visto en las lecturas: propietario, freeware, shareware y software libre/código abierto.",
    video:
      "Anota en tu cuaderno o en el espacio de abajo los puntos clave del video presentado en clase sobre licencias de software: ¿qué tipo(s) de licencia se explicaron?, ¿qué ejemplo se mostró?, y ¿por qué es importante respetarlas?",
    quiz: [
      { q: "Una licencia de software es…", options: ["El nombre comercial de un programa", "Un acuerdo legal que establece las condiciones de uso de un software", "Un virus informático", "Un tipo de hardware"], correct: 1, explanation: "La licencia establece los términos bajo los cuales se puede usar un software." },
      { q: "Las siglas EULA se refieren a…", options: ["Un tipo de virus", "El acuerdo de licencia de usuario final", "Un navegador web", "Un dispositivo de almacenamiento"], correct: 1, explanation: "EULA significa 'End User License Agreement', el acuerdo que se acepta al instalar un programa." },
      { q: "El software propietario o comercial se caracteriza por…", options: ["Tener el código fuente disponible para todos", "Requerir el pago de una licencia y no compartir su código fuente", "Ser siempre gratuito", "No necesitar ninguna licencia"], correct: 1, explanation: "El software propietario limita el uso y no comparte su código, además normalmente requiere pago." },
      { q: "¿Cuál de los siguientes es un ejemplo de software propietario?", options: ["Linux", "LibreOffice", "Microsoft Office", "GIMP"], correct: 2, explanation: "Microsoft Office es un software comercial cuyo código no es público." },
      { q: "El 'freeware' se define como…", options: ["Software gratuito cuyo código fuente no siempre es público", "Software que siempre requiere pago", "Un tipo de hardware gratuito", "Software pirata"], correct: 0, explanation: "El freeware es gratuito para el usuario, pero no necesariamente de código abierto." },
      { q: "El 'shareware' es un tipo de software que…", options: ["Es gratuito para siempre sin restricciones", "Se puede probar por tiempo limitado o con funciones reducidas antes de pagar", "Solo funciona sin conexión a internet", "No puede instalarse en ninguna computadora"], correct: 1, explanation: "El shareware ofrece una versión de prueba antes de requerir el pago de la versión completa." },
      { q: "El software libre y de código abierto permite…", options: ["Usar, estudiar, modificar y distribuir el código fuente libremente", "Solo usar el programa sin poder verlo por dentro", "Vender el programa sin ninguna condición", "Modificar el programa solo si se paga una licencia especial"], correct: 0, explanation: "El software libre da libertad para estudiar y modificar su código fuente." },
      { q: "¿Cuál de los siguientes es un ejemplo de software libre/código abierto?", options: ["Adobe Photoshop", "Microsoft Windows", "Linux", "Microsoft Office"], correct: 2, explanation: "Linux es un sistema operativo de código abierto." },
      { q: "La propiedad intelectual protege…", options: ["Solo los objetos físicos como computadoras", "Las creaciones de la mente humana, como software, música o libros", "Únicamente las marcas comerciales de ropa", "Los edificios y terrenos"], correct: 1, explanation: "La propiedad intelectual protege creaciones intelectuales, incluido el software." },
      { q: "La piratería informática consiste en…", options: ["Crear software de código abierto", "Copiar o usar software sin autorización del titular de los derechos", "Comprar una licencia de software original", "Actualizar un programa a su versión más reciente"], correct: 1, explanation: "La piratería es el uso no autorizado de software protegido por derechos de autor." },
      { q: "Una consecuencia posible de usar software pirata es…", options: ["Mejorar el rendimiento del equipo", "Exponer al equipo a virus o software malicioso", "Obtener soporte técnico oficial", "Recibir actualizaciones automáticas seguras"], correct: 1, explanation: "El software pirata suele descargarse de fuentes no confiables, lo que aumenta el riesgo de malware." },
      { q: "Las licencias Creative Commons se utilizan principalmente para…", options: ["Proteger exclusivamente el hardware", "Permitir a los autores de contenido creativo definir qué usos se permiten sobre su obra", "Prohibir cualquier uso de una obra", "Vender computadoras"], correct: 1, explanation: "Creative Commons permite a los autores establecer condiciones flexibles de uso sobre su obra." },
      { q: "¿Cuál es una forma responsable de obtener software?", options: ["Descargarlo de cualquier página desconocida", "Instalarlo desde fuentes oficiales y verificar su licencia", "Copiarlo de la computadora de un amigo sin licencia", "Usar una versión pirata para ahorrar dinero"], correct: 1, explanation: "Instalar desde fuentes oficiales y revisar la licencia es una práctica responsable y legal." },
      { q: "¿Por qué es importante respetar las licencias de software?", options: ["Porque no tiene ninguna consecuencia legal", "Porque protege el trabajo de los desarrolladores y evita sanciones legales", "Porque hace que las computadoras funcionen más lento", "Porque es un requisito solo en algunos países"], correct: 1, explanation: "Respetar las licencias es una responsabilidad legal y ética hacia los creadores del software." },
      { q: "¿Cuál de las siguientes afirmaciones es verdadera?", options: ["Todo software gratuito es de código abierto", "Todo software de código abierto es gratuito y su código se puede ver, estudiar y modificar", "El software propietario siempre es gratuito", "Las licencias no aplican al software gratuito"], correct: 1, explanation: "El software libre/código abierto permite ver, modificar y distribuir el código, generalmente sin costo." },
    ],
  },
  {
    id: "sistemas-operativos",
    tag: "05",
    color: "#B23A2E",
    title: "Sistemas operativos",
    subtitle: "El programa que administra toda la computadora",
    readings: [
      {
        title: "¿Qué es un sistema operativo y qué funciones cumple?",
        text: `Un sistema operativo (SO) es el software principal que administra todos los recursos de una computadora (procesador, memoria, dispositivos y archivos) y permite que el usuario interactúe con el equipo y que los demás programas puedan ejecutarse. Es el primer software que se carga al encender el equipo y funciona como intermediario entre el hardware y las aplicaciones.

Entre sus funciones principales están:
- Gestionar el hardware: coordina el uso del procesador, la memoria y los dispositivos conectados.
- Administrar archivos: organiza la información en carpetas y archivos dentro de las unidades de almacenamiento.
- Proporcionar una interfaz de usuario: permite al usuario interactuar con el equipo mediante iconos y ventanas (interfaz gráfica o GUI) o mediante comandos de texto (interfaz de línea de comandos o CLI).
- Ejecutar aplicaciones: permite que los programas de software se instalen y funcionen correctamente.
- Gestionar la seguridad: controla el acceso mediante cuentas de usuario, contraseñas y permisos.

Algunos de los sistemas operativos más conocidos son Windows y macOS para computadoras de escritorio, Linux (usado tanto en escritorio como en servidores), y Android e iOS para dispositivos móviles.`,
      },
      {
        title: "Tipos de sistemas operativos",
        text: `Los sistemas operativos se pueden clasificar según el dispositivo o el propósito para el que fueron diseñados:

- Sistemas operativos de escritorio: diseñados para computadoras personales, como Windows, macOS y las distribuciones de Linux (Ubuntu, Fedora, entre otras).
- Sistemas operativos móviles: diseñados para teléfonos inteligentes y tabletas, como Android e iOS.
- Sistemas operativos de servidor: diseñados para administrar recursos compartidos en redes, como Windows Server o Linux Server, utilizados en empresas y centros de datos.
- Sistemas operativos embebidos: diseñados para funcionar dentro de dispositivos específicos como electrodomésticos, cajeros automáticos o sistemas de automóviles.
- Sistemas operativos en tiempo real: utilizados en aplicaciones donde las respuestas deben ocurrir en un tiempo exacto y garantizado, como equipos médicos o industriales.

En cuanto a la forma de interactuar con ellos, existen dos tipos principales de interfaz: la interfaz gráfica de usuario (GUI), que utiliza iconos, ventanas y el mouse (como en Windows o macOS), y la interfaz de línea de comandos (CLI), donde el usuario escribe comandos de texto para dar instrucciones (común en algunos entornos de Linux o en herramientas técnicas).

A lo largo de la historia, los sistemas operativos han evolucionado desde simples sistemas de texto hasta interfaces gráficas complejas, adaptándose a nuevas tecnologías como pantallas táctiles y asistentes de voz.`,
      },
    ],
    organizer:
      "En tu hoja de trabajo, elabora un cuadro sinóptico con el título 'Tipos de sistemas operativos'. Incluye las categorías: escritorio, móviles, de servidor, embebidos y en tiempo real; en cada una anota su definición breve y al menos un ejemplo.",
    video:
      "Anota en tu cuaderno o en el espacio de abajo los puntos clave del video presentado en clase sobre sistemas operativos: ¿qué sistema(s) operativo(s) se mostraron?, ¿qué función del sistema operativo se explicó?, y ¿qué diferencia notaste entre interfaz gráfica y línea de comandos?",
    quiz: [
      { q: "Un sistema operativo es…", options: ["Un dispositivo físico de almacenamiento", "El software principal que administra los recursos de la computadora", "Un tipo de navegador web", "Un accesorio del teclado"], correct: 1, explanation: "El sistema operativo administra el hardware y permite ejecutar otros programas." },
      { q: "¿Cuál de las siguientes es una función del sistema operativo?", options: ["Diseñar páginas web", "Gestionar el hardware y administrar archivos", "Editar fotografías", "Enviar correos electrónicos"], correct: 1, explanation: "Gestionar hardware y archivos es una de las funciones principales del sistema operativo." },
      { q: "¿Cuál de los siguientes es un ejemplo de sistema operativo de escritorio?", options: ["Android", "iOS", "Windows", "WhatsApp"], correct: 2, explanation: "Windows es un sistema operativo diseñado para computadoras de escritorio." },
      { q: "¿Cuál de los siguientes es un ejemplo de sistema operativo móvil?", options: ["macOS", "Linux Server", "Android", "Windows Server"], correct: 2, explanation: "Android es un sistema operativo diseñado para teléfonos inteligentes y tabletas." },
      { q: "Una interfaz gráfica de usuario (GUI) se caracteriza por…", options: ["Usar únicamente comandos de texto", "Usar iconos, ventanas y el mouse para interactuar con el equipo", "No permitir ninguna interacción del usuario", "Ser exclusiva de los servidores"], correct: 1, explanation: "La GUI utiliza elementos visuales como iconos y ventanas." },
      { q: "Una interfaz de línea de comandos (CLI) se caracteriza por…", options: ["Usar únicamente el mouse", "Requerir que el usuario escriba comandos de texto para dar instrucciones", "Ser solo para dispositivos móviles", "No poder ejecutar ninguna tarea"], correct: 1, explanation: "En la CLI, el usuario escribe comandos de texto en lugar de usar el mouse." },
      { q: "¿Qué tipo de sistema operativo se usa para administrar recursos compartidos en redes empresariales?", options: ["Sistema operativo móvil", "Sistema operativo de servidor", "Sistema operativo embebido", "Sistema operativo en tiempo real"], correct: 1, explanation: "Los sistemas operativos de servidor administran recursos compartidos en redes." },
      { q: "Un sistema operativo embebido se encuentra típicamente en…", options: ["Computadoras de escritorio", "Electrodomésticos o cajeros automáticos", "Solo en teléfonos inteligentes", "Solo en servidores de internet"], correct: 1, explanation: "Los sistemas embebidos funcionan dentro de dispositivos específicos como electrodomésticos." },
      { q: "Un sistema operativo en tiempo real es importante en…", options: ["Videojuegos casuales", "Equipos médicos o industriales que requieren respuestas exactas y garantizadas", "Redes sociales", "Procesadores de texto"], correct: 1, explanation: "Estos sistemas garantizan tiempos de respuesta exactos, esenciales en entornos médicos o industriales." },
      { q: "¿Cuál de las siguientes funciones corresponde a la 'gestión de la seguridad' del sistema operativo?", options: ["Diseñar el fondo de pantalla", "Controlar el acceso mediante cuentas de usuario, contraseñas y permisos", "Reproducir música", "Conectar el mouse"], correct: 1, explanation: "El sistema operativo controla el acceso de los usuarios mediante permisos y contraseñas." },
      { q: "El sistema operativo administra archivos mediante…", options: ["La organización de la información en carpetas y archivos", "El diseño gráfico de aplicaciones", "La conexión a redes sociales", "La instalación de licencias de software"], correct: 0, explanation: "La administración de archivos organiza la información en el almacenamiento del equipo." },
      { q: "¿Cuál de los siguientes es un sistema operativo de código abierto muy utilizado tanto en escritorio como en servidores?", options: ["iOS", "Linux", "Windows", "macOS"], correct: 1, explanation: "Linux es de código abierto y se usa ampliamente en escritorio y servidores." },
      { q: "El sistema operativo es el primer software que se carga…", options: ["Al instalar un videojuego", "Al encender la computadora", "Al conectar una impresora", "Al abrir un navegador web"], correct: 1, explanation: "El sistema operativo se carga al inicio, antes de poder usar otros programas." },
      { q: "¿Qué diferencia principal existe entre un sistema operativo de escritorio y uno móvil?", options: ["No existe ninguna diferencia", "Están diseñados para distintos tipos de dispositivos y necesidades de uso", "El sistema operativo móvil no necesita interfaz", "El sistema operativo de escritorio no administra archivos"], correct: 1, explanation: "Cada tipo está optimizado para el dispositivo y el uso al que está destinado." },
      { q: "¿Cuál de las siguientes NO es una función del sistema operativo?", options: ["Gestionar el hardware", "Proporcionar una interfaz de usuario", "Editar directamente el contenido de una fotografía sin ningún programa", "Ejecutar aplicaciones"], correct: 2, explanation: "Editar una fotografía requiere un programa específico (software de aplicación), no es una función directa del sistema operativo." },
    ],
  },
  {
    id: "elementos-pc",
    tag: "06",
    color: "#3B4A6B",
    title: "Elementos de una PC",
    subtitle: "Componentes internos y periféricos",
    readings: [
      {
        title: "Componentes internos de una computadora",
        text: `Dentro del gabinete de una computadora se encuentran los componentes esenciales que permiten su funcionamiento:

- Tarjeta madre (motherboard): es la placa principal donde se conectan todos los demás componentes; permite la comunicación entre ellos.
- Procesador (CPU): es el "cerebro" de la computadora, encargado de ejecutar las instrucciones y realizar los cálculos necesarios para que los programas funcionen.
- Memoria RAM: es una memoria de acceso rápido y temporal donde se guarda la información que la computadora está usando en ese momento; al apagar el equipo, su contenido se borra.
- Almacenamiento (disco duro HDD o unidad de estado sólido SSD): guarda de forma permanente el sistema operativo, los programas y los archivos del usuario, incluso cuando el equipo está apagado.
- Fuente de poder: convierte la energía eléctrica que llega del enchufe en la energía adecuada para alimentar todos los componentes internos.
- Tarjeta gráfica (GPU): procesa las imágenes y el video que se muestran en el monitor; es especialmente importante para videojuegos y diseño gráfico.

Todos estos componentes trabajan de manera coordinada: la tarjeta madre los conecta, el procesador ejecuta las instrucciones, la RAM guarda la información temporal y el almacenamiento conserva los datos a largo plazo.`,
      },
      {
        title: "Periféricos y puertos de conexión",
        text: `Los periféricos son los dispositivos externos que se conectan a la computadora para permitir la entrada o salida de información. Entre los periféricos de entrada están el teclado, el mouse, el micrófono y el escáner. Entre los periféricos de salida están el monitor, las bocinas y la impresora. También existen periféricos mixtos, como las pantallas táctiles, que sirven tanto para entrada como para salida de información.

Para conectar estos dispositivos, las computadoras cuentan con distintos puertos y conectores, entre los que destacan:
- USB (Universal Serial Bus): el más común, utilizado para conectar memorias, teclados, mouse, impresoras y muchos otros dispositivos.
- HDMI: se utiliza para conectar el monitor o una pantalla externa, transmitiendo audio y video de alta definición.
- Puerto de red (Ethernet): permite conectar la computadora a una red mediante un cable.
- Puerto de audio (jack de 3.5mm): se utiliza para conectar audífonos o micrófonos.

Conocer estos elementos permite identificar y resolver problemas básicos, como conectar correctamente un dispositivo nuevo o entender por qué una computadora no muestra imagen en el monitor si el cable HDMI no está bien conectado.`,
      },
    ],
    organizer:
      "En tu hoja de trabajo, dibuja el esquema de una computadora de escritorio y etiqueta al menos ocho elementos: tarjeta madre, procesador, memoria RAM, almacenamiento, fuente de poder, tarjeta gráfica, y dos periféricos (uno de entrada y uno de salida).",
    video:
      "Anota en tu cuaderno o en el espacio de abajo los puntos clave del video presentado en clase sobre los elementos de una PC: ¿qué componentes internos se mostraron?, ¿qué periféricos se identificaron?, y ¿qué función cumple cada uno?",
    quiz: [
      { q: "La tarjeta madre (motherboard) se encarga de…", options: ["Almacenar permanentemente los archivos", "Conectar y permitir la comunicación entre los demás componentes", "Convertir la energía eléctrica", "Mostrar las imágenes en el monitor"], correct: 1, explanation: "La tarjeta madre es la placa principal que conecta todos los componentes." },
      { q: "El procesador (CPU) es conocido como…", options: ["El almacenamiento de la computadora", "El 'cerebro' de la computadora que ejecuta las instrucciones", "Un periférico de entrada", "La fuente de poder"], correct: 1, explanation: "El CPU ejecuta las instrucciones y realiza los cálculos necesarios." },
      { q: "La memoria RAM se caracteriza por…", options: ["Guardar la información de forma permanente", "Ser una memoria temporal que se borra al apagar el equipo", "Ser un periférico de salida", "Convertir la energía eléctrica"], correct: 1, explanation: "La RAM almacena información temporalmente mientras el equipo está encendido." },
      { q: "¿Cuál de los siguientes es un dispositivo de almacenamiento permanente?", options: ["Memoria RAM", "Disco duro (HDD) o unidad de estado sólido (SSD)", "Tarjeta gráfica", "Fuente de poder"], correct: 1, explanation: "El HDD y el SSD guardan la información de forma permanente, aun apagado el equipo." },
      { q: "La fuente de poder tiene la función de…", options: ["Procesar imágenes y video", "Convertir la energía eléctrica para alimentar los componentes internos", "Guardar archivos de manera temporal", "Conectar dispositivos externos por USB"], correct: 1, explanation: "La fuente de poder suministra la energía necesaria a los componentes del equipo." },
      { q: "La tarjeta gráfica (GPU) es especialmente importante para…", options: ["Guardar contraseñas", "Procesar imágenes y video, útil en videojuegos y diseño gráfico", "Conectar el equipo a internet", "Convertir la energía eléctrica"], correct: 1, explanation: "La GPU procesa gráficos, siendo clave en videojuegos y diseño." },
      { q: "Los periféricos son…", options: ["Los componentes internos únicamente", "Los dispositivos externos que permiten la entrada o salida de información", "Programas instalados en el equipo", "Un tipo de licencia de software"], correct: 1, explanation: "Los periféricos son dispositivos externos conectados a la computadora." },
      { q: "¿Cuál de los siguientes es un periférico de entrada?", options: ["Monitor", "Impresora", "Teclado", "Bocinas"], correct: 2, explanation: "El teclado permite ingresar información al equipo." },
      { q: "¿Cuál de los siguientes es un periférico de salida?", options: ["Mouse", "Micrófono", "Impresora", "Escáner"], correct: 2, explanation: "La impresora entrega información procesada en forma física (papel)." },
      { q: "Una pantalla táctil se considera un periférico…", options: ["Solo de entrada", "Solo de salida", "Mixto, de entrada y salida", "Ninguno de los anteriores"], correct: 2, explanation: "La pantalla táctil recibe información (toques) y muestra información (imagen)." },
      { q: "El puerto USB se utiliza principalmente para…", options: ["Conectar el monitor exclusivamente", "Conectar memorias, teclados, mouse, impresoras y otros dispositivos", "Conectar la computadora a la red eléctrica", "Transmitir únicamente audio"], correct: 1, explanation: "El USB es un puerto versátil para conectar múltiples tipos de dispositivos." },
      { q: "El puerto HDMI se utiliza para…", options: ["Conectar el monitor transmitiendo audio y video de alta definición", "Conectar el teclado", "Conectar la impresora", "Conectar una memoria USB"], correct: 0, explanation: "El HDMI transmite audio y video de alta definición, comúnmente al monitor." },
      { q: "El puerto de red (Ethernet) permite…", options: ["Conectar audífonos", "Conectar la computadora a una red mediante un cable", "Cargar la batería del equipo", "Conectar la tarjeta gráfica"], correct: 1, explanation: "El puerto Ethernet conecta el equipo a una red mediante cable." },
      { q: "Si una computadora no muestra imagen en el monitor, una causa común podría ser…", options: ["Que el teclado esté desconectado", "Que el cable HDMI no esté bien conectado", "Que la impresora esté sin tinta", "Que el mouse tenga poca batería"], correct: 1, explanation: "Un cable HDMI mal conectado puede impedir que el monitor muestre imagen." },
      { q: "¿Cuál de las siguientes afirmaciones describe correctamente el trabajo conjunto de los componentes de una PC?", options: ["Cada componente funciona de forma aislada sin relación con los demás", "La tarjeta madre los conecta, el procesador ejecuta instrucciones, la RAM guarda información temporal y el almacenamiento conserva los datos a largo plazo", "Solo el procesador es necesario para que la computadora funcione", "El monitor es el único componente indispensable"], correct: 1, explanation: "Todos los componentes trabajan de forma coordinada para el funcionamiento del equipo." },
    ],
  },
];

const ICONS = { BookOpen, ListChecks, PenTool, Video, Clock, Globe };

/* =========================================================================
   COMPONENTE: Reloj Digital
   ========================================================================= */
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

  const obtenerFechaZona = (zona) => {
    try {
      return new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: zona,
      }).format(tiempo);
    } catch (e) {
      return "Fecha no disponible";
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
          <div
            key={idx}
            style={{
              ...S.tarjetaReloj,
              borderTopColor: z.color,
            }}
          >
            <div style={S.tarjetaHeaderReloj}>
              <Globe size={16} color={z.color} />
              <h4 style={{ ...S.nombreZonaReloj, color: z.color }}>
                {z.nombre}
              </h4>
            </div>
            <div style={S.horaGrandeReloj}>{obtenerHoraZona(z.zona)}</div>
            <div style={S.fechaChicaReloj}>
              {obtenerFechaZona(z.zona)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENTE: Pantalla de inicio de sesión
   ========================================================================= */
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
    setError("Usuario o contraseña incorrectos. Verifica con tu docente.");
  };

  return (
    <div style={S.loginWrap}>
      <div style={S.loginCard}>
        <div style={S.loginBadge}>
          <span style={S.loginBadgeMono}>TIC · 2026</span>
        </div>
        <h1 style={S.loginTitle}>Cuaderno digital de clase</h1>
        <p style={S.loginSubtitle}>
          Ciudadanía digital · Hardware y software · Navegador web · Licencias · Sistemas operativos · Elementos de una PC
        </p>
        <form onSubmit={submit} style={{ marginTop: 28 }}>
          <label style={S.label}>Usuario</label>
          <div style={S.inputRow}>
            <User size={16} color="#6b6558" />
            <input
              style={S.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="tu usuario"
              autoFocus
            />
          </div>
          <label style={S.label}>Contraseña</label>
          <div style={S.inputRow}>
            <Lock size={16} color="#6b6558" />
            <input
              style={S.input}
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="tu contraseña"
            />
            <button type="button" onClick={() => setShowPw((s) => !s)} style={S.eyeBtn} aria-label="Mostrar contraseña">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <div style={S.errorMsg}>{error}</div>}
          <button type="submit" style={S.loginBtn}>
            Entrar <ChevronRight size={16} />
          </button>
        </form>
        <p style={S.loginFoot}>Tu usuario y contraseña te los asigna tu docente.</p>
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENTE: Panel de administración (docente)
   ========================================================================= */
function AdminPanel({ accounts, setAccounts, onExit }) {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [editingIdx, setEditingIdx] = useState(null);

  const resetForm = () => {
    setName("");
    setUser("");
    setPass("");
    setEditingIdx(null);
  };

  const addOrUpdate = (e) => {
    e.preventDefault();
    const u = user.trim();
    if (!u || !pass) {
      setMsg("Escribe un usuario y una contraseña.");
      return;
    }
    if (u.toLowerCase() === TEACHER.username.toLowerCase()) {
      setMsg("Ese usuario está reservado para la docente. Elige otro.");
      return;
    }
    const exists = accounts.some(
      (a, i) => a.username.toLowerCase() === u.toLowerCase() && i !== editingIdx
    );
    if (exists) {
      setMsg("Ya existe un alumno con ese usuario.");
      return;
    }
    const entry = { username: u, password: pass, name: name.trim() || u };
    let updated;
    if (editingIdx !== null) {
      updated = accounts.map((a, i) => (i === editingIdx ? entry : a));
    } else {
      updated = [...accounts, entry];
    }
    setAccounts(updated);
    setMsg(editingIdx !== null ? "Cuenta actualizada." : "Cuenta creada.");
    resetForm();
  };

  const startEdit = (i) => {
    const a = accounts[i];
    setName(a.name);
    setUser(a.username);
    setPass(a.password);
    setEditingIdx(i);
    setMsg("");
  };

  const remove = (i) => {
    setAccounts(accounts.filter((_, idx) => idx !== i));
    if (editingIdx === i) resetForm();
  };

  return (
    <div style={S.page}>
      <TopBar user={{ role: "teacher", name: "Docente" }} onLogout={onExit} />
      <div style={S.adminWrap}>
        <div style={S.adminHeader}>
          <ShieldCheck size={22} color="#2E6F5E" />
          <div>
            <h2 style={S.adminTitle}>Panel de la docente</h2>
            <p style={S.adminSub}>Asigna un usuario y una contraseña a cada alumno para que pueda entrar al cuaderno.</p>
          </div>
        </div>

        <form onSubmit={addOrUpdate} style={S.adminForm}>
          <div style={S.adminFormRow}>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Nombre del alumno (opcional)</label>
              <input style={S.inputFlat} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Ana Torres" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Usuario</label>
              <input style={S.inputFlat} value={user} onChange={(e) => setUser(e.target.value)} placeholder="Ej. ana.t" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Contraseña</label>
              <input style={S.inputFlat} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Ej. Tic2026*" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
            <button type="submit" style={S.addBtn}>
              {editingIdx !== null ? <Pencil size={15} /> : <Plus size={15} />}
              {editingIdx !== null ? "Guardar cambios" : "Crear cuenta"}
            </button>
            {editingIdx !== null && (
              <button type="button" onClick={resetForm} style={S.cancelBtn}>
                Cancelar
              </button>
            )}
            {msg && <span style={S.adminMsg}>{msg}</span>}
          </div>
        </form>

        <div style={S.tableWrap}>
          <div style={S.tableHeadRow}>
            <span style={{ flex: 1.2 }}>Nombre</span>
            <span style={{ flex: 1 }}>Usuario</span>
            <span style={{ flex: 1 }}>Contraseña</span>
            <span style={{ width: 90, textAlign: "right" }}>Acciones</span>
          </div>
          {accounts.length === 0 && <div style={S.emptyRow}>Todavía no has creado ninguna cuenta de alumno.</div>}
          {accounts.map((a, i) => (
            <div style={S.tableRow} key={a.username + i}>
              <span style={{ flex: 1.2 }}>{a.name}</span>
              <span style={{ flex: 1, fontFamily: "'IBM Plex Mono', monospace" }}>{a.username}</span>
              <span style={{ flex: 1, fontFamily: "'IBM Plex Mono', monospace" }}>{a.password}</span>
              <span style={{ width: 90, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button style={S.iconBtn} onClick={() => startEdit(i)} aria-label="Editar">
                  <Pencil size={15} />
                </button>
                <button style={S.iconBtnDanger} onClick={() => remove(i)} aria-label="Eliminar">
                  <Trash2 size={15} />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENTE: Barra superior
   ========================================================================= */
function TopBar({ user, onLogout, onAdmin, view }) {
  return (
    <div style={S.topbar}>
      <div style={S.topbarLeft}>
        <div style={S.logoDot} />
        <span style={S.topbarBrand}>Cuaderno digital · TIC</span>
      </div>
      <div style={S.topbarRight}>
        <span style={S.topbarUser}>
          {user.role === "teacher" ? <ShieldCheck size={14} /> : <User size={14} />} {user.name}
        </span>
        {user.role === "teacher" && view !== "admin" && (
          <button style={S.topbarLink} onClick={onAdmin}>
            Panel de cuentas
          </button>
        )}
        <button style={S.logoutBtn} onClick={onLogout}>
          <LogOut size={14} /> Salir
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENTE: Cuestionario
   ========================================================================= */
function Quiz({ topic }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = topic.quiz.length;
  const answeredCount = Object.keys(answers).length;
  const score = useMemo(() => {
    if (!submitted) return 0;
    return topic.quiz.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  }, [submitted, answers, topic.quiz]);

  const choose = (qi, oi) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
  };

  const submit = () => setSubmitted(true);
  const retry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div>
      {submitted && (
        <div style={{ ...S.scoreBanner, borderColor: topic.color }}>
          <div>
            <div style={S.scoreNum}>{score}/{total}</div>
            <div style={S.scoreLabel}>respuestas correctas</div>
          </div>
          <button style={{ ...S.retryBtn, borderColor: topic.color, color: topic.color }} onClick={retry}>
            Intentar de nuevo
          </button>
        </div>
      )}
      {topic.quiz.map((q, qi) => {
        const chosen = answers[qi];
        return (
          <div key={qi} style={S.qBlock}>
            <div style={S.qHeader}>
              <span style={{ ...S.qNum, background: topic.color }}>{qi + 1}</span>
              <span style={S.qText}>{q.q}</span>
            </div>
            <div style={S.qOptions}>
              {q.options.map((opt, oi) => {
                let optStyle = { ...S.qOption };
                if (submitted) {
                  if (oi === q.correct) optStyle = { ...optStyle, ...S.qOptionCorrect };
                  else if (oi === chosen) optStyle = { ...optStyle, ...S.qOptionWrong };
                } else if (chosen === oi) {
                  optStyle = { ...optStyle, ...S.qOptionSelected, borderColor: topic.color };
                }
                return (
                  <button key={oi} type="button" style={optStyle} onClick={() => choose(qi, oi)}>
                    <span style={S.qOptionMark}>
                      {submitted && oi === q.correct && <CheckCircle2 size={16} color="#2E6F5E" />}
                      {submitted && oi === chosen && oi !== q.correct && <XCircle size={16} color="#B23A2E" />}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div style={S.explanation}>
                <strong>Explicación:</strong> {q.explanation}
              </div>
            )}
          </div>
        );
      })}
      {!submitted && (
        <button
          style={{ ...S.submitBtn, background: answeredCount === total ? topic.color : "#c9c3b3" }}
          disabled={answeredCount !== total}
          onClick={submit}
        >
          Enviar respuestas ({answeredCount}/{total})
        </button>
      )}
    </div>
  );
}

/* =========================================================================
   COMPONENTE: Página de un tema
   ========================================================================= */
function TopicPage({ topic, onBack }) {
  const tabs = [
    { id: "lecturas", label: "Lecturas", icon: "BookOpen" },
    { id: "cuestionario", label: "Cuestionario", icon: "ListChecks" },
    { id: "organizador", label: "Organizador gráfico", icon: "PenTool" },
    { id: "video", label: "Notas del video", icon: "Video" },
  ];
  const [tab, setTab] = useState("lecturas");
  const [readingIdx, setReadingIdx] = useState(0);
  const [notes, setNotes] = useState("");

  return (
    <div style={S.topicWrap}>
      <button style={S.backBtn} onClick={onBack}>
        <ChevronLeft size={16} /> Volver a los temas
      </button>

      <div style={S.topicHead}>
        <span style={{ ...S.topicTagBig, background: topic.color }}>{topic.tag}</span>
        <div>
          <h2 style={S.topicH2}>{topic.title}</h2>
          <p style={S.topicSub}>{topic.subtitle}</p>
        </div>
      </div>

      <div style={S.tabRow}>
        {tabs.map((t) => {
          const Icon = ICONS[t.icon];
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                ...S.tabBtn,
                ...(active ? { borderColor: topic.color, color: topic.color, background: "#fff" } : {}),
              }}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      <div style={S.tabPanel}>
        {tab === "lecturas" && (
          <div>
            <div style={S.readingTabs}>
              {topic.readings.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setReadingIdx(i)}
                  style={{
                    ...S.readingTabBtn,
                    ...(readingIdx === i ? { background: topic.color, color: "#fff", borderColor: topic.color } : {}),
                  }}
                >
                  Lectura {i + 1}
                </button>
              ))}
            </div>
            <h3 style={S.readingTitle}>{topic.readings[readingIdx].title}</h3>
            {topic.readings[readingIdx].text.split("\n\n").map((p, i) => (
              <p key={i} style={S.readingP}>{p}</p>
            ))}
          </div>
        )}

        {tab === "cuestionario" && <Quiz topic={topic} />}

        {tab === "organizador" && (
          <div style={S.instructionBox}>
            <div style={{ ...S.instructionIcon, background: topic.color }}>
              <PenTool size={18} color="#fff" />
            </div>
            <div>
              <h4 style={S.instructionTitle}>Instrucción para tu hoja de trabajo</h4>
              <p style={S.instructionText}>{topic.organizer}</p>
              <p style={S.instructionHint}>Este trabajo se realiza en papel o en tu hoja de trabajo física; entrégalo como lo indique tu docente.</p>
            </div>
          </div>
        )}

        {tab === "video" && (
          <div>
            <div style={S.instructionBox}>
              <div style={{ ...S.instructionIcon, background: topic.color }}>
                <Video size={18} color="#fff" />
              </div>
              <div>
                <h4 style={S.instructionTitle}>Puntos clave del video</h4>
                <p style={S.instructionText}>{topic.video}</p>
              </div>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribe aquí tus notas del video…"
              style={S.textarea}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENTE: Tablero de temas (dashboard)
   ========================================================================= */
function Dashboard({ onOpenTopic, onOpenClock }) {
  return (
    <div style={S.dashWrap}>
      <h2 style={S.dashTitle}>Temas de la clase</h2>
      <p style={S.dashSub}>Elige un tema para ver sus lecturas, el cuestionario y las actividades.</p>
      
      {/* Botón del Reloj */}
      <button 
        onClick={onOpenClock}
        style={{
          ...S.card,
          background: "linear-gradient(135deg, #2E6F5E 0%, #1F5B75 100%)",
          color: "#fff",
          marginBottom: 30,
          cursor: "pointer",
          border: "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Clock size={20} />
          <h3 style={{ ...S.cardTitle, color: "#fff", margin: 0 }}>Reloj Digital Global</h3>
        </div>
        <p style={{ ...S.cardSub, color: "rgba(255,255,255,0.9)", margin: 0 }}>Hora en diferentes zonas horarias del mundo</p>
        <span style={{ ...S.cardArrow, color: "#fff", marginTop: 12 }}>
          Ver reloj <ChevronRight size={15} />
        </span>
      </button>

      <h3 style={{ fontSize: 16, color: "#6b6558", marginBottom: 16, marginTop: 20 }}>Temas académicos</h3>
      
      <div style={S.grid}>
        {TOPICS.map((t) => (
          <button key={t.id} style={S.card} onClick={() => onOpenTopic(t)}>
            <span style={{ ...S.cardTag, background: t.color }}>{t.tag}</span>
            <h3 style={S.cardTitle}>{t.title}</h3>
            <p style={S.cardSub}>{t.subtitle}</p>
            <span style={{ ...S.cardArrow, color: t.color }}>
              Entrar <ChevronRight size={15} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   APP PRINCIPAL
   ========================================================================= */
export default function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("dashboard"); // dashboard | topic | admin | reloj
  const [activeTopic, setActiveTopic] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("accounts", true);
        if (res && res.value) setAccounts(JSON.parse(res.value));
      } catch (e) {
        // no accounts yet
      }
      setLoaded(true);
    })();
  }, []);

  const persistAccounts = async (updated) => {
    setAccounts(updated);
    try {
      await window.storage.set("accounts", JSON.stringify(updated), true);
    } catch (e) {
      console.error("No se pudieron guardar las cuentas", e);
    }
  };

  const logout = () => {
    setUser(null);
    setView("dashboard");
    setActiveTopic(null);
  };

  if (!loaded) {
    return <div style={S.loadingWrap}>Cargando…</div>;
  }

  return (
    <div style={S.appRoot}>
      <style>{FONT_IMPORT}</style>
      {!user && <LoginScreen accounts={accounts} onLogin={setUser} />}

      {user && user.role === "teacher" && view === "admin" && (
        <AdminPanel accounts={accounts} setAccounts={persistAccounts} onExit={() => setView("dashboard")} />
      )}

      {user && (view === "dashboard" || view === "topic" || view === "reloj") && (
        <div style={S.page}>
          <TopBar user={user} onLogout={logout} onAdmin={() => setView("admin")} view={view} />
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
                <ChevronLeft size={16} /> Volver al inicio
              </button>
              <div style={S.topicHead}>
                <Clock size={32} color="#2E6F5E" />
                <div>
                  <h2 style={S.topicH2}>Reloj Digital Global</h2>
                  <p style={S.topicSub}>Hora en diferentes zonas horarias del mundo</p>
                </div>
              </div>
              <RelojDigitalComponent />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   ESTILOS Y TIPOGRAFÍA
   ========================================================================= */
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');`;

const PAPER = "#FAF8F2";
const INK = "#22314A";
const LINE = "#E4DFD1";

const S = {
  appRoot: { minHeight: "100vh", background: PAPER, fontFamily: "'Source Sans 3', sans-serif", color: INK },
  loadingWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8571", fontFamily: "sans-serif" },

  // Login
  loginWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: PAPER, padding: 20 },
  loginCard: { width: "100%", maxWidth: 420, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10, padding: "36px 32px", boxShadow: "0 1px 0 rgba(0,0,0,0.02)" },
  loginBadge: { marginBottom: 18 },
  loginBadgeMono: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: 1, color: "#2E6F5E", background: "#EAF3EF", padding: "4px 10px", borderRadius: 20 },
  loginTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2 },
  loginSubtitle: { fontSize: 13.5, color: "#6b6558", lineHeight: 1.5, margin: 0 },
  label: { display: "block", fontSize: 12.5, color: "#6b6558", marginBottom: 6, marginTop: 16 },
  inputRow: { display: "flex", alignItems: "center", gap: 8, border: `1.5px solid ${LINE}`, borderRadius: 8, padding: "10px 12px", background: "#FCFBF7" },
  input: { border: "none", outline: "none", background: "transparent", flex: 1, fontSize: 14.5, fontFamily: "'Source Sans 3', sans-serif", color: INK },
  eyeBtn: { border: "none", background: "transparent", cursor: "pointer", color: "#8a8571", display: "flex" },
  errorMsg: { color: "#B23A2E", fontSize: 13, marginTop: 10 },
  loginBtn: { marginTop: 22, width: "100%", background: INK, color: "#fff", border: "none", borderRadius: 8, padding: "12px 16px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "'Space Grotesk', sans-serif" },
  loginFoot: { marginTop: 18, fontSize: 12, color: "#a19c8c", textAlign: "center" },

  // Shell / topbar
  page: { minHeight: "100vh" },
  topbar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px", borderBottom: `1px solid ${LINE}`, background: "#fff" },
  topbarLeft: { display: "flex", alignItems: "center", gap: 10 },
  logoDot: { width: 10, height: 10, borderRadius: "50%", background: "#2E6F5E" },
  topbarBrand: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15 },
  topbarRight: { display: "flex", alignItems: "center", gap: 14 },
  topbarUser: { fontSize: 13, color: "#6b6558", display: "flex", alignItems: "center", gap: 6 },
  topbarLink: { border: `1px solid ${LINE}`, background: "#fff", borderRadius: 20, padding: "6px 14px", fontSize: 12.5, cursor: "pointer", color: INK },
  logoutBtn: { display: "flex", alignItems: "center", gap: 6, border: "none", background: "transparent", color: "#B23A2E", cursor: "pointer", fontSize: 13 },

  // Dashboard
  dashWrap: { maxWidth: 1000, margin: "0 auto", padding: "44px 28px 60px" },
  dashTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, margin: "0 0 6px" },
  dashSub: { color: "#6b6558", fontSize: 14.5, margin: "0 0 30px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
  card: { textAlign: "left", background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10, padding: "20px 20px 18px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 8, fontFamily: "inherit" },
  cardTag: { alignSelf: "flex-start", color: "#fff", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, padding: "3px 8px", borderRadius: 5, letterSpacing: 0.5 },
  cardTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, margin: "4px 0 0" },
  cardSub: { fontSize: 13, color: "#6b6558", margin: 0, lineHeight: 1.4 },
  cardArrow: { marginTop: 6, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 },

  // Topic page
  topicWrap: { maxWidth: 900, margin: "0 auto", padding: "30px 28px 70px" },
  backBtn: { display: "flex", alignItems: "center", gap: 4, border: "none", background: "transparent", color: "#6b6558", cursor: "pointer", fontSize: 13.5, padding: 0, marginBottom: 20 },
  topicHead: { display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22 },
  topicTagBig: { color: "#fff", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, padding: "6px 10px", borderRadius: 6, marginTop: 4 },
  topicH2: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, margin: "0 0 4px" },
  topicSub: { color: "#6b6558", fontSize: 14, margin: 0 },
  tabRow: { display: "flex", gap: 8, borderBottom: `1px solid ${LINE}`, marginBottom: 22, flexWrap: "wrap" },
  tabBtn: { display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", borderBottom: "2.5px solid transparent", padding: "10px 4px", marginRight: 18, cursor: "pointer", fontSize: 14, color: "#8a8571", fontFamily: "inherit" },
  tabPanel: { minHeight: 200 },

  // Readings
  readingTabs: { display: "flex", gap: 8, marginBottom: 16 },
  readingTabBtn: { border: `1px solid ${LINE}`, background: "#fff", borderRadius: 20, padding: "6px 14px", fontSize: 12.5, cursor: "pointer", color: INK },
  readingTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, margin: "4px 0 14px" },
  readingP: { fontSize: 15, lineHeight: 1.7, color: "#3a3628", margin: "0 0 14px", maxWidth: 680 },

  // Instructions
  instructionBox: { display: "flex", gap: 14, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10, padding: 20 },
  instructionIcon: { width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  instructionTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 15.5, margin: "2px 0 8px" },
  instructionText: { fontSize: 14.5, lineHeight: 1.6, color: "#3a3628", margin: 0 },
  instructionHint: { fontSize: 12.5, color: "#8a8571", marginTop: 10 },
  textarea: { width: "100%", minHeight: 160, marginTop: 16, border: `1px solid ${LINE}`, borderRadius: 10, padding: 14, fontSize: 14.5, fontFamily: "inherit", resize: "vertical", background: "#fff", boxSizing: "border-box" },

  // Quiz
  qBlock: { borderBottom: `1px solid ${LINE}`, padding: "18px 0" },
  qHeader: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 },
  qNum: { color: "#fff", fontSize: 12.5, fontFamily: "'IBM Plex Mono', monospace", width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 },
  qText: { fontSize: 15, fontWeight: 600, lineHeight: 1.4 },
  qOptions: { display: "flex", flexDirection: "column", gap: 8, paddingLeft: 32 },
  qOption: { display: "flex", alignItems: "center", gap: 8, textAlign: "left", border: `1.5px solid ${LINE}`, background: "#fff", borderRadius: 8, padding: "10px 12px", fontSize: 14, cursor: "pointer", fontFamily: "inherit", color: INK },
  qOptionSelected: { background: "#FCFBF7" },
  qOptionCorrect: { borderColor: "#2E6F5E", background: "#EAF3EF" },
  qOptionWrong: { borderColor: "#B23A2E", background: "#FBEAE8" },
  qOptionMark: { width: 16, display: "flex", justifyContent: "center" },
  explanation: { paddingLeft: 32, marginTop: 10, fontSize: 13.5, color: "#6b6558", lineHeight: 1.5 },
  submitBtn: { marginTop: 10, color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" },
  scoreBanner: { display: "flex", alignItems: "center", justifyContent: "space-between", border: "1.5px solid", borderRadius: 10, padding: "16px 20px", marginBottom: 10, background: "#fff" },
  scoreNum: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700 },
  scoreLabel: { fontSize: 12.5, color: "#6b6558" },
  retryBtn: { border: "1.5px solid", background: "#fff", borderRadius: 20, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600 },

  // Admin
  adminWrap: { maxWidth: 920, margin: "0 auto", padding: "34px 28px 60px" },
  adminHeader: { display: "flex", gap: 12, marginBottom: 26 },
  adminTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, margin: "0 0 4px" },
  adminSub: { fontSize: 14, color: "#6b6558", margin: 0 },
  adminForm: { background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10, padding: 20, marginBottom: 26 },
  adminFormRow: { display: "flex", gap: 14, flexWrap: "wrap" },
  inputFlat: { width: "100%", border: `1.5px solid ${LINE}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", background: "#FCFBF7" },
  addBtn: { display: "flex", alignItems: "center", gap: 6, background: "#2E6F5E", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" },
  cancelBtn: { border: `1px solid ${LINE}`, background: "#fff", borderRadius: 8, padding: "10px 16px", fontSize: 14, cursor: "pointer" },
  adminMsg: { fontSize: 13, color: "#6b6558" },
  tableWrap: { background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10, overflow: "hidden" },
  tableHeadRow: { display: "flex", padding: "12px 18px", background: "#FAF8F2", fontSize: 12.5, color: "#8a8571", borderBottom: `1px solid ${LINE}` },
  tableRow: { display: "flex", padding: "13px 18px", borderBottom: `1px solid ${LINE}`, fontSize: 14, alignItems: "center" },
  emptyRow: { padding: "22px 18px", fontSize: 13.5, color: "#8a8571" },
  iconBtn: { border: `1px solid ${LINE}`, background: "#fff", borderRadius: 6, padding: 6, cursor: "pointer", display: "flex", color: INK },
  iconBtnDanger: { border: `1px solid #E9C7C1`, background: "#fff", borderRadius: 6, padding: 6, cursor: "pointer", display: "flex", color: "#B23A2E" },

  // Reloj
  reloqPrincipal: { maxWidth: 1000, margin: "0 auto 40px", display: "flex", justifyContent: "center" },
  reloqContenedor: { background: "#fff", border: `2px solid #2E6F5E`, borderRadius: 20, padding: "40px 50px", textAlign: "center", boxShadow: "0 4px 15px rgba(46, 111, 94, 0.1)", minWidth: 350 },
  hora: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 56, fontWeight: 700, color: "#2E6F5E", margin: "0 0 12px", letterSpacing: 2 },
  fecha: { fontSize: 15, color: "#6b6558", marginBottom: 8, textTransform: "capitalize" },
  zonaLocal: { fontSize: 13, color: "#8a8571", fontStyle: "italic" },
  gridReloj: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 },
  tarjetaReloj: { background: "#fff", border: `1px solid ${LINE}`, borderRadius: 12, padding: 18, borderTop: "4px solid #2E6F5E" },
  tarjetaHeaderReloj: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 },
  nombreZonaReloj: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, margin: 0 },
  horaGrandeReloj: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 32, fontWeight: 700, color: INK, margin: "10px 0", letterSpacing: 1 },
  fechaChicaReloj: { fontSize: 11.5, color: "#8a8571", textTransform: "capitalize", lineHeight: 1.4 },
};