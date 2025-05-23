document.addEventListener("DOMContentLoaded", function () {
    // Initialize particles.js background
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { value: window.innerWidth < 576 ? 50 : 100 }, // Fewer particles on mobile
                color: { value: "#66FCF1" },
                shape: { type: "circle" },
                opacity: { value: 0.7 },
                size: { value: 3 },
                move: { enable: true, speed: window.innerWidth < 576 ? 1.5 : 3 } // Slower on mobile
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: window.innerWidth >= 768, mode: "repel" }, // Disable hover on mobile
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    repel: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});