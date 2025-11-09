// --- Initialize Lucide Icons ---
// We run this first, but also after new icons are added (e.g., in menu)
lucide.createIcons();

// --- Mobile Menu Toggle ---
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.setAttribute('data-lucide', 'menu');
        } else {
            icon.setAttribute('data-lucide', 'x');
        }
        lucide.createIcons(); // Re-render icons
    });
}

// --- Mobile Menu Link Click Handler ---
// This closes the mobile menu ONLY when a same-page hash link is clicked.
// Clicks to other pages (like contact.html) will navigate and
// reset the menu naturally.
if (mobileMenu) {
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href').startsWith('#')) {
                mobileMenu.classList.add('hidden');
                menuButton.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}


// --- Typing Text Effect (Only for index.html) ---
const typingText = document.getElementById('typing-text');
if (typingText) {
    const roles = [
        'build web applications.', 
        'deploy AI-powered systems.', 
        'ensure software quality.'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 500); // Pause before typing new role
            } else {
                setTimeout(typeEffect, 50); // Deleting speed
            }
        } else {
            // Typing
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000); // Pause after typing role
            } else {
                setTimeout(typeEffect, 100); // Typing speed
            }
        }
    }
    
    // Start typing effect on load
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(typeEffect, 1000);
    });
}

// --- Click to Copy Function (Used on both pages) ---
function copyToClipboard(text, element) {
    // Use execCommand for broader compatibility in iframes
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
        document.execCommand('copy');
        
        // Show "Copied!" message
        const popup = element.querySelector('.copied-popup');
        if (popup) {
            popup.style.opacity = '1';
            setTimeout(() => {
                popup.style.opacity = '0';
            }, 2000); // Hide after 2 seconds
        }

    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textarea);
}