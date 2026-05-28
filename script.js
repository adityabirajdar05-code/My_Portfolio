/* ============================================================
   Aditya Birajdar – Portfolio JavaScript
   Handles: theme toggle, hamburger, scroll reveal, active nav,
   form validation, dynamic year
   ============================================================ */

/* ---------- Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", next);
});

/* ---------- Mobile Hamburger Menu ---------- */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close menu when a link is clicked (mobile UX)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ---------- Active Nav Link on Scroll ---------- */
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute("id");
  });

  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
  });
});

/* ---------- Scroll Reveal Animations ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Contact Form Validation ---------- */
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

function showError(id, msg) { document.getElementById(id).textContent = msg; }
function clearErrors() {
  ["err-name", "err-email", "err-message"].forEach((id) => showError(id, ""));
  successMsg.textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  if (name.length < 2) { showError("err-name", "Please enter your name."); isValid = false; }
  if (!emailRegex.test(email)) { showError("err-email", "Enter a valid email address."); isValid = false; }
  if (message.length < 10) { showError("err-message", "Message should be at least 10 characters."); isValid = false; }

  if (isValid) {
    successMsg.textContent = "✅ Thanks " + name + "! Your message has been sent.";
    form.reset();
  }
});