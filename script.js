document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const cursor = document.querySelector('.cursor');
    const commands = [
        { text: "terraform apply -auto-approve", output: true },
        { text: "docker compose up -d", output: true },
        { text: "curl -I https://evolv.tech", output: true },
        { text: "echo 'Infrastructure Scaled!'", output: false }
    ];

    let cmdIndex = 0;
    let charIndex = 0;
    const typingSpeed = 50;
    const pauseBetween = 2000;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
