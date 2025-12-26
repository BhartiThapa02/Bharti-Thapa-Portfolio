// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Ensure hero content is visible after scrolling to home
            if (this.getAttribute('href') === '#home') {
                setTimeout(() => {
                    updateHeroVisibility();
                    const heroContent = document.querySelector('.hero-content');
                    if (heroContent) {
                        heroContent.style.opacity = '1';
                    }
                }, 500);
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing Effect for Hero Title (without cursor)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const text = typingElement.textContent.replace('|', '').trim();
    typeWriter(typingElement, text, 100);
}

// Contact Form Handling with FormSubmit
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // FormSubmit will handle the submission automatically
        // After successful submission, it will redirect back to #contact
        // We'll show success message when page loads with success parameter
        
        // Check if URL has success parameter (FormSubmit adds this)
        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('success') === 'true') {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                    // Clean URL
                    window.history.replaceState({}, document.title, window.location.pathname + '#contact');
                }, 3000);
            } else {
                // If no success, keep loading (form is submitting)
                // FormSubmit will redirect back with success parameter
            }
        }, 100);
    });
    
    // Check for success message on page load
    window.addEventListener('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitButton.style.background = '';
                window.history.replaceState({}, document.title, window.location.pathname + '#contact');
            }, 3000);
        }
    });
}

// Parallax Effect for Hero Section - Keep text always visible
function updateHeroVisibility() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroSection = document.getElementById('home');
    
    if (hero && heroSection) {
        const heroContent = hero.querySelector('.hero-content');
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;
        const isInHeroSection = scrolled >= heroTop - 100 && scrolled < heroTop + heroHeight;
        
        if (isInHeroSection) {
            // When in or near hero section, always keep it visible
            if (scrolled <= heroTop + 200) {
                // Apply subtle parallax effect near top
                heroContent.style.transform = `translateY(${Math.min(scrolled * 0.3, 100)}px)`;
                // Keep opacity high - minimum 0.95 for full visibility
                const nextOpacity = Math.max(1 - (scrolled / (window.innerHeight * 2)), 0.95);
                heroContent.style.opacity = nextOpacity;
            } else {
                // Fully visible when scrolled within hero section
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        } else {
            // When scrolled away from hero section, reset to visible
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    updateHeroVisibility();
    // Force visibility on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

window.addEventListener('scroll', updateHeroVisibility);

// Reset hero visibility when navigating to home section
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href="#home"]').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                updateHeroVisibility();
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.opacity = '1';
                }
            }, 300);
        });
    });
    
    // Also handle hash navigation on page load
    if (window.location.hash === '#home' || window.location.hash === '') {
        setTimeout(() => {
            updateHeroVisibility();
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
            }
        }, 100);
    }
});

// Add active class to nav links on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Certificate Link Handler
document.addEventListener('DOMContentLoaded', () => {
    const certLinks = document.querySelectorAll('.cert-link');
    
    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showCertificateMessage();
        });
    });
});

// Show Certificate Message
function showCertificateMessage() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cert-notification';
    notification.innerHTML = `
        <div class="cert-notification-content">
            <div class="cert-notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="cert-notification-text">
                <h3>Course Successfully Completed</h3>
                <p>Certificate under process</p>
            </div>
            <button class="cert-notification-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.cert-notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

// Close notification function
function closeNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Initialize on page load
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.style.opacity = '1';
    
    // Check if dotlottie-wc is loaded
    const dotlottieElement = document.querySelector('dotlottie-wc');
    if (dotlottieElement) {
        dotlottieElement.addEventListener('ready', () => {
            console.log('DotLottie animation loaded successfully');
        });
        dotlottieElement.addEventListener('error', (e) => {
            console.error('DotLottie animation error:', e);
        });
    }
});

