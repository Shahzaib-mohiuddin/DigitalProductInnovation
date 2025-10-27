/**
 * Project Details Page JavaScript
 * Handles interactive elements for the project details page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Update current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId.startsWith('#!')) {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
                
                // Calculate header height for offset
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const offset = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Initialize lightgallery if it exists on the page
    if (typeof lightGallery !== 'undefined' && document.getElementById('lightgallery')) {
        lightGallery(document.getElementById('lightgallery'), {
            selector: '.gallery-item',
            download: false,
            share: false,
            zoom: true,
            counter: true,
            rotate: true
        });
    }

    // Accordion functionality for FAQ section
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                const content = document.getElementById(this.getAttribute('aria-controls'));
                
                // Toggle aria-expanded attribute
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle content visibility
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            });
            
            // Initialize accordion state
            const content = document.getElementById(header.getAttribute('aria-controls'));
            if (header.getAttribute('aria-expanded') === 'true') {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    }

    // Animate statistics on scroll
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number, .result-number');
        
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = parseFloat(element.textContent);
                    const suffix = element.textContent.match(/[^0-9.,]+/g) || '';
                    const duration = 2000; // Animation duration in ms
                    const steps = 50; // Number of steps
                    const stepValue = finalValue / steps;
                    let currentValue = 0;
                    const stepTime = duration / steps;
                    
                    const timer = setInterval(() => {
                        currentValue += stepValue;
                        if (currentValue >= finalValue) {
                            element.textContent = finalValue + (suffix.length ? suffix[0] : '');
                            clearInterval(timer);
                        } else {
                            element.textContent = Math.round(currentValue) + (suffix.length ? suffix[0] : '');
                        }
                    }, stepTime);
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    };
    
    // Run stats animation
    animateStats();

    // Parallax effect for project hero image
    const projectHero = document.querySelector('.project-hero');
    
    if (projectHero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            projectHero.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        });
    }

    // Add smooth scroll behavior for browsers that don't support it natively
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
        document.head.appendChild(script);
    }
});

// Handle browser resize events with debounce
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate any layout-dependent values here
        const accordionContents = document.querySelectorAll('.accordion-content');
        accordionContents.forEach(content => {
            const header = content.previousElementSibling;
            if (header.getAttribute('aria-expanded') === 'true') {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    }, 250);
});
