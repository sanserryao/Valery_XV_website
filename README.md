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

y abrir `http://localhost:5173`. **Si acabas de actualizar el sitio y no ves los cambios**,
haz una recarga forzada (Ctrl+Shift+R / Cmd+Shift+R) una vez — el navegador cachea
agresivamente `styles.css`. El link ya trae `?v=N` en `index.html`; súbele el número cada
vez que edites el CSS para que se refresque solo.

## Estructura (orden real en `index.html`)

```
index.html
  1) hero            → video de fondo con marco dorado inciso (sin texto encima)
  2) invite-section   → invitación de la familia (justo debajo del video) + sombrero
                        + "Valery" + "MIS XV AÑOS" + fecha + "Escucha mi canción"
                        + botón de música + sobre con sello de cera (mensaje)
  3) formal-section    → tarjeta crema con marco de rosas: "Con la bendición de Dios"
                        + foto del Niño Dios bajo el arco
  4) agenda-section     → "Agenda la fecha" + calendario real de octubre 2026
                        + countdown en vivo
  — separador de herradura (fondo crema) —
  5) detail-section      → DOS tarjetas independientes, cada una con su propio marco:
                        Ceremonia (foto + Ver ubicación) y Recepción (foto + Ver ubicación)
  6) cierre-section       → frase de cierre + "No Faltes" + emblema XV (tarjeta con marco)

css/styles.css    → paleta y tipografía exactas del cliente, tarjetas, animaciones
js/main.js        → CONFIG editable, countdown, scroll reveal, música, mapas
assets/images/vendor/  → gráficos reales del cliente (ver tabla abajo)
assets/audio/     → cancion.mp3
assets/video/     → hero-loop.mp4
```

**No hay botón de "Confirmar asistencia".** Se quitó a pedido explícito — si más adelante
lo quieren de vuelta, el commit anterior a este cambio en git ya tiene el botón completo
(HTML + CSS `.pill--solid` + `setupRsvpButton()` en JS) para recuperarlo fácilmente.

**No hay botón de "Guardar en mi calendario".** También se quitó a pedido explícito (botón,
`setupAddToCalendar()` en JS y su estilo `.pill--calendar`) — recuperable del historial de
git si lo quieren de vuelta.

**El texto de invitación de la familia se movió** de la tarjeta de `formal-section` a
`invite-section`, justo debajo del video del hero y arriba del sombrero (a pedido del
cliente, para que sea lo primero que se lea al abrir el sitio). La tarjeta de
`formal-section` conserva el encabezado "Con la bendición de Dios" y la foto del Niño Dios,
sin repetir el párrafo. Las rosas que flanquean el sombrero ahora están posicionadas
relativas a `.hat-wrap` (no a toda la sección), para que no se desalineen si ese bloque de
texto cambia de largo.

## Paleta y tipografía (exactas del cliente)

```css
--navy: #0B1F3F;        /* texto oscuro, títulos, botones "Ver ubicación"/calendario */
--navy-card: #16345E;   /* marcos de foto, texto secundario sobre crema */
--gold: #C9A227;        /* bordes, íconos, filigranas — literal en cualquier fondo */
--gold-light: #E3C463;  /* detalles finos sobre marino */
--cream: #F5EFE3;       /* fondo general de la página */
--cream-card: #FFFBF3;  /* interior de las tarjetas con marco */
--gold-text: #7A6014;   /* oro sobre crema, texto normal — contraste 5.2:1 */
--gold-script: #96761B; /* oro sobre crema, script grande 24px+ — contraste 3.8:1 */
```

El dorado `#C9A227` se usa literal en bordes/íconos/filigranas sobre **cualquier** fondo
(no es texto, así que el contraste no aplica igual). Para **texto** dorado sobre crema se
usan las versiones bajadas de luz (`--gold-text` / `--gold-script`) — mismo tono, ajustado
para que se lea bien; sobre marino el texto dorado sí puede usar `--gold` literal.

