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
const formStatus = document.getElementById('formStatus');

// --- Contact popup (on-screen confirmation shown to whoever submits) ---
const contactPopup = document.getElementById('contactPopup');

function showContactPopup(type, title, text) {
    if (!contactPopup) return;
    const icon = document.getElementById('contactPopupIcon');
    const titleEl = document.getElementById('contactPopupTitle');
    const textEl = document.getElementById('contactPopupText');

    contactPopup.classList.remove('success', 'error');
    contactPopup.classList.add(type);
    if (icon) {
        icon.innerHTML = type === 'success'
            ? '<i class="fas fa-check"></i>'
            : '<i class="fas fa-triangle-exclamation"></i>';
    }
    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;

    contactPopup.classList.add('show');
    contactPopup.setAttribute('aria-hidden', 'false');
}

function hideContactPopup() {
    if (!contactPopup) return;
    contactPopup.classList.remove('show');
    contactPopup.setAttribute('aria-hidden', 'true');
}

if (contactPopup) {
    contactPopup.querySelectorAll('[data-close-popup]').forEach(el => {
        el.addEventListener('click', hideContactPopup);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideContactPopup();
    });
}

function showFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status show ${type}`;
}

function hideFormStatus() {
    if (!formStatus) return;
    formStatus.className = 'form-status';
    formStatus.textContent = '';
}

if (contactForm) {
    const emailInput = contactForm.querySelector('#email');
    const replyToField = contactForm.querySelector('#replyto');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (replyToField && emailInput) {
            replyToField.value = emailInput.value.trim();
        }

        // Capture the sender's name now, before the form is reset.
        const senderName = (contactForm.querySelector('#name')?.value || '').trim();
        const firstName = senderName.split(' ')[0] || 'there';

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        showFormStatus('Sending your message...', 'loading');

        const endpoint = contactForm.getAttribute('action');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(contactForm),
            });

            let data = {};
            try {
                data = await response.json();
            } catch {
                data = {};
            }

            const isSuccess = response.ok && data.success !== 'false' && data.success !== false;

            if (isSuccess) {
                showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                showContactPopup(
                    'success',
                    'Message Sent! 🎉',
                    `Thank you, ${firstName}! Your message has been delivered. I'll get back to you at the email you provided very soon.`
                );
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Unable to send message. Please try again.');
            }
        } catch (err) {
            const errText = err.message === 'Failed to fetch'
                ? 'Network error. Check your connection and try again, or email me directly at bhartithapa6538@gmail.com.'
                : `${err.message} You can also reach me at bhartithapa6538@gmail.com.`;
            showFormStatus(errText, 'error');
            showContactPopup('error', 'Message Not Sent', errText);
            submitButton.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Try Again';
            submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        } finally {
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
            }, 4000);
        }
    });

    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            if (formStatus?.classList.contains('error')) {
                hideFormStatus();
            }
        });
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

// Certificate Modal Handler
document.addEventListener('DOMContentLoaded', () => {
    const certModal = document.getElementById('certModal');
    const certModalImage = document.getElementById('certModalImage');
    const certLinks = document.querySelectorAll('.cert-link[data-cert]');
    const closeBtn = certModal?.querySelector('.cert-modal-close');
    const backdrop = certModal?.querySelector('.cert-modal-backdrop');

    function openCertModal(imageSrc) {
        if (!certModal || !certModalImage) return;
        certModalImage.src = imageSrc;
        certModal.classList.add('show');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        if (!certModal || !certModalImage) return;
        certModal.classList.remove('show');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        certModalImage.src = '';
    }

    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const certSrc = link.getAttribute('data-cert');
            if (certSrc) openCertModal(certSrc);
        });
    });

    closeBtn?.addEventListener('click', closeCertModal);
    backdrop?.addEventListener('click', closeCertModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal?.classList.contains('show')) {
            closeCertModal();
        }
    });
});

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

