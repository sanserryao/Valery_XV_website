# Mis XV — Valery

Invitación digital de una sola página para los XV años de Valery — **Sábado 10 de Octubre de 2026**. HTML/CSS/JS puro, sin frameworks ni build step.

Paleta, tipografía y gráficos decorativos tomados del sitio real del cliente
(invitaciones-steli.com/valery — derechos de uso confirmados). Estructura, tarjetas y
alineación basadas en la referencia de Claude Design del cliente. Contenido corregido.

## Cómo verlo

Es estático, así que puedes abrir `index.html` directamente con doble clic, o servirlo local:

```
python -m http.server 5173
```

y abrir `http://localhost:5173`.

## Estructura (orden real en `index.html`)

```
index.html
  1) hero            → video de fondo con marco dorado inciso (sin texto encima)
  2) invite-section   → sombrero + "Valery" + "MIS XV AÑOS" + fecha + "Escucha mi canción"
                        + botón de música + sobre con sello de cera (mensaje)
  3) formal-section    → tarjeta marino: "Con la bendición de Dios" + invitación formal
                        + foto del Niño Dios bajo el arco
  4) agenda-section     → "Agenda la fecha" + calendario real de octubre 2026
                        + countdown en vivo + "Guardar en mi calendario" (Google Calendar)
  — separador de herradura —
  5) detail-section      → tarjeta marino: Ceremonia (foto + Ver ubicación) +
                        Recepción (foto + Ver ubicación) + Confirmar asistencia
  6) cierre-section       → frase de cierre + "No Faltes" + emblema XV

css/styles.css    → paleta y tipografía exactas del cliente, tarjetas, animaciones
js/main.js        → CONFIG editable, countdown, calendario, scroll reveal, música, mapas, RSVP
assets/images/vendor/  → gráficos reales del cliente (ver tabla abajo)
assets/audio/     → cancion.mp3
assets/video/     → hero-loop.mp4
```

## Paleta y tipografía (exactas del cliente)

```css
--navy: #0B1F3F;        /* fondo de tarjetas, base de la marca */
--navy-card: #16345E;   /* marcos de foto, botones secundarios */
--gold: #C9A227;        /* bordes, íconos, texto dorado sobre marino */
--gold-light: #E3C463;  /* detalles finos sobre marino */
--cream: #F5EFE3;       /* fondo general de la página */
--cream-card: #FFFBF3;  /* tarjetas claras (calendario) */
--gold-text: #7A6014;   /* oro sobre crema, texto normal — contraste 5.2:1 */
--gold-script: #96761B; /* oro sobre crema, script grande 24px+ — contraste 3.8:1 */
```

El dorado `#C9A227` se usa literal sobre marino (bordes, íconos, filigranas). Sobre **crema**
pierde contraste (2.1:1) así que el texto dorado usa las versiones bajadas de luz
(`--gold-text` / `--gold-script`) — mismo tono, ajustado para que se lea bien.

Fuentes (Google Fonts): **Pinyon Script** (nombre, "la fecha", "No Faltes"), **Cinzel**
(títulos, botones, etiquetas en versalitas), **Cormorant Garamond** (texto corrido, números).

## Assets gráficos reales (`assets/images/vendor/`)

| Archivo | Uso |
|---|---|
| `sombrero.png` | sombrero charro |
| `valery-wordmark.png` | *(sin usar actualmente — el nombre "Valery" ahora es texto real en Pinyon Script, no imagen)* |
| `rose-single.png` | rosas que flanquean la tarjeta del hero |
| `envelope-seal.png` | sobre con sello de cera en forma de herradura |
| `corner-flourish-1.png` | florituras de esquina (invitación formal, ceremonia/recepción, cierre) |
| `corner-flourish-2.png` | florituras de esquina (agenda) |
| `nino-dios-arco.png` | foto real del Niño Dios bajo el arco floral |
| `herradura.png` | separador de herradura entre Agenda y Ceremonia |
| `santuario.png` | foto real del Santuario Señor de las Misericordias |
| `recepcion.png` | foto real del lugar de recepción |
| `emblema-xv.png` | emblema circular "XV" de cierre |
| `rose-garland.png`, `botas-charras.png`, `boton-ubicacion.png` | ya no se usan en este layout (se quedan en la carpeta por si los quieres reincorporar) |

