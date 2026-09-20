# Mis XV — Valery

Invitación digital de una sola página para los XV años de Valery — **Sábado 10 de Octubre de 2026**. HTML/CSS/JS puro, sin frameworks ni build step. Diseño y gráficos tomados directamente de la referencia real del cliente (confirmó derechos de uso de los assets), con el contenido corregido.

## Cómo verlo

Es estático, así que puedes abrir `index.html` directamente con doble clic, o servirlo local:

```
python -m http.server 5173
```

y abrir `http://localhost:5173`.

## Estructura (orden real en `index.html`)

```
index.html      → 1) hero (sombrero + "Valery" + escucha mi canción)
                   2) sobre con mensaje
                   3) invitación formal + foto (Niño Dios bajo el arco)
                   4) agenda la fecha (calendario + countdown en vivo)
                   — separador de herradura —
                   5) ceremonia + recepción (con botones "Ver ubicación")
                   6) confirmar asistencia
                   7) cierre + emblema final "XV"
css/styles.css   → paleta real extraída del sitio de referencia, layout, animaciones
js/main.js       → CONFIG editable, countdown, scroll reveal, música, mapas, RSVP
assets/images/vendor/  → gráficos reales del cliente (ver abajo)
assets/images/   → fotos propias que aún faltan (santuario/recepción ya están; ver nota)
assets/audio/    → cancion.mp3
assets/video/    → hero-loop.mp4
```

## Assets gráficos reales (`assets/images/vendor/`)

El cliente confirmó tener derecho a reutilizar los gráficos del sitio de referencia
(invitaciones-steli.com/valery), así que estos son los archivos reales — no ilustraciones
propias. Vienen del HTML guardado del sitio original y ya están integrados:

| Archivo | Uso |
|---|---|
| `rose-garland.png` | flourish floral horizontal (tope del hero y sección de cierre) |
| `sombrero.png` | sombrero charro del hero |
| `valery-wordmark.png` | "Valery" en script dorado |
| `rose-single.png` | rosas de esquina al pie del hero |
| `envelope-seal.png` | sobre con sello de cera (sección 2) |
| `corner-flourish-1.png` | florituras de las 4 esquinas del marco de invitación formal |
| `nino-dios-arco.png` | foto real del Niño Dios bajo el arco floral |
| `corner-flourish-2.png` | florituras a los lados del calendario |
| `botas-charras.png` | botas bordadas, acento decorativo en Agenda |
| `herradura.png` | separador de herradura entre Agenda y Ceremonia |
| `boton-ubicacion.png` | botón "Ver ubicación" (Ceremonia y Recepción) |
| `santuario.png` | foto real del Santuario Señor de las Misericordias |
| `recepcion.png` | foto real del lugar de recepción |
| `emblema-xv.png` | emblema circular "XV" de cierre |

**No se usó** la imagen de calendario del original (genérica, de "Octubre **2025**" — año
equivocado, puramente decorativa). En su lugar, `index.html` tiene una grilla real de
octubre 2026 en HTML/CSS, con el 10 correctamente marcado como sábado — así el calendario
nunca puede desincronizarse del countdown ni repetir el error de fecha del sitio original.

