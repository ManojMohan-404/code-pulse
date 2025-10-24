document.addEventListener('DOMContentLoaded', function() {
    const courseList = document.querySelector('.course-list');
    const courseCards = document.querySelectorAll('.course-card');
    let isDown = false;
    let startX;
    let scrollLeft;
    let velX = 0;
    let momentumID;
    let isAnimating = false;

    // Calculate card width including gap
    const cardWidth = courseCards[0]?.offsetWidth + 20; // 20px is the gap

    // Mouse events for smooth drag scrolling
    courseList.addEventListener('mousedown', (e) => {
        if (isAnimating) return;
        isDown = true;
        courseList.style.cursor = 'grabbing';
        startX = e.pageX - courseList.offsetLeft;
        scrollLeft = courseList.scrollLeft;
        cancelMomentumTracking();
    });

    courseList.addEventListener('mouseleave', () => {
        if (isDown) {
            snapToNearestCard();
        }
        isDown = false;
        courseList.style.cursor = 'grab';
    });

    courseList.addEventListener('mouseup', () => {
        if (isDown) {
            snapToNearestCard();
        }
        isDown = false;
        courseList.style.cursor = 'grab';
    });

    courseList.addEventListener('mousemove', (e) => {
        if (!isDown || isAnimating) return;
        e.preventDefault();
        const x = e.pageX - courseList.offsetLeft;
        const walk = (x - startX) * 1.5; // Reduced sensitivity
        const prevScrollLeft = courseList.scrollLeft;
        courseList.scrollLeft = scrollLeft - walk;
        velX = courseList.scrollLeft - prevScrollLeft;
    });

    // Smooth button navigation with card alignment
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    function updateButtonVisibility() {
        if (leftBtn && rightBtn) {
            leftBtn.style.opacity = courseList.scrollLeft <= 0 ? '0.5' : '1';
            rightBtn.style.opacity = 
                courseList.scrollLeft >= (courseList.scrollWidth - courseList.clientWidth) 
                ? '0.5' : '1';
        }
    }

    leftBtn?.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        const targetScroll = courseList.scrollLeft - cardWidth;
        smoothScrollTo(targetScroll, () => {
            isAnimating = false;
            updateButtonVisibility();
        });
    });

    rightBtn?.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        const targetScroll = courseList.scrollLeft + cardWidth;
        smoothScrollTo(targetScroll, () => {
            isAnimating = false;
            updateButtonVisibility();
        });
    });

    // Smooth scroll function with callback
    function smoothScrollTo(targetScroll, callback) {
        const startScroll = courseList.scrollLeft;
        const distance = targetScroll - startScroll;
        const duration = 500; // ms
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            courseList.scrollLeft = startScroll + (distance * easeProgress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                if (callback) callback();
            }
        }

        requestAnimationFrame(animation);
    }

    // Snap to nearest card when scrolling ends
    function snapToNearestCard() {
        const scrollLeft = courseList.scrollLeft;
        const nearestCardIndex = Math.round(scrollLeft / cardWidth);
        const targetScroll = nearestCardIndex * cardWidth;

        if (scrollLeft !== targetScroll) {
            isAnimating = true;
            smoothScrollTo(targetScroll, () => {
                isAnimating = false;
                updateButtonVisibility();
            });
        }
    }

    // Mouse wheel support
    courseList.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (isAnimating) return;

        const scrollAmount = Math.sign(e.deltaY) * cardWidth;
        const targetScroll = courseList.scrollLeft + scrollAmount;

        isAnimating = true;
        smoothScrollTo(targetScroll, () => {
            isAnimating = false;
            updateButtonVisibility();
        });
    }, { passive: false });

    // Touch events for mobile with snap
    courseList.addEventListener('touchstart', (e) => {
        if (isAnimating) return;
        isDown = true;
        startX = e.touches[0].pageX - courseList.offsetLeft;
        scrollLeft = courseList.scrollLeft;
    });

    courseList.addEventListener('touchend', () => {
        if (isDown) {
            snapToNearestCard();
        }
        isDown = false;
    });

    courseList.addEventListener('touchmove', (e) => {
        if (!isDown || isAnimating) return;
        const x = e.touches[0].pageX - courseList.offsetLeft;
        const walk = (x - startX) * 1.5;
        courseList.scrollLeft = scrollLeft - walk;
    });

    // Initialize button visibility
    updateButtonVisibility();
    
    // Update button visibility on scroll
    courseList.addEventListener('scroll', updateButtonVisibility);
});