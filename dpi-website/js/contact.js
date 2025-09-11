/**
 * Contact Page JavaScript
 * Handles form validation, map initialization, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            resetFormErrors();
            
            // Validate form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const privacy = document.getElementById('privacy');
            
            let isValid = true;
            
            // Validate Name
            if (!name.value.trim()) {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            // Validate Email
            if (!email.value.trim()) {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Phone (if provided)
            if (phone.value.trim() && !isValidPhone(phone.value.trim())) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate Subject
            if (!subject.value.trim()) {
                showError('subject', 'Please enter a subject');
                isValid = false;
            }
            
            // Validate Message
            if (!message.value.trim()) {
                showError('message', 'Please enter your message');
                isValid = false;
            }
            
            // Validate Privacy Policy
            if (!privacy.checked) {
                showError('privacy', 'You must accept the privacy policy');
                isValid = false;
            }
            
            // If form is valid, submit it (in a real application, you would send this to a server)
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this example, we'll just show a success message
                contactForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Scroll to success message
                document.getElementById('formSuccess').scrollIntoView({ behavior: 'smooth' });
                
                // Log form data to console (for demo purposes)
                const formData = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    phone: phone.value.trim(),
                    subject: subject.value.trim(),
                    message: message.value.trim(),
                    privacy: privacy.checked
                };
                console.log('Form submitted:', formData);
            }
        });
    }
    
    // Initialize Map
    function initMap() {
        // Check if map container exists
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) return;
        
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
    
    // Helper Functions
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (field && errorElement) {
            // Add error class to the field
            field.closest('.form-group').classList.add('error');
            
            // Show error message
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Focus on the field with error
            field.focus();
        }
    }
    
    function resetFormErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const formGroups = document.querySelectorAll('.form-group');
        
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
    }
    
    function isValidEmail(email) {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple phone validation (allows various formats)
        const phoneRegex = /^[+\d\s-()]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // Back to top button functionality
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
