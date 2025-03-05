document.addEventListener('DOMContentLoaded', function() {
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

    const returnHomeBtn = document.querySelector('.return-home-btn');
    returnHomeBtn.addEventListener('click', function() {
        returnHome();
    });

    const originalHomeButton = document.querySelector('.return-home-btn');
    const fixedHomeButton = document.createElement('button');

    fixedHomeButton.classList.add('fixed-home-btn', 'glowing-btn');
    fixedHomeButton.innerHTML = '<span class="glowing-txt">F<span class="faulty-letter">I</span>ND</span>';
    fixedHomeButton.style.display = 'none';
    fixedHomeButton.onclick = returnHome;
    document.body.appendChild(fixedHomeButton);

    window.addEventListener('scroll', function() {
        const aboutTop = aboutSection.offsetTop;
        if (window.scrollY < aboutTop) {
            window.scrollTo(0, aboutTop);
        }

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

    // Load modal HTML
    fetch('modals.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            setupModals();
        });
});

function fadeInHomePage() {
    const homePage = document.querySelector('.homePage');
    homePage.style.opacity = 0;
    homePage.style.transition = 'opacity 1.5s ease-in-out';
    setTimeout(() => {
        homePage.style.opacity = 1;
    }, 500);
}

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

function enterWebsite() {
    const homePage = document.querySelector('.homePage');
    const aboutSection = document.getElementById('about');
    const body = document.body;
    const themeSwitch = document.getElementById('theme-switch');


    aboutSection.style.visibility = 'visible';
    aboutSection.style.display = 'block';
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(30px)';
    
    // Show the theme switch and home button
    themeSwitch.style.display = 'flex';
    
    homePage.classList.add('fade-out-up');
    body.classList.remove('no-scroll');

    setTimeout(() => {
        homePage.style.display = 'none';
        aboutSection.style.transition = 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1), transform 2s cubic-bezier(0.4, 0, 0.2, 1)';
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }, 800);
}

function returnHome() {
    const homePage = document.querySelector('.homePage');
    const aboutSection = document.getElementById('about');
    const body = document.body;
    const fixedHomeBtn = document.querySelector('.fixed-home-btn');
    
    // Only hide the home button, not the theme switch
    fixedHomeBtn.style.display = 'none';
    
    homePage.style.display = 'flex';
    homePage.classList.remove('fade-out-up');
    homePage.classList.add('fade-in-down');
    
    aboutSection.style.display = 'none';
    body.classList.add('no-scroll');
    
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
    const carousel = document.getElementById('carousel');
    let currentIndex = 0;
    let isReversing = false;
    let touchStartX = 0;
    let touchEndX = 0;
    carouselInputs[0].checked = true;

    // Add touch event listeners
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, false);

    carousel.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling while swiping
    }, false);

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
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

    // Keep existing interval code
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

function setupModals() {
    const modals = {
        'Our Mission': 'mission-modal',
        'Our Activities': 'activities-modal',
        'Our Club': 'club-modal'
    };

    // Add click handlers to titles
    document.querySelectorAll('.card-hover__title').forEach(title => {
        if (modals[title.textContent]) {
            title.addEventListener('click', () => {
                document.getElementById(modals[title.textContent]).style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Add close handlers
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
}