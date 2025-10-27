document.addEventListener('DOMContentLoaded', function() {
    // Text rotator functionality
    const textRotator = document.querySelector('.text-rotator');
    
    if (textRotator) {
        const words = JSON.parse(textRotator.getAttribute('data-rotate'));
        const rotatingText = textRotator.querySelector('.rotating-text');
        let currentIndex = 0;
        
        function rotateText() {
            // Fade out
            rotatingText.style.opacity = '0';
            
            // Change text after fade out
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                rotatingText.textContent = words[currentIndex];
                
                // Fade in
                setTimeout(() => {
                    rotatingText.style.opacity = '1';
                }, 50);
            }, 500);
        }
        
        // Initial rotation after 3 seconds, then every 3 seconds
        setTimeout(() => {
            setInterval(rotateText, 3000);
            // First rotation after initial delay
            setTimeout(rotateText, 3000);
        }, 1000);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
