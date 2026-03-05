//Index.js
const rotatingText = document.getElementById('rotating-text');
const titles = ["Researcher", "Developer", "Designer", "Innovator"];
let currentIndex = 0;
let charIndex = 0;
let deleting = false;
let baseText = "";
let delay = 100;
let blinkCount = 0;
const maxBlinks = 3;

function toggleCursor(show) {
    if (show) {
        rotatingText.classList.add('blinking-cursor');
    } else {
        rotatingText.classList.remove('blinking-cursor');
    }
}

function typeText() {
    const currentTitle = titles[currentIndex];

    if (!deleting && charIndex < currentTitle.length) {
        rotatingText.textContent = baseText + currentTitle.substring(0, charIndex + 1);
        charIndex++;
        delay = 100;
        blinkCount = 0;
        toggleCursor(false);
    } else if (deleting && charIndex > 0) {
        rotatingText.textContent = baseText + currentTitle.substring(0, charIndex - 1);
        charIndex--;
        delay = 50;
        toggleCursor(false);
    } else if (charIndex === currentTitle.length && blinkCount < maxBlinks) {
        blinkCount++;
        toggleCursor(true);
        delay = 500;
    } else if (blinkCount >= maxBlinks) {
        deleting = true;
        blinkCount = 0;
        toggleCursor(false);
        delay = 50;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        currentIndex = (currentIndex + 1) % titles.length;
        delay = 500;
        blinkCount = 0;
    }

    setTimeout(typeText, delay);
}

typeText();

// Toggle Year Section Visibility
function toggleYear(yearId) {
    const section = document.getElementById(yearId);
    const isVisible = section.style.display === "block";

    document.querySelectorAll(".year-section").forEach(sec => (sec.style.display = "none"));

    if (!isVisible) section.style.display = "block";
}

// Open link on project card click
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const link = card.getAttribute("data-link");
        if (link) window.open(link, "_blank");
    });
});

// Hamburger menu toggle
(function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
    }
})();

// Smooth scroll for navigation links (with header offset)
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href.startsWith('#')) return;
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});
