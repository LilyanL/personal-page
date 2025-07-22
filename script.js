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

// Highlight current section in section-navbar
document.addEventListener('DOMContentLoaded', function() {
    const sectionLinks = document.querySelectorAll('.section-navbar a');
    const sectionIds = Array.from(sectionLinks).map(link => link.getAttribute('href'));
    const sections = sectionIds.map(id => document.querySelector(id));

    function activateCurrentSection() {
        let index = 0;
        const scrollPos = window.scrollY + window.innerHeight / 3;
        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            if (sec && sec.offsetTop <= scrollPos) {
                index = i;
            }
        }
        sectionLinks.forEach((link, i) => {
            if (i === index) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', activateCurrentSection);

    // Also update on click for instant feedback
    sectionLinks.forEach((link, i) => {
        link.addEventListener('click', function() {
            sectionLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Initial activation
    activateCurrentSection();
});