/* =========================================================
   script.js — Interactive features for Shazib's portfolio
   Author: Md Sahria Jaman Shazib

   FEATURE 1 (main): Project search + category filter
     - Function:     filterProjects()
     - Loop:         for...of over every project card
     - Conditionals: if/else decides whether each card is shown

   FEATURE 2: Dark-mode toggle  -> toggleTheme()
   FEATURE 3: Mobile menu       -> toggleMenu()
   ========================================================= */

// ---------- Grab the page elements we need ----------
const searchBox    = document.getElementById("searchBox");
const filterBtns   = document.querySelectorAll(".filter-btn");
const projects     = document.querySelectorAll(".project");
const resultCount  = document.getElementById("resultCount");
const noResults    = document.getElementById("noResults");
const themeBtn     = document.getElementById("themeBtn");
const menuBtn      = document.getElementById("menuBtn");
const navLinks     = document.getElementById("navLinks");

let activeCategory = "all";   // remembers which category button is selected


/* ---------------------------------------------------------
   FEATURE 1: filterProjects()
   Runs every time the visitor types in the search box or
   clicks a category button. It checks each project card and
   shows only the ones that match BOTH the category and the
   search text.
   --------------------------------------------------------- */
function filterProjects() {
  const searchText = searchBox.value.trim().toLowerCase();
  let visibleCount = 0;

  // LOOP: go through every project card one by one
  for (const card of projects) {
    const category = card.dataset.category;                    // e.g. "web"
    const cardText = (card.textContent + " " + card.dataset.tags).toLowerCase();

    // CONDITIONAL 1: does the card belong to the selected category?
    const categoryMatch = (activeCategory === "all") || (category === activeCategory);

    // CONDITIONAL 2: does the card contain the search words?
    const searchMatch = (searchText === "") || cardText.includes(searchText);

    // CONDITIONAL 3: show the card only if both are true
    if (categoryMatch && searchMatch) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  }

  // Update the message under the filter bar
  if (visibleCount === 0) {
    noResults.hidden = false;
    resultCount.textContent = "";
  } else {
    noResults.hidden = true;
    resultCount.textContent =
      "Showing " + visibleCount + " of " + projects.length +
      (visibleCount === 1 ? " project" : " projects");
  }
}

// Category buttons: mark the clicked one active, then filter
for (const btn of filterBtns) {
  btn.addEventListener("click", function () {
    for (const other of filterBtns) {
      other.classList.remove("active");
    }
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    filterProjects();
  });
}

// Search box: filter on every keystroke
searchBox.addEventListener("input", filterProjects);


/* ---------------------------------------------------------
   FEATURE 2: toggleTheme()
   Switches between light and dark mode and remembers the
   choice so it stays the same on the next visit.
   --------------------------------------------------------- */
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");

  if (isDark) {
    themeBtn.textContent = "☀️";
    themeBtn.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeBtn.textContent = "🌙";
    themeBtn.setAttribute("aria-label", "Switch to dark mode");
  }

  // Save the choice. try/catch because some private browsers block storage.
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (error) {
    // Storage not available — the toggle still works for this visit.
  }
}

themeBtn.addEventListener("click", toggleTheme);

// On page load, restore the saved theme
try {
  if (localStorage.getItem("theme") === "dark") {
    toggleTheme();
  }
} catch (error) { /* ignore */ }


/* ---------------------------------------------------------
   FEATURE 3: toggleMenu()
   Opens/closes the menu on small screens.
   --------------------------------------------------------- */
function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.textContent = isOpen ? "✕" : "☰";
}

menuBtn.addEventListener("click", toggleMenu);

// Close the mobile menu after a link is tapped (fix found during testing:
// the menu used to stay open and cover the section the visitor jumped to)
for (const link of navLinks.querySelectorAll("a")) {
  link.addEventListener("click", function () {
    if (navLinks.classList.contains("open")) {
      toggleMenu();
    }
  });
}


// ---------- Small extras ----------
document.getElementById("year").textContent = new Date().getFullYear();
filterProjects();   // show the initial "Showing 3 of 3 projects" count
