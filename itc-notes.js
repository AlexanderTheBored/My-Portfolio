// itc-notes.js
// Handles flip cards and the lesson folder tab on ITC notes pages

document.addEventListener("DOMContentLoaded", () => {
  // 1. Flip cards (cheat sheet)
  const flipCards = document.querySelectorAll("[data-card-flip]");

  flipCards.forEach((card) => {
    const toggleFlip = () => {
      card.classList.toggle("is-flipped");
    };

    // Mouse / tap
    card.addEventListener("click", toggleFlip);

    // Keyboard accessibility: Enter / Space
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleFlip();
      }
    });
  });

  // 2. Lesson folder tab
  const lessonTabs = document.querySelectorAll("[data-lesson-toggle]");

  lessonTabs.forEach((tab) => {
    const card = tab.closest(".lesson-card") || tab.closest(".card");
    if (!card) return;

    const panel = card.querySelector(".lesson-panel");
    if (!panel) return;

    // Initial state: open
    panel.classList.remove("is-collapsed");
    tab.setAttribute("aria-expanded", "true");
    const icon = tab.querySelector(".lesson-tab-icon");
    if (icon) icon.textContent = "▾";

    const toggleLesson = () => {
      const expanded = tab.getAttribute("aria-expanded") === "true";
      if (expanded) {
        panel.classList.add("is-collapsed");
        tab.setAttribute("aria-expanded", "false");
        if (icon) icon.textContent = "▸";
      } else {
        panel.classList.remove("is-collapsed");
        tab.setAttribute("aria-expanded", "true");
        if (icon) icon.textContent = "▾";
      }
    };

    // Mouse / tap
    tab.addEventListener("click", toggleLesson);

    // Keyboard support
    tab.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleLesson();
      }
    });
  });
});
