/*
===========================================
TechFlow Website - JavaScript Starter
===========================================
สำหรับ Workshop: Responsive Website Development
วิชา ENGSE203 การเขียนโปรแกรมสำหรับวิศวกรซอฟต์แวร์

TODO: ให้นักศึกษาเขียน JavaScript ตามคำแนะนำ
*/

// 
// TODO STEP 1: Mobile Menu Toggle (10 นาที)
// สร้างฟังก์ชันเปิด-ปิดเมนูมือถือ
//

document.addEventListener('DOMContentLoaded', function() {
    // TODO: ดึง elements ที่จำเป็น
    const hamburger = /* TODO: เลือก .hamburger */;
    const navMenu = /* TODO: เลือก .nav-menu */;
    const navLinks = /* TODO: เลือก .nav-link ทั้งหมด */;

    // TODO: เพิ่ม event listener สำหรับ hamburger
    hamburger.addEventListener('click', function() {
        // TODO: toggle class 'active' ให้ navMenu
        
        // TODO: เปลี่ยน hamburger icon (optional)
        hamburger.classList.toggle('active');
    });

    // TODO: ปิดเมนูเมื่อคลิกลิงก์ (สำหรับมือถือ)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // TODO: ลบ class 'active'
        });
    });

    // TODO: ปิดเมนูเมื่อคลิกนอกเมนู
    document.addEventListener('click', function(event) {
        // TODO: ตรวจสอบว่าคลิกนอกเมนูหรือไม่
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            // TODO: ลับ class 'active'
        }
    });
});

//
// TODO STEP 2: Smooth Scrolling (10 นาที)  
// สร้าง smooth scrolling สำหรับ navigation links
//

// TODO: เลือก links ที่ขึ้นต้นด้วย #
const anchorLinks = /* TODO: เลือก 'a[href^="#"]' */;

anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // TODO: ป้องกัน default behavior
        e.preventDefault();
        
        // TODO: ดึง target element
        const targetId = /* TODO: ดึง href attribute */;
        const targetElement = /* TODO: เลือก element ด้วย targetId */;
        
        if (targetElement) {
            // TODO: scroll ไปยัง element อย่างนุ่มนวล
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

//
// TODO STEP 3: Scroll Animations (15 นาที)
// สร้าง animations เมื่อ scroll ถึง elements
//

// TODO: สร้าง Intersection Observer
const observeElements = /* TODO: เลือก '.animate-on-scroll' */;

const observerOptions = {
    // TODO: กำหนด options
    threshold: 0.1,        // เริ่ม animate เมื่อเห็น 10%
    rootMargin: '0px 0px -50px 0px'  // offset จากด้านล่าง
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // TODO: เพิ่ม class 'animated'
            entry.target.classList.add('animated');
            
            // TODO: หยุด observe element นี้
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// TODO: เริ่ม observe elements ทั้งหมด
observeElements.forEach(element => {
    /* TODO: observer.observe(element) */
});

//
// TODO STEP 4: Form Handling (15 นาที)
// สร้าง form validation และ submission
//

// TODO: ดึง contact form
const contactForm = /* TODO: เลือก form หรือ .contact-form */;

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // TODO: ป้องกัน default submission
        e.preventDefault();
        
        // TODO: ดึงข้อมูลจาก form
        const formData = new FormData(this);
        
        // TODO: ทำ validation
        const name = /* TODO: ดึงค่า name */;
        const email = /* TODO: ดึงค่า email */;
        const message = /* TODO: ดึงค่า message */;
        
        // TODO: ตรวจสอบว่าข้อมูลครบถ้วน
        if (!name || !email || !message) {
            // TODO: แสดง error message
            showMessage('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
            return;
        }
        
        // TODO: ตรวจสอบ email format
        if (!isValidEmail(email)) {
            showMessage('รูปแบบอีเมลไม่ถูกต้อง', 'error');
            return;
        }
        
        // TODO: แสดง loading state
        showLoading();
        
        // TODO: simulate form submission
        setTimeout(() => {
            hideLoading();
            showMessage('ข้อความถูกส่งเรียบร้อยแล้ว เราจะติดต่อกลับเร็วๆ นี้', 'success');
            
            // TODO: reset form
            contactForm.reset();
        }, 2000);
    });
}

//
// TODO STEP 5: Utility Functions (10 นาที)
// สร้างฟังก์ชันช่วยเหลือต่างๆ
//

