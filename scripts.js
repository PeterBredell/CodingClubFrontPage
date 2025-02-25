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

    const aboutSection = document.getElementById('about');
    window.addEventListener('scroll', function() {
        const aboutTop = aboutSection.offsetTop;
        if (window.scrollY < aboutTop) {
            window.scrollTo(0, aboutTop);
        }
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
    
    homePage.classList.add('fade-out-up');
    body.classList.remove('no-scroll');
    createBurstParticles();
    
    setTimeout(() => {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

function createBurstParticles() {
    const container = document.querySelector('.particle-container');
    const burstCount = 30;
    
    for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', 'burst-particle');
        
        const angle = (i / burstCount) * 360;
        const velocity = 2 + Math.random() * 2;
        
        particle.style.left = '50vw';
        particle.style.top = '50vh';
        particle.style.transform = `translate(-50%, -50%)`;
        particle.style.animation = `
            burstOut ${1 + Math.random()}s cubic-bezier(0.4, 0, 0.2, 1) forwards,
            fade ${0.5 + Math.random()}s ease-out forwards
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}