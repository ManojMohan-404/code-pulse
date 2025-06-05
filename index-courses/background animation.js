document.addEventListener("DOMContentLoaded", () => {
    // Code Rain Animation
    const codeRain = document.getElementById("code-rain");
    const chars = ['{', '}', '(', ')', ';', '=>', 'let', 'const', 'function', '=>', 'var'];
    let columns = Math.floor(window.innerWidth / 20);
    let interval = window.innerWidth <= 768 ? 500 : 300;
    let charsPerInterval = window.innerWidth <= 768 ? 1 : 2;
    let activeChars = 0;
    const maxChars = window.innerWidth <= 576 ? 10 : 50;

    function createChar() {
        if (activeChars >= maxChars) return;
        const char = document.createElement("div");
        char.className = "code-char";
        char.innerText = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + "vw";
        char.style.animationDuration = Math.random() * 5 + 5 + "s";
        char.style.fontSize = Math.random() * 0.5 + 1 + "rem";
        codeRain.appendChild(char);
        activeChars++;
        setTimeout(() => {
            char.remove();
            activeChars--;
        }, 10000);
    }

    const codeRainInterval = setInterval(() => {
        if (window.innerWidth > 576 && activeChars < maxChars) {
            for (let i = 0; i < charsPerInterval; i++) {
                createChar();
            }
        }
    }, interval);

    // Update code rain on window resize
    window.addEventListener("resize", () => {
        columns = Math.floor(window.innerWidth / 20);
        interval = window.innerWidth <= 768 ? 500 : 300;
        charsPerInterval = window.innerWidth <= 768 ? 1 : 2;
    });

    // Event delegation for enroll buttons
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".enroll-btn");
        if (button) {
            event.preventDefault(); // Prevent default behavior
            window.location.href = "/login.html"; // Redirect to login
        }
    });

    // Show More Sections Button
    const showMoreBtn = document.getElementById("showMoreBtn");
    if (showMoreBtn) {
        showMoreBtn.addEventListener("click", () => {
            const isExpanded = showMoreBtn.getAttribute("aria-expanded") === "true";
            showMoreBtn.setAttribute("aria-expanded", !isExpanded);
            showMoreBtn.textContent = isExpanded ? "Show More Sections" : "Show Fewer Sections";
            // Add logic to toggle content visibility here, e.g.:
            // document.querySelector(".sections").classList.toggle("expanded");
        });
    }

    // Navbar scroll effect with throttling
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        if (Date.now() - lastScroll > 50) {
            lastScroll = Date.now();
            const navbar = document.querySelector(".navbar");
            if (navbar) {
                navbar.classList.toggle("scrolled", window.scrollY > 50);
            }
        }
    });

    // Clone .sticky-buy for desktop sidebar
    if (window.innerWidth > 768) {
        const stickyBuy = document.querySelector(".sticky-buy");
        const placeholder = document.querySelector(".sticky-buy-placeholder");
        if (stickyBuy && placeholder) {
            const clone = stickyBuy.cloneNode(true);
            // Remove IDs from cloned buttons to avoid duplicates
            clone.querySelectorAll("#add-to-cart, #buy-now").forEach((btn) => {
                btn.removeAttribute("id");
            });
            placeholder.appendChild(clone);
        }
    }
});