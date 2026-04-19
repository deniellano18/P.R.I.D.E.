// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Navigation
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Mobile Menu Toggle (Basic implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('nav');
    
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Toggle logic could go here, for now we just log
            console.log("Mobile menu toggled");
            // Basic toggle by manipulating display (requires CSS updates for full effect)
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
                navLinks.style.padding = '2rem 0';
            }
        });
    }

    // Dynamic Data Readout Animation
    const processingLabel = document.querySelector('.readout-item .value:not(.highlight-cyan)');
    if (processingLabel) {
        const states = ['PROCESSING.', 'PROCESSING..', 'PROCESSING...'];
        let currentState = 0;
        setInterval(() => {
            currentState = (currentState + 1) % states.length;
            processingLabel.textContent = states[currentState];
        }, 500);
    }
});
<script src="js/script.js"></script>
