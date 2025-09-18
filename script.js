// Chances R' Splash Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Location card click handlers
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        // Add click handler for entire card
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button directly
            if (e.target.classList.contains('location-btn')) {
                return;
            }
            
            const locationBtn = card.querySelector('.location-btn');
            if (locationBtn) {
                locationBtn.click();
            }
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const locationBtn = card.querySelector('.location-btn');
                if (locationBtn) {
                    locationBtn.click();
                }
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Visit ${card.querySelector('h2').textContent}`);
    });
    
    // Smooth scroll for any internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // Optionally add fallback image or styling
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animateElements = document.querySelectorAll('.location-card, .service-item, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effects for better UX
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Track location card interactions for analytics
    locationCards.forEach(card => {
        const locationBtn = card.querySelector('.location-btn');
        if (locationBtn) {
            locationBtn.addEventListener('click', function() {
                const location = card.dataset.location;
                console.log(`Navigation to ${location} location`);
                
                // Add analytics tracking here if needed
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'location_selection', {
                        'event_category': 'navigation',
                        'event_label': location
                    });
                }
            });
        }
    });
    
    // Add phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href');
            console.log(`Phone call initiated: ${phoneNumber}`);
            
            // Add analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': phoneNumber
                });
            }
        });
    });
    
    // Add social media click tracking
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label') || 'unknown';
            console.log(`Social media click: ${platform}`);
            
            // Add analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'event_category': 'social_media',
                    'event_label': platform
                });
            }
        });
    });
    
    // Performance optimization: Lazy load images that are not immediately visible
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '0';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Escape key to close any modals (if added later)
        if (e.key === 'Escape') {
            // Handle escape key functionality
        }
        
        // Tab navigation improvements
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add error handling for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                // Ensure the link opens properly
                if (!this.href || this.href === '#') {
                    e.preventDefault();
                    console.warn('External link has no valid URL');
                }
            } catch (error) {
                console.error('Error opening external link:', error);
            }
        });
    });
    
    console.log('Chances R\' Splash Page loaded successfully');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation .location-card:focus {
        outline: 3px solid #DAA520;
        outline-offset: 3px;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .location-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .section-header {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);
