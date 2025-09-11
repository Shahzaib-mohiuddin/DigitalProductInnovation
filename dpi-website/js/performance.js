/**
 * Performance Optimization Script
 * This script handles various performance optimizations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images with Intersection Observer
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }

    // Add loading="lazy" to iframes
    document.querySelectorAll('iframe').forEach(iframe => {
        if (!iframe.loading) {
            iframe.setAttribute('loading', 'lazy');
        }
    });

    // Load non-critical CSS
    const loadCSS = (href, before, media) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        if (media) link.media = media;
        if (before) before.parentNode.insertBefore(link, before);
        else document.head.appendChild(link);
        return link;
    };

    // Load Google Fonts asynchronously
    const WebFontConfig = {
        google: { families: ['Inter:300,400,500,600,700'] }
    };
    
    (function(d) {
        const wf = d.createElement('script'), s = d.scripts[0];
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
        wf.async = true;
        s.parentNode.insertBefore(wf, s);
    })(document);
});

// Service Worker Registration (temporarily disabled for local development)
// Uncomment this in production with HTTPS
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
*/
