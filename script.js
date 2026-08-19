window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("loader-done");
        setTimeout(() => loader.remove(), 900);
    }, 2100);
});

const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

const particleContainer = document.createElement("div");
particleContainer.className = "particle-container";
document.body.appendChild(particleContainer);

for (let index = 0; index < 82; index += 1) {
    const particle = document.createElement("span");
    const size = Math.random() * 3.5 + 1.5;
    const duration = Math.random() * 12 + 10;
    const drift = (Math.random() - 0.5) * 180;
    const rise = Math.random() * 180 + 180;

    particle.className = "particle";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.color = Math.random() > 0.5 ? "#ff1744" : "#b80024";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.setProperty("--particle-drift", `${drift}px`);
    particle.style.setProperty("--particle-rise", `${rise}px`);
    particle.style.setProperty("--particle-delay", `${Math.random() * -18}s`);
    particle.style.setProperty("--particle-opacity", `${Math.random() * 0.55 + 0.2}`);
    particle.style.animationDuration = `${duration}s`;
    if (index % 7 === 0) particle.classList.add("particle-diamond");
    particleContainer.appendChild(particle);
}

const revealElements = document.querySelectorAll(
    ".info-card, .skill-card, .project-card, .contact-box, .section-title"
);
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        } else {
            entry.target.classList.remove("is-visible");
        }
    });
}, { threshold: 0.15 });
revealElements.forEach((element) => observer.observe(element));

document.querySelectorAll(".skill-card, .info-card, .project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const rotateX = (event.clientY - rect.top - rect.height / 2) / 15;
        const rotateY = (rect.width / 2 - (event.clientX - rect.left)) / 15;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const progressBar = document.querySelector(".scroll-progress span");
const heroContent = document.querySelector(".hero-content");
const scrollIndicator = document.querySelector(".scroll-indicator");
let scrollFrame = null;

const updateScrollEffects = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    progressBar.style.transform = `scaleX(${scrollPercent})`;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const heroOffset = Math.min(window.scrollY * 0.18, 120);
        heroContent.style.transform = `translate3d(0, ${heroOffset}px, 0)`;
        scrollIndicator.style.opacity = Math.max(0, 1 - window.scrollY / 220);
    }

    let current = "";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
    scrollFrame = null;
};

window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
});
updateScrollEffects();

const particleStyle = document.createElement("style");
particleStyle.textContent = `
@keyframes particleFloat {
    0% { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
    15% { opacity: var(--particle-opacity); }
    50% { transform: translate3d(var(--particle-drift), calc(var(--particle-rise) * -0.55), 0) scale(1); }
    85% { opacity: var(--particle-opacity); }
    100% { transform: translate3d(calc(var(--particle-drift) * -0.65), calc(var(--particle-rise) * -1), 0) scale(0.2); opacity: 0; }
}`;
document.head.appendChild(particleStyle);