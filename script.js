document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // Master Timeline configuration
  const masterTl = gsap.timeline();

  // --- 1. HERO SECTION ---
  function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Staggered Text Reveal
    tl.from(".hero-content > *", {
      y: 50,
      opacity: 0,
      rotationX: 10,
      duration: 1.2,
      stagger: 0.15,
      transformOrigin: "0% 50%",
    })
      // Elastic bounce effect
      .from(
        ".terminal-container",
        {
          scale: 0.8,
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          clearProps: "all", // Clear properties for hover states
        },
        "-=0.8",
      );

    return tl;
  }

  // --- 2. ADVANCED ARROW ANIMATION ---
  function initArrowAnimations() {
    const arrows = document.querySelectorAll(".arrow-wrapper");

    arrows.forEach((wrapper) => {
      const path = wrapper.querySelector("path:first-child"); // Main line
      const head = wrapper.querySelector("path:last-child"); // Arrow head
      const text = wrapper.querySelector(".arrow-text");

      // Calculate path length for draw effect
      const length = path.getTotalLength();

      // Set initial states
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
      gsap.set(head, { scale: 0, transformOrigin: "center center" });
      gsap.set(text, { opacity: 0, y: 10, rotation: -5 });

      // Create ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl
        // 1. Draw line
        .to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
        })
        // 2. Pop arrow head
        .to(
          head,
          {
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1.5, 0.5)",
          },
          "-=0.3",
        )
        // 3. Reveal text with stamp effect
        .to(
          text,
          {
            opacity: 1,
            y: 0,
            rotation: -10, // Slight handwriting tilt
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.4",
        );

      // 4. Continuous Floating
      gsap.to(wrapper, {
        y: "-=8",
        rotation: "1",
        duration: "random(2, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: "random(0, 1)", // Random start delay
      });
    });
  }

  // --- 3. STACK CARDS ---
  function initStackAnimation() {
    // Batch animation for performance
    ScrollTrigger.batch(".stack-card", {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: { each: 0.1, grid: [2, 3] },
          duration: 0.8,
          ease: "back.out(1.2)",
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
      start: "top 85%",
    });

    gsap.set(".stack-card", { opacity: 0, y: 50, scale: 0.9 });
  }

  // --- 4. PRICING CARDS ---
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
      clearProps: "transform",
    });
  }

  // --- 5. TERMINAL TYPING ---
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
      const speed = isDeleting ? 30 : 80;

      if (isDeleting) {
        typingArea.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingArea.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, speed);
      }
    };

    setTimeout(typeEffect, 1000);
  }

  // --- 6. PARALLAX EFFECT ---
  function initParallax() {
    gsap.to(".terminal-container", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 50,
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

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });
});
