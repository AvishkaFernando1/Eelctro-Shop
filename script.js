// Sample Products Data
const products = [
    {
        id: 1,
        name: "LED Smart Bulb 12W",
        category: "lighting",
        price: 29.99,
        rating: 5,
        badge: "New",
        icon: "fa-lightbulb"
    },
    {
        id: 2,
        name: "Premium HDMI Cable 2M",
        category: "cables",
        price: 15.99,
        rating: 4,
        badge: "Sale",
        icon: "fa-plug"
    },
    {
        id: 3,
        name: "Smart Touch Switch",
        category: "switches",
        price: 45.99,
        rating: 5,
        badge: "Hot",
        icon: "fa-toggle-on"
    },
    {
        id: 4,
        name: "Digital Multimeter Pro",
        category: "tools",
        price: 89.99,
        rating: 5,
        badge: "Pro",
        icon: "fa-tools"
    },
    {
        id: 5,
        name: "USB-C Fast Charger 65W",
        category: "accessories",
        price: 39.99,
        rating: 4,
        badge: "Popular",
        icon: "fa-battery-full"
    },
    {
        id: 6,
        name: "WiFi Smart Plug",
        category: "smart",
        price: 24.99,
        rating: 5,
        badge: "Smart",
        icon: "fa-microchip"
    },
    {
        id: 7,
        name: "LED Strip Lights 5M RGB",
        category: "lighting",
        price: 34.99,
        rating: 5,
        badge: "Trending",
        icon: "fa-lightbulb"
    },
    {
        id: 8,
        name: "Ethernet Cable Cat8 10M",
        category: "cables",
        price: 19.99,
        rating: 4,
        badge: "",
        icon: "fa-ethernet"
    },
    {
        id: 9,
        name: "Motion Sensor Switch",
        category: "switches",
        price: 52.99,
        rating: 5,
        badge: "New",
        icon: "fa-toggle-on"
    },
    {
        id: 10,
        name: "Wire Stripper Tool Kit",
        category: "tools",
        price: 42.99,
        rating: 4,
        badge: "",
        icon: "fa-tools"
    },
    {
        id: 11,
        name: "Power Bank 20000mAh",
        category: "accessories",
        price: 49.99,
        rating: 5,
        badge: "Popular",
        icon: "fa-battery-full"
    },
    {
        id: 12,
        name: "Smart Doorbell Camera",
        category: "smart",
        price: 129.99,
        rating: 5,
        badge: "Premium",
        icon: "fa-video"
    }
];

// Shopping Cart
let cart = [];

// Current product for quick view
let currentQuickViewProduct = null;

// User authentication state
let currentUser = null;
let isLoggedIn = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeEventListeners();
    updateCartCount();
    initializeCountdown();
    initializeFAQ();
    initializeQuickView();
    initializeBackToTop();
    initializePromo();
    initializeUserAuth();
    checkUserSession();
});

// Initialize Products Display
function initializeProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);

    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });

    // Add entrance animation
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Product image mapping with real images
const productImages = {
    'lighting': 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url(https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop)',
    'cables': 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop)',
    'switches': 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url(https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=500&fit=crop)',
    'tools': 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url(https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&h=500&fit=crop)',
    'accessories': 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url(https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop)',
    'smart': 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url(https://images.unsplash.com/photo-1558002038-1055907df827?w=500&h=500&fit=crop)'
};

// Create Product Card
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);

    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    const productBg = productImages[product.category] || productImages['accessories'];

    card.innerHTML = `
        <div class="product-image">
            <div class="product-img" style="background: ${productBg};"></div>
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-actions">
                <button class="product-action-btn" onclick="openQuickView(${product.id})" title="Quick View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="product-action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">${stars}</div>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add
                </button>
            </div>
        </div>
    `;

    return card;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    updateCartDisplay();
    showNotification('Product added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
    showNotification('Product removed from cart');
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
        
        // Animate cart count
        cartCountElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => {
            const productBg = productImages[item.category] || productImages['accessories'];
            return `
                <div class="cart-item">
                    <div class="cart-item-image" style="background: ${productBg};">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateCartTotal();
}

// Update Cart Total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Cart Modal Toggle
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
            updateCartDisplay();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    // Close cart when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter products
            const filter = btn.getAttribute('data-filter');
            initializeProducts(filter);
        });
    });

    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            
            // Set filter after a short delay
            setTimeout(() => {
                const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
                if (filterBtn) {
                    filterBtn.click();
                }
            }, 500);
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const category = card.querySelector('.product-category').textContent.toLowerCase();

                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Smooth Scrolling
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

    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Message sent successfully! We will contact you soon.');
            contactForm.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Initialize Countdown Timer
function initializeCountdown() {
    // Set countdown target (24 hours from now)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Initialize FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize Quick View Modal
function initializeQuickView() {
    const closeBtn = document.getElementById('closeQuickView');
    const modal = document.getElementById('quickViewModal');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyInput = document.getElementById('qtyInput');
    const quickAddBtn = document.getElementById('quickAddToCart');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeQuickView);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeQuickView();
            }
        });
    }

    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });
    }

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });
    }

    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', () => {
            if (currentQuickViewProduct) {
                const quantity = parseInt(qtyInput.value);
                for (let i = 0; i < quantity; i++) {
                    addToCart(currentQuickViewProduct.id);
                }
                closeQuickView();
                qtyInput.value = 1;
            }
        });
    }
}

// Open Quick View
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentQuickViewProduct = product;
    const modal = document.getElementById('quickViewModal');
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    const productBg = productImages[product.category] || productImages['accessories'];

    const quickViewIcon = document.getElementById('quickViewIcon');
    quickViewIcon.style.background = productBg;
    
    document.getElementById('quickViewCategory').textContent = product.category.toUpperCase();
    document.getElementById('quickViewTitle').textContent = product.name;
    document.getElementById('quickViewRating').textContent = stars;
    document.getElementById('quickViewPrice').textContent = `$${product.price.toFixed(2)}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Quick View
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentQuickViewProduct = null;
}

// Add to Wishlist (placeholder function)
function addToWishlist(productId) {
    showNotification('Added to wishlist! ❤️');
}

// Initialize Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize Promo Banner
function initializePromo() {
    const promoClose = document.getElementById('promoClose');
    const promoBanner = document.querySelector('.promo-banner');
    const navbar = document.querySelector('.navbar');
    
    if (promoClose) {
        promoClose.addEventListener('click', () => {
            promoBanner.style.display = 'none';
            navbar.style.top = '0';
            document.body.style.paddingTop = '0';
        });
    }
}

// Show Loading Spinner
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('show');
    }
}

