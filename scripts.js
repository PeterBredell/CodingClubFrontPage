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
    startCarouselAutoScroll();

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

    // Remove the scroll event listener for the home button
    const returnHomeBtn = document.querySelector('.return-home-btn');
    returnHomeBtn.addEventListener('click', function() {
        returnHome();
    });

    // Remove all scroll event listeners related to the button positioning

    // Add dynamic home button functionality
    const originalHomeButton = document.querySelector('.return-home-btn');
    const fixedHomeButton = document.createElement('button');

    fixedHomeButton.classList.add('fixed-home-btn', 'glowing-btn');
    fixedHomeButton.innerHTML = '<span class="glowing-txt">H<span class="faulty-letter">O</span>ME</span>';
    fixedHomeButton.style.display = 'none';
    fixedHomeButton.onclick = returnHome;
    document.body.appendChild(fixedHomeButton);

    window.addEventListener('scroll', function() {
        const aboutTop = aboutSection.offsetTop;
        if (window.scrollY < aboutTop) {
            window.scrollTo(0, aboutTop);
        }

        // Handle button visibility
        if (window.scrollY > 50) {
            originalHomeButton.classList.add('fade-out');
            originalHomeButton.classList.remove('fade-in');
            fixedHomeButton.classList.add('fade-in');
            fixedHomeButton.classList.remove('fade-out');
            fixedHomeButton.style.display = 'block';
        } else {
            originalHomeButton.classList.add('fade-in');
            originalHomeButton.classList.remove('fade-out');
            fixedHomeButton.classList.add('fade-out');
            fixedHomeButton.classList.remove('fade-in');
            setTimeout(() => { fixedHomeButton.style.display = 'none'; }, 500);
        }
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

    // Setup initial state
    aboutSection.style.visibility = 'visible';
    aboutSection.style.display = 'block';
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(30px)';
    
    // Trigger home page fade out
    homePage.classList.add('fade-out-up');
    body.classList.remove('no-scroll');

    // Slower, smoother transition for about section
    setTimeout(() => {
        homePage.style.display = 'none';
        aboutSection.style.transition = 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1), transform 2s cubic-bezier(0.4, 0, 0.2, 1)';
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }, 800); // Increased delay before starting the fade-in
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
    
    // Show home page before animation
    homePage.style.display = 'flex';
    
    // Remove previous animation classes
    homePage.classList.remove('fade-out-up');
    homePage.classList.add('fade-in-down');
    
    // Hide about section
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
    }, 1000);
}

function startCarouselAutoScroll() {
    const carouselInputs = document.querySelectorAll('.carousel-container input[type="radio"]');
    let currentIndex = 0;
    let isReversing = false;
    carouselInputs[0].checked = true;

    setInterval(() => {
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

    carouselInputs.forEach(input => {
        input.addEventListener('click', function() {
            currentIndex = Array.from(carouselInputs).indexOf(this);
            isReversing = currentIndex === carouselInputs.length - 1;
        });
    });
}