**No se usa** la imagen de calendario del sitio original (genérica, de "Octubre **2025**" —
año equivocado). El calendario es una grilla real de octubre 2026 en HTML/CSS, con el 10
correctamente marcado como sábado.

**Optimización pendiente:** las imágenes vienen sin comprimir. Antes de publicar en serio,
pásalas por [squoosh.app](https://squoosh.app) o TinyPNG (e idealmente a WebP), y comprime
`assets/video/hero-loop.mp4` (HandBrake o `ffmpeg -crf 28`) — el peso total del sitio hoy
anda por los ~17 MB, que es mucho para datos móviles.

## Countdown, calendario y "Guardar en mi calendario"

- El **countdown** (`Días : Horas : Minutos : Segundos`) es JS puro, calculado en vivo cada
  segundo contra `CONFIG.eventDateTime`.
- El **calendario** de octubre 2026 está escrito directo en el HTML (no depende de JS ni de
  una imagen), así que nunca se puede desincronizar del countdown.
- El botón **"Guardar en mi calendario"** arma un link real de Google Calendar
  (`setupAddToCalendar` en `js/main.js`) con el evento prellenado: inicio en
  `CONFIG.eventDateTime`, fin +11 horas por default (edítalo en esa función si la celebración
  dura distinto), y la dirección de la ceremonia como ubicación.

Si cambias la fecha del evento, edita **una sola vez** `CONFIG.eventDateTime` en `js/main.js`
— countdown y calendario de Google se ajustan solos. Si además cambia el mes/año, hay que
regenerar a mano la grilla `.calendar__grid` en `index.html`.

## Confirmar asistencia (RSVP), ubicaciones y hora de la recepción

Edita el bloque `CONFIG` al inicio de `js/main.js`:

```js
const CONFIG = {
  quinceanera: "Valery",
  eventDateTime: new Date("2026-10-10T11:45:00-06:00"),
  ceremonyAddress: "Santuario Señor de las Misericordias, San Pedro Actopan, Milpa Alta, Ciudad de México",
  receptionAddress: "Avenida México Poniente 22, San Gregorio Atlapulco, Xochimilco, Ciudad de México",
  rsvpMethod: "whatsapp",           // "whatsapp" o "formspree"
  whatsappNumber: "5215512345678",  // EDITA: lada país + lada local, sin +, sin espacios
  formspreeEndpoint: "",            // solo si usas rsvpMethod = "formspree"
};
```

- Los botones **"Ver ubicación"** arman un link real de Google Maps a partir de
  `ceremonyAddress` / `receptionAddress`. Si tienes el link exacto (coordenadas o Place ID),
  puedes pegarlo directo en `setupMapLinks()` para mayor precisión.
- **Confirmar asistencia (WhatsApp, por defecto):** abre `wa.me` con el mensaje ya escrito.
  Solo cambia `whatsappNumber` por el número real.
- **Hora de la recepción:** todavía dice **"[hora] p.m."** en `index.html` (sección
  Recepción) porque no estaba confirmada — búscalo y reemplázalo cuando la tengan.

## Correcciones de contenido aplicadas (respecto al sitio original del proveedor)

- **Fecha consistente:** el original marcaba el 10 en el calendario pero el texto decía
  "Sábado 22" (y "10 Ocubre 2026" con typo en el hero). Aquí la fecha es una sola en todo el
  sitio, calendario incluido: **Sábado 10 de Octubre de 2026** (10 de octubre de 2026 sí es
  sábado, verificado).
- **Ubicación de la recepción:** "San Gregario Atlapulco" → "San Gregorio Atlapulco".
- **Texto de invitación:** "LA FAM: Rodriguez Serralde" → "La familia Rodríguez Serralde".
- **Sin texto duplicado** en el DOM (el original repetía casi todos los párrafos dos veces).
- **Botón de confirmación funcional** (WhatsApp real, editable) en vez de un href roto.
- **Calendario real** en vez de la imagen decorativa con el año equivocado.

## Despliegue

Sitio 100% estático — funciona en Vercel, Netlify, GitHub Pages o cualquier hosting simple,
sin build command ni variables de entorno. Antes de publicar, comprime imágenes y video
(ver nota arriba) y reemplaza la hora de la recepción.