// Hide Loading Spinner
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.remove('show');
    }
}

// Enhance Hero Button Actions
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent.includes('Shop Now')) {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            } else if (btn.textContent.includes('View Catalog')) {
                document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Deals button action
    const dealsBtn = document.querySelector('.deals-section .btn');
    if (dealsBtn) {
        dealsBtn.addEventListener('click', () => {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Initialize User Authentication
function initializeUserAuth() {
    const userBtn = document.getElementById('userBtn');
    const userModal = document.getElementById('userModal');
    const closeUser = document.getElementById('closeUser');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginFormElement');
    const signupForm = document.getElementById('signupFormElement');
    const logoutBtn = document.getElementById('logoutBtn');

    // Open user modal
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            userModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close user modal
    if (closeUser) {
        closeUser.addEventListener('click', () => {
            userModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on outside click
    if (userModal) {
        userModal.addEventListener('click', (e) => {
            if (e.target === userModal) {
                userModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Show signup form
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('signupForm').style.display = 'block';
        });
    }

    // Show login form
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signupForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });
    }

    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Demo login (replace with actual authentication)
            handleLogin(email, password);
        });
    }

    // Handle signup
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!');
                return;
            }
            
            // Demo signup (replace with actual registration)
            handleSignup(name, email, password);
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            handleLogout();
        });
    }
}

// Handle Login
function handleLogin(email, password) {
    // Demo implementation - replace with actual API call
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Simulate successful login
        currentUser = {
            name: email.split('@')[0],
            email: email
        };
        isLoggedIn = true;
        
        // Store in localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Update UI
        updateUserInterface();
        showNotification('Login successful! Welcome back!');
        
        // Clear form
        document.getElementById('loginFormElement').reset();
    }, 1000);
}

// Handle Signup
function handleSignup(name, email, password) {
    // Demo implementation - replace with actual API call
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Simulate successful signup
        currentUser = {
            name: name,
            email: email
        };
        isLoggedIn = true;
        
        // Store in localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Update UI
        updateUserInterface();
        showNotification('Account created successfully! Welcome to ElectroShop!');
        
        // Clear form
        document.getElementById('signupFormElement').reset();
    }, 1000);
}

// Handle Logout
function handleLogout() {
    currentUser = null;
    isLoggedIn = false;
    
    // Clear localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    
    // Update UI
    updateUserInterface();
    showNotification('Logged out successfully!');
}

// Check User Session
function checkUserSession() {
    const storedUser = localStorage.getItem('currentUser');
    const storedLoginState = localStorage.getItem('isLoggedIn');
    
    if (storedUser && storedLoginState === 'true') {
        currentUser = JSON.parse(storedUser);
        isLoggedIn = true;
        updateUserInterface();
    }
}

// Update User Interface
function updateUserInterface() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const dashboard = document.getElementById('userDashboard');
    const userNameEl = document.getElementById('userName');
    const userEmailEl = document.getElementById('userEmail');
    
    if (isLoggedIn && currentUser) {
        // Show dashboard, hide forms
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        dashboard.style.display = 'block';
        
        // Update user info
        userNameEl.textContent = `Welcome, ${currentUser.name}!`;
        userEmailEl.textContent = currentUser.email;
    } else {
        // Show login form, hide dashboard
        dashboard.style.display = 'none';
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
}

// Log initialization
console.log('ElectroShop initialized successfully!');
console.log(`Loaded ${products.length} products`);

