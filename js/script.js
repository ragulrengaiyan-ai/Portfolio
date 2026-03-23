// Utility: Throttle function to limit execution frequency
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

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
    window.addEventListener('resize', throttle(() => {
        updateCarousel(currentIndex);
    }, 100));
});

// Optimized scroll handling
window.onscroll = throttle(function () {
    updateProgressBar();
    highlightNav();
}, 20);

function updateProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height <= 0) {
        document.getElementById("myBar").style.width = "0%";
        return;
    }
    var scrolled = (winScroll / height) * 100;
    // Ensure it doesn't exceed 100% or go below 0%
    scrolled = Math.min(100, Math.max(0, scrolled));
    document.getElementById("myBar").style.width = scrolled + "%";
}

// Scroll spy for navigation
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav');

    let current = "";
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = document.querySelector('header').offsetHeight;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Use a more precise offset (headerHeight + some buffer)
        if (scrollPos >= sectionTop - (headerHeight + 50)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // remove #
        if (href === current) {
            link.classList.add('active');
        }
    });
}


// Local glow effect for skill cards
function setupSkillCardGlow() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', throttle(function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--glow-x', `${x}px`);
            this.style.setProperty('--glow-y', `${y}px`);
            this.style.setProperty('--glow-opacity', '1');
        }, 10));

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


// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    setupSkillCardGlow();
});