**Optimización pendiente:** estos PNG vienen sin comprimir (~9.5 MB en total, algunos de
más de 1 MB c/u). Antes de publicar el sitio conviene pasarlos por un compresor de imágenes
(por ejemplo [squoosh.app](https://squoosh.app) o TinyPNG) y idealmente convertirlos a WebP —
ahora mismo esto puede hacer lenta la carga en celular.

## Video de fondo y canción (ya integrados)

- **`assets/video/hero-loop.mp4`** — el video generado por IA (720×1280, ~6s, loop, mudo).
  El hero lo muestra a buena visibilidad (opacity 0.8) con un overlay claro solo para que el
  texto no pierda contraste. Si prefieres que se note menos o más, el valor está en
  `.hero__video { opacity: ... }` en `css/styles.css`.
- **`assets/audio/cancion.mp3`** — "Un Vestido de Besos". El botón ya reproduce/pausa con
  doble clic, igual que la referencia — no hay que tocar el JS.

**Optimización pendiente (video):** el mp4 pesa ~3.8 MB sin comprimir — junto con los PNG de
`vendor/` (~9.5 MB) y el mp3 (~3.6 MB), el peso total del sitio anda por los ~17 MB. Antes de
publicarlo en serio, comprime el video (HandBrake o `ffmpeg -crf 28`) y las imágenes (ver nota
arriba) para que cargue rápido en datos móviles.

Las fotos del Niño Dios, el santuario y la recepción ya son las reales — no hacen falta
placeholders para esas tres.

## Countdown y calendario

El countdown (`Días : Horas : Minutos : Segundos`) es JavaScript puro (`setupCountdown` en
`js/main.js`), calculado en vivo cada segundo contra `CONFIG.eventDateTime`. El calendario de
octubre 2026 está escrito directo en el HTML, así que no depende de JS ni de una imagen y
nunca se puede desincronizar del countdown.

Si cambias la fecha del evento, edita **una sola vez** `CONFIG.eventDateTime` en `js/main.js`
(zona horaria Ciudad de México, UTC-6 fijo) — el countdown se ajusta solo. Si además cambia el
mes/año, tendrías que regenerar a mano la grilla `.calendar__grid` en `index.html`.

## Confirmar asistencia (RSVP) y ubicaciones

Edita el bloque `CONFIG` al inicio de `js/main.js`:

```js
const CONFIG = {
  quinceanera: "Valery",
  eventDateTime: new Date("2026-10-10T11:45:00-06:00"),
  ceremonyAddress: "Santuario Señor de las Misericordias, San Pedro Actopan, Ciudad de México",
  receptionAddress: "Avenida México Poniente 22, San Gregorio Atlapulco, Ciudad de México",
  rsvpMethod: "whatsapp",           // "whatsapp" o "formspree"
  whatsappNumber: "5215512345678",  // EDITA: lada país + lada local, sin +, sin espacios
  formspreeEndpoint: "",            // solo si usas rsvpMethod = "formspree"
};
```

- Los botones **"Ver ubicación"** arman un link real de Google Maps a partir de
  `ceremonyAddress` / `receptionAddress` (búsqueda por dirección). Si tienes el link exacto de
  Google Maps del lugar (con coordenadas o Place ID), puedes pegarlo directo en
  `setupMapLinks()` en vez de la dirección de texto, para mayor precisión.
- **Confirmar asistencia (WhatsApp, por defecto):** abre `wa.me` con el mensaje "Hola, confirmo
  mi asistencia a los XV años de Valery" ya escrito. Solo cambia `whatsappNumber` por el número real.
- **Formspree:** crea un formulario en [formspree.io](https://formspree.io), pon
  `rsvpMethod: "formspree"` y pega tu endpoint en `formspreeEndpoint`.

## Correcciones de contenido aplicadas (respecto al sitio/diseño original)

- **Fecha consistente:** el calendario del original marcaba el 10 pero el texto decía
  "Sábado 22" — dos fechas distintas, y con el typo "10 Ocubre 2026" en el hero. Aquí la
  fecha es una sola en todo el sitio, calendario incluido: **Sábado 10 de Octubre de 2026**
  (verificado: el 10 de octubre de 2026 sí es sábado).
- **Ubicación de la recepción:** "San Gregario Atlapulco" → "San Gregorio Atlapulco".
- **Texto de invitación:** "LA FAM: Rodriguez Serralde" → "La familia Rodríguez Serralde"
  (con el acento correcto).
- **Sin texto duplicado:** el original repetía casi todos los párrafos dos veces en el HTML.
  Aquí cada texto existe una sola vez.
- **Botón de confirmación funcional:** apunta a un link de WhatsApp real (editable), no a un
  href vacío o roto.
- **Calendario real en vez de imagen decorativa con el año equivocado** (ver arriba).

## Despliegue

Sitio 100% estático — funciona en Vercel, Netlify, GitHub Pages o cualquier hosting simple,
sin build command ni variables de entorno. Antes de publicar, comprime las imágenes en
`assets/images/vendor/` (ver nota arriba).
