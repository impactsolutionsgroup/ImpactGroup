// ==========================================
// IMPACT SOLUTIONS GROUP - JAVASCRIPT
// Interactive Features & Animations
// ==========================================

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
    initDashboardAnimation();
});

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

 // Build FormData for Google Forms
 const formData = new FormData();
 formData.append("entry.553120554", form.fullName.value); // Full Name
 formData.append("entry.1092396964", form.email.value); // Email Address
 formData.append("entry.628181211", form.organization.value); // Organization
 formData.append("entry.291598409", form.service.value); // Service
 formData.append("entry.72622795", form.projectDetails.value); // Project details

 // Google Form submission endpoint
 const googleFormURL =
 "https://docs.google.com/forms/d/e/1FAIpQLSc5Jx0eY2UB9AdE51GSt1-UZJbR9vgR41di2gdTgluBSDq6QA/formResponse";

 // Disable button during send
 submitBtn.disabled = true;

 try {
 await fetch(googleFormURL, {
 method: "POST",
 mode: "no-cors",
 body: formData
 });

 // Success feedback
 formMessage.textContent = "Thank you! Your message has been sent.";
 formMessage.className = "form-message success";

 form.reset();

 } catch (error) {
 console.error("Form submission error:", error);
 formMessage.textContent =
 "Something went wrong. Please email us directly at impactsolutionsgroup25@gmail.com.";
 formMessage.className = "form-message error";
 }

 // Re-enable button
 submitBtn.disabled = false;
 });
}

// === STATS COUNTER ANIMATION ===
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(current));
        }
    }, 16);
}

function formatStatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = statNumber.getAttribute('data-value');
            
            if (targetValue && !statNumber.classList.contains('animated')) {
                animateCounter(statNumber, parseInt(targetValue));
                statNumber.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    // Store original value
    const value = stat.textContent.replace(/[^0-9]/g, '');
    stat.setAttribute('data-value', value);
    stat.textContent = '0';
    
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
skipLink.href = '#services';
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
console.log('%cWant to work together? Contact Amir: mrwallace672@gmail.com', 'font-size: 14px; color: #10B981;');

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
    }
};
