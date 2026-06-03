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
    const isVisible = section.classList.contains('visible');

    // Hide all year sections
    document.querySelectorAll(".year-section").forEach(sec => sec.classList.remove('visible'));

    // Remove active state from all buttons
    document.querySelectorAll(".year-buttons button").forEach(btn => btn.classList.remove('active'));

    // Show the selected section if it was not visible
    if (!isVisible) {
        section.classList.add('visible');
        // Find the matching button via data-year attribute and set it as active
        const matchingBtn = document.querySelector(`.year-buttons button[data-year="${yearId}"]`);
        if (matchingBtn) {
            matchingBtn.classList.add('active');
        }
    }
}

// Year 2024 shown by default via HTML classes (visible on year-section, active on button)

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
        // Skip non-anchor links (like the CV download link)
        if (!href || !href.startsWith('#')) return;
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

// Easter Egg: Logo Click Counter
(function() {
    let logoClickCount = 0;
    const CLICK_THRESHOLD = 10;
    let clickTimeout;
    
    const logo = document.querySelector('.Logo-Pic');
    
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function(e) {
            e.stopPropagation();
            logoClickCount++;
            
            // Add spin animation
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = 'spin 0.6s ease-in-out';
            }, 10);
            
            // Show click feedback
            showClickFeedback(logoClickCount, CLICK_THRESHOLD);
            
            // Check if threshold reached
            if (logoClickCount === CLICK_THRESHOLD) {
                triggerEasterEgg();
                logoClickCount = 0;
            }
            
            // Reset counter after 5 seconds of inactivity
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                logoClickCount = 0;
                removeClickFeedback();
            }, 5000);
        });
    }
    
    function showClickFeedback(current, total) {
        let feedback = document.getElementById('logo-click-feedback');
        
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'logo-click-feedback';
            feedback.style.cssText = `
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #e84545, #903749);
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                font-size: 0.9rem;
                font-weight: bold;
                z-index: 10000;
                pointer-events: none;
                animation: popIn 0.3s ease-out;
                box-shadow: 0 4px 15px rgba(232, 69, 69, 0.4);
            `;
            document.body.appendChild(feedback);
        }
        
        feedback.textContent = `🎮 ${current}/${total}`;
        feedback.style.opacity = '1';
    }
    
    function removeClickFeedback() {
        const feedback = document.getElementById('logo-click-feedback');
        if (feedback) {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }
    }
    
    function triggerEasterEgg() {
        // Create easter egg message
        const easterEgg = document.createElement('div');
        easterEgg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a2e, #2a2a3e);
            border: 2px solid #e84545;
            color: #e84545;
            padding: 40px 50px;
            border-radius: 15px;
            z-index: 10001;
            text-align: center;
            font-size: 1.3rem;
            font-weight: bold;
            font-family: 'Orbitron', sans-serif;
            box-shadow: 0 0 50px rgba(232, 69, 69, 0.6), inset 0 0 20px rgba(232, 69, 69, 0.2);
            animation: slideInScale 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 500px;
        `;
        
        easterEgg.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 15px;">🚀</div>
            <p>You found the secret!</p>
            <p style="font-size: 1rem; color: #f2f2f2; margin-top: 10px;">Thanks for exploring my portfolio. Keep creating awesome games! 🎮</p>
        `;
        
        document.body.appendChild(easterEgg);
        
        // Remove after 4 seconds
        setTimeout(() => {
            easterEgg.style.animation = 'slideOutScale 0.5s ease-in forwards';
            setTimeout(() => easterEgg.remove(), 500);
        }, 4000);
    }
})();

// Add CSS animations for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
    }
    
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.7);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
    }
    
    @keyframes slideInScale {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotateX(90deg);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotateX(0deg);
        }
    }
    
    @keyframes slideOutScale {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotateX(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotateX(-90deg);
        }
    }
`;
document.head.appendChild(style);
