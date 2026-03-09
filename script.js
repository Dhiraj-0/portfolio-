document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // THREE.JS 3D ANIMATION IN HERO SECTION
    // ============================================
    (function initThreeJS() {
        const container = document.getElementById('three-canvas-container');
        const fallback = document.getElementById('profile-card-fallback');
        
        if (!container || !fallback) return;
        
        // Check if Three.js is available
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded, using fallback profile');
            return;
        }
        
        // Detect mobile for performance optimization
        const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
        
        // Scene setup
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(
            isMobile ? 60 : 50, 
            1, 
            0.1, 
            1000
        );
        camera.position.z = isMobile ? 5 : 4;
        
        // Renderer
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: !isMobile 
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
        renderer.setSize(400, 400);
        container.appendChild(renderer.domElement);
        
        // Colors matching portfolio theme
        const primaryColor = 0x2563eb;
        const secondaryColor = 0x7c3aed;
        const accentColor = 0x06b6d4;
        
        // Main icosahedron with wireframe
        const geometry = new THREE.IcosahedronGeometry(isMobile ? 1.3 : 1.5, 1);
        const material = new THREE.MeshBasicMaterial({
            color: primaryColor,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const icosahedron = new THREE.Mesh(geometry, material);
        scene.add(icosahedron);
        
        // Inner glowing sphere
        const innerGeometry = new THREE.IcosahedronGeometry(isMobile ? 0.8 : 1, 2);
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: secondaryColor,
            transparent: true,
            opacity: 0.3
        });
        const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
        scene.add(innerSphere);
        
        // Outer glow ring
        const ringGeometry = new THREE.TorusGeometry(isMobile ? 1.8 : 2, 0.05, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: accentColor,
            transparent: true,
            opacity: 0.4
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);
        
        // Second ring
        const ring2Geometry = new THREE.TorusGeometry(isMobile ? 2.2 : 2.5, 0.03, 16, 100);
        const ring2Material = new THREE.MeshBasicMaterial({
            color: primaryColor,
            transparent: true,
            opacity: 0.25
        });
        const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
        ring2.rotation.x = Math.PI / 3;
        ring2.rotation.y = Math.PI / 4;
        scene.add(ring2);
        
        // Particle system (stars)
        const particleCount = isMobile ? 50 : 100;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * (isMobile ? 8 : 10);
            positions[i + 1] = (Math.random() - 0.5) * (isMobile ? 8 : 10);
            positions[i + 2] = (Math.random() - 0.5) * (isMobile ? 8 : 10);
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            color: accentColor,
            size: isMobile ? 0.03 : 0.05,
            transparent: true,
            opacity: 0.6
        });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
        
        // Mouse tracking
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        });
        
        // Touch support for mobile
        document.addEventListener('touchmove', (event) => {
            if (event.touches.length > 0) {
                mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
                mouseY = (event.touches[0].clientY / window.innerHeight) * 2 - 1;
            }
        });
        
        // Animation variables
        let time = 0;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            time += 0.01;
            
            // Smooth mouse follow with interpolation
            targetRotationX = mouseY * 0.5;
            targetRotationY = mouseX * 0.5;
            
            // Rotate main icosahedron
            icosahedron.rotation.x += 0.005 + (targetRotationX - icosahedron.rotation.x) * 0.05;
            icosahedron.rotation.y += 0.008 + (targetRotationY - icosahedron.rotation.y) * 0.05;
            
            // Inner sphere counter-rotation
            innerSphere.rotation.x -= 0.003;
            innerSphere.rotation.y -= 0.005;
            
            // Ring rotations
            ring.rotation.z += 0.002;
            ring2.rotation.z -= 0.001;
            ring2.rotation.x += 0.001;
            
            // Floating animation
            icosahedron.position.y = Math.sin(time) * 0.1;
            innerSphere.position.y = Math.sin(time + 1) * 0.08;
            
            // Particle rotation
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;
            
            // Pulse effect on rings
            const pulse = 1 + Math.sin(time * 2) * 0.02;
            ring.scale.set(pulse, pulse, pulse);
            
            renderer.render(scene, camera);
        }
        
        // Handle resize
        function onResize() {
            const width = 400;
            const height = 400;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
        
        window.addEventListener('resize', onResize);
        
        // Show 3D container, hide fallback
        container.classList.add('active');
        fallback.style.display = 'none';
        
        // Start animation
        animate();
        
    })();

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
    // MOBILE NAVIGATION
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

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

    document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // ============================================
    // CONTACT FORM - Using mailto as fallback
    // ============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        // Override form submission to use mailto
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            
            // Create mailto link
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:dhirajpurvey07@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Your email client has opened with the message. Please send it to complete your inquiry.');
            contactForm.reset();
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

    // ============================================
    // THEME TOGGLE
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            // Save theme preference
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
