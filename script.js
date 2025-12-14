// ==========================================
// IMPACT SOLUTIONS GROUP - JAVASCRIPT
// Interactive Features & Animations
// ==========================================

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initImpactOSModal();
    initSmoothScroll();
    initDashboardAnimation();
});

// === IMPACTOS MODAL ===
function initImpactOSModal() {
    const modal = document.getElementById('impactosModal');
    
    if (!modal) return;
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeImpactOSDemo();
        }
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'impactosModal') {
            closeImpactOSDemo();
        }
    });
    
    // Handle demo form submission
    const demoForm = document.getElementById('impactosForm');
    if (demoForm) {
        demoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const form = e.target;
            const formMessage = document.getElementById('impactosFormMessage');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Build FormData for Google Forms
            const formData = new FormData();
            formData.append("entry.553120554", form.querySelector('[name="name"]').value);
            formData.append("entry.1092396964", form.querySelector('[name="email"]').value);
            formData.append("entry.628181211", form.querySelector('[name="organization"]').value);
            formData.append("entry.291598409", form.querySelector('[name="role"]').value);
            formData.append("entry.72622795", form.querySelector('[name="needs"]').value || "ImpactOS Demo Request");
            
            const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSc5Jx0eY2UB9AdE51GSt1-UZJbR9vgR41di2gdTgluBSDq6QA/formResponse";
            
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            try {
                await fetch(googleFormURL, {
                    method: "POST",
                    mode: "no-cors",
                    body: formData
                });
                
                formMessage.textContent = "Thank you! We'll be in touch within 24 hours to schedule your ImpactOS demo.";
                formMessage.className = "form-message success";
                
                form.reset();
                
                setTimeout(() => {
                    closeImpactOSDemo();
                    formMessage.textContent = "";
                    formMessage.className = "form-message";
                }, 3000);
            } catch (error) {
                console.error("Demo form submission error:", error);
                formMessage.textContent = "Please email us directly at impactsolutionsgroup25@gmail.com to request a demo.";
                formMessage.className = "form-message error";
            }
            
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        });
    }
}

// Open ImpactOS modal
function openImpactOSDemo() {
    const modal = document.getElementById('impactosModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// Close ImpactOS modal
function closeImpactOSDemo() {
    const modal = document.getElementById('impactosModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear form and message
        const form = document.getElementById('impactosForm');
        const formMessage = document.getElementById('impactosFormMessage');
        if (form) form.reset();
        if (formMessage) {
            formMessage.textContent = "";
            formMessage.className = "form-message";
        }
    }
}

// === NAVIGATION ===
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for non-navigation anchors
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// === DASHBOARD ANIMATION ===
function initDashboardAnimation() {
    const dashboard = document.querySelector('.dashboard-preview');
    
    if (!dashboard) return;

    // Animate bars when dashboard comes into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.animation = 'growBar 1s ease-out forwards';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    observer.observe(dashboard);

    // Pulse metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        setInterval(() => {
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        }, 3000 + (index * 1000));
    });
}

// === CONTACT FORM (Google Forms Integration) ===
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');

        // Get fields SAFELY to avoid JS errors
        const fullName = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const organization = form.querySelector('[name="organization"]');
        const service = form.querySelector('[name="service"]');
        const details = form.querySelector('[name="message"]');

        // Build FormData for Google Forms
        const formData = new FormData();
        formData.append("entry.553120554", fullName ? fullName.value : "");
        formData.append("entry.1092396964", email ? email.value : "");
        formData.append("entry.628181211", organization ? organization.value : "");
        formData.append("entry.291598409", service ? service.value : "");
        formData.append("entry.72622795", details ? details.value : "");

        const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSc5Jx0eY2UB9AdE51GSt1-UZJbR9vgR41di2gdTgluBSDq6QA/formResponse";

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            await fetch(googleFormURL, {
                method: "POST",
                mode: "no-cors",
                body: formData
            });

            formMessage.textContent = "Thank you! Your message has been sent. We'll respond within 24 hours.";
            formMessage.className = "form-message success";

            form.reset();

        } catch (error) {
            console.error("Form submission error:", error);
            formMessage.textContent = "Something went wrong. Please email us directly at impactsolutionsgroup25@gmail.com.";
            formMessage.className = "form-message error";
        }

        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    });
}

// === STATS COUNTER ANIMATION ===

// Animate number from 0 to target
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;

        if (start >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(start));
        }
    }, 16);
}

// Formats numbers back into readable strings
function formatStatNumber(num) {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${num.toLocaleString()}+`;
    if (num < 100 && num > 0) return `${num}%`;
    return num.toString();
}

// Observer triggers animation when stats scroll into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = Number(statNumber.getAttribute('data-value'));

            if (targetValue && !statNumber.classList.contains('animated')) {
                animateCounter(statNumber, targetValue);
                statNumber.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

// Initialize all stats
document.querySelectorAll('.stat-number').forEach(stat => {
    const targetValue = stat.getAttribute('data-value');

    if (!targetValue) return;

    // Start numbers visually at 0
    stat.textContent = '0';

    // Start observing
    statsObserver.observe(stat);
});

// === PARALLAX EFFECTS ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero background parallax
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Dashboard preview parallax
    const dashboard = document.querySelector('.dashboard-preview');
    if (dashboard && scrolled < window.innerHeight) {
        dashboard.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.02}deg)`;
    }
});

// === CARD HOVER EFFECTS ===
document.querySelectorAll('.service-card, .case-study-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }
});

