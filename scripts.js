/**
 * Initializes the page functionality when the DOM content is loaded.
 * 
 * This function sets up the following:
 * 1. Intersection Observer to add 'active' class to sections as they become visible.
 * 2. Creates particle effects.
 * 3. Fades in the home page.
 * 4. Adds a scroll event listener to ensure scrolling starts from the 'about' section.
 * 
 */
document.addEventListener('DOMContentLoaded', function() { /* Basically waits until the website loaded and then starts the animations*/
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    createParticles();
    fadeInHomePage();

    const aboutSection = document.getElementById('about');
    window.addEventListener('scroll', function() {
        const aboutTop = aboutSection.offsetTop;
        if (window.scrollY < aboutTop) {
            window.scrollTo(0, aboutTop);
        }
    });

    let isReturningHome = false;

    window.addEventListener('scroll', function() {
        if (!isReturningHome) {
            const aboutTop = aboutSection.offsetTop;
            if (window.scrollY < aboutTop) {
                window.scrollTo(0, aboutTop);
            }
        }
    });

    // Add this new event listener
    document.querySelector('.return-home-btn').addEventListener('click', function() {
        isReturningHome = true;
        returnHome();
        setTimeout(() => {
            isReturningHome = false;
        }, 1500); // Adjust this timeout as needed
    });
});



function fadeInHomePage() {
    const homePage = document.querySelector('.homePage');
    homePage.style.opacity = 0;
    homePage.style.transition = 'opacity 1.5s ease-in-out';
    setTimeout(() => {
        homePage.style.opacity = 1; /* its obvious what it does, fades in the home page */
    }, 500);
}

/**
 * Creates and adds particle elements to the particle container for a visual effect.
 * 
 * This function generates a specified number of particle elements with random sizes,
 * positions, and animation durations. Each particle is added to the particle container
 * in the DOM, creating a dynamic visual effect.
 * 
 */
function createParticles() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        const duration = Math.random() * 20 + 15;
        particle.style.animation = `float ${duration}s linear infinite`;

        particleContainer.appendChild(particle);
    }
}


/**
 * Handles the transition from the home page to the main website content.
 * 
 * This function performs the following actions:
 * 1. Applies a fade-out-up animation to the home page.
 * 2. Removes the 'no-scroll' class from the body to enable scrolling.
 * 3. Scrolls to the 'about' section after a delay.
 * 
 */
function enterWebsite() {
    const homePage = document.querySelector('.homePage');
    const aboutSection = document.getElementById('about');
    const body = document.body;

    homePage.classList.add('fade-out-up');
    body.classList.remove('no-scroll');

    // Make about section fully visible
    aboutSection.style.display = 'block';
    aboutSection.style.visibility = 'visible';
    aboutSection.style.opacity = '1';

    setTimeout(() => {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

/**
 * Handles the transition from the main website content back to the home page.
 * 
 * This function performs the following actions: 
 * 1. Applies a fade-in-down animation to the home page.
 * 2. Enables the 'no-scroll' class on the body to disable scrolling.
 * 3. Sets the home page to be fully visible.
 * 
 * */

function returnHome() {
    const homePage = document.querySelector('.homePage');
    const aboutSection = document.getElementById('about');
    const body = document.body;

    
    // Remove previous animation classes
    homePage.classList.remove('fade-out-up');
    homePage.classList.add('fade-in-down');
    
    // Hide about section
    aboutSection.style.opacity = '0';
    aboutSection.style.display = 'none';
    
    // Disable scrolling temporarily
    body.classList.add('no-scroll');
    
    // Scroll to absolute top
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });

    setTimeout(() => {
        homePage.classList.remove('fade-in-down');
        // Don't modify visibility here
    }, 1000);
}


