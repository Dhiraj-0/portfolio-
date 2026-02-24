document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // COSMIC PARTICLE NETWORK ANIMATION
    // ============================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = this.getRandomColor();
            }
            
            getRandomColor() {
                const colors = ['99, 102, 241', '236, 72, 153', '6, 182, 212', '168, 85, 247', '34, 197, 94'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawConnections();
            requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        animate();
        window.addEventListener('resize', resizeCanvas);
    }

    // ============================================
    // EMAILJS INITIALIZATION
    // ============================================
    // EmailJS configuration
    const EMAILJS_PUBLIC_KEY = "MZbEhJjPhY5tKqtRU";
    const EMAILJS_SERVICE_ID = "service_kce75q9";
    const EMAILJS_TEMPLATE_ID = "template_i34m3ns";

    // Initialize EmailJS when the library is ready
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            try {
                emailjs.init(EMAILJS_PUBLIC_KEY);
                console.log('EmailJS initialized successfully');
                return true;
            } catch (error) {
                console.error('EmailJS init error:', error);
                return false;
            }
        } else {
            console.error('EmailJS library not loaded');
            return false;
        }
    }

    // Wait for EmailJS to load, then initialize
    let emailJSReady = false;
    
    if (typeof emailjs !== 'undefined') {
        emailJSReady = initEmailJS();
    } else {
        // If not loaded yet, wait for it
        window.addEventListener('load', () => {
            setTimeout(() => {
                emailJSReady = initEmailJS();
            }, 500);
        });
    }

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
            }
        });
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Add staggered delay to cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // ============================================
    // CONTACT FORM SUBMISSION WITH EMAILJS
    // ============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const btn = contactForm.querySelector('.btn-primary');
            if (!btn) return;
            
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            try {
                // Check if EmailJS is ready
                if (typeof emailjs === 'undefined') {
                    throw new Error('EmailJS library not loaded. Please refresh the page.');
                }

                // Send the form
                const response = await emailjs.sendForm(
                    EMAILJS_SERVICE_ID, 
                    EMAILJS_TEMPLATE_ID, 
                    contactForm
                );
                
                console.log('EmailJS response:', response);
                
                if (response.status === 200) {
                    alert('Message sent successfully! I\'ll get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('Message sent but there may be an issue. Please email me directly.');
                }
            } catch (error) {
                console.error('EmailJS Error:', error);
                
                // Provide more specific error message
                if (error.text) {
                    alert('Failed to send message: ' + error.text);
                } else if (error.message) {
                    alert('Failed to send message: ' + error.message + '. Please try again or email me directly.');
                } else {
                    alert('Failed to send message. Please try again or email me directly.');
                }
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // ============================================
    // TYPING EFFECT FOR TAGLINE
    // ============================================
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // ============================================
    // SKILL CARDS HOVER EFFECT
    // ============================================
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // ACTIVE LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.style.color = '';
            if (item.getAttribute('href') === `#${current}`) {
                item.style.color = '#2563eb';
            }
        });
    });
});
