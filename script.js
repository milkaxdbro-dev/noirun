document.addEventListener('DOMContentLoaded', function() {
    initCursorFollower();
    initSmoothScrolling();
    initHeaderScroll();
    initGallery();
    initParallaxEffects();
});

function initCursorFollower() {
    const cursor = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button');

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    document.addEventListener('mouseenter', () => {
        fadeElement(cursor, 1, 300);
    });

    document.addEventListener('mouseleave', () => {
        fadeElement(cursor, 0, 300);
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
            cursor.style.borderColor = '#7b68ee';
            cursor.style.transition = 'transform 0.3s, border-color 0.3s';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
            cursor.style.borderColor = '#7b68ee';
            cursor.style.transition = 'transform 0.3s, border-color 0.3s';
        });
    });

    let cursorX = 0;
    let cursorY = 0;
    let currentX = 0;
    let currentY = 0;

    function render() {
        currentX += (cursorX - currentX) * 0.1;
        currentY += (cursorY - currentY) * 0.1;

        if (cursor) {
            cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function fadeElement(element, targetOpacity, duration) {
    if (!element) return;

    const startOpacity = parseFloat(window.getComputedStyle(element).opacity);
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        element.style.opacity = startOpacity + (targetOpacity - startOpacity) * progress;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('.nav-link, .cta-button');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.gallery-arrow.prev');
    const nextBtn = document.querySelector('.gallery-arrow.next');
    
    let currentIndex = 0;
    const itemCount = galleryItems.length;
    
    function showItem(index) {
        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.zIndex = '0';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        galleryItems[index].style.opacity = '1';
        galleryItems[index].style.zIndex = '1';
        
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = itemCount - 1;
            showItem(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= itemCount) newIndex = 0;
            showItem(newIndex);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showItem(index);
        });
    });
    
    let galleryInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= itemCount) newIndex = 0;
        showItem(newIndex);
    }, 5000);
    
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', () => {
            clearInterval(galleryInterval);
        });
        
        galleryContainer.addEventListener('mouseleave', () => {
            galleryInterval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= itemCount) newIndex = 0;
                showItem(newIndex);
            }, 5000);
        });
    }
}

function initParallaxEffects() {
    const parallaxElements = [
        { element: '.floating-cube', speed: 0.05 },
        { element: '.hero-content', speed: 0.03 },
        { element: '.feature-card', speed: 0.02 },
        { element: '.advantage-item', speed: 0.01 }
    ];
    
    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        parallaxElements.forEach(item => {
            const elements = document.querySelectorAll(item.element);
            
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                
                const distanceX = (elementCenterX - centerX) * 0.01;
                const distanceY = (elementCenterY - centerY) * 0.01;
                
                const moveX = mouseX * item.speed + distanceX;
                const moveY = mouseY * item.speed + distanceY;
                
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    });
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .advantage-item, .gallery-item, .download-button');
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            } else {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
}

function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(el => {
        setInterval(() => {
            const glitchX = Math.random() * 10 - 5;
            const glitchY = Math.random() * 10 - 5;
            
            el.style.transform = `translate(${glitchX}px, ${glitchY}px)`;
            
            setTimeout(() => {
                el.style.transform = 'translate(0, 0)';
            }, 100);
        }, 3000); 
    });
}

window.addEventListener('load', function() {
    setTimeout(() => {
        document.body.classList.add('loaded');
        initGlitchEffect();
    }, 500);
});