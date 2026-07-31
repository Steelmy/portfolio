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
  if(dropdownMenu) dropdownMenu.classList.add("dropdown-open");
  if(chevronIcon) chevronIcon.classList.add("rotate-180");
}

function closeDropdown() {
  dropdownOpen = false;
  if(dropdownMenu) dropdownMenu.classList.remove("dropdown-open");
  if(chevronIcon) chevronIcon.classList.remove("rotate-180");
}

if (dropdownTrigger) {
  dropdownTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (dropdownContainer && !dropdownContainer.contains(e.target)) {
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

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
      if(mobileMenu) mobileMenu.classList.add("mobile-open");
      mobileMenuBtn.classList.add("mobile-active");
    } else {
      if(mobileMenu) mobileMenu.classList.remove("mobile-open");
      mobileMenuBtn.classList.remove("mobile-active");
    }
  });
}

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

    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
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

// ===========================
// GSAP Custom Cursor
// ===========================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate cursor update
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
      ease: "power2.out"
    });
  });

  // Follower delay
  gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    gsap.set(cursorFollower, {
      x: followerX,
      y: followerY
    });
  });

  // Cursor Hover Effects
  const hoverElements = document.querySelectorAll('a, button, .dropdown-item, .nav-link, .screenshot-placeholder, .modal-close');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('cursor-hover');
      cursor.classList.add('cursor-hover-dot');
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('cursor-hover');
      cursor.classList.remove('cursor-hover-dot');
    });
  });
}

// ===========================
// Magnetic Elements
// ===========================
const magneticElements = document.querySelectorAll('.btn, .Btn, #dropdown-trigger');
magneticElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const position = el.getBoundingClientRect();
    const x = e.clientX - position.left - position.width / 2;
    const y = e.clientY - position.top - position.height / 2;
    
    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: "power2.out"
    });
  });
  
  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  });
});
