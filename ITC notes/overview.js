// overview.js
//
// This script dynamically generates lesson cards for the ITC notes overview page.
// It also adds simple search functionality so visitors can filter lessons by typing.

// Array of lesson metadata. Each entry defines the lesson number, title,
// subtitle, a short description, the link to the lesson notes, and a badge label.
const lessons = [
  {
    badge: "L1",
    title: "Lesson 1: Data, Information, Knowledge",
    subtitle: "Basic concepts and differences",
    description:
      "Definitions, simple examples, and how raw data turns into something meaningful for decision making.",
    link: "lesson-1-data-information-knowledge.html",
    linkLabel: "Open Lesson 1 notes",
  },
  {
    badge: "L2",
    title: "Lesson 2: Artificial Intelligence",
    subtitle: "What AI is and is not",
    description:
      "Everyday examples of AI, basic categories, and why it matters for IT students.",
    link: "lesson-2-artificial-intelligence.html",
    linkLabel: "Open Lesson 2 notes",
  },
  {
    badge: "L3",
    title: "Lesson 3: Computer Systems in Healthcare",
    subtitle: "From paper charts to digital care",
    description:
      "How hospitals use computer systems for records, scheduling, diagnostics, and communication to make care faster, safer, and more coordinated.",
    link: "lesson-3-healthcare.html",
    linkLabel: "Open Lesson 3 notes",
  },
  {
    badge: "L4",
    title: "Lesson 4: Vending Machine Algorithm",
    subtitle: "Pseudocode and flowchart for a transaction",
    description:
      "Describes the step‑by‑step logic of choosing an item, inserting money, checking balance, dispensing change, and handling invalid input.",
    link: "lesson-4-vending-machine.html",
    linkLabel: "Open Lesson 4 notes",
  },
  {
    badge: "L5",
    title: "Lesson 5: Number Systems: 25 in Binary & Hex",
    subtitle: "Manual conversion walkthrough",
    description:
      "Shows how to convert decimal 25 to binary and hexadecimal step‑by‑step, using division/remainder and place values.",
    link: "lesson-5-number-systems.html",
    linkLabel: "Open Lesson 5 notes",
  },
  {
    badge: "L6",
    title: "Lesson 6: General vs. Specific Purpose Software",
    subtitle: "MS Word vs. custom school systems",
    description:
      "Compares everyday applications used by many people with software built for a particular organization or task.",
    link: "lesson-6-application-software.html",
    linkLabel: "Open Lesson 6 notes",
  },
  {
    badge: "L7",
    title: "Lesson 7: IPOS Devices & Hardware Components",
    subtitle: "Input, Processing, Output, Storage",
    description:
      "Breaks down the basic IPOS model and maps real devices like keyboards, CPUs, monitors, and drives to each stage.",
    link: "lesson-7-ipos-devices.html",
    linkLabel: "Open Lesson 7 notes",
  },
  {
    badge: "L8",
    title: "Lesson 8: Utility Software & Their Benefits",
    subtitle: "Keeping systems fast and secure",
    description:
      "Explores different utilities such as antivirus programs, backup tools, file compression, and disk cleanup utilities.",
    link: "lesson-8-utility-software.html",
    linkLabel: "Open Lesson 8 notes",
  },
  {
    badge: "L9",
    title: "Lesson 9: Student Information Database Design",
    subtitle: "Organizing school records",
    description:
      "Describes how a school’s student database can be structured so administrators, teachers, and staff can quickly find details.",
    link: "lesson-9-student-database.html",
    linkLabel: "Open Lesson 9 notes",
  },
  {
    badge: "L10",
    title: "Lesson 10: Network Topologies",
    subtitle: "Bus, star, ring, mesh, and more",
    description:
      "Explains different ways computers can be connected physically and logically, along with their strengths and weaknesses.",
    link: "lesson-10-network-topologies.html",
    linkLabel: "Open Lesson 10 notes",
  },
  {
    badge: "L11",
    title: "Lesson 11: Ethical Issues in IT",
    subtitle: "How a Code of Ethics guides behavior",
    description:
      "Discusses issues like privacy, piracy, plagiarism, and cyberbullying, and shows how an IT Code of Ethics addresses these concerns.",
    link: "lesson-11-ethical-issues-it-code-of-ethics.html",
    linkLabel: "Open Lesson 11 notes",
  },
  {
    badge: "L12",
    title: "Lesson 12: Simple HTML Page",
    subtitle: "Basic structure of a personal site",
    description:
      "Outlines an HTML file with a head, body, headings, paragraphs, and simple links, forming the skeleton of a personal webpage.",
    link: "lesson-12-html-personal-webpage.html",
    linkLabel: "Open Lesson 12 notes",
  },
  {
    badge: "L13",
    title: "Lesson 13: CSS for Colors, Fonts, and Layout",
    subtitle: "Styling the page to match the design",
    description:
      "Describes how CSS rules can control typography, spacing, and layout, turning plain HTML into a more polished interface.",
    link: "lesson-13-css-stylesheet.html",
    linkLabel: "Open Lesson 13 notes",
  },
  {
    badge: "L14",
    title: "Lesson 14: Generative AI in Healthcare & Education",
    subtitle: "Potential and ethical concerns",
    description:
      "Reflects on how tools like chatbots and image generators could help doctors and students, while also raising questions about bias, misinformation, and fairness.",
    link: "lesson-14-generative-ai.html",
    linkLabel: "Open Lesson 14 notes",
  },
];

