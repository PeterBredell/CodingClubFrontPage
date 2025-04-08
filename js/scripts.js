document.addEventListener('DOMContentLoaded', function() {
    // Add homepage state class initially and enable animations
    document.body.classList.add('homepage-state', 'animation-enabled');

    // Initialize IntersectionObserver for section animations
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px' // Slightly earlier detection
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize page elements
    createParticles();
    fadeInHomePage();
    startCarouselAutoScroll();

    // Prevent scrolling above the about section
    // Using a single, debounced scroll handler
    const aboutSection = document.getElementById('about');
    let isReturningHome = false;
    let scrollTimeout;

    function handlePageScroll() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            if (!isReturningHome) {
                const aboutTop = aboutSection.offsetTop;
                if (window.scrollY < aboutTop) {
                    window.scrollTo(0, aboutTop);
                }
            }
        });
    }

    window.addEventListener('scroll', handlePageScroll, { passive: true });

    // Set up return home button
    const returnHomeBtn = document.querySelector('.return-home-btn .glowing-btn');
    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', () => {
            isReturningHome = true;
            returnHome();
            // Reset after animation completes
            setTimeout(() => { isReturningHome = false; }, 1200);
        });
    }

    // Load modals with error handling and caching
    fetch('modals.html', { cache: 'no-cache' })
        .then(response => {
            if (!response.ok) throw new Error('Failed to load modals');
            return response.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            setupModals();
        })
        .catch(error => {
            console.error('Error loading modals:', error);
        });
});

function fadeInHomePage() {
    const homePage = document.querySelector('.homePage');

    // Ensure animations are enabled
    document.body.classList.add('animation-enabled');

    // Reset any previous styles
    homePage.style.removeProperty('opacity');
    homePage.style.removeProperty('transition');
    homePage.style.removeProperty('transform');

    // Force a reflow before setting new styles
    void homePage.offsetWidth;

    // Apply fade-in effect with transform for smoother animation
    homePage.style.opacity = 0;
    homePage.style.transform = 'translateY(20px)';
    homePage.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            homePage.style.opacity = 1;
            homePage.style.transform = 'translateY(0)';
        });
    });
}

function createParticles() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;

    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();

    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 40;

    // Add will-change hint for better performance
    particleContainer.style.willChange = 'transform';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        // Shorter animation duration on mobile
        const duration = Math.random() * (isMobile ? 15 : 20) + (isMobile ? 10 : 15);
        particle.style.animation = `float ${duration}s linear infinite`;

        fragment.appendChild(particle);
    }

    // Add all particles at once for better performance
    particleContainer.appendChild(fragment);
}

function enterWebsite() {
    // This function will be overridden by smoke-transition.js
    // but we keep the original implementation as a fallback

    // Ensure animations are enabled by removing any reduced-motion classes
    document.querySelectorAll('.reduced-motion').forEach(el => {
        el.classList.remove('reduced-motion');
    });

    const homePage = document.querySelector('.homePage');
    const aboutSection = document.getElementById('about');
    const body = document.body;
    const themeSwitch = document.getElementById('theme-switch');
    const header = document.querySelector('.header');

    // Prepare the about section for a smooth entrance
    aboutSection.style.visibility = 'visible';
    aboutSection.style.display = 'block';
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(30px)';
    aboutSection.style.willChange = 'opacity, transform, filter'; // Optimize for animation

    // Show the theme switch and home button
    themeSwitch.style.display = 'flex';

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
        // Remove homepage state
        document.body.classList.remove('homepage-state');

        // Force animation to be applied by removing and re-adding the class
        homePage.classList.remove('fade-out-up');
        // Trigger reflow
        void homePage.offsetWidth;
        // Add animation class with GPU acceleration
        homePage.style.willChange = 'transform, opacity, filter';
        homePage.classList.add('fade-out-up');

        body.classList.remove('no-scroll');

        // Show header with a slight delay for better sequence
        setTimeout(() => {
            header.style.willChange = 'transform, opacity';
            header.classList.add('visible');
        }, 400);

        // Transition to about section
        setTimeout(() => {
            homePage.style.display = 'none';
            homePage.style.willChange = 'auto'; // Clean up

            // Use cubic-bezier for smoother easing
            aboutSection.style.transition = 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)';

            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                aboutSection.style.opacity = '1';
                aboutSection.style.transform = 'translateY(0)';
                aboutSection.style.filter = 'blur(0)';

                // Smooth scroll to the section
                aboutSection.scrollIntoView({ behavior: 'smooth' });

                // Clean up will-change after animation completes
                setTimeout(() => {
                    aboutSection.style.willChange = 'auto';
                    header.style.willChange = 'auto';

                    // Ensure blur filter is completely removed
                    homePage.style.filter = 'none';
                    aboutSection.style.filter = 'none';

                    // Force a reflow to ensure changes take effect
                    void homePage.offsetWidth;
                    void aboutSection.offsetWidth;
                }, 1500);
            });
        }, 800);
    });
}

