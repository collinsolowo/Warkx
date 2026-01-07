// Warkx E-commerce Frontend - Main JavaScript
// Premium, futuristic shopping experience with cart functionality

class WarkxApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('warkx-cart')) || [];
        this.products = this.initializeProducts();
        this.filters = {
            category: 'all',
            priceRange: [0, 500],
            sizes: [],
            colors: []
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartUI();
        this.initializeAnimations();
        this.setupScrollEffects();
    }

    initializeProducts() {
        return [
            {
                id: 1,
                name: "Technical Performance Jacket",
                price: 299,
                category: "men",
                image: "resources/product-1.jpg",
                colors: ["black", "navy", "gray"],
                sizes: ["S", "M", "L", "XL"],
                rating: 4.8,
                description: "Premium waterproof jacket with advanced technical features and minimalist design."
            },
            {
                id: 2,
                name: "Luxury Street Sneakers",
                price: 249,
                category: "men",
                image: "resources/product-2.jpg",
                colors: ["black", "white", "cyan"],
                sizes: ["8", "9", "10", "11", "12"],
                rating: 4.9,
                description: "Handcrafted sneakers combining premium leather with technical mesh for ultimate comfort."
            },
            {
                id: 3,
                name: "Urban Explorer Backpack",
                price: 199,
                category: "men",
                image: "resources/product-3.jpg",
                colors: ["black", "gray", "navy"],
                sizes: ["One Size"],
                rating: 4.7,
                description: "Sleek, functional backpack with multiple compartments and premium materials."
            },
            {
                id: 4,
                name: "Minimalist Flow Dress",
                price: 279,
                category: "women",
                image: "resources/product-4.jpg",
                colors: ["navy", "black", "burgundy"],
                sizes: ["XS", "S", "M", "L"],
                rating: 4.6,
                description: "Elegant dress with flowing silhouette and premium fabric for effortless style."
            },
            {
                id: 5,
                name: "Premium Leather Ankle Boots",
                price: 329,
                category: "women",
                image: "resources/product-5.jpg",
                colors: ["black", "brown", "navy"],
                sizes: ["6", "7", "8", "9", "10"],
                rating: 4.8,
                description: "Handcrafted ankle boots in premium leather with modern silhouette and comfort sole."
            },
            {
                id: 6,
                name: "Geometric Jewelry Set",
                price: 149,
                category: "women",
                image: "resources/product-6.jpg",
                colors: ["silver", "gold", "black"],
                sizes: ["One Size"],
                rating: 4.5,
                description: "Contemporary jewelry set with geometric pendant and matching earrings."
            },
            {
                id: 7,
                name: "Structured Leather Handbag",
                price: 399,
                category: "women",
                image: "resources/product-7.jpg",
                colors: ["black", "cognac", "navy"],
                sizes: ["One Size"],
                rating: 4.9,
                description: "Luxury handbag in premium leather with structured silhouette and gold hardware."
            },
            {
                id: 8,
                name: "Aviator Sunglasses",
                price: 179,
                category: "accessories",
                image: "resources/product-8.jpg",
                colors: ["black", "gold", "silver"],
                sizes: ["One Size"],
                rating: 4.7,
                description: "Classic aviator style with modern lens technology and premium frame materials."
            },
            {
                id: 9,
                name: "Minimalist Leather Belt",
                price: 89,
                category: "accessories",
                image: "resources/product-9.jpg",
                colors: ["black", "brown", "navy"],
                sizes: ["S", "M", "L", "XL"],
                rating: 4.4,
                description: "Clean, minimalist belt in premium leather with geometric buckle design."
            },
            {
                id: 10,
                name: "Silk Geometric Scarf",
                price: 119,
                category: "accessories",
                image: "resources/product-10.jpg",
                colors: ["navy", "black", "gray"],
                sizes: ["One Size"],
                rating: 4.6,
                description: "Luxury silk scarf with subtle geometric pattern and hand-rolled edges."
            },
            {
                id: 11,
                name: "Premium Leather Wallet",
                price: 129,
                category: "accessories",
                image: "resources/product-11.jpg",
                colors: ["black", "brown", "navy"],
                sizes: ["One Size"],
                rating: 4.8,
                description: "Handcrafted wallet in premium leather with multiple card slots and bill compartment."
            },
            {
                id: 12,
                name: "Technical Cap",
                price: 69,
                category: "accessories",
                image: "resources/product-12.jpg",
                colors: ["black", "gray", "navy"],
                sizes: ["S/M", "L/XL"],
                rating: 4.3,
                description: "Modern cap with technical fabric and subtle geometric pattern details."
            }
        ];
    }

    setupEventListeners() {
        // Cart functionality
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-add-to-cart]')) {
                const productId = parseInt(e.target.dataset.addToCart);
                this.addToCart(productId);
            }
            
            if (e.target.matches('[data-remove-from-cart]')) {
                const productId = parseInt(e.target.dataset.removeFromCart);
                this.removeFromCart(productId);
            }
            
            if (e.target.matches('[data-update-quantity]')) {
                const productId = parseInt(e.target.dataset.updateQuantity);
                const change = parseInt(e.target.dataset.change);
                this.updateQuantity(productId, change);
            }
            
            if (e.target.matches('[data-toggle-cart]')) {
                this.toggleCart();
            }
            
            if (e.target.matches('[data-close-cart]')) {
                this.closeCart();
            }
        });

        // Filter functionality
        document.addEventListener('change', (e) => {
            if (e.target.matches('[data-filter-category]')) {
                this.filters.category = e.target.value;
                this.applyFilters();
            }
            
            if (e.target.matches('[data-filter-price]')) {
                this.filters.priceRange = e.target.value.split(',').map(Number);
                this.applyFilters();
            }
        });

        // Search functionality
        const searchInput = document.querySelector('[data-search]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProducts(e.target.value);
            });
        }

        // Newsletter signup
        const newsletterForm = document.querySelector('[data-newsletter]');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(e.target);
            });
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('[data-mobile-menu]');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.saveCart();
        this.updateCartUI();
        this.showCartNotification(product.name);
        this.animateCartIcon();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.saveCart();
            this.updateCartUI();
        }
    }

    saveCart() {
        localStorage.setItem('warkx-cart', JSON.stringify(this.cart));
    }

    updateCartUI() {
        const cartCount = document.querySelector('[data-cart-count]');
        const cartItems = document.querySelector('[data-cart-items]');
        const cartTotal = document.querySelector('[data-cart-total]');

        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCount) cartCount.textContent = totalItems;
        if (cartTotal) cartTotal.textContent = `₦${totalPrice}`;

        if (cartItems) {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="flex items-center justify-between p-4 border-b border-slate-700">
                    <div class="flex items-center space-x-3">
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                        <div>
                            <h4 class="text-sm font-medium text-white">${item.name}</h4>
                            <p class="text-xs text-slate-400">₦${item.price}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button data-update-quantity="${item.id}" data-change="-1" class="w-6 h-6 flex items-center justify-center bg-slate-700 text-white rounded hover:bg-slate-600">-</button>
                        <span class="text-white w-8 text-center">${item.quantity}</span>
                        <button data-update-quantity="${item.id}" data-change="1" class="w-6 h-6 flex items-center justify-center bg-slate-700 text-white rounded hover:bg-slate-600">+</button>
                        <button data-remove-from-cart="${item.id}" class="ml-2 text-red-400 hover:text-red-300">×</button>
                    </div>
                </div>
            `).join('');
        }
    }

    toggleCart() {
        const cartPanel = document.querySelector('[data-cart-panel]');
        if (cartPanel) {
            cartPanel.classList.toggle('translate-x-full');
        }
    }

    closeCart() {
        const cartPanel = document.querySelector('[data-cart-panel]');
        if (cartPanel) {
            cartPanel.classList.add('translate-x-full');
        }
    }

    showCartNotification(productName) {
        // Create and show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = `${productName} added to cart`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    animateCartIcon() {
        const cartIcon = document.querySelector('[data-cart-icon]');
        if (cartIcon) {
            cartIcon.classList.add('animate-pulse');
            setTimeout(() => cartIcon.classList.remove('animate-pulse'), 1000);
        }
    }

    applyFilters() {
        const productGrid = document.querySelector('[data-product-grid]');
        if (!productGrid) return;

        let filteredProducts = this.products;

        // Apply category filter
        if (this.filters.category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === this.filters.category);
        }

        // Apply price range filter
        filteredProducts = filteredProducts.filter(p => 
            p.price >= this.filters.priceRange[0] && p.price <= this.filters.priceRange[1]
        );

        this.renderProducts(filteredProducts, productGrid);
    }

    searchProducts(query) {
        if (!query.trim()) {
            this.applyFilters();
            return;
        }

        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        const productGrid = document.querySelector('[data-product-grid]');
        if (productGrid) {
            this.renderProducts(filteredProducts, productGrid);
        }
    }

    renderProducts(products, container) {
        container.innerHTML = products.map(product => `
            <div class="group bg-slate-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105" data-aos="fade-up">
                <div class="relative aspect-square overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                        <button data-add-to-cart="${product.id}" class="opacity-0 group-hover:opacity-100 bg-cyan-500 text-white px-4 py-2 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-cyan-600">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-white font-medium mb-1">${product.name}</h3>
                    <div class="flex items-center justify-between">
                        <span class="text-cyan-400 font-semibold">₦${product.price}</span>
                        <div class="flex items-center text-yellow-400">
                            <span class="text-sm">★</span>
                            <span class="text-xs text-slate-400 ml-1">${product.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    handleNewsletterSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;

        // Simulate API call
        button.textContent = 'Subscribing...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.classList.add('bg-green-500');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.classList.remove('bg-green-500');
                form.reset();
            }, 2000);
        }, 1000);
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('[data-mobile-menu-content]');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    initializeAnimations() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }

        // Initialize Typed.js for hero text
        if (typeof Typed !== 'undefined') {
            const heroTyped = document.querySelector('[data-hero-typed]');
            if (heroTyped) {
                new Typed(heroTyped, {
                    strings: ['Redefining Everyday Style'],
                    typeSpeed: 50,
                    showCursor: true,
                    cursorChar: '|'
                });
            }
        }

        // Initialize Splide carousels
        if (typeof Splide !== 'undefined') {
            const productCarousel = document.querySelector('[data-product-carousel]');
            if (productCarousel) {
                new Splide(productCarousel, {
                    type: 'loop',
                    perPage: 4,
                    perMove: 1,
                    gap: '1rem',
                    breakpoints: {
                        768: { perPage: 2 },
                        480: { perPage: 1 }
                    }
                }).mount();
            }
        }
    }

    setupScrollEffects() {
        // Header scroll effect
        let lastScrollY = window.scrollY;
        const header = document.querySelector('[data-header]');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (header) {
                if (currentScrollY > 100) {
                    header.classList.add('backdrop-blur-md', 'bg-slate-900/90');
                } else {
                    header.classList.remove('backdrop-blur-md', 'bg-slate-900/90');
                }
            }

            lastScrollY = currentScrollY;
        });

        // Smooth scroll for anchor links
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
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.warkxApp = new WarkxApp();
});

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WarkxApp;
}