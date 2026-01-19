// Project Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('projectTrack');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsNav = document.getElementById('carouselNav');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    const updateCarousel = (index) => {
        // Move track
        track.style.transform = `translateX(-${index * 100}%)`;

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');

        // Update buttons (optional: disable if at ends)
        currentIndex = index;
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });

    // Handle window resize to ensure correct positioning
    window.addEventListener('resize', () => {
        updateCarousel(currentIndex);
    });
});

window.onscroll = function () {
    updateProgressBar();
    highlightNav();
};

function updateProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// Scroll spy for navigation
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav');

    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}



// Global Glowing Comet Trail Effect
document.addEventListener('mousemove', function (e) {
    const x = e.pageX;
    const y = e.pageY;

    // Create trail particle globally
    createTrailParticle(x, y);
});

// Local glow effect for skill cards
function setupSkillCardGlow() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--glow-x', `${x}px`);
            this.style.setProperty('--glow-y', `${y}px`);
            this.style.setProperty('--glow-opacity', '1');
        });

        card.addEventListener('mouseleave', function () {
            this.style.setProperty('--glow-opacity', '0');
        });
    });
}


// Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct position for the dot
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Smooth trailing for the outline
    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor hover effect
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .scroll-top-btn, .carousel-btn, .carousel-dot');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
    });
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('trail-particle');
    document.body.appendChild(particle);

    // Random size for variety
    const size = Math.random() * 8 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Position vertically/horizontally
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Random slight offset to make it look like a spray/tail
    const offset = (Math.random() - 0.5) * 15;
    particle.style.left = `${x + offset}px`;
    particle.style.top = `${y + offset}px`;

    // Remove after animation
    setTimeout(() => {
        particle.remove();
    }, 800);



}

// Scroll Animation Observer for Education Section
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {

    // Observe all animate-on-scroll elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize skill card glow effects
    setupSkillCardGlow();
});

