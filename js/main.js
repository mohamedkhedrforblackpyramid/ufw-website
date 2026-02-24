// UFW - United Future Works Website Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initMobileMenu();
    initHeroSlider();
    initScrollAnimations();
    initCounterAnimation();
    initSmoothScroll();
    initContactForm();
});

// Header scroll effect
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollThreshold = 50;
    
    function updateHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader();
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuBtn || !navMenu) return;
    
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Hero slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update hero content based on slide
        updateHeroContent(index);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function updateHeroContent(index) {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        const contents = [
            {
                badge: 'Fabrication Sector',
                title: 'Precise Steel <span>Fabrication</span> Solutions',
                description: 'Fabrication of light, medium and heavy steel structures, plate work, and piping for industrial plants.'
            },
            {
                badge: 'Installation Sector',
                title: 'Expert <span>Electromechanical</span> Installation',
                description: 'Professional installation services inside heavy industrial plants including steel structures and piping work.'
            },
            {
                badge: 'Maintenance Sector',
                title: 'Industrial <span>Maintenance</span> Excellence',
                description: 'Comprehensive maintenance activities, equipment overhaul, and shutdown services for cement and steel plants.'
            },
            {
                badge: 'Safety & Scaffolding',
                title: 'Safety First <span>Always</span>',
                description: 'OSHA-compliant scaffolding work and comprehensive safety protocols for all industrial operations.'
            }
        ];
        
        const content = contents[index];
        const badge = heroContent.querySelector('.hero-badge');
        const title = heroContent.querySelector('.hero-title');
        const desc = heroContent.querySelector('.hero-description');
        
        if (badge) badge.textContent = content.badge;
        if (title) title.innerHTML = content.title;
        if (desc) desc.textContent = content.description;
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Auto advance slides
    let autoSlide = setInterval(nextSlide, slideInterval);
    
    // Click indicators to change slide
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => clearInterval(autoSlide));
        heroSection.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    }
}

// Scroll animations (simple AOS alternative)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Counter animation for statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        let isValid = true;
        const requiredFields = ['name', 'email', 'message'];
        
        requiredFields.forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!input || !input.value.trim()) {
                isValid = false;
                input?.classList.add('error');
            } else {
                input?.classList.remove('error');
            }
        });
        
        // Email validation
        const emailInput = form.querySelector('[name="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
            }
        }
        
        if (isValid) {
            // Show success message
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
        }
    });
    
    // Remove error class on input
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Active nav link based on scroll position
window.addEventListener('scroll', throttle(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}, 100));
