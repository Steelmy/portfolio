// ===========================
// Intersection Observer — Active section highlighting
// ===========================
const navLinks = document.querySelectorAll(".nav-link[data-section]");
const sections = document.querySelectorAll("section[id]");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0,
};

function setActiveLink(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("data-section") === sectionId;
    if (isActive) {
      link.classList.add("nav-active");
    } else {
      link.classList.remove("nav-active");
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// ===========================
// Dropdown "Mes Projets"
// ===========================
const dropdownTrigger = document.getElementById("dropdown-trigger");
const dropdownMenu = document.getElementById("dropdown-menu");
const chevronIcon = document.getElementById("chevron-icon");
const dropdownContainer = document.getElementById("dropdown-container");
let dropdownOpen = false;

function openDropdown() {
  dropdownOpen = true;
  dropdownMenu.classList.add("dropdown-open");
  chevronIcon.classList.add("rotate-180");
}

function closeDropdown() {
  dropdownOpen = false;
  dropdownMenu.classList.remove("dropdown-open");
  chevronIcon.classList.remove("rotate-180");
}

dropdownTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  if (dropdownOpen) {
    closeDropdown();
  } else {
    openDropdown();
  }
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdownContainer.contains(e.target)) {
    closeDropdown();
  }
});

// Close dropdown on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDropdown();
});

// ===========================
// Mobile menu
// ===========================
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
let mobileMenuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuOpen = !mobileMenuOpen;

  if (mobileMenuOpen) {
    mobileMenu.classList.add("mobile-open");
    mobileMenuBtn.classList.add("mobile-active");
  } else {
    mobileMenu.classList.remove("mobile-open");
    mobileMenuBtn.classList.remove("mobile-active");
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll("#mobile-menu .mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuOpen = false;
    mobileMenu.classList.remove("mobile-open");
    mobileMenuBtn.classList.remove("mobile-active");
  });
});

// ===========================
// Smooth scroll for nav links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const navbarHeight = document.getElementById("navbar").offsetHeight;
    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  });
});
