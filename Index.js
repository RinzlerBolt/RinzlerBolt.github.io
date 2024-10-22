//Index.js
const rotatingText = document.getElementById('rotating-text');
const titles = ["Researcher", "Developer", "Designer", "Innovator"];
let currentIndex = 0;
let charIndex = 0;
let deleting = false;
let baseText = "";
let delay = 100; // Delay between characters
let blinkCount = 0;
const maxBlinks = 3; // Number of blinks before deleting
let blinkTimeout = null;

// Function to toggle blinking cursor
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
        // Typing forward
        rotatingText.textContent = baseText + currentTitle.substring(0, charIndex + 1);
        charIndex++;
        delay = 100; // Speed for typing
        blinkCount = 0; // Reset blink count when typing
        toggleCursor(false); // Stop blinking during typing
    } else if (deleting && charIndex > 0) {
        // Deleting backward
        rotatingText.textContent = baseText + currentTitle.substring(0, charIndex - 1);
        charIndex--;
        delay = 50; // Speed for deleting
        toggleCursor(false); // Stop blinking during deleting
    } else if (charIndex === currentTitle.length && blinkCount < maxBlinks) {
        // Finished typing, blink the cursor a few times before deleting
        blinkCount++; // Increment blink count
        toggleCursor(true); // Start blinking
        delay = 500; // Speed of blinking
    } else if (blinkCount >= maxBlinks) {
        // After the max number of blinks, start deleting
        deleting = true;
        blinkCount = 0; // Reset blink count
        toggleCursor(false); // Stop blinking when deleting
        delay = 50; // Speed for deleting
    } else if (deleting && charIndex === 0) {
        // Finished deleting, move to the next word
        deleting = false;
        currentIndex = (currentIndex + 1) % titles.length; // Loop to next title
        delay = 500; // Pause before typing the next word
        blinkCount = 0; // Reset blink count for the next cycle
    }

    setTimeout(typeText, delay); // Recursion with variable delay
}

// Start the typing effect
typeText();

// Toggle Year Section Visibility
function toggleYear(yearId) {
    const section = document.getElementById(yearId);
    const isVisible = section.style.display === "block";

    // Hide all year sections
    document.querySelectorAll(".year-section").forEach(sec => (sec.style.display = "none"));

    // Show the selected section if it was not visible
    if (!isVisible) section.style.display = "block";

}

// Open link on project card click
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const link = card.getAttribute("data-link");
        if (link) window.open(link, "_blank");
    });
});



// // Wait until the page fully loads
// window.onload = () => {
//     const introScreen = document.getElementById('intro-screen');
//     const mainContent = document.getElementById('main-content');

//     // Fade out the intro screen after a short delay
//     setTimeout(() => {
//         introScreen.style.opacity = '0'; // Start fading out

//         // After the fade completes, hide the intro and show the main content
//         introScreen.addEventListener('transitionend', () => {
//             introScreen.style.display = 'none'; // Hide intro
//             mainContent.style.opacity = '1'; // Show main content
//         });
//     }, 2000); // Delay before fading (2 seconds)
// };

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



