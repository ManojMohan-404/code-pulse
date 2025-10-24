window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('loader-hidden');
        }, 1000);
    }
});