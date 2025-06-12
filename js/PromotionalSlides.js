document.addEventListener("DOMContentLoaded", function () {
    // Reset page to top on load
    window.scrollTo(0, 0);

    // Course Scrolling Functionality
    const courseList = document.querySelector(".course-list");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (courseList && leftBtn && rightBtn) {
        // Calculate card width dynamically (including gap)
        const cardWidth = courseList.querySelector('.course-card').offsetWidth + 20;

        // Adjust scroll distance based on screen size
        function getScrollDistance() {
            const isDesktop = window.innerWidth >= 992;
            // Scroll by 4 cards on desktop, 2 cards on mobile/tablet
            return isDesktop ? cardWidth * 4 : cardWidth * 2;
        }

        // Button scrolling
        leftBtn.addEventListener("click", () => {
            courseList.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
        });

        rightBtn.addEventListener("click", () => {
            courseList.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
        });

        // Mouse drag functionality
        let isDragging = false;
        let startX;
        let scrollLeft;

        courseList.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - courseList.offsetLeft;
            scrollLeft = courseList.scrollLeft;
            courseList.style.scrollBehavior = 'auto'; // Disable smooth for dragging
        });

        courseList.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - courseList.offsetLeft;
            const walk = (x - startX) * 2; // Drag sensitivity
            courseList.scrollLeft = scrollLeft - walk;
        });

        courseList.addEventListener('mouseup', () => {
            isDragging = false;
            courseList.style.scrollBehavior = 'smooth'; // Restore smooth for snap
        });

        courseList.addEventListener('mouseleave', () => {
            isDragging = false;
            courseList.style.scrollBehavior = 'smooth';
        });

        // Touch support for mobile
        courseList.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - courseList.offsetLeft;
            scrollLeft = courseList.scrollLeft;
            courseList.style.scrollBehavior = 'auto';
        });

        courseList.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - courseList.offsetLeft;
            const walk = (x - startX) * 2;
            courseList.scrollLeft = scrollLeft - walk;
        });

        courseList.addEventListener('touchend', () => {
            isDragging = false;
            courseList.style.scrollBehavior = 'smooth';
        });

        // Update button visibility
        function updateButtonVisibility() {
            const maxScroll = courseList.scrollWidth - courseList.clientWidth;
            leftBtn.style.opacity = courseList.scrollLeft <= 0 ? '0.3' : '1';
            rightBtn.style.opacity = courseList.scrollLeft >= maxScroll - 1 ? '0.3' : '1';
        }

        courseList.addEventListener('scroll', updateButtonVisibility);
        // Update button visibility on window resize
        window.addEventListener('resize', updateButtonVisibility);
        updateButtonVisibility();
    }

    // Reset scroll position on page refresh
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
        if (courseList) {
            courseList.scrollLeft = 0;
        }
    };


    // Promotional Slides Carousel
    const promoCarousel = document.querySelector("#promoSlides");
    if (promoCarousel) {
        const carouselInner = promoCarousel.querySelector('.carousel-inner');
        const slides = promoCarousel.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;
        let currentIndex = 0;

        // Initialize Bootstrap carousel for auto-play
        const bootstrapCarousel = new bootstrap.Carousel(promoCarousel, {
            interval: 5000,
            ride: 'carousel',
            touch: true // Enable touch swipe
        });

        // Mouse drag functionality
        let isDraggingPromo = false;
        let startXPromo;
        let startTime;

        carouselInner.addEventListener('mousedown', (e) => {
            isDraggingPromo = true;
            startXPromo = e.pageX;
            startTime = Date.now();
            bootstrapCarousel.pause(); // Pause auto-play during drag
            carouselInner.style.transition = 'none'; // Disable transition for drag
        });

        carouselInner.addEventListener('mousemove', (e) => {
            if (!isDraggingPromo) return;
            e.preventDefault();
        });

        carouselInner.addEventListener('mouseup', (e) => {
            if (!isDraggingPromo) return;
            isDraggingPromo = false;
            carouselInner.style.transition = 'transform 0.5s ease'; // Restore transition
            const endX = e.pageX;
            const deltaX = startXPromo - endX;
            const timeElapsed = Date.now() - startTime;

            // Detect quick swipe or drag direction
            if (Math.abs(deltaX) > 50 || (Math.abs(deltaX) > 20 && timeElapsed < 200)) {
                if (deltaX > 0) {
                    currentIndex = (currentIndex + 1) % totalSlides; // Next slide
                } else if (deltaX < 0) {
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Prev slide
                }
                bootstrapCarousel.to(currentIndex);
            }
            bootstrapCarousel.cycle(); // Resume auto-play
        });

        carouselInner.addEventListener('mouseleave', () => {
            if (isDraggingPromo) {
                isDraggingPromo = false;
                carouselInner.style.transition = 'transform 0.5s ease';
                bootstrapCarousel.cycle();
            }
        });

        // Touch support for mobile
        carouselInner.addEventListener('touchstart', (e) => {
            isDraggingPromo = true;
            startXPromo = e.touches[0].pageX;
            startTime = Date.now();
            bootstrapCarousel.pause();
            carouselInner.style.transition = 'none';
        });

        carouselInner.addEventListener('touchmove', (e) => {
            if (!isDraggingPromo) return;
            e.preventDefault(); // Prevent scrolling
        });

        carouselInner.addEventListener('touchend', (e) => {
            if (!isDraggingPromo) return;
            isDraggingPromo = false;
            carouselInner.style.transition = 'transform 0.5s ease';
            const endX = e.changedTouches[0].pageX;
            const deltaX = startXPromo - endX;
            const timeElapsed = Date.now() - startTime;

            if (Math.abs(deltaX) > 50 || (Math.abs(deltaX) > 20 && timeElapsed < 200)) {
                if (deltaX > 0) {
                    currentIndex = (currentIndex + 1) % totalSlides;
                } else if (deltaX < 0) {
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                }
                bootstrapCarousel.to(currentIndex);
            }
            bootstrapCarousel.cycle();
        });
    }

    // Reset scroll positions on page refresh
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
        if (courseList) {
            courseList.scrollLeft = 0;
        }
    };
});