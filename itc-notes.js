// itc-notes.js
// Handles flip cards and the lesson folder tab on ITC notes pages

document.addEventListener("DOMContentLoaded", () => {
  // 1. Flip cards (cheat sheet and others)
  const flipCards = document.querySelectorAll("[data-card-flip]");

  flipCards.forEach((card) => {
    const isCheatSheet = card.classList.contains("notes-cheatsheet");

    // Special behavior for the Lesson 1 cheat sheet card:
    // flip to show the back, flip again to go back + load a new random flashcard.
    if (isCheatSheet) {
      const titleEl = card.querySelector(".card-title");
      const listEl = card.querySelector(".notes-cheatsheet-list");

      if (!titleEl || !listEl) return;

      const flashcards = [
        {
          title: "Data",
          body:
            "Raw, unprocessed facts with no context or meaning yet. " +
            "Examples: numbers like 18, 25, 9, 10, names, dates, sensor readings."
        },
        {
          title: "Information",
          body:
            "Data that has been processed, organized, or labeled so it " +
            "answers basic questions such as \"What happened\" or \"When did it happen\". " +
            "Example: a grade table summarizing your quiz and project scores."
        },
        {
          title: "Knowledge",
          body:
            "Understanding and insight gained from analyzing information and " +
            "connecting it with experience. Example: noticing quiz scores drop when " +
            "tests are strictly timed and deciding to practice under time pressure."
        },
        {
          title: "Flow to memorize",
          body:
            "Data → processed → Information → analyzed → Knowledge → used for Action. " +
            "Remember: raw input becomes organized information, then human understanding, " +
            "and finally decisions."
        },
        {
          title: "One sentence definitions",
          body:
            "Data is raw facts. Information is processed data with context. " +
            "Knowledge is interpreted information that supports better decisions."
        },
        {
          title: "Exam-ready definition",
          body:
            "“Data is raw and unprocessed facts. Information is data that has been " +
            "processed and given context. Knowledge is interpreted information that " +
            "leads to understanding and better decisions.”"
        },
        {
          title: "Why it matters in IT",
          body:
            "Databases store data, systems transform it into information, and people " +
            "use knowledge to choose actions in business, education, and everyday life."
        }
      ];

      let currentIndex = -1;
      let isFlipped = false;

      function getRandomIndex() {
        if (flashcards.length === 1) return 0;
        let idx;
        do {
          idx = Math.floor(Math.random() * flashcards.length);
        } while (idx === currentIndex);
        return idx;
      }

      function updateFlashcard() {
        const idx = getRandomIndex();
        currentIndex = idx;
        const cardData = flashcards[idx];

        titleEl.textContent = cardData.title;
        // Show as a single bullet so the layout stays neat
        listEl.innerHTML = `<li>${cardData.body}</li>`;
      }

      // Prepare the first random flashcard so the back is never blank
      updateFlashcard();

      const handleToggle = (event) => {
        if (event.type === "keydown") {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
        }

        isFlipped = !isFlipped;
        card.classList.toggle("is-flipped", isFlipped);

        // When we flip back to the front, queue up a new random card
        if (!isFlipped) {
          setTimeout(updateFlashcard, 260); // matches your flip transition timing
        }
      };

      // Mouse / tap
      card.addEventListener("click", handleToggle);
      // Keyboard accessibility: Enter / Space
      card.addEventListener("keydown", handleToggle);
    } else {
      // Default behavior for other flip cards
      const toggleFlip = (event) => {
        if (event.type === "keydown") {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
        }
        card.classList.toggle("is-flipped");
      };

      // Mouse / tap
      card.addEventListener("click", toggleFlip);

      // Keyboard accessibility: Enter / Space
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleFlip(event);
        }
      });
    }
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
