document.addEventListener('DOMContentLoaded', function() {
    // Animate metrics when they come into view
    const metrics = document.querySelectorAll('.metric-value');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetric(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    metrics.forEach(metric => observer.observe(metric));

    // Animate timeline progress
    const timeline = document.querySelector('.timeline-progress');
    if (timeline) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.height = '100%';
                    // Animate timeline items
                    const items = document.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('aos-animate');
                        }, index * 200);
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        timelineObserver.observe(timeline);
    }
});

function animateMetric(element) {
    const value = parseFloat(element.dataset.value);
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const increment = value / steps;
    const isDecimal = !Number.isInteger(value);
    
    const animation = setInterval(() => {
        currentStep++;
        const currentValue = increment * currentStep;
        
        if (isDecimal) {
            element.textContent = currentValue.toFixed(1);
        } else {
            element.textContent = Math.round(currentValue).toLocaleString();
        }

        if (currentStep === steps) {
            clearInterval(animation);
            element.textContent = isDecimal ? value.toFixed(1) : value.toLocaleString();
        }
    }, stepDuration);
}

// Initialize particles for the impact section background
function initImpactParticles() {
    particlesJS('impact-particles', {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#818cf8"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#818cf8",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                }
            }
        },
        retina_detect: true
    });
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        initImpactParticles();
    }
});
