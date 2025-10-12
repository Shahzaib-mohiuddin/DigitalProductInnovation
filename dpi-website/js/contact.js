/**
 * Contact Page JavaScript
 * Handles form validation, map initialization, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initFormValidation();
    initAccordion();
    initMap();
    initFormAnimations();
    initBackToTop();
    
    // Initialize form validation
    function initFormValidation() {
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        const sendAnotherBtn = document.getElementById('sendAnother');
        
        if (!contactForm) return;

        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', function() {
                const inputGroup = this.closest('.input-group');
                if (inputGroup) {
                    inputGroup.classList.add('focused');
                }
            });

            // Add blur effect and validate
            input.addEventListener('blur', function() {
                const inputGroup = this.closest('.input-group');
                if (inputGroup) {
                    inputGroup.classList.remove('focused');
                }
                validateField(this);
            });

            // Real-time validation for required fields
            if (input.required) {
                input.addEventListener('input', function() {
                    validateField(this);
                });
            }
        });

        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Reset previous error messages and states
            resetFormErrors();

            // Validate all fields
            let isValid = true;
            const fieldsToValidate = [
                { id: 'name', required: true, type: 'text' },
                { id: 'email', required: true, type: 'email' },
                { id: 'phone', required: false, type: 'tel' },
                { id: 'subject', required: true, type: 'text' },
                { id: 'message', required: true, type: 'textarea' },
                { id: 'privacy', required: true, type: 'checkbox' }
            ];

            fieldsToValidate.forEach(field => {
                const element = document.getElementById(field.id);
                if (element && !validateField(element, field.required, field.type)) {
                    isValid = false;
                }
            });

            // If form is valid, submit it
            if (isValid) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;

                try {
                    // Show loading state
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<span class="spinner"></span> Sending...';

                    // Simulate API call (replace with actual fetch/axios call)
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Show success message
                    contactForm.style.opacity = '0';
                    contactForm.style.height = '0';
                    contactForm.style.padding = '0';
                    contactForm.style.margin = '0';
                    contactForm.style.overflow = 'hidden';

                    // Show success message with animation
                    formSuccess.style.display = 'block';
                    setTimeout(() => {
                        formSuccess.classList.add('show');
                        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 50);

                    // Log form data to console (for demo purposes)
                    const formData = {
                        name: document.getElementById('name').value.trim(),
                        email: document.getElementById('email').value.trim(),
                        phone: document.getElementById('phone').value.trim(),
                        subject: document.getElementById('subject').value.trim(),
                        message: document.getElementById('message').value.trim(),
                        privacy: document.getElementById('privacy').checked
                    };
                    console.log('Form submitted:', formData);

                    // In a real application, you would send the data to a server here
                    // Example:
                    // try {
                    //     const response = await fetch('/api/contact', {
                    //         method: 'POST',
                    //         headers: { 'Content-Type': 'application/json' },
                    //         body: JSON.stringify(formData)
                    // });
                    // const data = await response.json();
                    // Handle response...
                } catch (error) {
                    console.error('Form submission error:', error);
                    showFormError('An error occurred while sending your message. Please try again later.');
                } finally {
                    // Reset button state
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }
            } else {
                // Scroll to first error
                const firstError = contactForm.querySelector('.input-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.querySelector('input, textarea, select')?.focus();
                }
            }
        });

        // Handle "Send Another" button
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', function() {
                formSuccess.classList.remove('show');

                setTimeout(() => {
                    formSuccess.style.display = 'none';
                    contactForm.style.opacity = '1';
                    contactForm.style.height = 'auto';
                    contactForm.style.padding = '';
                    contactForm.style.margin = '';
                    contactForm.style.overflow = '';
                    contactForm.reset();
                    resetFormErrors();

                    // Focus on first field
                    const firstInput = contactForm.querySelector('input:not([type="hidden"]), textarea, select');
                    if (firstInput) firstInput.focus();
                }, 300);
            });
        }
    }

    // Initialize accordion functionality
    function initAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');

        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            if (!header || !content) return;

            // Set initial state
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            content.style.maxHeight = isExpanded ? content.scrollHeight + 'px' : '0';

            // Toggle on click
            header.addEventListener('click', function() {
                const wasExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !wasExpanded);

                if (wasExpanded) {
                    content.style.maxHeight = '0';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';

                    // Close other open accordion items
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherHeader = otherItem.querySelector('.accordion-header');
                            const otherContent = otherItem.querySelector('.accordion-content');
                            if (otherHeader && otherContent) {
                                otherHeader.setAttribute('aria-expanded', 'false');
                                otherContent.style.maxHeight = '0';
                            }
                        }
                    });
                }

                // Add animation class
                content.classList.add('animating');
                setTimeout(() => content.classList.remove('animating'), 300);
            });

            // Handle keyboard navigation
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // Initialize map
    function initMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.warn('Leaflet.js is not loaded. Map will not be initialized.');
            return;
        }

        // Coordinates for the map center (example: New York City)
        const mapCenter = [40.7128, -74.0060];

        // Create map instance
        const map = L.map('mapContainer').setView(mapCenter, 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker
        const marker = L.marker(mapCenter).addTo(map);
        marker.bindPopup("<b>DPi Office</b><br>123 Digital Lane, Tech City").openPopup();

        // Handle window resize
        window.addEventListener('resize', function() {
            map.invalidateSize();
        });
    }

    // Initialize map when Leaflet is loaded
    if (typeof L !== 'undefined') {
        initMap();
    } else {
        // If Leaflet isn't loaded yet, wait for it
        window.addEventListener('load', initMap);
    }

    // Initialize accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

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

            // Close other open accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherContent = document.getElementById(otherHeader.getAttribute('aria-controls'));
                    if (otherContent) {
                        otherContent.style.maxHeight = '0';
                    }
                }
            });
        });
    });

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
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.getElementById('hamburger');

                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    hamburger.classList.remove('active');
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
});
