document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('overlay');

    // Mobile menu functionality
    hamburger.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    overlay.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Update hero image for mobile
    function updateHeroImage() {
        const desktopHero = document.querySelector('.desktop-hero');
        const mobileHero = document.querySelector('.mobile-hero');

        if (window.innerWidth <= 768) {
            desktopHero.style.display = 'none';
            mobileHero.style.display = 'block';
        } else {
            desktopHero.style.display = 'block';
            mobileHero.style.display = 'none';
        }
    }

    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    mobileDropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.mobile-dropdown-header');

        header.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.classList.toggle('active');

            mobileDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
    });

    updateHeroImage();
    window.addEventListener('resize', updateHeroImage);

    // Scroll animations
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.client-logo');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 20) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Add smooth parallax effect
    const parallax = function () {
        const shapes = document.querySelectorAll('.geometric-elements > div, .geometric-elements > svg');

        window.addEventListener('mousemove', function (e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            shapes.forEach((shape, index) => {
                const speed = 0.05 * (index % 3 + 1);
                const offsetX = (x - 0.5) * speed * 40;
                const offsetY = (y - 0.5) * speed * 40;

                shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    };

    // Add staggered entrance animations
    const staggerElements = function () {
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.animation = `fadeIn 0.5s ease-out forwards ${0.2 + (index * 0.1)}s`;
        });
    };

    // Add smooth scrolling for anchor links
    const smoothScroll = function () {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Initialize additional animations if not on mobile
    if (window.innerWidth > 768) {
        parallax();
        staggerElements();
    }

    smoothScroll();

    // Add scroll event listener for scroll animations
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('mouseenter', function () {
        // Start the shimmer effect on hover
        const shimmerElement = this.querySelector('.shimmer');
        if (!shimmerElement) {
            const shimmer = document.createElement('span');
            shimmer.classList.add('shimmer');
            this.appendChild(shimmer);
        }
    });

    ctaButton.addEventListener('mouseleave', function () {
        // Remove the shimmer effect on hover out
        const shimmerElement = this.querySelector('.shimmer');
        if (shimmerElement) {
            shimmerElement.remove();
        }
    });

    // Optional: Add a click effect too
    ctaButton.addEventListener('click', function () {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });

    // Add preloader
    const addPreloader = function () {
        const preloader = document.createElement('div');
        preloader.classList.add('preloader');
        preloader.innerHTML = `
            <div class="preloader-spinner"></div>
        `;
        document.body.appendChild(preloader);
    };

    window.addEventListener('load', function () {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 500);
        }
    });
});