# Md Sahria Jaman Shazib — Portfolio Website

Final project for Introduction to Programming (STEM205), Pacific States University.

**Live site:** https://shahriyajaman007-collab.github.io/

## Files
| File | Purpose |
|---|---|
| `index.html` | Home/About, Projects, Contact sections |
| `resume.html` | Résumé page (printable to PDF) |
| `style.css` | Layout, light/dark themes, mobile menu |
| `script.js` | **All interactive code is here** |

## Interactive feature (script.js)
**Project search + category filter** — `filterProjects()` (lines ~33–70)

1. The visitor types in the search box or clicks a category button (All / Web / Data).
2. An event listener calls `filterProjects()`.
3. A **`for...of` loop** goes through every project card.
4. **`if` conditionals** check whether the card matches the selected category *and* contains the search text.
5. Matching cards are shown, others get the `hidden` class, and the counter updates ("Showing 2 of 3 projects"). If nothing matches, a "No projects match" message appears.

Also included:
- `toggleTheme()` — dark-mode toggle with an `if/else`, saved in localStorage.
- `toggleMenu()` — hamburger menu for phones.

## Issue found during testing
On a phone, tapping a menu link scrolled to the section but the menu stayed open and covered it.
**Fix:** a loop adds a click listener to every nav link that calls `toggleMenu()` if the menu is open.
