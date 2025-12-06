// Smooth scroll for buttons with data-scroll-to
document.querySelectorAll("[data-scroll-to]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const target = document.querySelector(btn.getAttribute("data-scroll-to"));
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===================== SCROLL REVEAL =====================

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15, // start when ~15% is visible
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
} else {
  // If motion is reduced or IntersectionObserver not supported, show everything
  document.querySelectorAll(".reveal").forEach((el) =>
    el.classList.add("show")
  );
}

// ===================== BACK TO TOP BUTTON =====================

const backToTop = document.querySelector(".back-to-top");

function toggleBackToTop() {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

window.addEventListener("scroll", toggleBackToTop);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== CLICK-TO-ROTATE STACK CARDS =====================

const stackCards = Array.from(document.querySelectorAll(".stack-card"));
const rotateBtn = document.getElementById("stackRotateBtn");
const stackOrbit = document.querySelector(".stack-orbit");

const roleClasses = [
  "stack-card-main",
  "stack-card-secondary",
  "stack-card-tertiary",
];

if (stackCards.length === 3 && rotateBtn && stackOrbit) {
  let currentFrontIndex = 0; // which card is currently the front one
  let currentRotation = 0;   // total Y rotation of the stack

  function applyStackRoles() {
    stackCards.forEach((card, idx) => {
      // remove all role classes first
      roleClasses.forEach((role) => card.classList.remove(role));

      // determine which role this card should get
      const roleIndex =
        (idx - currentFrontIndex + roleClasses.length) % roleClasses.length;
      card.classList.add(roleClasses[roleIndex]);
    });
  }

  // initial state
  applyStackRoles();

  rotateBtn.addEventListener("click", () => {
    // 1) update which card is front
    currentFrontIndex = (currentFrontIndex + 1) % roleClasses.length;
    applyStackRoles();

    // 2) rotate the stack 180deg around Y for a 3D flip
    currentRotation += 180;
    stackOrbit.style.transform = `rotateY(${currentRotation}deg)`;
  });
}


// ===================== LESSON NOTES SIDEBAR TOGGLER =====================

const notesBurger = document.getElementById("notesBurger");
const notesSidebar = document.getElementById("notesSidebar");
const notesOverlay = document.getElementById("notesOverlay");
const notesClose = document.getElementById("notesClose");

function setNotesOpen(isOpen) {
  if (!notesSidebar || !notesOverlay || !notesBurger) return;

  notesSidebar.classList.toggle("open", isOpen);
  notesOverlay.classList.toggle("open", isOpen);
  notesBurger.classList.toggle("active", isOpen);
  notesBurger.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

if (notesBurger && notesSidebar && notesOverlay) {
  notesBurger.addEventListener("click", () => {
    const isOpen = !notesSidebar.classList.contains("open");
    setNotesOpen(isOpen);
  });

  if (notesClose) {
    notesClose.addEventListener("click", () => setNotesOpen(false));
  }

  notesOverlay.addEventListener("click", () => setNotesOpen(false));

  // Close on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setNotesOpen(false);
    }
  });
}

// ===================== PROJECT FLIP CARDS =====================

document.querySelectorAll("[data-card-flip]").forEach((card) => {
  function toggleFlip() {
    card.classList.toggle("is-flipped");
  }

  card.addEventListener("click", toggleFlip);

  // Keyboard support (Enter / Space)
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  });
});
// ===================== END OF SCRIPT.JS =====================