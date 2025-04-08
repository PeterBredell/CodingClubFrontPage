/**
 * Smoke Transition Effect
 * Creates a smooth smoke-like transition between pages
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create the smoke transition elements
    createSmokeTransitionElements();

    // Initialize the transition
    initSmokeTransition();
});

function createSmokeTransitionElements() {
    // Create the main smoke transition container
    const smokeTransition = document.createElement('div');
    smokeTransition.className = 'smoke-slide-transition';
    smokeTransition.id = 'smokeSlideTransition';
    document.body.appendChild(smokeTransition);

    // Create the smoke particles container
    const smokeParticlesContainer = document.createElement('div');
    smokeParticlesContainer.className = 'smoke-transition';
    smokeParticlesContainer.id = 'smokeTransition';

    const smokeContainer = document.createElement('div');
    smokeContainer.className = 'smoke-container';
    smokeParticlesContainer.appendChild(smokeContainer);

    // Create smoke particles
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        // Random size
        const size = Math.random() * 150 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random delay
        const delay = Math.random() * 0.5;
        particle.style.animationDelay = `${delay}s`;

        smokeContainer.appendChild(particle);
    }

    document.body.appendChild(smokeParticlesContainer);
}

function initSmokeTransition() {
    // Get the transition elements
    const smokeTransition = document.getElementById('smokeTransition');
    const smokeSlideTransition = document.getElementById('smokeSlideTransition');

    // Override the original enterWebsite function
    window.originalEnterWebsite = window.enterWebsite;
    window.enterWebsite = function() {
        // Trigger the smoke transition
        triggerSmokeTransition('forward', function() {
            // Call the original function after transition starts
            window.originalEnterWebsite();
        });
    };

    // Override the original returnHome function
    window.originalReturnHome = window.returnHome;
    window.returnHome = function() {
        // Trigger the smoke transition
        triggerSmokeTransition('backward', function() {
            // Call the original function after transition starts
            window.originalReturnHome();
        });
    };
}

function triggerSmokeTransition(direction, callback) {
    const smokeTransition = document.getElementById('smokeTransition');
    const smokeSlideTransition = document.getElementById('smokeSlideTransition');
    const homePage = document.querySelector('.homePage');
    const aboutSection = document.getElementById('about');

    // Remove transition-complete class during transition
    document.body.classList.remove('transition-complete');

    // Activate the smoke effect
    smokeTransition.classList.add('active');
    smokeSlideTransition.classList.add('active');

    // Add direction-specific classes for slide effect
    if (direction === 'forward') {
        document.body.classList.add('slide-left-transition');
    } else {
        document.body.classList.add('slide-right-transition');
    }

    // Execute the callback after a short delay to allow the transition to start
    setTimeout(callback, 300);

    // First phase of cleanup - remove transition classes
    setTimeout(() => {
        smokeTransition.classList.remove('active');
        smokeSlideTransition.classList.remove('active');
        document.body.classList.remove('slide-left-transition', 'slide-right-transition');

        // Ensure blur filters are explicitly removed
        homePage.style.filter = 'none';
        aboutSection.style.filter = 'none';

        // Force a reflow to ensure changes take effect
        void homePage.offsetWidth;
        void aboutSection.offsetWidth;

        // Add transition-complete class to force blur reset via CSS
        document.body.classList.add('transition-complete');

        // Call cleanup function
        cleanupBlurEffects();
    }, 1800);

    // Second phase of cleanup - additional safety check
    setTimeout(() => {
        cleanupBlurEffects();
    }, 2500);
}

// Function to manually trigger the smoke transition
function triggerManualSmokeTransition(direction, callback) {
    triggerSmokeTransition(direction, callback || function(){});
}

// Function to clean up any lingering blur effects
function cleanupBlurEffects() {
    const homePage = document.querySelector('.homePage');
    const aboutSection = document.getElementById('about');
    const allSections = document.querySelectorAll('.section');
    const allElements = document.querySelectorAll('*');

    // Clear blur from main elements
    if (homePage) {
        homePage.style.filter = 'none';
        homePage.style.webkitFilter = 'none';
    }

    if (aboutSection) {
        aboutSection.style.filter = 'none';
        aboutSection.style.webkitFilter = 'none';
    }

    // Clear blur from all sections
    allSections.forEach(section => {
        section.style.filter = 'none';
        section.style.webkitFilter = 'none';
    });

    // Check for any elements with blur filter
    allElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        if (computedStyle.filter && computedStyle.filter.includes('blur')) {
            el.style.filter = 'none';
            el.style.webkitFilter = 'none';
        }
    });

    // Force reflows to ensure changes take effect
    if (homePage) void homePage.offsetWidth;
    if (aboutSection) void aboutSection.offsetWidth;

    // Add a class to the body to indicate transition is complete
    document.body.classList.add('transition-complete');
}

// Add event listener to clean up blur effects when page is fully loaded
window.addEventListener('load', function() {
    // Clean up any lingering blur effects
    cleanupBlurEffects();

    // Add transition-complete class to body
    document.body.classList.add('transition-complete');

    // Also clean up when user interacts with the page
    document.addEventListener('click', function() {
        setTimeout(cleanupBlurEffects, 2000);
    });

    // Add additional cleanup on window resize and scroll
    window.addEventListener('resize', function() {
        setTimeout(cleanupBlurEffects, 500);
    });

    window.addEventListener('scroll', function() {
        setTimeout(cleanupBlurEffects, 500);
    }, { passive: true });

    // Set an interval to periodically check and clean up blur effects
    setInterval(cleanupBlurEffects, 5000);
});
