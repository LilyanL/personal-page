// Show/hide the button on scroll and scroll to top on click
window.addEventListener('scroll', function() {
    const btn = document.getElementById('back-to-top');
    if (btn) {
        if (window.scrollY > 100) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
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

    /**
     * Highlights the navigation link corresponding to the section currently in view.
     * Determines the active section based on the scroll position and updates the
     * 'active' class on navigation links accordingly.
     *
     * Assumes the existence of global `sections` and `sectionLinks` arrays.
     */
    let isScrollingToSection = false;
    let scrollTimeout = null;

    function activateCurrentSection() {
        if (isScrollingToSection) return;
        let index = 0;
        const scrollPos = window.scrollY + window.innerHeight / 2.5;
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

    window.addEventListener('scroll', function() {
        if (isScrollingToSection) {
            // Debounce: wait for scroll to finish
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                isScrollingToSection = false;
                activateCurrentSection();
            }, 120);
        } else {
            activateCurrentSection();
        }
    });

    sectionLinks.forEach((link, i) => {
        link.addEventListener('click', function(e) {
            // Only handle anchor links
            if (sections[i]) {
                e.preventDefault();
                isScrollingToSection = true;
                sectionLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Fallback: after a delay, allow scroll handler again
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    isScrollingToSection = false;
                    activateCurrentSection();
                }, 800);
            }
        });
    });

    // Initial activation
    activateCurrentSection();
});