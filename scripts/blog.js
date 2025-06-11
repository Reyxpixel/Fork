// Blog page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const searchBox = document.querySelector('.search-box input');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Declare storage variable
    const storage = {
        get: function(key) {
            return JSON.parse(localStorage.getItem(key)) || [];
        },
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };
    
    // Filter posts by category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.5s ease';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
    
    // Declare showNotification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    // Newsletter subscription
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Store newsletter subscription
                const subscribers = storage.get('newsletter_subscribers');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    storage.set('newsletter_subscribers', subscribers);
                    showNotification('Thank you for subscribing to our newsletter!');
                    this.reset();
                } else {
                    showNotification('You are already subscribed to our newsletter.', 'error');
                }
            }
        });
    }
    
    // Add reading time to posts
    blogPosts.forEach(post => {
        const excerpt = post.querySelector('.post-excerpt').textContent;
        const wordCount = excerpt.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
        
        const postMeta = post.querySelector('.post-meta');
        const readingTimeSpan = document.createElement('span');
        readingTimeSpan.textContent = `${readingTime} min read`;
        readingTimeSpan.className = 'reading-time';
        postMeta.appendChild(readingTimeSpan);
    });
    
    // Animate posts on scroll
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
    
    blogPosts.forEach(post => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
        post.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(post);
    });
});

// Add CSS for animations
const blogStyles = document.createElement('style');
blogStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }
    
    .notification.success {
        background-color: #4caf50;
        color: white;
    }
    
    .notification.error {
        background-color: #f44336;
        color: white;
    }
    
    .reading-time {
        color: #666;
        font-size: 0.8rem;
        margin-left: 1rem;
    }
    
    .reading-time::before {
        content: "•";
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(blogStyles);