Fuentes (Google Fonts): **Pinyon Script** (nombre, "la fecha", "No Faltes"), **Cinzel**
(títulos, botones, etiquetas en versalitas), **Cormorant Garamond** (texto corrido, números).

## Tarjetas con marco de rosas reales

La invitación formal, Ceremonia, Recepción y el cierre usan tarjetas crema (`.card-framed` /
`.cierre-section`) enmarcadas con 4 imágenes reales de rosas — una por esquina, cada una ya
orientada para su lugar (no son la misma imagen espejeada). Salen de recortar 4 fotos verticales
9:16 que mandó el cliente:

```
assets/images/vendor/frame-{formal,ceremonia,recepcion,cierre}-{tl,tr,bl,br}.png
```

Si quieres volver a generar los recortes (por ejemplo con fotos nuevas), el recorte usado fue
un cuadro de 520×520px en cada esquina de la imagen fuente de 1125×2000px.

**Los 16 PNG ya no tienen fondo — son transparentes.** El recorte original venía con el fondo
crema/blanco de la foto fuente pintado de verdad en el PNG (opaco); se quitó con un flood-fill
por color (Python/PIL: `ImageDraw.floodfill` desde los bordes de cada imagen, con tolerancia de
color contra el crema de fondo, más un desenfoque leve en la máscara para que el borde de las
rosas no quede dentado). Así las rosas se pueden usar sobre cualquier fondo, no solo el crema
de las tarjetas. Si regeneras estos recortes con fotos nuevas, hay que repetir ese paso — un
recorte directo sale opaco.

**Excepción — Ceremonia sí usa 2 esquinas espejeadas.** La foto fuente de Ceremonia (10.webp)
solo tiene rosas dibujadas en dos esquinas diagonales (arriba-derecha y abajo-izquierda); las
otras dos esquinas de la foto están vacías y además tenían una línea dorada del propio marco
del archivo original, que se colaba en el recorte y se veía como un marco "cortado a la mitad".
Por eso `frame-ceremonia-tl.png` y `frame-ceremonia-br.png` NO son recortes directos — son
`frame-ceremonia-tr.png` y `frame-ceremonia-bl.png` espejeados horizontalmente
(`ImageOps.mirror` de PIL), para que las 4 esquinas de esa tarjeta se vean completas y
parejas. Si cambias la foto fuente de Ceremonia, revisa si el problema persiste antes de
repetir el espejeado.

**Ojo con el padding de estas tarjetas:** el marco (`.frame-corner`) mide 78–96px. El
`padding-top`/`padding-bottom` de `.formal-card`, `.detail-card` y `.cierre-section` está
puesto a propósito por encima de eso (~92–108px) para que el texto nunca quede debajo de las
rosas. Si cambias el tamaño de `.frame-corner`, ajusta ese padding en la misma proporción.

## Assets gráficos reales (`assets/images/vendor/`)

| Archivo | Uso |
|---|---|
| `sombrero.png` | sombrero charro |
| `rose-single.png` | rosas que flanquean el sobre (hero) |
| `envelope-seal.png` | sobre con sello de cera en forma de herradura |
| `frame-formal-*.png`, `frame-ceremonia-*.png`, `frame-recepcion-*.png`, `frame-cierre-*.png` | marcos de rosas por esquina (ver arriba) |
| `nino-dios-arco.png` | foto real del Niño Dios bajo el arco floral |
| `herradura.png` | separador de herradura entre Agenda y Ceremonia (sobre fondo **crema** — el dibujo es marino, se pierde sobre fondo oscuro) |
| `santuario.png` | foto real del Santuario Señor de las Misericordias |
| `recepcion.png` | foto real del lugar de recepción |
| `emblema-xv.png` | emblema circular "XV" de cierre |
| `valery-wordmark.png`, `corner-flourish-1.png`, `corner-flourish-2.png`, `rose-garland.png`, `botas-charras.png`, `boton-ubicacion.png` | ya no se usan en este layout (se quedan en la carpeta por si los quieres reincorporar) |

