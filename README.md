# Mis XV — Valery

Invitación digital de una sola página para los XV años de Valery — **Sábado 10 de Octubre de 2026**. HTML/CSS/JS puro, sin frameworks ni build step. Diseño basado en la referencia visual del cliente: azul marino + dorado sobre crema, rosas marino, marco doble dorado, calendario y countdown en vivo.

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
                   3) invitación formal + foto bajo arco
                   4) agenda la fecha (calendario + countdown en vivo)
                   — separador de herradura —
                   5) ceremonia + recepción (con botones "Ver ubicación")
                   6) confirmar asistencia
                   7) cierre + emblema final "XV"
css/styles.css   → paleta, tipografía, rosas/ornamentos SVG, animaciones
js/main.js       → CONFIG editable, countdown, scroll reveal, música, mapas, RSVP
assets/images/   → fotos reales (ver "Reemplazar contenido")
assets/audio/    → cancion.mp3
assets/video/    → hero-loop.mp4
```

**Nota sobre las rosas y florituras:** están hechas como ilustraciones vectoriales propias
(un solo `<symbol>` de rosa reutilizado por todo el sitio, en `index.html`) inspiradas en los
colores y la composición de la referencia — no son un calco pixel-por-pixel del clip art
original, que es demasiado detallado para reproducir a mano en SVG. Si más adelante consigues
el clip art real (o algo de un banco de imágenes con licencia), puedo intercambiar estos SVG
por esos archivos sin tocar el resto del layout.

## Reemplazar contenido con archivos reales

Todo está señalado con comentarios `<!-- -->` en `index.html` justo donde va cada archivo:

1. **Foto de Valery bajo el arco floral** (sección 3) — agrega `assets/images/valery-arco.jpg`
   y reemplaza el bloque `.arch-photo__placeholder` por un `<img>` (instrucción exacta en el
   comentario arriba de esa figura).
2. **Foto del santuario** (Ceremonia) — agrega `assets/images/santuario.jpg`, mismo patrón con
   `.rect-photo__placeholder`.
3. **Foto del lugar de recepción** — agrega `assets/images/recepcion.jpg`, mismo patrón.
4. **Video de fondo del hero** — agrega `assets/video/hero-loop.mp4` (corto, silencioso, pocos MB)
   y descomenta la línea `<source>` dentro de `.hero__video`. Mientras no lo agregues, se ve el
   degradado crema/dorado de respaldo.
5. **Canción** — agrega `assets/audio/cancion.mp3`. El botón ya está conectado a doble clic
   (igual que la referencia), no hay que tocar el JS.

## Countdown y calendario

El countdown (`Días : Horas : Minutos : Segundos`) es JavaScript puro (`setupCountdown` en
`js/main.js`), calculado en vivo cada segundo contra `CONFIG.eventDateTime`. El calendario de
octubre 2026 está escrito directo en el HTML (el 10 es sábado — ya verificado), así que no
depende de JS y nunca se puede desincronizar del countdown.

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

- **Fecha consistente:** el calendario marcaba el 10 pero el texto decía "Sábado 22" — dos
  fechas distintas. Aquí la fecha es una sola en todo el sitio, calendario incluido:
  **Sábado 10 de Octubre de 2026** (verificado: el 10 de octubre de 2026 sí es sábado).
- **Ubicación de la recepción:** "San Gregario Atlapulco" → "San Gregorio Atlapulco".
- **Texto de invitación:** "LA FAM: Rodriguez Serralde" → "La familia Rodríguez Serralde"
  (con el acento correcto).
- **Sin texto duplicado:** el original repetía casi todos los párrafos dos veces en el HTML.
  Aquí cada texto existe una sola vez.
- **Botón de confirmación funcional:** apunta a un link de WhatsApp real (editable), no a un
  href vacío o roto.

## Despliegue

Sitio 100% estático — funciona en Vercel, Netlify, GitHub Pages o cualquier hosting simple,
sin build command ni variables de entorno.
