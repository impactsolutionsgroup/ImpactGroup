/* ==========================================
   IMPACT SOLUTIONS GROUP - PREMIUM JAVASCRIPT
   All animations, modals, forms, scroll effects
   ========================================== */

(function() {
    'use strict';

    // === CORE INITIALIZATION === 
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initScrollAnimations();
        initLogoAnimation();
        initDashboardAnimation();
        initStatsCounter();
        initContactForm();
        initImpactOSModal();
        initClassroomOSModal();
        initWhiteLabelModal();
        initParallax();
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
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Active link highlighting
            updateActiveLink();
            
            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
            });
        });

        // Active link based on scroll position
        function updateActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 150;
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }
    }

    // === SCROLL ANIMATIONS === 
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
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

    // === LOGO ANIMATION === 
    function initLogoAnimation() {
        const logo = document.querySelector('.logo svg');
        if (!logo) return;

        // Enhance hover effect
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1) rotate(5deg)';
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // === DASHBOARD ANIMATION === 
    function initDashboardAnimation() {
        const dashboard = document.querySelector('.dashboard-preview');
        if (!dashboard) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateBars();
                    animateMetricCards();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(dashboard);

        function animateBars() {
            const bars = document.querySelectorAll('.bar-fill');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'growBar 1s ease-out forwards';
                }, index * 100);
            });
        }

        function animateMetricCards() {
            const cards = document.querySelectorAll('.metric-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'pulse 0.6s ease-out';
                }, index * 200);
            });
        }
    }

    // === STATS COUNTER ANIMATION === 
    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-number');
        if (!stats.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.getAttribute('data-value'));
                    animateCounter(stat, target);
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));

        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 50;
            const duration = 1500;
            const stepTime = duration / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number based on target
                const formatted = target > 100 ? 
                    Math.floor(current).toLocaleString() : 
                    Math.floor(current);
                
                // Add % if original text had it
                const suffix = element.textContent.includes('%') ? '%' : 
                              element.textContent.includes('+') ? '+' : '';
                
                element.textContent = formatted + suffix;
            }, stepTime);
        }
    }

    // === CONTACT FORM === 
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSc5Jx0eY2UB9AdE51GSt1-UZJbR9vgR41di2gdTgluBSDq6QA/formResponse';
        const ENTRY_IDS = {
            name: 'entry.553120554',
            email: 'entry.1092396964',
            organization: 'entry.628181211',
            service: 'entry.291598409',
            message: 'entry.72622795'
        };

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const messageDiv = document.getElementById('formMessage');
            
            // Get form values
            const formData = new FormData();
            formData.append(ENTRY_IDS.name, form.name.value);
            formData.append(ENTRY_IDS.email, form.email.value);
            formData.append(ENTRY_IDS.organization, form.organization.value || 'Not provided');
            formData.append(ENTRY_IDS.service, form.service.value);
            formData.append(ENTRY_IDS.message, form.message.value);

            // Loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                // Send to Google Forms
                await fetch(GOOGLE_FORM_ACTION, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });

                // Success
                showMessage(messageDiv, 'Thank you! We\'ll be in touch soon.', 'success');
                form.reset();
                
                // Track submission (if analytics present)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form'
                    });
                }
            } catch (error) {
                showMessage(messageDiv, 'Something went wrong. Please email us directly.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    // === IMPACTOS MODAL === 
    function initImpactOSModal() {
        const modal = document.getElementById('impactosModal');
        const form = document.getElementById('impactosForm');
        if (!modal || !form) return;

        window.openImpactOSDemo = function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Focus trap
            setTimeout(() => {
                const firstInput = form.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        };

        window.closeImpactOSDemo = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            form.reset();
            
            const messageDiv = document.getElementById('impactosFormMessage');
            if (messageDiv) {
                messageDiv.style.display = 'none';
                messageDiv.className = 'form-message';
            }
        };

        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                window.closeImpactOSDemo();
            }
        });

        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                window.closeImpactOSDemo();
            }
        });

        // Form submission
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const messageDiv = document.getElementById('impactosFormMessage');

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate submission (replace with actual endpoint)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showMessage(messageDiv, 'Demo request received! We\'ll contact you within 24 hours.', 'success');
                
                setTimeout(() => {
                    window.closeImpactOSDemo();
                }, 2000);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'demo_request', {
                        'event_category': 'ImpactOS',
                        'event_label': 'Demo Request'
                    });
                }
            } catch (error) {
                showMessage(messageDiv, 'Error submitting request. Please email us directly.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    // === CLASSROOMOS MODAL === 
    function initClassroomOSModal() {
        const modal = document.getElementById('classroomosModal');
        const form = document.getElementById('classroomosForm');
        if (!modal || !form) return;

        window.openClassroomOSDemo = function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                const firstInput = form.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        };

        window.closeClassroomOSDemo = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            form.reset();
            
            const messageDiv = document.getElementById('classroomosFormMessage');
            if (messageDiv) {
                messageDiv.style.display = 'none';
                messageDiv.className = 'form-message';
            }
        };

        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                window.closeClassroomOSDemo();
            }
        });

        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                window.closeClassroomOSDemo();
            }
        });

        // Form submission
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const messageDiv = document.getElementById('classroomosFormMessage');

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showMessage(messageDiv, 'Demo request received! We\'ll contact you within 24 hours.', 'success');
                
                setTimeout(() => {
                    window.closeClassroomOSDemo();
                }, 2000);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'demo_request', {
                        'event_category': 'ClassroomOS',
                        'event_label': 'Demo Request'
                    });
                }
            } catch (error) {
                showMessage(messageDiv, 'Error submitting request. Please email us directly.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    // === WHITE LABEL MODAL === 
    function initWhiteLabelModal() {
        const modal = document.getElementById('whiteLabelModal');
        if (!modal) return;

        window.openWhiteLabelModal = function(e) {
            if (e) e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        window.closeWhiteLabelModal = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                window.closeWhiteLabelModal();
            }
        });

        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                window.closeWhiteLabelModal();
            }
        });

        // Handle internal link clicks
        const internalLinks = modal.querySelectorAll('a[href="#contact"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', () => {
                window.closeWhiteLabelModal();
            });
        });
    }

    // === PARALLAX EFFECTS === 
    function initParallax() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // === UTILITY FUNCTIONS === 
    function showMessage(element, message, type) {
        if (!element) return;
        
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';

        // Auto-hide after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    }

    // === SMOOTH SCROLL === 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === CARD HOVER EFFECTS === 
    function initCardEffects() {
        const cards = document.querySelectorAll('.platform-card, .service-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize card effects
    initCardEffects();

    // === PERFORMANCE OPTIMIZATIONS === 
    
    // Debounce function for scroll events
    function debounce(func, wait) {
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

    // Throttle function for continuous events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply performance optimizations
    const optimizedScroll = throttle(() => {
        // Performance-critical scroll operations
    }, 100);

    window.addEventListener('scroll', optimizedScroll);

    // === LAZY LOADING === 
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // === CONSOLE SIGNATURE === 
    console.log(
        '%c Impact Solutions Group ',
        'background: linear-gradient(135deg, #0EA5E9, #8B5CF6); color: white; font-size: 16px; padding: 10px 20px; font-weight: bold;'
    );
    console.log(
        '%c Strategic Intelligence Infrastructure ',
        'color: #0EA5E9; font-size: 12px; font-weight: 600;'
    );
    console.log(
        '%c Built by Amir Wallace | impactsolutionsgroup25@gmail.com ',
        'color: #94A3B8; font-size: 11px;'
    );

    // === EXPOSE NECESSARY FUNCTIONS === 
    window.ImpactSolutions = {
        openImpactOSDemo: window.openImpactOSDemo,
        closeImpactOSDemo: window.closeImpactOSDemo,
        openClassroomOSDemo: window.openClassroomOSDemo,
        closeClassroomOSDemo: window.closeClassroomOSDemo,
        openWhiteLabelModal: window.openWhiteLabelModal,
        closeWhiteLabelModal: window.closeWhiteLabelModal
    };

})();
