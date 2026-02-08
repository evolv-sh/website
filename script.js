document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // GSAP Animations
    initAnimations();

    // Terminal typing effect configuration
    const typingArea = document.querySelector('.typing-area');
    const commands = [
        "curl -I https://evolv.tech",
        "echo 'Infrastructure Scaled!'",
        "sleep 99999"
    ];
    
    let cmdIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 2000;

    // Typing logic implementation
    function typeCommand() {
        const currentCommand = commands[cmdIndex];
        
        if (isDeleting) {
            typingArea.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingArea.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentCommand.length) {
            typeSpeed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            cmdIndex = (cmdIndex + 1) % commands.length;
        }

        setTimeout(typeCommand, typeSpeed);
    }

    // Start typing animation if element exists
    if (typingArea) {
        setTimeout(typeCommand, 1000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                // Offset for fixed header if necessary, otherwise default scroll
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

// GSAP Animation setup function
function initAnimations() {
    // Hero section entrance animation on load
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    })
    .from(".terminal-container", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=0.4"); // Overlap slightly with previous animation

    // Staggered animation for stack cards on scroll
    gsap.from(".stack-card", {
        scrollTrigger: {
            trigger: ".stack-grid",
            start: "top 80%", // Start animation when top of grid hits 80% viewport height
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Staggered animation for pricing cards on scroll
    gsap.from(".plan-card", {
        scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });
}
