// ============================================
// Smooth scroll-to-section navigation
// ============================================
const navLinks = document.querySelectorAll('[data-link]');
const sections = document.querySelectorAll('.section');
const navToggle = document.getElementById('navToggle');
const navLinksWrap = document.querySelector('.nav__links');

// Click any nav/CTA link with data-link -> smooth scroll to target section
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile menu after navigating
      navLinksWrap.classList.remove('open');
      navToggle.classList.remove('open');
    }
  });
});

// ============================================
// Mobile menu toggle
// ============================================
navToggle.addEventListener('click', () => {
  navLinksWrap.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// ============================================
// Highlight active nav link based on scroll position
// ============================================
const navLinkBySection = {};
document.querySelectorAll('.nav__link').forEach(link => {
  const id = link.getAttribute('href').replace('#', '');
  navLinkBySection[id] = link;
});

const observerOptions = {
  root: null,
  rootMargin: '-45% 0px -45% 0px', // trigger when section is roughly centered
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      Object.values(navLinkBySection).forEach(l => l.classList.remove('active'));
      if (navLinkBySection[id]) {
        navLinkBySection[id].classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ============================================
// Scroll reveal animation for content blocks
// ============================================
const revealTargets = document.querySelectorAll(
  '.about__lead, .about__body, .skill-card, .project-card, .contact__form, .contact__title, .contact__sub'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// Contact form (demo only — no backend wired up)
// ============================================
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = 'Thanks — your message has been noted. (Demo form, not wired to a server.)';
  form.reset();
});

// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();
