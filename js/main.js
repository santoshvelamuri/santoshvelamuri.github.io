// Handle anchor links for smooth scrolling and navigation
function handleAnchorNavigation() {
    // Get the anchor from the URL
    const hash = window.location.hash;
    
    if (hash) {
        // Wait a bit for the page to fully load, then scroll to the element
        setTimeout(function() {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleAnchorNavigation);
} else {
    handleAnchorNavigation();
}

// Also handle hashchange events for when user clicks anchor links
window.addEventListener('hashchange', function() {
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            setTimeout(function() {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});

// Form handling
const conversationForm = document.querySelector('#conversation-form');
if (conversationForm) {
    conversationForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');
        
        const button = this.querySelector('button[type="submit"]');
        const messageDiv = document.getElementById('form-message');
        const originalText = button.textContent;
        
        try {
            button.disabled = true;
            button.textContent = 'Sending...';
            messageDiv.className = '';
            messageDiv.textContent = '';
            
            // Send to API
            const response = await fetch('/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    company,
                    message
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                messageDiv.className = 'form-message success show';
                messageDiv.textContent = 'Thank you! Your message has been sent. We\'ll be in touch within 24 hours.';
                this.reset();
                button.textContent = originalText;
            } else {
                messageDiv.className = 'form-message error show';
                messageDiv.textContent = result.error || 'Failed to send message. Please try again.';
                button.textContent = originalText;
                button.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.className = 'form-message error show';
            messageDiv.textContent = 'An error occurred. Please try again later.';
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}



// Navigation active state
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentLocation = location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});

// Button interactions
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // For CTA buttons, show a message or redirect
        if (this.textContent.includes('Book a Call') || this.textContent.includes('Start a Conversation')) {
            console.log('CTA clicked - in production, would redirect to booking page');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Mobile menu toggle (if you add a hamburger menu later)
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }
}

setupMobileMenu();

// Scroll event for navbar shadow and scroll-to-top button
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    // Show/hide scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
});

// Set up scroll to top button click handler
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn && !scrollToTopBtn.hasAttribute('data-listener-added')) {
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        scrollToTopBtn.setAttribute('data-listener-added', 'true');
    }
}

// Set up on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupScrollToTop);
} else {
    setupScrollToTop();
}