**No se usa** la imagen de calendario del sitio original (genérica, de "Octubre **2025**" —
año equivocado). El calendario es una grilla real de octubre 2026 en HTML/CSS, con el 10
correctamente marcado como sábado.

**Optimización pendiente:** las imágenes vienen sin comprimir. Antes de publicar en serio,
pásalas por [squoosh.app](https://squoosh.app) o TinyPNG (e idealmente a WebP), y comprime
`assets/video/hero-loop.mp4` (HandBrake o `ffmpeg -crf 28`) — el peso total del sitio hoy
es considerable, lo cual es mucho para datos móviles.

## Countdown y calendario

- El **countdown** (`Días : Horas : Minutos : Segundos`) es JS puro, calculado en vivo cada
  segundo contra `CONFIG.eventDateTime`.
- El **calendario** de octubre 2026 está escrito directo en el HTML (no depende de JS ni de
  una imagen), así que nunca se puede desincronizar del countdown.

Si cambias la fecha del evento, edita **una sola vez** `CONFIG.eventDateTime` en `js/main.js`
— el countdown se ajusta solo. Si además cambia el mes/año, hay que regenerar a mano la
grilla `.calendar__grid` en `index.html`.

## Ubicaciones y hora de la recepción

Edita el bloque `CONFIG` al inicio de `js/main.js`:

```js
const CONFIG = {
  quinceanera: "Valery",
  eventDateTime: new Date("2026-10-10T11:45:00-06:00"),
  ceremonyAddress: "Santuario del Señor de las Misericordias, San Pedro Actopan, Milpa Alta, Ciudad de México",
  receptionAddress: "Avenida México Poniente 22, San Gregorio Atlapulco, Xochimilco, Ciudad de México",
};
```

- Los botones **"Ver ubicación"** arman un link real de Google Maps a partir de
  `ceremonyAddress` / `receptionAddress`. Si tienes el link exacto (coordenadas o Place ID),
  puedes pegarlo directo en `setupMapLinks()` para mayor precisión.
- **Hora de la recepción:** no aparece en el sitio todavía — busca el comentario `TODO` en
  `index.html` (sección Recepción) y agrégala cuando el cliente la confirme.

## Correcciones de contenido aplicadas (respecto al sitio original del proveedor)

- **Fecha consistente:** el original marcaba el 10 en el calendario pero el texto decía
  "Sábado 22" (y "10 Ocubre 2026" con typo en el hero). Aquí la fecha es una sola en todo el
  sitio, calendario incluido: **Sábado 10 de Octubre de 2026** (10 de octubre de 2026 sí es
  sábado, verificado).
- **Ubicación de la recepción:** "San Gregario Atlapulco" → "San Gregorio Atlapulco".
- **Texto de invitación:** "LA FAM: Rodriguez Serralde" → "La familia Rodríguez Serralde".
- **Nombre del santuario:** "Santuario Señor de las Misericordias" → "Santuario del Señor de
  las Misericordias" (falta el "del").
- **Sin texto duplicado** en el DOM (el original repetía casi todos los párrafos dos veces).
- **Calendario real** en vez de la imagen decorativa con el año equivocado.

## Duda de contenido pendiente

El subtítulo **"Un vestido de besos"** (debajo de "Escucha mi canción", parece ser el nombre
de la canción) no estaba en el contenido original del cliente — hay un comentario en
`index.html` marcándolo para confirmar si se queda o se quita.

## Despliegue

Sitio 100% estático — funciona en Vercel, Netlify, GitHub Pages o cualquier hosting simple,
sin build command ni variables de entorno. Antes de publicar, comprime imágenes y video
(ver nota arriba) y agrega la hora de la recepción.
