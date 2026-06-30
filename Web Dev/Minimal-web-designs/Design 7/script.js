// ============================================
// Smooth scroll-to-section navigation
// ============================================
const navLinks = document.querySelectorAll('[data-link]');
const sections = document.querySelectorAll('.section');
const navToggle = document.getElementById('navToggle');
const navLinksWrap = document.getElementById('navLinks');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
// Highlight active nav link while scrolling
// ============================================
const navLinkBySection = {};
document.querySelectorAll('.nav__link').forEach(link => {
  const id = link.getAttribute('href').replace('#', '');
  navLinkBySection[id] = link;
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      Object.values(navLinkBySection).forEach(l => l.classList.remove('active'));
      if (navLinkBySection[id]) navLinkBySection[id].classList.add('active');
    }
  });
}, { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// ============================================
// Animated skill progress bars
// Each .skill-bar has a data-level attribute (e.g. "90").
// Bars fill to that width only once they scroll into view.
// ============================================
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const level = bar.getAttribute('data-level');
      const fill = bar.querySelector('.skill-bar__fill');
      fill.style.width = level + '%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ============================================
// Project filtering
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

// ============================================
// Scroll reveal animation for content blocks
// ============================================
const revealTargets = document.querySelectorAll(
  '.about__lead, .about__body, .skills__col, .project-card, .contact__form, .contact__title, .contact__sub'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

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
