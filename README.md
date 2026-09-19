# Mis XV — Valery

Invitación digital de una sola página para los XV años de Valery — **Sábado 10 de Octubre de 2026**. HTML/CSS/JS puro, sin frameworks ni build step.

## Cómo verlo

Es estático, así que puedes abrir `index.html` directamente con doble clic, o servirlo local:

```
python -m http.server 5173
```

y abrir `http://localhost:5173`.

## Estructura

```
index.html      → las 10 secciones, en orden: hero, decorativas, canción,
                   sobre, agenda, ceremonia, recepción, confirmar, cierre, emblema final
css/styles.css   → paleta (marino + dorado sobre crema), tipografía, ornamentos, animaciones
js/main.js       → CONFIG editable (WhatsApp/Formspree), scroll reveal, botón de música
assets/images/   → fotos reales (ver "Reemplazar contenido")
assets/audio/    → cancion.mp3
assets/video/    → hero-loop.mp4
```

## Reemplazar contenido con archivos reales

Todo está señalado con comentarios `<!-- -->` en `index.html` justo donde va cada archivo:

1. **Foto principal (hero)** — agrega `assets/images/hero-valery.jpg` y cambia el bloque
   `.portrait__placeholder` por un `<img>` (instrucción exacta en el comentario arriba de esa figura).
2. **Foto del santuario (Ceremonia)** — mismo patrón, agrega `assets/images/santuario.jpg`
   y reemplaza `.detail__placeholder`.
3. **Video de fondo del hero** — agrega `assets/video/hero-loop.mp4` (corto, silencioso, pocos MB)
   y descomenta la línea `<source>` dentro de `.hero__video`. Mientras no lo agregues, se ve
   el degradado marino/dorado de respaldo.
4. **Canción** — agrega `assets/audio/cancion.mp3`. El botón ya está conectado, no hay que tocar JS.
5. **Vestido, sombrero charro, sobre con sello y emblema final** son ilustraciones vectoriales
   (SVG inline en línea dorada) hechas para el sitio — no requieren fotos.

## Confirmar asistencia (RSVP)

Edita el bloque `CONFIG` al inicio de `js/main.js`:

```js
const CONFIG = {
  quinceanera: "Valery",
  rsvpMethod: "whatsapp",           // "whatsapp" o "formspree"
  whatsappNumber: "5215512345678",  // EDITA: lada país + lada local, sin +, sin espacios
  formspreeEndpoint: "",            // solo si usas rsvpMethod = "formspree"
};
```

- **WhatsApp (por defecto):** el botón abre `wa.me` con el mensaje "Hola, confirmo mi asistencia
  a los XV años de Valery" ya escrito. Solo cambia `whatsappNumber` por el número real.
- **Formspree:** crea un formulario en [formspree.io](https://formspree.io), pon
  `rsvpMethod: "formspree"` y pega tu endpoint en `formspreeEndpoint`.

## Correcciones respecto al sitio de referencia

Este sitio se construyó desde cero (no se copió código del original) corrigiendo:

- **Fecha consistente:** el original mostraba "10 Ocubre 2026" (typo) en el hero y
  "Sábado 22 Octubre 2026" en la agenda — dos fechas distintas. Aquí la fecha es una sola
  en todo el sitio: **Sábado 10 de Octubre de 2026**.
- **Ubicación de la recepción:** "San Gregario Atlapulco" → "San Gregorio Atlapulco".
- **Texto de invitación:** "LA FAM: Rodriguez Serralde" → "La familia Rodríguez Serralde".
- **Sin texto duplicado:** el original repetía casi todos los párrafos dos veces en el HTML.
  Aquí cada texto existe una sola vez.
- **Botón de confirmación funcional:** apunta a un link de WhatsApp real (editable), no a un
  href vacío o roto.

## Despliegue

Sitio 100% estático — funciona en Vercel, Netlify, GitHub Pages o cualquier hosting simple,
sin build command ni variables de entorno.