// TODO: ฟังก์ชันตรวจสอบ email
function isValidEmail(email) {
    // TODO: สร้าง regular expression สำหรับ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// TODO: ฟังก์ชันแสดงข้อความ
function showMessage(message, type = 'info') {
    // TODO: สร้าง message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // TODO: เพิ่ม styling
    Object.assign(messageDiv.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#2ecc71' : 
                        type === 'error' ? '#e74c3c' : '#3498db'
    });
    
    // TODO: เพิ่มลงใน document
    document.body.appendChild(messageDiv);
    
    // TODO: แสดง message
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // TODO: ซ่อน message หลัง 5 วินาที
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// TODO: ฟังก์ชันแสดง loading
function showLoading() {
    const submitButton = /* TODO: เลือก submit button */;
    if (submitButton) {
        // TODO: เก็บ text เดิม
        submitButton.dataset.originalText = submitButton.textContent;
        
        // TODO: แสดง loading
        submitButton.innerHTML = '<span class="loading"></span> กำลังส่ง...';
        submitButton.disabled = true;
    }
}

// TODO: ฟังก์ชันซ่อน loading
function hideLoading() {
    const submitButton = /* TODO: เลือก submit button */;
    if (submitButton) {
        // TODO: กลับเป็น text เดิม
        submitButton.textContent = submitButton.dataset.originalText || 'ส่งข้อความ';
        submitButton.disabled = false;
    }
}

//
// TODO STEP 6: Header Scroll Effect (10 นาที)
// เปลี่ยนลักษณะ header เมื่อ scroll
//

window.addEventListener('scroll', function() {
    const header = /* TODO: เลือก header */;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        // TODO: เพิ่ม class เมื่อ scroll ลง
        header.classList.add('scrolled');
    } else {
        // TODO: ลบ class เมื่ออยู่ด้านบน
        header.classList.remove('scrolled');
    }
});

//
// TODO STEP 7: Testimonial Slider (15 นาที) - Optional
// สร้าง slider สำหรับ testimonials
//

// TODO: สร้าง simple testimonial slider
let currentTestimonial = 0;
const testimonials = /* TODO: เลือก .testimonial-card */;

function showTestimonial(index) {
    // TODO: ซ่อน testimonials ทั้งหมด
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            // TODO: แสดง testimonial ที่เลือก
            testimonial.style.display = 'block';
        } else {
            // TODO: ซ่อน testimonials อื่น
            testimonial.style.display = 'none';
        }
    });
}

function nextTestimonial() {
    // TODO: เปลี่ยนไปยัง testimonial ถัดไป
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    // TODO: เปลี่ยนไปยัง testimonial ก่อนหน้า
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// TODO: Auto-play testimonials (optional)
if (testimonials.length > 1) {
    setInterval(nextTestimonial, 5000); // เปลี่ยนทุก 5 วินาที
}

//
// TODO STEP 8: Lazy Loading Images (10 นาที) - Optional
// โหลดรูปภาพเมื่อเลื่อนถึง
//

// TODO: สร้าง intersection observer สำหรับรูปภาพ
const lazyImages = /* TODO: เลือกรูปภาพที่มี data-src */;

const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // TODO: เปลี่ยน src จาก data-src
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                
                // TODO: เพิ่ม fade-in effect
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    img.style.opacity = '1';
                };
            }
            
            // TODO: หยุด observe รูปนี้
            imageObserver.unobserve(img);
        }
    });
});

// TODO: เริ่ม observe รูปภาพทั้งหมด
lazyImages.forEach(img => {
    imageObserver.observe(img);
});

//
// TODO STEP 9: Search Functionality (15 นาที) - Bonus
// เพิ่มฟีเจอร์ค้นหา (ถ้ามีเวลา)
//

// TODO: สร้างฟีเจอร์ค้นหาใน services
function initSearch() {
    const searchInput = /* TODO: สร้าง search input */;
    const serviceCards = /* TODO: เลือก .service-card */;
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            serviceCards.forEach(card => {
                const title = /* TODO: ดึง service title */;
                const description = /* TODO: ดึง service description */;
                const text = (title + ' ' + description).toLowerCase();
                
                if (text.includes(searchTerm)) {
                    // TODO: แสดง card
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.3s ease';
                } else {
                    // TODO: ซ่อน card
                    card.style.display = 'none';
                }
            });
        });
    }
}

//
// TODO STEP 10: Dark Mode Toggle (20 นาที) - Bonus
// เพิ่มฟีเจอร์ dark mode
//

// TODO: สร้าง dark mode functionality
function initDarkMode() {
    // TODO: สร้าง toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // TODO: เพิ่ม styling สำหรับ toggle button
    Object.assign(darkModeToggle.style, {
        position: 'fixed',
        top: '20px',
        left: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: 'var(--primary-color)',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: '9999',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--shadow-md)'
    });
    
    // TODO: เพิ่มลงใน document
    document.body.appendChild(darkModeToggle);
    
    // TODO: ตรวจสอบ saved preference
    const savedTheme = /* TODO: ดึงจาก localStorage */;
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    // TODO: เพิ่ม event listener
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            // TODO: เปลี่ยนเป็น dark mode
            darkModeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            // TODO: เปลี่ยนเป็น light mode
            darkModeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