// === PERFORMANCE OPTIMIZATION ===
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === ACCESSIBILITY ENHANCEMENTS ===
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#impactos';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Focus management for modals/menus
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusable = element.querySelectorAll(focusableElements);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// === CONSOLE EASTER EGG ===
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #0EA5E9;');
console.log('%cImpact Solutions Group', 'font-size: 16px; color: #8B5CF6;');
console.log('%cLooking at the code? Nice! We love data-driven professionals.', 'font-size: 14px; color: #94A3B8;');
console.log('%cWant to work together? Contact Amir: impactsolutionsgroup25@gmail.com', 'font-size: 14px; color: #10B981;');

// === EXPORT FUNCTIONS (for potential use) ===
window.ImpactSolutions = {
    showFormMessage: (message, type) => {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
        }
    },
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            window.scrollTo({
                top: section.offsetTop - navHeight,
                behavior: 'smooth'
            });
        }
    },
    openImpactOSDemo: openImpactOSDemo,
    closeImpactOSDemo: closeImpactOSDemo
};

// ==========================================
// WHITE LABELING MODAL FUNCTIONS
// Append to your existing script.js
// ==========================================

/**
 * Open White Label Modal
 */
function openWhiteLabelModal(event) {
    if (event) event.preventDefault();
    
    const modal = document.getElementById('whiteLabelModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Focus trap for accessibility
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }
}

/**
 * Close White Label Modal
 */
function closeWhiteLabelModal() {
    const modal = document.getElementById('whiteLabelModal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

/**
 * Initialize White Label Modal
 */
function initWhiteLabelModal() {
    const modal = document.getElementById('whiteLabelModal');
    
    if (!modal) return;
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeWhiteLabelModal();
        }
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'whiteLabelModal') {
            closeWhiteLabelModal();
        }
    });
    
    // Prevent body scroll when modal open
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style') {
                if (modal.style.display === 'flex') {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });
    
    observer.observe(modal, { attributes: true });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initWhiteLabelModal();
    initLogoAnimation(); // Call logo animation initializer
});

/**
 * Animated Logo Enhancement
 * Adds glow and subtle animation to existing logo
 */
function initLogoAnimation() {
    const logo = document.querySelector('.logo');
    
    if (!logo) return;
    
    // Add hover glow effect
    logo.addEventListener('mouseenter', () => {
        const svg = logo.querySelector('svg');
        if (svg) {
            svg.style.filter = 'drop-shadow(0 0 16px rgba(14, 165, 233, 0.8))';
        }
    });
    
    logo.addEventListener('mouseleave', () => {
        const svg = logo.querySelector('svg');
        if (svg) {
            svg.style.filter = 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.4))';
        }
    });
    
    // Subtle pulse animation
    const svg = logo.querySelector('svg rect');
    if (svg) {
        setInterval(() => {
            svg.style.filter = 'brightness(1.3)';
            setTimeout(() => {
                svg.style.filter = 'brightness(1)';
            }, 600);
        }, 3000);
    }
}

/**
 * Export functions for global access
 */
window.ImpactSolutions = window.ImpactSolutions || {};
window.ImpactSolutions.openWhiteLabelModal = openWhiteLabelModal;
window.ImpactSolutions.closeWhiteLabelModal = closeWhiteLabelModal;

// ==========================================
// END WHITE LABELING MODAL FUNCTIONS
// ==========================================

// ==========================================
// WHITE LABELING MODAL FUNCTIONS
// Append to your existing script.js
// ==========================================

/**
 * Open White Label Modal
 */
function openWhiteLabelModal(event) {
    if (event) event.preventDefault();
    
    const modal = document.getElementById('whiteLabelModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Focus trap for accessibility
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }
}

/**
 * Close White Label Modal
 */
function closeWhiteLabelModal() {
    const modal = document.getElementById('whiteLabelModal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

/**
 * Initialize White Label Modal
 */
function initWhiteLabelModal() {
    const modal = document.getElementById('whiteLabelModal');
    
    if (!modal) return;
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeWhiteLabelModal();
        }
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'whiteLabelModal') {
            closeWhiteLabelModal();
        }
    });
    
    // Prevent body scroll when modal open
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style') {
                if (modal.style.display === 'flex') {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });
    
    observer.observe(modal, { attributes: true });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initWhiteLabelModal();
    initLogoAnimation(); // Call logo animation initializer
});

/**
 * Animated Logo Enhancement
 * Adds glow and subtle animation to existing logo
 */
function initLogoAnimation() {
    const logo = document.querySelector('.logo');
    
    if (!logo) return;
    
    // Add hover glow effect
    logo.addEventListener('mouseenter', () => {
        const svg = logo.querySelector('svg');
        if (svg) {
            svg.style.filter = 'drop-shadow(0 0 16px rgba(14, 165, 233, 0.8))';
        }
    });
    
    logo.addEventListener('mouseleave', () => {
        const svg = logo.querySelector('svg');
        if (svg) {
            svg.style.filter = 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.4))';
        }
    });
    
    // Subtle pulse animation
    const svg = logo.querySelector('svg rect');
    if (svg) {
        setInterval(() => {
            svg.style.filter = 'brightness(1.3)';
            setTimeout(() => {
                svg.style.filter = 'brightness(1)';
            }, 600);
        }, 3000);
    }
}

/**
 * Export functions for global access
 */
window.ImpactSolutions = window.ImpactSolutions || {};
window.ImpactSolutions.openWhiteLabelModal = openWhiteLabelModal;
window.ImpactSolutions.closeWhiteLabelModal = closeWhiteLabelModal;

// ==========================================
// END WHITE LABELING MODAL FUNCTIONS
// ==========================================
