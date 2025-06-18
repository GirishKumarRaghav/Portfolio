
// Theme Management
let isDarkMode = true;

function toggleTheme() {
    const container = document.getElementById('portfolio-container');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        container.className = 'portfolio-container dark-theme';
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        container.className = 'portfolio-container light-theme';
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Particle Canvas
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.dx = (Math.random() - 0.5) * 2;
            this.dy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.color = `hsl(${180 + Math.random() * 60}, 70%, 60%)`;
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;

            if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typing Animation
function initTypingAnimation() {
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        setTimeout(() => typeWriter(heroTitle, 'Full Stack Developer'), 1000);
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle button event
    document.getElementById('theme-button').addEventListener('click', toggleTheme);
    
    // Initialize all features
    initParticles();
    initTypingAnimation();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
});
