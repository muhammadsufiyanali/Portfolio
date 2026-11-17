// ===== Navbar: shadow on scroll + mobile menu =====
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const navToggle = document.getElementById("navToggle");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

// ===== Active link while scrolling =====
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll("a").forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// ===== Typing effect =====
const words = ["websites", "web apps", "browser games", "online stores", "brands that grow"];
const typedEl = document.getElementById("typed");
let wordIndex = 0;
let charIndex = words[0].length;
let deleting = true;

function type() {
  const word = words[wordIndex];
  typedEl.textContent = word.slice(0, charIndex);

  if (deleting) {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
  } else {
    charIndex++;
    if (charIndex > words[wordIndex].length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
  }
  setTimeout(type, deleting ? 45 : 90);
}
setTimeout(type, 1800);

// ===== Reveal on scroll =====
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

// ===== Count-up stats =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      n = Math.min(target, n + step);
      el.textContent = n;
      if (n === target) clearInterval(timer);
    }, 30);
    counterObserver.unobserve(el);
  });
});
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

// ===== Project filters =====
const filterButtons = document.querySelectorAll("#filters button");
const projects = document.querySelectorAll("#projectGrid .project");

filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projects.forEach((p) => {
      p.classList.toggle("hide", filter !== "all" && p.dataset.cat !== filter);
    });
  })
);

// ===== Contact form -> opens email app =====
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const body = `Name: ${f.name.value}\nEmail: ${f.email.value}\n\n${f.message.value}`;
  window.location.href =
    "mailto:muhammadsufiyanali34@gmail.com" +
    "?subject=" + encodeURIComponent(f.subject.value) +
    "&body=" + encodeURIComponent(body);
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
