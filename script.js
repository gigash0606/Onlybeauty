// Prevents the browser from jumping to old scroll positions
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Forces a layout recalculation on refresh to prevent Safari height bugs
window.addEventListener('load', () => {
    const setHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--hero-height', `${window.innerHeight}px`);
    };
    setHeight();
    window.addEventListener('resize', setHeight);
});

// FAQ toggle
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});

const modalButtons = document.querySelectorAll('.footer-text-btn');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-btn');

modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        modal.querySelector('.modal-text').scrollTop = 0; // scroll to top
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) modal.style.display = 'none';
    });
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    history.replaceState(null, '', window.location.pathname);

    AOS.init({
        duration: 350,      // Longer duration for a premium feel
        easing: 'ease-out',  // Clean fade without the "bounce/wobble"
        once: true,          // Animation happens only once
        offset: 50,         // Starts 100px before the element enters view
        delay: 0,
    });
});

// Smooth scroll logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function to calculate the actual viewable height and lock it
function lockHeroHeight() {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--hero-height', vh + 'px');
}

// Run on load
window.addEventListener('load', lockHeroHeight);

// Only recalculate if the screen actually rotates (iPhone flip)
// This prevents the "jump" during normal vertical scrolling
window.addEventListener('orientationchange', () => {
    setTimeout(lockHeroHeight, 200);
});
