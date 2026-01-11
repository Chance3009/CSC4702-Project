// ========================================
// ENHANCED INTERACTIVE FEATURES
// CSC4702 Robotics Education Portal
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeVideoTracking();
    addLoadingAnimation();
    console.log('✅ Robotics Education Portal Loaded Successfully');
});

// ========================================
// NAVIGATION ENHANCEMENT
// ========================================
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Highlight active page
        if (href === currentPage ||
            (currentPage.includes('visualizer') && href === 'interactive.html')) {
            link.classList.add('active');
        }

        // Add hover effect sound (visual feedback)
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// INTERSECTION OBSERVER ANIMATIONS
// ======================================== */
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation (except those with inline animation)
    document.querySelectorAll('section').forEach(section => {
        if (!section.style.animation) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(section);
        }
    });

    // Observe feature boxes with stagger effect
    document.querySelectorAll('.feature-box').forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(40px) scale(0.95)';
        box.style.transition = `
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s,
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s
        `;
        observer.observe(box);
    });

    // Observe video cards with enhanced animation
    document.querySelectorAll('.video-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        card.style.transition = `
            opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s,
            transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s
        `;
        observer.observe(card);
    });
}

// ========================================
// VIDEO INTERACTION TRACKING
// ========================================
function initializeVideoTracking() {
    const videos = document.querySelectorAll('video');

    videos.forEach((video, index) => {
        // Add play button overlay styling
        video.style.cursor = 'pointer';

        // Track video plays
        video.addEventListener('play', function () {
            console.log(`📹 Video ${index + 1} started playing`);
        });

        // Track video completion
        video.addEventListener('ended', function () {
            console.log(`✅ Video ${index + 1} completed`);
            showVideoCompletionMessage(this, index);
        });

        // Track video pause
        video.addEventListener('pause', function () {
            if (!this.ended) {
                console.log(`⏸️ Video ${index + 1} paused at ${Math.round(this.currentTime)}s`);
            }
        });
    });
}

// ========================================
// VIDEO COMPLETION NOTIFICATION
// ========================================
function showVideoCompletionMessage(video, index) {
    const messages = [
        "Great! Now try Video 2 to see how math connects to intuition! 📐",
        "Excellent! Ready for the advanced concepts in Video 3? 🎓",
        "Outstanding! Now explore the interactive visualizer! 🚀"
    ];

    if (messages[index]) {
        const notification = document.createElement('div');
        notification.textContent = `✅ ${messages[index]}`;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideInRight 0.5s ease-out;
            font-weight: 600;
            max-width: 350px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
}

// ========================================
// PAGE LOADING ANIMATION
// ========================================
function addLoadingAnimation() {
    // Smooth page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    const header = document.querySelector('header');
    if (header) {
        header.style.animation = 'slideDown 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    // Add subtle parallax effect to header
    window.addEventListener('scroll', () => {
        if (header) {
            const scrolled = window.pageYOffset;
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = Math.max(1 - scrolled / 500, 0.5);
        }
    });
}

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', function (e) {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            window.location.href = 'index.html';
        }
    }
});

// ========================================
// CSS ANIMATIONS (injected dynamically)
// ========================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ========================================
// PERFORMANCE MONITORING (Development)
// ========================================
console.log('🤖 Robotics Education Portal');
console.log('📊 Page Load Time:', Math.round(performance.now()), 'ms');
console.log('🎯 Current Page:', window.location.pathname);

