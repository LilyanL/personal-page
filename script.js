// Show/hide the button on scroll and scroll to top on click
window.addEventListener('scroll', function() {
    const btn = document.getElementById('back-to-top');
    if (window.scrollY > 100) {
        btn.style.display = 'flex';
    } else {
        btn.style.display = 'none';
    }
});

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});