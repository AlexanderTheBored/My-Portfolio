// itc-notes.js
// Handles flip cards and the lesson folder tab on ITC notes pages

document.addEventListener("DOMContentLoaded", () => {
  // 1. Flip cards (cheat sheet and others)
  const flipCards = document.querySelectorAll("[data-card-flip]");

  // Flashcard sets per lesson
  const flashcardSets = {
    "lesson-1": [
      {
        title: "Data",
        body:
          "Raw, unprocessed facts with no context or meaning yet. " +
          "Examples: numbers like 18, 25, 9, 10, names, dates, sensor readings."
      },
      {
        title: "Information",
        body:
          "Data that has been processed, organized, or labeled so it answers basic " +
          "questions such as \"What happened\" or \"When did it happen\". Example: a grade " +
          "table summarizing your quiz and project scores."
      },
      {
        title: "Knowledge",
        body:
          "Understanding and insight gained from analyzing information and connecting it " +
          "with experience. Example: noticing quiz scores drop when tests are strictly timed " +
          "and deciding to practice under time pressure."
      },
      {
        title: "Flow to memorize",
        body:
          "Data → processed → Information → analyzed → Knowledge → used for Action. " +
          "Raw input becomes organized information, then human understanding, then decisions."
      },
      {
        title: "One sentence definitions",
        body:
          "Data is raw facts. Information is processed data with context. " +
          "Knowledge is interpreted information that supports better decisions."
      },
      {
        title: "Why it matters in IT",
        body:
          "Databases store data, systems transform it into information, and people use " +
          "knowledge to choose actions in business, education, and everyday life."
      }
    ],

    "lesson-2": [
      {
        title: "Artificial Intelligence (AI)",
        body:
          "AI builds systems that perform tasks requiring human-like intelligence, such as " +
          "recognizing faces, understanding speech, translating text, or making recommendations."
      },
      {
        title: "Machine Learning",
        body:
          "A branch of AI where systems learn patterns from data and improve over time instead " +
          "of being manually programmed for every situation."
      },
      {
        title: "Cybersecurity",
        body:
          "The field focused on protecting computers, networks, and data from threats like " +
          "malware, hacking, phishing, and data breaches."
      },
      {
        title: "AI + Security",
        body:
          "AI helps detect suspicious patterns and attacks faster, while cybersecurity protects " +
          "AI systems and their data from being stolen or manipulated."
      },
      {
        title: "Why these two matter",
        body:
          "AI makes systems smarter and more efficient. Cybersecurity keeps those systems safe " +
          "so that people can trust them in banking, communication, and daily life."
      }
    ],

    "lesson-3": [
      {
        title: "Electronic Health Records (EHRs)",
        body:
          "Digital versions of patient records that store history, lab results, allergies, and " +
          "treatments in one place for quick and safe access."
      },
      {
        title: "Medical Imaging",
        body:
          "Computer systems power X-ray, CT, MRI, and ultrasound machines, processing images " +
          "so doctors can see inside the body more clearly."
      },
      {
        title: "Patient Monitoring",
        body:
          "Heart rate, oxygen level, and blood pressure monitors send continuous data to " +
          "central systems that can alert staff when values become unsafe."
      },
      {
        title: "Telemedicine",
        body:
          "Technology that allows patients to consult doctors via video calls, receive digital " +
          "prescriptions, and get follow-up care without always visiting the hospital."
      },
      {
        title: "Why computers matter in healthcare",
        body:
          "Computer systems make healthcare faster, more accurate, and more organized, helping " +
          "staff deliver safer and more accessible patient care."
      }
    ],

    "lesson-4": [
      {
        title: "Algorithm",
        body:
          "A step-by-step procedure for solving a problem. In a vending machine, the algorithm " +
          "controls how money, product selection, and change handling work."
      },
      {
        title: "Pseudocode",
        body:
          "A plain-language description of an algorithm that looks like code but ignores exact " +
          "syntax. It focuses on clear steps and decisions (IF, ELSE, WHILE)."
      },
      {
        title: "Flowchart",
        body:
          "A visual diagram using symbols (ovals, rectangles, diamonds) and arrows to show the " +
          "sequence of steps and decision points in an algorithm."
      },
      {
        title: "Key vending machine steps",
        body:
          "Insert money → Select product → Check stock → Check payment → Dispense item and " +
          "change → Update stock → Go back to idle state."
      },
      {
        title: "Why IT students study this",
        body:
          "The vending machine algorithm trains you to think logically, cover all cases, and " +
          "communicate system behavior before writing real code."
      }
    ],

    "lesson-5": [
      {
        title: "Number systems",
        body:
          "A way of representing numbers using a base and a set of symbols. Decimal is base 10, " +
          "binary is base 2, and hexadecimal is base 16."
      },
      {
        title: "Decimal 25 to binary",
        body:
          "Repeated division by 2: 25, 12, 6, 3, 1 with remainders 1, 0, 0, 1, 1. " +
          "Read remainders from bottom to top to get 11001₂."
      },
      {
        title: "Check the binary",
        body:
          "11001₂ = 1·16 + 1·8 + 0·4 + 0·2 + 1·1 = 16 + 8 + 1 = 25. This confirms the binary " +
          "conversion is correct."
      },
      {
        title: "Decimal 25 to hex",
        body:
          "Divide by 16: 25 ÷ 16 = 1 remainder 9. The quotient is the sixteens place and the " +
          "remainder is the ones place, giving 19₁₆."
      },
      {
        title: "Key idea",
        body:
          "Binary uses powers of 2 and only digits 0 and 1. Hex uses powers of 16 and digits 0 " +
          "to 9 plus A to F, which makes it a compact way to write binary."
      },
      {
        title: "One sentence answer",
        body:
          "Decimal 25 is equal to 11001 in binary and 19 in hexadecimal, which shows how the " +
          "same value can be written in different number systems."
      }
    ],

  // LESSON 6 - Application software
  "lesson-6": [
    {
      title: "Application software",
      body:
        "Programs that help users perform specific tasks such as writing, calculating, " +
        "communicating, or designing."
    },
    {
      title: "General purpose applications",
      body:
        "Flexible tools that can be used in many situations, like word processors, " +
        "spreadsheets, presentation software, and email clients."
    },
    {
      title: "Specialized applications",
      body:
        "Software for a specific industry or task, such as accounting systems, Hospital " +
        "Information Systems, CAD software, or Learning Management Systems."
    },
    {
      title: "Desktop, web, and mobile apps",
      body:
        "Desktop apps are installed on a PC, web apps run in a browser, and mobile apps run " +
        "on phones or tablets. Many tools now offer more than one version."
    },
    {
      title: "Why it matters",
      body:
        "Choosing the right application software affects productivity, collaboration, and " +
        "how easily people can complete school or office work."
    },
    {
      title: "Exam line",
      body:
        "Application software includes both general purpose tools and specialized programs " +
        "that make computer hardware useful for real world tasks."
    }
  ],

  "lesson-7": [
  {
    title: "IPOS cycle",
    body:
      "IPOS stands for Input, Process, Output, and Storage. Every computer task follows " +
      "these four stages."
  },
  {
    title: "Input devices",
    body:
      "Devices that send data into the computer, such as the keyboard, mouse, touchscreen, " +
      "scanner, microphone, and camera."
  },
  {
    title: "Processing components",
    body:
      "CPU, motherboard, system bus, chipset, and RAM work together to perform calculations, " +
      "follow instructions, and move data inside the system."
  },
  {
    title: "Output devices",
    body:
      "Hardware that shows the results of processing, including monitors, speakers, printers, " +
      "and projectors."
  },
  {
    title: "Storage devices",
    body:
      "HDDs, SSDs, flash drives, and memory cards keep data for future use. Permanent storage " +
      "keeps files when power is off, while RAM is temporary."
  },
  {
    title: "One sentence answer",
    body:
      "The IPOS model shows how input, processing, output, and storage devices work together " +
      "so a computer can receive data, transform it, show results, and save information."
  }
],

"lesson-8": [
  {
    title: "Utility software",
    body:
      "System software that helps monitor, maintain, and protect the computer, working " +
      "together with the operating system."
  },
  {
    title: "Antivirus utilities",
    body:
      "Programs that scan files and programs for malware, block suspicious behavior, and " +
      "help protect the system from attacks."
  },
  {
    title: "File and disk utilities",
    body:
      "Tools such as disk cleanup, disk check, file management, and file compression that " +
      "organize storage and free up space."
  },
  {
    title: "Backup and recovery",
    body:
      "Utilities that create copies of important files or whole drives and help restore " +
      "data after errors, failures, or accidental deletion."
  },
  {
    title: "Optimization and monitoring",
    body:
      "Task managers and system information tools that show resource usage and help tune " +
      "startup programs and settings."
  },
  {
    title: "One sentence answer",
    body:
      "Utility software supports the operating system by protecting, cleaning, and " +
      "maintaining the computer so it stays secure and efficient."
  }
],

"lesson-9": [
  {
    title: "Student information database",
    body:
      "A structured system that stores and manages student records for a school in an " +
      "organized and consistent way."
  },
  {
    title: "Tables, records, fields",
    body:
      "Tables group related data, each row is a record for one student, and each column is " +
      "a field such as name, program, or contact number."
  },
  {
    title: "Key student fields",
    body:
      "Typical fields include Student ID, full name, birthdate, program, year level, " +
      "section, contact details, and guardian information."
  },
  {
    title: "Primary key",
    body:
      "A field such as Student ID that uniquely identifies each record and prevents " +
      "duplicate or confusing entries in the table."
  },
  {
    title: "Relationships",
    body:
      "Other tables like grades or payments use the Student ID as a foreign key so the " +
      "system can link all records that belong to the same student."
  },
  {
    title: "One sentence answer",
    body:
      "A student information database uses tables, keys, and clear data fields to keep " +
      "school records accurate, secure, and easy to search or report."
  }
],

"lesson-10": [
  {
    title: "Network topology",
    body:
      "The way devices and cables are arranged in a network and the path that data " +
      "follows between them."
  },
  {
    title: "Star topology",
    body:
      "All devices connect to a central switch or hub. Easy to add devices and easier " +
      "to troubleshoot, but if the central device fails the whole network goes down."
  },
  {
    title: "Bus topology",
    body:
      "All devices share one main cable called the backbone. Uses less cable and can be " +
      "cheap for very small networks, but one cable fault can stop the whole network."
  },
  {
    title: "Ring topology",
    body:
      "Each device connects to two neighbors forming a loop. Data travels around the " +
      "ring. A single break can affect communication unless there is a backup path."
  },
  {
    title: "Mesh topology",
    body:
      "Devices have multiple paths between them. Very reliable because traffic can use " +
      "alternate routes if one link fails, but it is more expensive and complex."
  },
  {
    title: "One sentence answer",
    body:
      "Topologies like star, bus, ring, and mesh each offer different balances of cost, " +
      "performance, and reliability for a given network."
  }
],

"lesson-11": [
  {
    title: "Ethical issue: data privacy",
    body:
      "Organizations collect large amounts of personal data, and misuse or leaks can cause " +
      "identity theft, fraud, harassment, or loss of trust."
  },
  {
    title: "Data misuse and over-collection",
    body:
      "Some systems collect more data than necessary or fail to explain why data is collected. " +
      "Poor security practices make leaks more likely."
  },
  {
    title: "Privacy & confidentiality",
    body:
      "The IT Code of Ethics requires protecting personal data, limiting access only to authorized " +
      "people, and never using confidential information for personal gain."
  },
  {
    title: "Integrity & security",
    body:
      "Professionals must apply strong security controls, update systems regularly, and defend " +
      "against unauthorized access or vulnerabilities."
  },
  {
    title: "Transparency",
    body:
      "Users should be informed about what data is collected, how it will be used, and why — allowing " +
      "informed consent and building trust."
  },
  {
    title: "Accountability",
    body:
      "If a breach happens, ethical behavior includes reporting it quickly, notifying affected users, " +
      "cooperating with investigations, and fixing the cause."
  },
  {
    title: "One sentence answer",
    body:
      "The IT Code of Ethics addresses data privacy by promoting confidentiality, transparency, " +
      "security, and accountability in handling personal information."
  }
],

"lesson-12": [
  {
    title: "Basic HTML skeleton",
    body:
      "A simple page starts with <!DOCTYPE html>, then <html>, a <head> section with a " +
      "<title>, and a <body> that contains the visible content."
  },
  {
    title: "Headings",
    body:
      "Use <h1> to <h6> to define the structure of the page. <h1> is usually your name, " +
      "and <h2> marks sections like About Me, Skills, and Contact."
  },
  {
    title: "Paragraphs",
    body:
      "<p> tags hold short blocks of text that describe who you are, what you study, and " +
      "your interests or goals."
  },
  {
    title: "Lists for skills and contact",
    body:
      "Unordered lists with <ul> and <li> are ideal for listing skills, tools, and " +
      "contact information in a clean and scannable way."
  },
  {
    title: "Example layout",
    body:
      "A common pattern is: <h1>Your Name</h1>, <h2>About Me</h2> with a paragraph, " +
      "<h2>Skills</h2> with a list, and <h2>Contact</h2> with another list."
  },
  {
    title: "One sentence answer",
    body:
      "A simple personal webpage uses a basic HTML structure with headings, paragraphs, " +
      "and lists to present information clearly and logically."
  }
],

"lesson-13": [
  {
    title: "What CSS does",
    body:
      "CSS controls how a webpage looks by setting colors, fonts, spacing, and layout, " +
      "while HTML provides the structure and content."
  },
  {
    title: "Selectors, properties, values",
    body:
      "A CSS rule has a selector that chooses elements and declarations that pair a " +
      "property such as color or font-size with a value."
  },
  {
    title: "Colors and fonts",
    body:
      "Properties like color, background-color, font-family, and font-size define the " +
      "text style and overall color scheme of the page."
  },
  {
    title: "Spacing and layout",
    body:
      "Margin and padding add space around and inside elements, and layout related " +
      "properties such as display and text-align help organize content."
  },
  {
    title: "External style sheet",
    body:
      "An external .css file is linked in the head section so multiple HTML pages " +
      "can share one consistent design."
  },
  {
    title: "One sentence answer",
    body:
      "A CSS style sheet uses selectors with properties and values to define the " +
      "visual design of a webpage, including its colors, fonts, spacing, and layout."
  }
],

"lesson-14": [
  {
    title: "Generative AI",
    body:
      "AI systems that can create new content such as text, images, audio, or code by " +
      "learning patterns from large datasets."
  },
  {
    title: "Impact in healthcare",
    body:
      "Helps summarize medical records, draft reports, and support diagnosis or research, " +
      "but outputs must be reviewed by qualified professionals."
  },
  {
    title: "Impact in education",
    body:
      "Acts as a study assistant that can explain topics, generate practice questions, " +
      "and personalize learning, but may encourage cheating if misused."
  },
  {
    title: "Misinformation risk",
    body:
      "Generative AI can produce confident sounding but incorrect answers, so important " +
      "information should always be verified."
  },
  {
    title: "Privacy and bias",
    body:
      "Training uses large datasets that may contain sensitive or biased data, so systems " +
      "must protect privacy and work to reduce unfair outputs."
  },
  {
    title: "One sentence answer",
    body:
      "Generative AI offers powerful benefits in fields like healthcare and education, " +
      "but it raises ethical concerns about misinformation, privacy, bias, and responsible use."
  }
]

  };





  flipCards.forEach((card) => {
    const cheatsheetKey = card.getAttribute("data-cheatsheet");
    const flashcards = cheatsheetKey ? flashcardSets[cheatsheetKey] : null;

    // If this card has a defined flashcard set, use the sequenced flashcard behavior
    if (flashcards && flashcards.length > 0) {
      const titleEl = card.querySelector(".card-title");
      const listEl = card.querySelector(".notes-cheatsheet-list");

      if (!titleEl || !listEl) return;

      let currentIndex = 0;
      let isFlipped = false;

      function showCurrentFlashcard() {
        const cardData = flashcards[currentIndex];
        titleEl.textContent = cardData.title;
        listEl.innerHTML = `<li>${cardData.body}</li>`;
      }

      // Show the first card on load so the back is never blank
      showCurrentFlashcard();

      const handleToggle = (event) => {
        if (event.type === "keydown") {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
        }

        isFlipped = !isFlipped;
        card.classList.toggle("is-flipped", isFlipped);

        // When flipping back to the front, move to the next card in order
        if (!isFlipped) {
          currentIndex = (currentIndex + 1) % flashcards.length;
          setTimeout(showCurrentFlashcard, 260); // match CSS flip duration
        }
      };

      // Mouse / tap
      card.addEventListener("click", handleToggle);
      // Keyboard accessibility: Enter / Space
      card.addEventListener("keydown", handleToggle);
    } else {
      // Default behavior for flip cards without a flashcard set
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

  // 2. Lesson folder tab (unchanged)
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
