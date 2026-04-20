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

    // Scroll Entrance Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach((element) => {
        observer.observe(element);
    });

    // Handle Form Submission
    const demoForm = document.getElementById('demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = demoForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            const requestData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                hectares: document.getElementById('hectares').value
            };

            try {
                const response = await fetch('/api/request-demo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                const result = await response.json();

                if (response.ok) {
                    demoForm.reset();
                    const successDiv = document.getElementById('form-success');
                    successDiv.textContent = 'Thank you! Your demo request has been received.';
                    successDiv.style.display = 'block';
                    setTimeout(() => {
                        successDiv.style.display = 'none';
                    }, 5000);
                } else {
                    alert('Error submitting request: ' + (result.message || 'Unknown error'));
                }
            } catch (error) {
                alert('Error submitting request. Please ensure the backend server is running.');
                console.error('Error:', error);
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
