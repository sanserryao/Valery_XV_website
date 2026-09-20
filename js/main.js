/* ==========================================================================
   Mis XV — Valery
   Configuración editable + interacciones (scroll reveal, música, countdown, RSVP)
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIG — edita esto para personalizar el sitio.
   -------------------------------------------------------------------------- */
const CONFIG = {
  quinceanera: "Valery",

  // Fecha y hora del evento (zona horaria Ciudad de México, UTC-6 todo el año).
  // Se usa para el countdown en vivo de "Agenda la fecha".
  eventDateTime: new Date("2026-10-10T11:45:00-06:00"),

  // Direcciones reales — se usan para armar los botones "Ver ubicación" (Google Maps).
  ceremonyAddress: "Santuario Señor de las Misericordias, San Pedro Actopan, Ciudad de México",
  receptionAddress: "Avenida México Poniente 22, San Gregorio Atlapulco, Ciudad de México",

  // Método de confirmación: "whatsapp" (recomendado, no necesita servidor)
  // o "formspree" (requiere crear un formulario en https://formspree.io).
  rsvpMethod: "whatsapp",

  // EDITA este número con lada de país + lada local, sin "+", sin espacios ni guiones.
  // Ejemplo México: 521 5512345678
  whatsappNumber: "5215512345678",

  // Endpoint de Formspree, solo se usa si rsvpMethod = "formspree".
  formspreeEndpoint: "",
};

document.addEventListener("DOMContentLoaded", () => {
  setupScrollReveal();
  setupMusicButton();
  setupRsvpButton();
  setupMapLinks();
  setupCountdown();
  setupHeroVideo();
});

/* --------------------------------------------------------------------------
   Video de fondo del hero — refuerza el autoplay apenas carga la página.
   El atributo autoplay basta en la mayoría de los navegadores, pero algunos
   webviews de Android/iOS lo ignoran si el video no está completamente listo;
   aquí se reintenta con .play() en cuanto hay suficientes datos, y de nuevo
   si el usuario vuelve a la pestaña con el video pausado.
   -------------------------------------------------------------------------- */
function setupHeroVideo() {
  const video = document.getElementById("heroVideo");
  if (!video) return;

  const tryPlay = () => {
    const attempt = video.play();
    if (attempt && attempt.catch) {
      attempt.catch(() => {
        console.warn("El navegador bloqueó el autoplay del video del hero.");
      });
    }
  };

  tryPlay();
  video.addEventListener("loadeddata", tryPlay, { once: true });
  video.addEventListener("canplay", tryPlay, { once: true });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && video.paused) {
      tryPlay();
    }
  });
}

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
   Botón "Escucha mi canción" — doble clic reproduce / pausa
   -------------------------------------------------------------------------- */
function setupMusicButton() {
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("song");
  if (!btn || !audio) return;

  const toggle = () => {
    if (audio.paused) {
      audio.play().catch(() => {
        console.warn(
          "No se pudo reproducir la canción. Agrega el archivo real en assets/audio/cancion.mp3"
        );
      });
    } else {
      audio.pause();
    }
  };

  btn.addEventListener("dblclick", toggle);
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  audio.addEventListener("play", () => {
    btn.setAttribute("aria-pressed", "true");
    btn.setAttribute("aria-label", "Doble clic para pausar la canción");
  });
  audio.addEventListener("pause", () => {
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "Doble clic para reproducir la canción");
  });
}

/* --------------------------------------------------------------------------
   Botones "Ver ubicación" — enlazan a Google Maps con la dirección real
   -------------------------------------------------------------------------- */
function setupMapLinks() {
  const mapsUrl = (address) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const ceremonyLink = document.getElementById("mapCeremonia");
  if (ceremonyLink) ceremonyLink.href = mapsUrl(CONFIG.ceremonyAddress);

  const receptionLink = document.getElementById("mapRecepcion");
  if (receptionLink) receptionLink.href = mapsUrl(CONFIG.receptionAddress);
}

/* --------------------------------------------------------------------------
   Botón "Confirmar asistencia" — arma el link de WhatsApp (o Formspree)
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

/* --------------------------------------------------------------------------
   Countdown en vivo hasta CONFIG.eventDateTime
   -------------------------------------------------------------------------- */
function setupCountdown() {
  const els = {
    days: document.getElementById("cdDays"),
    hours: document.getElementById("cdHours"),
    minutes: document.getElementById("cdMinutes"),
    seconds: document.getElementById("cdSeconds"),
  };
  if (!els.days) return;

  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = CONFIG.eventDateTime.getTime() - Date.now();

    if (diff <= 0) {
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.minutes.textContent = "00";
      els.seconds.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    els.days.textContent = pad(Math.floor(totalSeconds / 86400));
    els.hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    els.minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    els.seconds.textContent = pad(totalSeconds % 60);
  }

  tick();
  setInterval(tick, 1000);
}
