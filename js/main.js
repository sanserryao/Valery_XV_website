/* ==========================================================================
   Mis XV — Valery
   Configuración editable + interacciones (scroll reveal, música, RSVP)
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIG — edita esto para conectar la confirmación de asistencia.
   -------------------------------------------------------------------------- */
const CONFIG = {
  quinceanera: "Valery",

  // Método de confirmación: "whatsapp" (recomendado, no necesita servidor)
  // o "formspree" (requiere crear un formulario en https://formspree.io).
  rsvpMethod: "whatsapp",

  // EDITA este número con lada de país + lada local, sin "+", sin espacios
  // ni guiones. Ejemplo México: 521 5512345678
  whatsappNumber: "5215512345678",

  // Endpoint de Formspree, solo se usa si rsvpMethod = "formspree".
  // Ejemplo: "https://formspree.io/f/xxxxxxxx"
  formspreeEndpoint: "",
};

document.addEventListener("DOMContentLoaded", () => {
  setupScrollReveal();
  setupMusicButton();
  setupRsvpButton();
});

/* --------------------------------------------------------------------------
   Animaciones de entrada al hacer scroll (Intersection Observer)
   -------------------------------------------------------------------------- */
function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   Botón "Escucha mi canción" — un clic reproduce / pausa
   -------------------------------------------------------------------------- */
function setupMusicButton() {
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("song");
  if (!btn || !audio) return;

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {
        console.warn(
          "No se pudo reproducir la canción. Agrega el archivo real en assets/audio/cancion.mp3"
        );
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    btn.setAttribute("aria-pressed", "true");
    btn.setAttribute("aria-label", "Pausar canción");
  });
  audio.addEventListener("pause", () => {
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "Reproducir canción");
  });
}

/* --------------------------------------------------------------------------
   Botón "Confirmar asistencia" — arma el link de WhatsApp (o Formspree)
   a partir de CONFIG, para que el botón siempre tenga un destino real.
   -------------------------------------------------------------------------- */
function setupRsvpButton() {
  const link = document.getElementById("rsvpBtn");
  if (!link) return;

  if (CONFIG.rsvpMethod === "formspree" && CONFIG.formspreeEndpoint) {
    link.href = CONFIG.formspreeEndpoint;
    link.removeAttribute("target");
    return;
  }

  const message = `Hola, confirmo mi asistencia a los XV años de ${CONFIG.quinceanera}`;
  link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
