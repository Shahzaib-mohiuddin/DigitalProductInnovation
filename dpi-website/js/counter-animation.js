document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate counter
    function animateCounter(counter, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            
            if (current >= target) {
                counter.textContent = formatNumber(target);
                return;
            }
            
            counter.textContent = formatNumber(Math.floor(current));
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    }
    
    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Initialize counters
    function initCounters() {
        const counters = document.querySelectorAll('.stat-value[data-count]');
        let hasAnimated = false;
        
        // Check if counters are in viewport on load
        const checkCounters = () => {
            if (hasAnimated) return;
            
            let allInView = true;
            counters.forEach(counter => {
                if (!isInViewport(counter)) {
                    allInView = false;
                }
            });
            
            if (allInView) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-count'));
                    const isDecimal = target % 1 !== 0;
                    const duration = isDecimal ? 3000 : 2000; // Slower for decimal numbers
                    animateCounter(counter, target, duration);
                });
            }
        };
        
        // Check on scroll and resize
        window.addEventListener('scroll', checkCounters);
        window.addEventListener('resize', checkCounters);
        
        // Initial check
        checkCounters();
    }
    
    // Initialize when DOM is loaded
    initCounters();
});
