# evolv.tech Landing Page

The official landing page for **evolv.tech**, a DevOps-as-a-Service provider. Built with a focus on performance, minimalism, and engineering aesthetics (Arch Linux, Terminal vibes).

---

## Features

-   **Zero Bloatware** Built with pure **HTML, CSS, and Vanilla JavaScript**. No heavy frameworks (React/Vue/Next.js) to ensure maximum load speed.
-   **Interactive Animations** Powered by **GSAP (GreenSock)** for complex timelines, including the "hand-drawn" arrow effects and terminal typing sequences.
-   **Responsive Design** Fully optimized for mobile, tablet, and desktop screens with a "mobile-first" approach.
-   **Conversion Focused** Integrated with **Cal.com** for direct meeting bookings and `mailto` links for specific service inquiries.

## Local Development

You can easily run this project locally to test changes or tweak the animations.

### Step 1: Clone the Repository

Clone the repository to your local machine using Git.

```bash
git clone [https://github.com/evolv-sh/website.git](https://github.com/evolv-sh/website.git)  
cd website
```

### Step 2: Run with Live Server

Since this is a static site, you don't need `npm install` or a build process.

1.  **VS Code**: Install the "Live Server" extension.
2.  Right-click on `index.html` and select **"Open with Live Server"**.
3.  The site will launch at `http://127.0.0.1:5500`.

*Alternatively, you can use Python's built-in server:*  

```
python3 -m http.server
```

### Step 3: Modify Content

-   **Structure**: Edit `index.html` for text and layout changes.
-   **Styling**: Edit `style.css`. We use CSS Variables (`:root`) for the color palette.
-   **Logic**: Edit `script.js` to adjust GSAP animation timings or terminal text.

## Deployment

-   **Automatic Deployment** This repository is configured to deploy automatically to **Vercel** / **Cloudflare Pages** on every push to the `main` branch.
-   **Manual Trigger** Ensure you test responsive layouts locally before pushing changes to production.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

**Note:** The branding assets (logo, copy) are proprietary to **evolv.tech**.
