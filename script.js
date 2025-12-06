// ===================== PROJECT TABS INITIALIZER =====================

function initProjectTabs(root = document) {
  const projectTabs = root.querySelectorAll(".project-tab");
  const projectDetails = root.querySelectorAll(".project-detail");

  if (!projectTabs.length || !projectDetails.length) return;

  let currentActiveId = null;

  function setActive(id) {
    currentActiveId = id;

    projectTabs.forEach((tab) => {
      const isActive = tab.dataset.project === id;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    projectDetails.forEach((detail) => {
      const isActive = detail.dataset.projectDetail === id;
      detail.classList.toggle("is-active", isActive);
    });
  }

  function clearActive() {
    currentActiveId = null;

    projectTabs.forEach((tab) => {
      tab.classList.remove("is-active");
      tab.setAttribute("aria-pressed", "false");
    });

    projectDetails.forEach((detail) => {
      detail.classList.remove("is-active");
    });
  }

  projectTabs.forEach((tab) => {
    const id = tab.dataset.project;
    tab.setAttribute("role", "button");
    tab.setAttribute("tabindex", "0");

    function handleToggle() {
      if (currentActiveId === id) {
        // clicking the same tab again -> hide details
        clearActive();
      } else {
        // clicking a different tab -> show its details
        setActive(id);
      }
    }

    tab.addEventListener("click", handleToggle);

    tab.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    });
  });

  // no default active tab
}

// ===================== HTML PARTIAL INCLUDES =====================

document.querySelectorAll("[data-include]").forEach((placeholder) => {
  const file = placeholder.getAttribute("data-include");
  if (!file) return;

  fetch(file)
    .then((resp) => resp.text())
    .then((html) => {
      placeholder.innerHTML = html;

      // Reveal animation
      placeholder.querySelectorAll(".reveal").forEach((el) =>
        el.classList.add("show")
      );

      // If this partial contains projects, wire up its tabs
      initProjectTabs(placeholder);
    })
    .catch((err) => {
      console.error("Include failed for", file, err);
      placeholder.innerHTML =
        "<p style='color:#f97316;font-size:0.8rem;'>Failed to load section.</p>";
    });
});

// ===================== Smooth scroll for buttons with data-scroll-to =====================

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
      threshold: 0.15,
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
} else {
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

// ===================== CLICK-TO-ROTATE STACK CARDS (HERO) =====================

const stackCards = Array.from(document.querySelectorAll(".stack-card"));
const rotateBtn = document.getElementById("stackRotateBtn");

const roleClasses = [
  "stack-card-main",
  "stack-card-secondary",
  "stack-card-tertiary",
];

if (stackCards.length === 3 && rotateBtn) {
  let currentFrontIndex = 0;

  function applyStackRoles() {
    stackCards.forEach((card, idx) => {
      roleClasses.forEach((role) => card.classList.remove(role));
      const roleIndex =
        (idx - currentFrontIndex + roleClasses.length) % roleClasses.length;
      card.classList.add(roleClasses[roleIndex]);
    });
  }

  applyStackRoles();

  rotateBtn.addEventListener("click", () => {
    currentFrontIndex = (currentFrontIndex + 1) % roleClasses.length;
    applyStackRoles();
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

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setNotesOpen(false);
    }
  });
}

// ===================== END OF SCRIPT.JS =====================