// TODO: เรียกใช้ dark mode เมื่อ DOM loaded
document.addEventListener('DOMContentLoaded', initDarkMode);

//
// TODO STEP 11: Performance Monitoring (10 นาที) - Advanced
// ตรวจสอบประสิทธิภาพ
//

// TODO: ตรวจสอบ loading time
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // TODO: แสดง performance metrics (optional)
    if (loadTime > 3000) {
        console.warn('Page loading time is slow. Consider optimization.');
    }
});

// TODO: ตรวจสอบ intersection performance
let intersectionCount = 0;
const performanceObserver = new IntersectionObserver(function(entries) {
    intersectionCount += entries.length;
    // TODO: log เมื่อมี intersection เยอะเกินไป
    if (intersectionCount > 100) {
        console.warn('Too many intersection observations. Consider optimization.');
    }
});

//
// TODO STEP 12: Error Handling (10 นาที)
// จัดการ errors
//

// TODO: Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // TODO: แสดง user-friendly error message
    showMessage('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
});

// TODO: Promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

//
// TODO STEP 13: Analytics & Tracking (5 นาที) - Optional
// เพิ่ม analytics
//

// TODO: ติดตาม user interactions
function trackEvent(eventName, data = {}) {
    console.log('Track Event:', eventName, data);
    
    // TODO: ส่งข้อมูลไปยัง analytics service
    // ตัวอย่าง: Google Analytics, Facebook Pixel, etc.
}

// TODO: ติดตาม page views
trackEvent('page_view', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
});

// TODO: ติดตาม button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-button')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent,
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

//
// TODO STEP 14: Accessibility Enhancements (10 นาที)
// เพิ่มฟีเจอร์ accessibility
//

// TODO: Keyboard navigation สำหรับ mobile menu
document.addEventListener('keydown', function(e) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // TODO: ปิดเมนูด้วย Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.focus(); // กลับ focus ไปยัง hamburger
    }
});

// TODO: Announce dynamic content changes
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // TODO: ลบหลังจาก announce เสร็จ
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// TODO: Focus management สำหรับ modal/popup
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

//
// TODO STEP 15: Service Worker (15 นาที) - Advanced
// เพิ่ม offline functionality
//

// TODO: Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered:', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// TODO: Handle offline/online events
window.addEventListener('online', function() {
    showMessage('กลับมาออนไลน์แล้ว', 'success');
});

window.addEventListener('offline', function() {
    showMessage('ขณะนี้อยู่ในโหมดออฟไลน์', 'warning');
});

//
// Utility Functions สำหรับการใช้งานทั่วไป
//

// TODO: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// TODO: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// TODO: ใช้ throttle สำหรับ scroll events
const throttledScrollHandler = throttle(function() {
    // TODO: scroll handling code
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// TODO: เช็ค device type
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 576) return 'mobile';
    if (width < 768) return 'tablet-small';
    if (width < 992) return 'tablet';
    if (width < 1200) return 'desktop';
    return 'desktop-large';
}

// TODO: เช็ค browser support
function checkBrowserSupport() {
    const support = {
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('color', 'var(--test)'),
        intersectionObserver: 'IntersectionObserver' in window,
        serviceWorker: 'serviceWorker' in navigator
    };
    
    console.log('Browser Support:', support);
    return support;
}

//
// Initialize everything when DOM is ready
//
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechFlow Website initialized');
    console.log('Device Type:', getDeviceType());
    
    // TODO: เรียกใช้ functions ต่างๆ
    checkBrowserSupport();
    
    // TODO: เพิ่ม any additional initialization code
});

/*
===========================================
Workshop Completion Checklist
===========================================

เมื่อเสร็จสิ้น workshop ให้ตรวจสอบว่า:

✅ Mobile menu ทำงานได้
✅ Smooth scrolling ทำงานได้
✅ Scroll animations ทำงานได้
✅ Form validation ทำงานได้
✅ Responsive design ทำงานในทุกขนาดหน้าจอ
✅ Accessibility features ทำงานได้
✅ Error handling ทำงานได้
✅ Performance optimized

Bonus Features (ถ้ามีเวลา):
⭐ Dark mode toggle
⭐ Search functionality  
⭐ Lazy loading images
⭐ Service worker
⭐ Analytics tracking

===========================================
*/