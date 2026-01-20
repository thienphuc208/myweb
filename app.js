// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Set current year in copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const body = document.body;

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('mainHeader');
    const headerContainer = document.querySelector('.header-container');
    
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
        headerContainer.style.padding = '10px 0';
    } else {
        header.classList.remove('header-scrolled');
        headerContainer.style.padding = '15px 0';
    }

    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

// Back to top functionality
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate the header height for offset
            const headerHeight = document.getElementById('mainHeader').offsetHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission with email sending
document.getElementById('projectRequestForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('.submit-button');
    const formMessages = document.getElementById('form-messages');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Show loading spinner
    loadingSpinner.style.display = 'block';
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';

    // Hide any previous messages
    formMessages.style.display = 'none';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success message
            formMessages.innerHTML = '<i class="fas fa-check-circle"></i> <strong>Cảm ơn bạn!</strong> Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.';
            formMessages.className = 'message success';
            formMessages.style.display = 'block';

            // Reset form
            form.reset();
            
            // Show toast notification
            showToast('Yêu cầu của bạn đã được gửi thành công!', 'success');
            
            // Scroll to message
            setTimeout(() => {
                formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        } else {
            // Error message
            formMessages.innerHTML = '<i class="fas fa-exclamation-circle"></i> <strong>Có lỗi xảy ra!</strong> Vui lòng thử lại sau hoặc liên hệ trực tiếp qua số điện thoại.';
            formMessages.className = 'message error';
            formMessages.style.display = 'block';
            
            // Show error toast
            showToast('Có lỗi xảy ra! Vui lòng thử lại.', 'error');
        }
    } catch (error) {
        // Network error
        formMessages.innerHTML = '<i class="fas fa-exclamation-circle"></i> <strong>Lỗi kết nối!</strong> Vui lòng kiểm tra kết nối internet và thử lại.';
        formMessages.className = 'message error';
        formMessages.style.display = 'block';
        
        // Show error toast
        showToast('Lỗi kết nối! Vui lòng kiểm tra internet.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Hide loading spinner and reset button
        loadingSpinner.style.display = 'none';
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi yêu cầu ngay';
    }
});

// Form validation on input
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.classList.add('error');
        } else {
            this.classList.remove('error');
        }
    });
});

// Prevent form submission on Enter key
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && this.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});

// Add hover effect to service cards on mobile touch
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.classList.add('hover-effect');
    });
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('hover-effect');
        }, 300);
    });
});

// Tawk.to Chat Button Functionality
const tawktoChatBtn = document.getElementById('tawkto-chat-btn');
const chatNotification = document.getElementById('chatNotification');

// Open Tawk.to chat when button is clicked
tawktoChatBtn.addEventListener('click', function() {
    if (typeof Tawk_API !== 'undefined') {
        Tawk_API.toggle();
        // Hide notification when chat is opened
        if (chatNotification) {
            chatNotification.style.display = 'none';
        }
    }
});

// Add animation to floating buttons
document.querySelectorAll('.whatsapp-float, .tawkto-float').forEach(btn => {
    const floatText = btn.querySelector('.float-text');
    
    btn.addEventListener('mouseenter', function() {
        if (floatText) {
            floatText.style.opacity = '1';
            floatText.style.transform = 'translateX(0)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        if (floatText) {
            floatText.style.opacity = '0';
            floatText.style.transform = 'translateX(10px)';
        }
    });
});

// Hide notification after 10 seconds
if (chatNotification) {
    setTimeout(() => {
        chatNotification.style.opacity = '0';
        setTimeout(() => {
            chatNotification.style.display = 'none';
        }, 300);
    }, 10000);
}

// Toast notification function
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Add toast styles
        const toastStyles = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .toast {
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 350px;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                animation: slideInRight 0.3s ease forwards;
            }
            
            .toast.success {
                border-left: 4px solid #28a745;
                background: #d4edda;
                color: #155724;
            }
            
            .toast.error {
                border-left: 4px solid #dc3545;
                background: #f8d7da;
                color: #721c24;
            }
            
            .toast i {
                font-size: 18px;
            }
            
            .toast-content {
                flex: 1;
            }
            
            .toast-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
                font-size: 16px;
            }
            
            .toast-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(150%);
                }
                to {
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                }
                to {
                    transform: translateX(150%);
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = toastStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <div class="toast-content">${message}</div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
}

// Form input validation styling
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Add focus styles to form
const formFocusStyles = `
    .form-group.focused label {
        color: var(--primary-color);
    }
    
    .form-group.focused .form-control {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
    }
    
    .form-control.error {
        border-color: var(--error-color) !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
    }
`;

const style = document.createElement('style');
style.textContent = formFocusStyles;
document.head.appendChild(style);