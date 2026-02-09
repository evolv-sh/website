document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // Master Timeline configuration
  const masterTl = gsap.timeline();

  // --- 1. HERO SECTION (Complex Entrance) ---
  function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Staggered Text Reveal with slight rotation
    tl.from(".hero-content > *", {
      y: 50,
      opacity: 0,
      rotationX: 10,
      duration: 1.2,
      stagger: 0.15,
      transformOrigin: "0% 50%",
    })
      // Terminal: Elastic Pop-up effect (Bouncy)
      .from(
        ".terminal-container",
        {
          scale: 0.8,
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)", // The "Bouncy" secret
          clearProps: "all", // Clean up for hover effects later
        },
        "-=0.8",
      );

    return tl;
  }

  // --- 2. ADVANCED ARROW ANIMATION (Draw + Pop + Float) ---
  function initArrowAnimations() {
    const arrows = document.querySelectorAll(".arrow-wrapper");

    arrows.forEach((wrapper) => {
      const path = wrapper.querySelector("path:first-child"); // Main line
      const head = wrapper.querySelector("path:last-child"); // Arrow head
      const text = wrapper.querySelector(".arrow-text");

      // Calculate path length for "Draw" effect
      const length = path.getTotalLength();

      // Set initial states
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
      gsap.set(head, { scale: 0, transformOrigin: "center center" });
      gsap.set(text, { opacity: 0, y: 10, rotation: -5 });

      // Create ScrollTrigger Timeline for each arrow
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl
        // 1. Draw the line smoothly
        .to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
        })
        // 2. Pop the arrow head with elastic effect
        .to(
          head,
          {
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1.5, 0.5)",
          },
          "-=0.3",
        )
        // 3. Reveal text with a "stamp" effect
        .to(
          text,
          {
            opacity: 1,
            y: 0,
            rotation: -10, // Tilt it slightly like handwriting
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.4",
        );

      // 4. Continuous Floating (The "Living" feel)
      // We use a separate tween so it doesn't conflict with scrollTrigger
      gsap.to(wrapper, {
        y: "-=8",
        rotation: "1", // Subtle rotation
        duration: "random(2, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: "random(0, 1)", // Randomize start time so arrows don't sync
      });
    });
  }

  // --- 3. STACK CARDS (Staggered Grid Reveal) ---
  function initStackAnimation() {
    // Create a batch animation for performance
    ScrollTrigger.batch(".stack-card", {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: { each: 0.1, grid: [2, 3] },
          duration: 0.8,
          ease: "back.out(1.2)", // Subtle overshoot
          overwrite: true,
        }),
      onLeave: (batch) => gsap.set(batch, { opacity: 0, y: 50, scale: 0.9 }),
      onEnterBack: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          overwrite: true,
        }),
      onLeaveBack: (batch) =>
        gsap.set(batch, { opacity: 0, y: 50, scale: 0.9 }),
      start: "top 85%", // Trigger point
    });

    // Set initial state for batching
    gsap.set(".stack-card", { opacity: 0, y: 50, scale: 0.9 });
  }

  // --- 4. PRICING CARDS (3D Tilt Entrance) ---
  function initPricingAnimation() {
    const cards = document.querySelectorAll(".plan-card");

    gsap.from(cards, {
      scrollTrigger: {
        trigger: ".pricing-grid",
        start: "top 80%",
      },
      y: 100,
      rotationX: 15, // 3D Tilt effect
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      clearProps: "transform", // Clear transform after animation to allow CSS hover
    });
  }

  // --- 5. TERMINAL TYPING (Realistic & Infinite) ---
  function initTerminalTyping() {
    const typingArea = document.querySelector(".typing-area");
    if (!typingArea) return;

    const phrases = [
      "curl -I https://evolv.tech",
      "terraform apply --auto-approve",
      "kubectl get pods -n production",
      "echo 'Deployment Successful 🚀'",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentPhrase = phrases[phraseIndex];
      const speed = isDeleting ? 30 : 80; // Deleting is faster

      if (isDeleting) {
        typingArea.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingArea.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500); // Pause before new line
      } else {
        setTimeout(typeEffect, speed);
      }
    };

    // Start loop
    setTimeout(typeEffect, 1000);
  }

  // --- 6. PARALLAX EFFECT (Background) ---
  function initParallax() {
    // Move the terminal slightly opposite to scroll direction
    gsap.to(".terminal-container", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 50, // Moves down slower than scroll
      ease: "none",
    });
  }

  // --- EXECUTE ---
  initHeroAnimation();
  initArrowAnimations();
  initStackAnimation();
  initPricingAnimation();
  initTerminalTyping();
  initParallax();

  // Smooth Scroll for Anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        // GSAP ScrollTo Plugin is optional, using native for lightweight
        const offset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });
});