/**
 * Creates a lesson card DOM element.
 * @param {Object} lesson - An object describing the lesson.
 * @returns {HTMLElement}
 */
function createLessonCard(lesson) {
  const article = document.createElement("article");
  article.className = "card";

  const inner = document.createElement("div");
  inner.className = "card-inner";
  article.appendChild(inner);

  // Header
  const header = document.createElement("div");
  header.className = "card-header";
  inner.appendChild(header);

  const headerText = document.createElement("div");
  header.appendChild(headerText);

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = lesson.title;
  headerText.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.className = "card-subtitle";
  subtitle.textContent = lesson.subtitle;
  headerText.appendChild(subtitle);

  const badge = document.createElement("span");
  badge.className = "card-badge";
  badge.textContent = lesson.badge;
  header.appendChild(badge);

  // Body
  const body = document.createElement("div");
  body.className = "card-body";
  body.textContent = lesson.description;
  inner.appendChild(body);

  // Footer with link
  const footer = document.createElement("div");
  footer.className = "card-footer";
  inner.appendChild(footer);

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = lesson.link;
  link.innerHTML = `<span>↗</span> ${lesson.linkLabel}`;
  footer.appendChild(link);

  return article;
}

/**
 * Renders the list of lessons to the DOM container.
 * @param {Array} lessonList - An array of lesson objects.
 */
function renderLessons(lessonList) {
  const container = document.getElementById("lessons-container");
  container.innerHTML = ""; // Clear any existing content.
  lessonList.forEach((lesson) => {
    const card = createLessonCard(lesson);
    container.appendChild(card);
  });
}

/**
 * Filters the lessons array based on a search query.
 * @param {string} query - The search string.
 * @returns {Array}
 */
function filterLessons(query) {
  const lower = query.trim().toLowerCase();
  if (!lower) {
    return lessons;
  }
  return lessons.filter((lesson) => {
    return (
      lesson.title.toLowerCase().includes(lower) ||
      lesson.subtitle.toLowerCase().includes(lower) ||
      lesson.description.toLowerCase().includes(lower)
    );
  });
}

// On DOM ready, render all lessons and set up search functionality.
document.addEventListener("DOMContentLoaded", () => {
  renderLessons(lessons);

  const searchInput = document.getElementById("lesson-search");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const filtered = filterLessons(event.target.value);
      renderLessons(filtered);
    });
  }
});