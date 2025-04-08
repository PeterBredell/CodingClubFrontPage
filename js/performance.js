/**
 * Performance optimizations for the Eduvos Coding Club website
 * This script implements various performance improvements
 */
document.addEventListener('DOMContentLoaded', function() {
    // Debounce function to limit the rate at which a function can fire
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    // Optimize scroll events
    const scrollHandlers = [];
    let ticking = false;

    // Add a scroll handler to the optimized list
    function addScrollHandler(handler) {
        scrollHandlers.push(handler);
    }

    // Process all scroll handlers efficiently
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                scrollHandlers.forEach(handler => handler());
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Add a smooth parallax effect for section backgrounds
    addScrollHandler(function() {
        const scrollY = window.scrollY;
        document.querySelectorAll('.section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Apply subtle parallax effect
                const speed = 0.05;
                const yPos = -(scrollY * speed);
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });

    // Optimize animations by reducing them on low-end devices
    function detectLowEndDevice() {
        // Check for low memory (if available)
        if ('deviceMemory' in navigator) {
            if (navigator.deviceMemory < 4) return true;
        }

        // Check for slow CPU (if available)
        if ('hardwareConcurrency' in navigator) {
            if (navigator.hardwareConcurrency < 4) return true;
        }

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return true;
        }

        // Fallback to mobile detection
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Apply performance optimizations based on device capability
    if (detectLowEndDevice()) {
        // Reduce particle count
        const particleContainer = document.querySelector('.particle-container');
        if (particleContainer) {
            const particles = particleContainer.querySelectorAll('.particle');
            // Keep only half of the particles
            for (let i = 0; i < particles.length; i++) {
                if (i % 2 !== 0) {
                    particles[i].remove();
                }
            }
        }

        // Only apply reduced motion to non-critical animations
        // Don't add the class to the entire body to preserve main animations
        document.querySelectorAll('.section:not(.homePage)').forEach(section => {
            section.classList.add('reduced-motion');
        });
    }

    // Optimize image loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        // Add a fade-in effect when images load
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // Preload critical pages/resources when user hovers over links
    const preloadLinks = document.querySelectorAll('a[href^="#"]');
    preloadLinks.forEach(link => {
        link.addEventListener('mouseenter', debounce(function() {
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Add a class to prepare the section for viewing
                targetSection.classList.add('preload');

                // Find images in the target section and preload them
                const sectionImages = targetSection.querySelectorAll('img[data-src]');
                sectionImages.forEach(img => {
                    const src = img.getAttribute('data-src');
                    if (src) {
                        const preloadImage = new Image();
                        preloadImage.src = src;
                    }
                });
            }
        }, 200));
    });

    // Preload sections that will be visible soon
    function preloadSections() {
        const viewportHeight = window.innerHeight;
        const sections = document.querySelectorAll('.section:not(.active):not(.preload)');

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // If section is within 2x viewport height, preload it
            if (rect.top < viewportHeight * 2) {
                section.classList.add('preload');
            }
        });
    }

    // Intersection Observer for lazy loading with improved thresholds
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                // Use requestAnimationFrame for smoother animation
                requestAnimationFrame(() => {
                    section.classList.add('active');
                    observer.unobserve(section);
                    // Preload next sections after this one becomes active
                    preloadSections();
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px' // Start loading slightly before section enters viewport
    });

    // Observe all sections for lazy loading
    document.querySelectorAll('.section').forEach(section => {
        lazyLoadObserver.observe(section);
    });

    // Initial preload of sections near viewport
    preloadSections();
});
