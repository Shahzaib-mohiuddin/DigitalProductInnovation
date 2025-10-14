document.addEventListener('DOMContentLoaded', function() {
    // Animated counters
    const statValues = document.querySelectorAll('.stat-value');
    
    // Check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Animate counter
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0; // Check if number has decimal
        const duration = 2000; // 2 seconds
        const step = (timestamp, start, increment, element) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const current = Math.floor(progress * (target - increment) + increment);
            
            if (isDecimal) {
                element.textContent = (current / 100).toFixed(2);
            } else {
                element.textContent = current.toLocaleString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame((ts) => step(ts, start, increment, element));
            } else {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }
        };
        
        window.requestAnimationFrame((timestamp) => step(timestamp, null, 0, element));
    };

    // Animate circles
    const animateCircles = () => {
        const circles = document.querySelectorAll('.stat-circle-fill');
        circles.forEach(circle => {
            const value = circle.parentElement.querySelector('.stat-value').getAttribute('data-count');
            const percentage = parseFloat(value);
            const circumference = 2 * Math.PI * 15.9155; // 2πr where r = 15.9155 (from viewBox)
            const offset = circumference - (percentage / 100) * circumference;
            
            // Only animate if not already animated
            if (!circle.style.strokeDashoffset) {
                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = circumference;
                
                // Trigger reflow
                void circle.offsetWidth;
                
                // Animate to final position
                circle.style.transition = 'stroke-dashoffset 2s ease-out';
                circle.style.strokeDashoffset = offset;
            }
        });
    };

    // Animate timeline progress
    const animateTimeline = () => {
        const timelineProgress = document.querySelector('.timeline-progress');
        if (timelineProgress && isInViewport(timelineProgress)) {
            timelineProgress.querySelector('&::after').style.transform = 'scaleY(1)';
            
            // Animate timeline items
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 300); // Stagger the animations
            });
        }
    };

    // Initialize particles
    const initParticles = () => {
        const container = document.getElementById('impact-particles');
        if (!container) return;
        
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size between 2px and 6px
            const size = 2 + Math.random() * 4;
            
            // Random animation duration between 10s and 20s
            const duration = 10 + Math.random() * 10;
            
            // Random delay up to 5s
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${0.1 + Math.random() * 0.2});
                border-radius: 50%;
                pointer-events: none;
                animation: float ${duration}s ease-in-out ${delay}s infinite alternate;
            `;
            
            container.appendChild(particle);
        }
    };

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            50% {
                opacity: 0.7;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);

    // Check if element is in viewport and animate
    const checkScroll = () => {
        statValues.forEach(stat => {
            if (isInViewport(stat) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat);
                animateCircles();
                animateTimeline();
            }
        });
    };

    // Initialize
    initParticles();
    
    // Check on load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});
