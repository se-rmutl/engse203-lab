// js/main.js
class MiniEcommerce {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.updateCartCount();
        this.setupEventListeners();
        this.renderPage();
    }

    async loadProducts() {
        try {
            const response = await fetch('data/products.json');
            this.products = await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback data if JSON file is not available
            this.products = [
                {
                    id: 1,
                    name: "สมาร์ทโฟน Samsung Galaxy",
                    price: 15900,
                    category: "electronics",
                    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
                    description: "สมาร์ทโฟนรุ่นใหม่ล่าสุด พร้อมคุณสมบัติครบครัน",
                    featured: true
                },
                {
                    id: 2,
                    name: "เสื้อยืดผ้าคอตตอน",
                    price: 399,
                    category: "clothing",
                    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
                    description: "เสื้อยืดผ้าคอตตอน 100% นุ่มสบาย",
                    featured: false
                },
                {
                    id: 3,
                    name: "หนังสือ JavaScript Guide",
                    price: 590,
                    category: "books",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                    description: "คู่มือการเขียนโปรแกรม JavaScript สำหรับมือใหม่",
                    featured: true
                },
                {
                    id: 4,
                    name: "หูฟัง Bluetooth",
                    price: 2500,
                    category: "electronics",
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                    description: "หูฟังไร้สายคุณภาพเสียงดี",
                    featured: false
                },
                {
                    id: 5,
                    name: "กางเกงยีนส์",
                    price: 1200,
                    category: "clothing",
                    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
                    description: "กางเกงยีนส์คุณภาพดี ทนทาน",
                    featured: true
                },
                {
                    id: 6,
                    name: "หนังสือ HTML & CSS",
                    price: 450,
                    category: "books",
                    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
                    description: "เรียนรู้การสร้างเว็บไซต์ด้วย HTML และ CSS",
                    featured: false
                }
            ];
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.searchProducts());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchProducts();
                }
            });
        }

        // Filter functionality
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterProducts());
        }
    }

    renderPage() {
        const currentPage = window.location.pathname.split('/').pop();
        
        switch (currentPage) {
            case 'index.html':
            case '':
                this.renderFeaturedProducts();
                break;
            case 'products.html':
                this.renderAllProducts();
                break;
            case 'cart.html':
                this.renderCart();
                break;
        }
    }

    renderFeaturedProducts() {
        const container = document.getElementById('featured-products');
        if (!container) return;

        const featuredProducts = this.products.filter(product => product.featured);
        container.innerHTML = featuredProducts.map(product => this.createProductCard(product)).join('');
    }

    renderAllProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;

        container.innerHTML = this.products.map(product => this.createProductCard(product)).join('');
    }

    createProductCard(product) {
        return `
            <div class="product-card">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image"
                     onerror="this.classList.add('error'); this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE5MFYxNDBIMTc1VjEyNVoiIGZpbGw9IiM2Qzc1N0QiLz4KPHBhdGggZD0iTTE2NSAxMDBIMjM1VjE4MEgxNjVWMTAwWiIgc3Ryb2tlPSIjNkM3NTdEIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPHRleHQgeD0iMjAwIiB5PSIyMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Qzc1N0QiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjUwMCI+UGhvdG8gbm90IGF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+Cg=='"
                     onload="this.classList.remove('loading')"
                     loading="lazy">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} บาท</p>
                <p class="product-description">${product.description}</p>
                <button class="btn btn-primary" onclick="ecommerce.addToCart(${product.id})">
                    เพิ่มลงตะกร้า
                </button>
            </div>
        `;
    }

    searchProducts() {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.toLowerCase();
        
        const filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        this.renderFilteredProducts(filteredProducts);
    }

    filterProducts() {
        const categoryFilter = document.getElementById('category-filter');
        const selectedCategory = categoryFilter.value;
        
        const filteredProducts = selectedCategory 
            ? this.products.filter(product => product.category === selectedCategory)
            : this.products;

        this.renderFilteredProducts(filteredProducts);
    }

    renderFilteredProducts(products) {
        const container = document.getElementById('products-grid');
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = '<p class="text-center">ไม่พบสินค้าที่ค้นหา</p>';
            return;
        }

        container.innerHTML = products.map(product => this.createProductCard(product)).join('');
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification('เพิ่มสินค้าลงตะกร้าแล้ว');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.renderCart();
            }
        }
    }

    renderCart() {
        const container = document.getElementById('cart-items');
        const totalElement = document.getElementById('total-price');
        
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '<p class="text-center">ตะกร้าว่าง</p>';
            if (totalElement) totalElement.textContent = '0 บาท';
            return;
        }

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${item.price.toLocaleString()} บาท</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="ecommerce.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="ecommerce.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="btn btn-danger btn-small" onclick="ecommerce.removeFromCart(${item.id})">ลบ</button>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (totalElement) totalElement.textContent = `${total.toLocaleString()} บาท`;
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'alert alert-success';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('ตะกร้าว่าง');
            return;
        }

        // Simulate checkout process
        this.showNotification('สั่งซื้อสำเร็จ!');
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }
}

// Initialize the application
const ecommerce = new MiniEcommerce();

// Setup checkout button
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => ecommerce.checkout());
    }
});

