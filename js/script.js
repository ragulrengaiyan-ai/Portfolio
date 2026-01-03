window.onscroll = function () {
    updateProgressBar();
    animateCircles();
};

function updateProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// Skills data
const skills = [
    { id: "progress-text1", circle: ".progress-ring__circle1", percent: 100 },
    { id: "progress-text2", circle: ".progress-ring__circle2", percent: 100 },
    { id: "progress-text3", circle: ".progress-ring__circle3", percent: 100 },
    { id: "progress-text4", circle: ".progress-ring__circle4", percent: 100 },
    { id: "progress-text5", circle: ".progress-ring__circle5", percent: 100 },
    { id: "progress-text6", circle: ".progress-ring__circle6", percent: 100 },
    { id: "progress-text7", circle: ".progress-ring__circle7", percent: 100 },
    { id: "progress-text8", circle: ".progress-ring__circle8", percent: 100 }
];

let animated = false;

function animateCircles() {
    const skillSection = document.getElementById("skill");
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
        skills.forEach(skill => {
            animateCircle(skill);
        });
        animated = true;
    }
}

function animateCircle(skill) {
    const circle = document.querySelector(skill.circle);
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    let currentPercent = 0;
    const interval = setInterval(() => {
        if (currentPercent >= skill.percent) {
            clearInterval(interval);
        } else {
            currentPercent++;
            document.getElementById(skill.id).innerText = currentPercent + "%";
            const offset = circumference - (currentPercent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
    }, 20);
}

// Hover effect for navigation
const navLinks = document.querySelectorAll('.nav');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.style.color = '');
        e.target.style.color = '#6366f1';
    });
});
