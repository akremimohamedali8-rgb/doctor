class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll]');
        this.threshold = 0.1;
        this.init();
    }

    init() {
        this.createObserver();
        this.addEventListeners();
        this.animateStats();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Animate stats if it's a stat number
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateNumber(entry.target);
                    }
                }
            });
        }, {
            threshold: this.threshold,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateNumber(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    animateStats() {
        // Pre-observe stats to ensure they animate when they come into view
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            this.observer.observe(stat);
        });
    }

    addEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm);
            });
        }

        // CTA button click
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
}

// Parallax effect for floating elements
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.floating-element');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.elements.forEach((element, index) => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5 * (index + 1) * 0.1;
                element.style.transform = `translateY(${rate}px) rotate(${rate}deg)`;
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimator();
    new ParallaxEffect();
    
    // Add initial animations for hero section
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const ctaButton = document.querySelector('.cta-button');
        
        if (heroTitle) heroTitle.style.opacity = '1';
        if (heroTitle) heroTitle.style.transform = 'translateY(0)';
        if (heroSubtitle) heroSubtitle.style.opacity = '1';
        if (heroSubtitle) heroSubtitle.style.transform = 'translateY(0)';
        if (ctaButton) ctaButton.style.opacity = '1';
        if (ctaButton) ctaButton.style.transform = 'translateY(0)';
    }, 100);
});

// Additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});