// js/cart.js
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.renderCart();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Additional cart-specific event listeners can be added here
        
        // Clear cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => this.clearCart());
        }

        // Apply coupon button
        const applyCouponBtn = document.getElementById('apply-coupon-btn');
        if (applyCouponBtn) {
            applyCouponBtn.addEventListener('click', () => this.applyCoupon());
        }
    }

    renderCart() {
        const container = document.getElementById('cart-items');
        const totalElement = document.getElementById('total-price');
        
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <h3>ตะกร้าสินค้าว่าง</h3>
                    <p>ยังไม่มีสินค้าในตะกร้า</p>
                    <a href="products.html" class="btn btn-primary">เลือกซื้อสินค้า</a>
                </div>
            `;
            if (totalElement) totalElement.textContent = '0 บาท';
            return;
        }

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${item.price.toLocaleString()} บาท</p>
                    <p class="cart-item-category">${this.getCategoryName(item.category)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="cartManager.updateQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">
                    <strong>${(item.price * item.quantity).toLocaleString()} บาท</strong>
                </div>
                <button class="btn btn-danger btn-small" onclick="cartManager.removeFromCart(${item.id})">
                    ลบ
                </button>
            </div>
        `).join('');

        this.updateTotals();
    }

    getCategoryName(category) {
        const categories = {
            'electronics': 'อิเล็กทรอนิกส์',
            'clothing': 'เสื้อผ้า',
            'books': 'หนังสือ'
        };
        return categories[category] || category;
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.renderCart();
            }
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
        this.updateCartCount();
        this.showNotification('ลบสินค้าออกจากตะกร้าแล้ว');
    }

    clearCart() {
        if (confirm('ต้องการลบสินค้าทั้งหมดจากตะกร้าหรือไม่?')) {
            this.cart = [];
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
            this.showNotification('ลบสินค้าทั้งหมดแล้ว');
        }
    }

    updateTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 1000 ? 0 : 50; // Free shipping for orders over 1000 baht
        const tax = subtotal * 0.07; // 7% VAT
        const total = subtotal + shipping + tax;

        const summaryElement = document.querySelector('.cart-summary');
        if (summaryElement) {
            summaryElement.innerHTML = `
                <h3>สรุปการสั่งซื้อ</h3>
                <div class="summary-row">
                    <span>ราคารวม:</span>
                    <span>${subtotal.toLocaleString()} บาท</span>
                </div>
                <div class="summary-row">
                    <span>ค่าจัดส่ง:</span>
                    <span>${shipping === 0 ? 'ฟรี' : shipping.toLocaleString() + ' บาท'}</span>
                </div>
                <div class="summary-row">
                    <span>ภาษี (7%):</span>
                    <span>${tax.toLocaleString()} บาท</span>
                </div>
                <div class="summary-row total-row">
                    <span>ยอดรวมทั้งหมด:</span>
                    <span id="total-price">${total.toLocaleString()} บาท</span>
                </div>
                <div class="coupon-section">
                    <input type="text" id="coupon-input" placeholder="รหัสคูปอง" class="form-input">
                    <button id="apply-coupon-btn" class="btn btn-secondary">ใช้คูปอง</button>
                </div>
                <button class="btn btn-primary btn-large" id="checkout-btn" onclick="cartManager.checkout()">
                    สั่งซื้อ
                </button>
                <button class="btn btn-secondary" id="clear-cart-btn" onclick="cartManager.clearCart()">
                    ล้างตะกร้า
                </button>
            `;
        }
    }

    applyCoupon() {
        const couponInput = document.getElementById('coupon-input');
        const couponCode = couponInput.value.trim().toUpperCase();
        
        const validCoupons = {
            'SAVE10': { discount: 0.10, type: 'percentage' },
            'SAVE50': { discount: 50, type: 'fixed' },
            'FREESHIP': { discount: 0, type: 'shipping' }
        };

        if (validCoupons[couponCode]) {
            this.appliedCoupon = validCoupons[couponCode];
            this.appliedCoupon.code = couponCode;
            this.showNotification('ใช้คูปองสำเร็จ!');
            this.updateTotals();
        } else {
            this.showNotification('รหัสคูปองไม่ถูกต้อง');
        }
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-success';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('ตะกร้าว่าง');
            return;
        }

        // Show checkout form or process
        this.showCheckoutForm();
    }

    showCheckoutForm() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">ชำระเงิน</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="checkout-form">
                        <div class="form-group">
                            <label class="form-label">ชื่อ-นามสกุล:</label>
                            <input type="text" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">เบอร์โทรศัพท์:</label>
                            <input type="tel" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">ที่อยู่:</label>
                            <textarea class="form-input" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">วิธีการชำระเงิน:</label>
                            <select class="form-input" required>
                                <option value="">เลือกวิธีการชำระเงิน</option>
                                <option value="credit">บัตรเครดิต</option>
                                <option value="transfer">โอนเงิน</option>
                                <option value="cod">เก็บเงินปลายทาง</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">ยืนยันการสั่งซื้อ</button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const form = modal.querySelector('#checkout-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processOrder();
            modal.remove();
        });
    }

    processOrder() {
        // Simulate order processing
        this.showNotification('สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ');
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        
        // Redirect to success page or show success message
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Initialize cart manager only on cart page
if (window.location.pathname.includes('cart.html')) {
    const cartManager = new CartManager();
}