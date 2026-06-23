// UFW - United Future Works Website Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initMobileMenu();
    initHeroSlider();
    initProjectGallery();
    initScrollAnimations();
    initCounterAnimation();
    initSmoothScroll();
    initContactForm();
});

// Header: الشريط الأبيض ثابت دائماً — نضيف scrolled دائماً للمظهر الموحد
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    header.classList.add('scrolled');
    
    const scrollThreshold = 50;
    function updateHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled');
        }
    }
    window.addEventListener('scroll', updateHeader);
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
    const slideInterval = 4000;
    let autoSlide = null;
    
    function startAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = null;
    }
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.classList.toggle('active', isActive);
            
            if (isActive) {
                slide.style.animation = 'none';
                void slide.offsetWidth;
                slide.style.animation = '';
            }
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
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
                badge: 'Installation Sector',
                title: 'Expert <span>Mechanical</span> Installation',
                description: 'Professional installation of heavy machinery, steel structures, and piping inside cement, steel, and mining plants.'
            },
            {
                badge: 'Heavy Industrial Projects',
                title: 'Large-Scale <span>Plant</span> Operations',
                description: 'End-to-end contracting solutions for complex industrial facilities across the Kingdom of Saudi Arabia.'
            },
            {
                badge: 'Structural Works',
                title: 'Precision <span>Heavy</span> Lifting',
                description: 'Safe erection and installation of silos, structures, and critical plant equipment using specialized cranes.'
            },
            {
                badge: 'Maintenance Sector',
                title: 'Industrial <span>Maintenance</span> Excellence',
                description: 'Comprehensive maintenance, equipment overhaul, and shutdown services for cement and steel plants.'
            },
            {
                badge: 'Shutdown Services',
                title: 'Kiln & Plant <span>Maintenance</span>',
                description: 'Skilled teams delivering mechanical, structural, and fabrication works during planned plant shutdowns.'
            },
            {
                badge: 'Crane Operations',
                title: 'Heavy <span>Lifting</span> Solutions',
                description: 'Expert crane operations and heavy equipment handling for the most demanding industrial projects.'
            }
        ];
        
        const content = contents[index] || contents[0];
        const badge = heroContent.querySelector('.hero-badge');
        const title = heroContent.querySelector('.hero-title');
        const desc = heroContent.querySelector('.hero-description');
        
        if (badge) badge.textContent = content.badge;
        if (title) title.innerHTML = content.title;
        if (desc) desc.textContent = content.description;
    }
    
    showSlide(0);
    startAutoSlide();
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
}

// Project image gallery lightbox
function initProjectGallery() {
    const galleries = document.querySelectorAll('.project-gallery');
    if (galleries.length === 0) return;

    let lightbox = document.querySelector('.project-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'project-lightbox';
        lightbox.innerHTML = `
            <button class="project-lightbox-close" type="button" aria-label="Close">&times;</button>
            <button class="project-lightbox-nav project-lightbox-prev" type="button" aria-label="Previous">&#8249;</button>
            <img src="" alt="">
            <button class="project-lightbox-nav project-lightbox-next" type="button" aria-label="Next">&#8250;</button>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('img');
    let currentImages = [];
    let currentIndex = 0;

    function openLightbox(images, index) {
        currentImages = images;
        currentIndex = index;
        lightboxImg.src = images[index].src;
        lightboxImg.alt = images[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showImage(index) {
        currentIndex = (index + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex].src;
        lightboxImg.alt = currentImages[currentIndex].alt;
    }

    galleries.forEach((gallery) => {
        const images = Array.from(gallery.querySelectorAll('img'));
        images.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => openLightbox(images, index));
        });
    });

    lightbox.querySelector('.project-lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.project-lightbox-prev').addEventListener('click', () => showImage(currentIndex - 1));
    lightbox.querySelector('.project-lightbox-next').addEventListener('click', () => showImage(currentIndex + 1));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
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
