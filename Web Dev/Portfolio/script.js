
// Initialize Lucide icons
lucide.createIcons();

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add('bg-white/60', 'backdrop-blur-xl', 'shadow-sm');
    } else {
        navbar.classList.remove('bg-white/60', 'backdrop-blur-xl', 'shadow-sm');
    }

    lastScroll = currentScroll;
});

// ---- Mobile menu ----
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- Scroll reveal ----
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');

            // Animate skill bars within this element
            const skillFills = el.querySelectorAll('.skill-fill');
            skillFills.forEach(fill => {
                fill.style.width = fill.dataset.width;
                fill.classList.add('active');
            });
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ---- Testimonial Slider ----
const track = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
const totalSlides = 3;

function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-lavender-400', i === currentSlide);
        dot.classList.toggle('bg-lavender-200', i !== currentSlide);
        dot.classList.toggle('w-6', i === currentSlide);
        dot.classList.toggle('w-2.5', i !== currentSlide);
    });
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
});

// Auto-advance
let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

// Pause on hover
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.parentElement.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.classList.add('hidden');
    successMsg.classList.remove('hidden');

    // Re-initialize icons for the success message
    lucide.createIcons();

    setTimeout(() => {
        contactForm.classList.remove('hidden');
        successMsg.classList.add('hidden');
        contactForm.reset();
    }, 4000);
});

// ---- Back to Top ----
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTop.classList.remove('opacity-0', 'translate-y-4');
        backToTop.classList.add('opacity-100', 'translate-y-0');
    } else {
        backToTop.classList.add('opacity-0', 'translate-y-4');
        backToTop.classList.remove('opacity-100', 'translate-y-0');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Active nav link highlight ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-lavender-800', 'font-semibold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-lavender-800', 'font-semibold');
        }
    });
});
