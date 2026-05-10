// Particles animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberParticles = 50;
    
    for (let i = 0; i < numberParticles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(108, 99, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: -${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Intersection Observer for fade-in animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Smooth scroll for anchor links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typing effect restart
function restartTyping() {
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        typingElement.style.animation = 'none';
        typingElement.offsetHeight; // Trigger reflow
        typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
    }
}

// Progress bars animation
function animateProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    bar.style.animation = 'none';
                    bar.offsetHeight; // Trigger reflow
                    bar.style.animation = 'progress-animation 2s ease-out';
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('.skills-grid').forEach(grid => {
        observer.observe(grid);
    });
}

// Hover effect on cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .experience-card, .info-card, .timeline-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Mobile menu check and adjustments
function checkMobile() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.card, .skill-card, .project-card').forEach(card => {
            card.addEventListener('mousemove', null);
        });
    }
}

// Video player interaction
function setupVideoPlayer() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const video = document.querySelector('video');
    const overlay = document.querySelector('.video-overlay');
    
    if (video && overlay) {
        overlay.addEventListener('click', () => {
            video.play();
            overlay.style.display = 'none';
        });
        
        video.addEventListener('play', () => {
            overlay.style.display = 'none';
        });
        
        video.addEventListener('pause', () => {
            if (video.currentTime === 0) {
                overlay.style.display = 'flex';
            }
        });
    }
}

// Scroll to top functionality
function addScrollToTop() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.container').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    observeElements();
    smoothScroll();
    animateProgressBars();
    setupVideoPlayer();
    addScrollToTop();
    
    // Add hover effects only on desktop
    if (window.innerWidth > 768) {
        addCardHoverEffects();
    }
    
    // Restart typing animation periodically
    setInterval(restartTyping, 8000);
});

// Handle window resize
window.addEventListener('resize', () => {
    checkMobile();
});

// Add parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Console welcome message
console.log(`
    🎓 CV de FOE OWONA
    Étudiant en Informatique | Développeur Web & Mobile
    ------------------------------------------------
    Bienvenue sur mon CV interactif !
`);