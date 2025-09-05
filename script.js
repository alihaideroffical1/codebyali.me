// Mobile menu toggle
const menuToggle = document.getElementById('menu_toggle');
const mobileMenu = document.getElementById('mobile_menu');
const closeMenuBtn = document.getElementById('close_menu');

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

closeMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});

// Close mobile menu when menu items are clicked
document.querySelectorAll('.mobile_menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Reveal animation on scroll
window.addEventListener('scroll', reveal);

function reveal() {
    let reveals = document.querySelectorAll('.reveal')
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active')
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Typewriter effect
const typingText = document.querySelector('.typing-text');
const textsToType = [
    "MERN Stack Developer",
    "Frontend Specialist",
    "UI/UX Enthusiast",
    "JavaScript Expert"
];
let textIndex = 0;
let charIndex = 0;
let speed = 100;

function typeWriter() {
    const currentText = textsToType[textIndex];
    
    if (charIndex < currentText.length) {
        typingText.innerHTML += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    } else {
        // Wait before deleting
        setTimeout(deleteText, 1500);
    }
}

function deleteText() {
    const currentText = textsToType[textIndex];
    
    if (charIndex > 0) {
        typingText.innerHTML = currentText.substring(0, charIndex-1);
        charIndex--;
        setTimeout(deleteText, speed/2);
    } else {
        // Move to next text
        textIndex = (textIndex + 1) % textsToType.length;
        setTimeout(typeWriter, 500);
    }
}

// Start typewriter effect when page loads
window.addEventListener('load', typeWriter);

// Toggle map visibility
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// Back to top button
const toTop = document.querySelector('.to_top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        toTop.classList.add('top_active');
    } else {
        toTop.classList.remove('top_active'); // Fixed: removed the dot
    }
});
// Cookie consent functionality
document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieCustomize = document.getElementById('cookieCustomize');
    
    // Check if cookie consent elements exist
    if (!cookieConsent || !cookieAccept || !cookieCustomize) {
        console.error('Cookie consent elements not found');
        return;
    }
    
    // Check if user has already provided consent
    const hasConsent = localStorage.getItem('cookieConsent');
    
    // Create customization panel
    const customizePanel = document.createElement('div');
    customizePanel.className = 'cookie_customize_panel';
    customizePanel.style.display = 'none'; // Hide by default
    customizePanel.style.position = 'fixed';
    customizePanel.style.bottom = '0';
    customizePanel.style.left = '0';
    customizePanel.style.width = '100%';
    customizePanel.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    customizePanel.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
    customizePanel.style.zIndex = '1000';
    customizePanel.style.backdropFilter = 'blur(10px)';
    customizePanel.innerHTML = `
        <div class="cookie_content" style="max-width: 800px; margin: 0 auto;">
            <div class="cookie_header">
                <i class='bx bx-cog'></i>
                <h4>Cookie Preferences</h4>
            </div>
            <p>Please select which cookies you want to accept:</p>
            <div class="cookie_options">
                <div class="cookie_option">
                    <input type="checkbox" id="necessary" checked disabled>
                    <label for="necessary">Necessary (Required)</label>
                    <p class="option_desc">Essential for website functionality</p>
                </div>
                <div class="cookie_option">
                    <input type="checkbox" id="analytics">
                    <label for="analytics">Analytics</label>
                    <p class="option_desc">Help us improve our website</p>
                </div>
                <div class="cookie_option">
                    <input type="checkbox" id="marketing">
                    <label for="marketing">Marketing</label>
                    <p class="option_desc">Personalized advertisements</p>
                </div>
            </div>
            <div class="cookie_buttons">
                <button id="cookieSave" class="cookie_btn primary">Save Preferences</button>
                <button id="cookieCancel" class="cookie_btn secondary">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(customizePanel);
    
    const analyticsCookie = document.getElementById('analytics');
    const marketingCookie = document.getElementById('marketing');
    const cookieSave = document.getElementById('cookieSave');
    const cookieCancel = document.getElementById('cookieCancel');
    
    // Only show cookie banner if user hasn't provided consent yet
    if (!hasConsent) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
    
    // Handle accept all button
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        cookieConsent.classList.remove('show');
    });
    
    // Handle customize button
    cookieCustomize.addEventListener('click', () => {
        cookieConsent.classList.remove('show');
        customizePanel.style.display = 'block';
        
        // Load saved preferences if any
        const preferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
        if (preferences.analytics !== undefined) analyticsCookie.checked = preferences.analytics;
        if (preferences.marketing !== undefined) marketingCookie.checked = preferences.marketing;
    });
    
    // Handle save preferences button
    cookieSave.addEventListener('click', () => {
        const preferences = {
            necessary: true,
            analytics: analyticsCookie.checked,
            marketing: marketingCookie.checked
        };
        localStorage.setItem('cookieConsent', 'customized');
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        customizePanel.style.display = 'none';
    });
    
    // Handle cancel button
    cookieCancel.addEventListener('click', () => {
        customizePanel.style.display = 'none';
        cookieConsent.classList.add('show');
    });
});
// Contact form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Create success popup
            const successPopup = document.createElement('div');
            successPopup.className = 'success-popup';
            successPopup.innerHTML = `
                <i class='bx bx-check-circle' style="color: white; background-color: transparent;"></i>
                <span style="color: white; background-color: transparent;">Message sent successfully!</span>
            `;
            
            // Style the popup
            successPopup.style.position = 'fixed';
            successPopup.style.right = '-300px';
            successPopup.style.top = '20px';
            successPopup.style.backgroundColor = '#4CAF50';
            successPopup.style.padding = '15px 25px';
            successPopup.style.borderRadius = '4px';
            successPopup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            successPopup.style.display = 'flex';
            successPopup.style.alignItems = 'center';
            successPopup.style.gap = '10px';
            successPopup.style.zIndex = '1000';
            successPopup.style.transition = 'right 0.3s ease-in-out';
            
            // Add to document
            document.body.appendChild(successPopup);
            
            // Animate in
            setTimeout(() => {
                successPopup.style.right = '20px';
            }, 10);
            
            // Reset form
            contactForm.reset();
            
            // Remove popup after 5 seconds
            setTimeout(() => {
                successPopup.style.right = '-300px';
                setTimeout(() => {
                    document.body.removeChild(successPopup);
                }, 300);
            }, 5000);
        });
    }
});
