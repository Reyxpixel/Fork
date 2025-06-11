// Payments page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Animate payment cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe payment cards and security features
    const animateElements = document.querySelectorAll('.payment-card, .security-feature, .process-step');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add hover effects to payment methods
    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        });
    });
});

// Add CSS for FAQ and animations
const paymentStyles = document.createElement('style');
paymentStyles.textContent = `
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        padding: 0 1rem;
    }
    
    .faq-item.active .faq-answer {
        padding: 1rem;
    }
    
    .faq-question {
        cursor: pointer;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background 0.3s ease;
    }
    
    .faq-question:hover {
        background: #e5e7eb;
    }
    
    .faq-question h3 {
        margin: 0;
        color: #2d5016;
        font-size: 1.1rem;
    }
    
    .faq-question i {
        transition: transform 0.3s ease;
        color: #4ade80;
    }
    
    .payment-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .process-step {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 12px;
    }
    
    .step-number {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4ade80, #22c55e);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.2rem;
        flex-shrink: 0;
    }
    
    .step-content h3 {
        color: #2d5016;
        margin-bottom: 0.5rem;
    }
    
    .step-content p {
        color: #666;
        margin: 0;
    }
`;
document.head.appendChild(paymentStyles);