function returnHome() {
    // This function will be overridden by smoke-transition.js
    // but we keep the original implementation as a fallback

    // Ensure animations are enabled by removing any reduced-motion classes
    document.querySelectorAll('.reduced-motion').forEach(el => {
        el.classList.remove('reduced-motion');
    });

    const homePage = document.querySelector('.homePage');
    const aboutSection = document.getElementById('about');
    const body = document.body;
    const header = document.querySelector('.header');

    // Hide header first for better transition sequence
    header.classList.remove('visible');

    // Prepare the homepage for smooth entrance
    homePage.style.display = 'flex';
    homePage.style.willChange = 'transform, opacity, filter'; // Optimize for animation
    homePage.classList.remove('fade-out-up');
    homePage.style.filter = 'blur(10px)';

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
        // Force animation to be applied by removing and re-adding the class
        homePage.classList.remove('fade-in-down');
        // Trigger reflow
        void homePage.offsetWidth;
        // Add animation class
        homePage.classList.add('fade-in-down');

        // Hide about section and prevent scrolling
        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(30px)';
        aboutSection.style.filter = 'blur(10px)';
        setTimeout(() => {
            aboutSection.style.display = 'none';
        }, 500);

        body.classList.add('no-scroll');

        // Add homepage state class
        document.body.classList.add('homepage-state');

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Clean up animation classes after completion
        setTimeout(() => {
            homePage.classList.remove('fade-in-down');
            homePage.style.willChange = 'auto'; // Clean up

            // Ensure blur filter is completely removed
            homePage.style.filter = 'none';
            aboutSection.style.filter = 'none';

            // Force a reflow to ensure changes take effect
            void homePage.offsetWidth;
            void aboutSection.offsetWidth;
        }, 1500);
    });
}

function startCarouselAutoScroll() {
    const carouselInputs = document.querySelectorAll('.carousel-container input[type="radio"]');
    if (!carouselInputs.length) return; // Exit if no carousel exists

    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    let currentIndex = 0;
    let isReversing = false;
    let touchStartX = 0;
    let touchEndX = 0;
    let autoScrollInterval;
    let userInteracted = false;
    let pauseAutoScroll = false;

    // Initialize first slide
    carouselInputs[0].checked = true;

    // Add touch event listeners with passive option where possible
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        pauseAutoScroll = true; // Pause auto-scroll during interaction
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling while swiping
    }, { passive: false });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();

        // Resume auto-scroll after a delay
        setTimeout(() => {
            pauseAutoScroll = false;
        }, 3000);
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            userInteracted = true;
            if (swipeDistance > 0) {
                // Swipe right - go to previous
                currentIndex = Math.max(0, currentIndex - 1);
            } else {
                // Swipe left - go to next
                currentIndex = Math.min(carouselInputs.length - 1, currentIndex + 1);
            }
            carouselInputs[currentIndex].checked = true;
        }
    }

    // Improved interval with pause capability
    autoScrollInterval = setInterval(() => {
        if (pauseAutoScroll) return;

        if (!isReversing) {
            currentIndex++;
            if (currentIndex >= carouselInputs.length - 1) {
                isReversing = true;
            }
        } else {
            currentIndex--;
            if (currentIndex <= 0) {
                isReversing = false;
            }
        }
        carouselInputs[currentIndex].checked = true;
    }, 5000);

    // Handle manual input selection
    carouselInputs.forEach(input => {
        input.addEventListener('click', function() {
            userInteracted = true;
            pauseAutoScroll = true;
            currentIndex = Array.from(carouselInputs).indexOf(this);
            isReversing = currentIndex === carouselInputs.length - 1;

            // Resume auto-scroll after a delay
            setTimeout(() => {
                pauseAutoScroll = false;
            }, 3000);
        });
    });

    // Clean up interval on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(autoScrollInterval);
    });
}

function setupModals() {
    const modals = {
        'Our Mission': 'mission-modal',
        'Our Activities': 'activities-modal',
        'Our Club': 'club-modal'
    };

    // Add ARIA attributes and keyboard accessibility to modal triggers
    document.querySelectorAll('.card-hover__title').forEach(title => {
        if (modals[title.textContent]) {
            // Make title clickable with keyboard
            title.setAttribute('role', 'button');
            title.setAttribute('tabindex', '0');
            title.setAttribute('aria-haspopup', 'dialog');

            const openModal = () => {
                const modalId = modals[title.textContent];
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';

                    // Set focus on the modal for accessibility
                    modal.setAttribute('aria-hidden', 'false');
                    const closeBtn = modal.querySelector('.close-modal');
                    if (closeBtn) closeBtn.focus();
                }
            };

            // Handle both click and keyboard events
            title.addEventListener('click', openModal);
            title.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal();
                }
            });
        }
    });

    // Improve modal close handlers with accessibility
    const closeModal = (modal) => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.setAttribute('aria-hidden', 'true');

            // Return focus to the trigger element
            const modalId = modal.id;
            const triggerText = Object.keys(modals).find(key => modals[key] === modalId);
            if (triggerText) {
                const trigger = Array.from(document.querySelectorAll('.card-hover__title'))
                    .find(el => el.textContent === triggerText);
                if (trigger) trigger.focus();
            }
        }
    };

    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.setAttribute('aria-label', 'Close modal');
        closeBtn.addEventListener('click', () => {
            closeModal(closeBtn.closest('.modal'));
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('.modal[style*="display: block"]');
            if (visibleModal) {
                closeModal(visibleModal);
            }
        }
    });

    // Initialize modals with ARIA attributes
    document.querySelectorAll('.modal').forEach(modal => {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', modal.querySelector('.modal-headings')?.id || '');
    });

    // Navigation and section highlighting
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Debounced scroll handler for better performance
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            const scrolled = window.scrollY > 20;
            if (scrolled) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Update active section
            updateActiveSection();
        });
    }

    // Smooth scroll to section with improved behavior
    function scrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (!targetSection) return;

        // Close any open modals before scrolling
        const openModal = document.querySelector('.modal[style*="display: block"]');
        if (openModal) {
            closeModal(openModal);
        }

        const targetPosition = targetSection.offsetTop;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Update active section based on scroll position
    function updateActiveSection() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 300)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-current', 'false');

            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Event listeners with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // Initial call to set correct state
    handleScroll();
}





