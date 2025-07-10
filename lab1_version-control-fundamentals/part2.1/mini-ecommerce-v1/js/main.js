// js/main.js - Version 1 (มีปัญหา)

// Global variables - ไม่ดี
let products = [];
let cart = [];

// Hard-coded products - ไม่มี JSON loading
const PRODUCTS = [
    {
        id: 1,
        name: "สมาร์ทโฟน Samsung Galaxy",
        price: 15900,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        description: "สมาร์ทโฟนรุ่นใหม่ล่าสุด",
        featured: true
    },
    {
        id: 2,
        name: "เสื้อยืดผ้าคอตตอน",
        price: 399,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description: "เสื้อยืดผ้าคอตตอน 100%",
        featured: false
    },
    {
        id: 3,
        name: "หนังสือ JavaScript Guide",
        price: 590,
        category: "books",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        description: "คู่มือการเขียนโปรแกรม JavaScript",
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
    }
];

// ไม่มี proper initialization
function init() {
    products = PRODUCTS;
    loadCartFromStorage(); // ไม่มี error handling
    updateCartCount();
    renderPage();
    setupEvents();
}

// ไม่มี error handling
function loadCartFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

// ไม่มี error handling
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Basic event setup - ไม่ครบ
function setupEvents() {
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (searchBtn) {
        searchBtn.onclick = searchProducts; // ไม่ใช้ addEventListener
    }
    
    if (categoryFilter) {
        categoryFilter.onchange = filterProducts; // ไม่ใช้ addEventListener
    }
    
    if (checkoutBtn) {
        checkoutBtn.onclick = checkout; // ไม่ใช้ addEventListener
    }
}

// ไม่มี proper routing
function renderPage() {
    const page = window.location.pathname.split('/').pop();
    
    if (page === 'index.html' || page === '') {
        renderFeaturedProducts();
    } else if (page === 'products.html') {
        renderAllProducts();
    } else if (page === 'cart.html') {
        renderCart();
    }
}

// ไม่มี loading states
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = products.filter(p => p.featured);
    let html = '';
    
    // ไม่ใช้ modern array methods ให้เต็มที่
    for (let i = 0; i < featured.length; i++) {
        html += createProductCard(featured[i]);
    }
    
    container.innerHTML = html;
}

// ไม่มี loading states
function renderAllProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    let html = '';
    
    // ไม่ใช้ modern array methods ให้เต็มที่
    for (let i = 0; i < products.length; i++) {
        html += createProductCard(products[i]);
    }
    
    container.innerHTML = html;
}

// ไม่มี error handling สำหรับ images
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${product.price} บาท</p>
            <p class="product-description">${product.description}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">
                เพิ่มลงตะกร้า
            </button>
        </div>
    `;
}

// Search ไม่มีประสิทธิภาพ
function searchProducts() {
    const input = document.getElementById('search-input');
    const searchTerm = input.value.toLowerCase();
    
    // ไม่มี debouncing
    // ไม่มี advanced search
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    renderFilteredProducts(filtered);
}

// Filter ไม่ครบ
function filterProducts() {
    const select = document.getElementById('category-filter');
    const category = select.value;
    
    let filtered = products;
    if (category) {
        filtered = products.filter(product => product.category === category);
    }
    
    renderFilteredProducts(filtered);
}

// ไม่มี proper error handling
function renderFilteredProducts(filteredProducts) {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p>ไม่พบสินค้าที่ค้นหา</p>';
        return;
    }
    
    let html = '';
    for (let i = 0; i < filteredProducts.length; i++) {
        html += createProductCard(filteredProducts[i]);
    }
    
    container.innerHTML = html;
}

// Cart management - ไม่ดี
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // ไม่มี proper duplicate handling
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartCount();
    
    // ไม่มี proper notification
    alert('เพิ่มสินค้าลงตะกร้าแล้ว');
}

// ไม่มี proper quantity controls
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    renderCart();
}

// Cart count update - basic
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Cart rendering - ไม่ดี
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p>ตะกร้าว่าง</p>';
        if (totalElement) totalElement.textContent = '0 บาท';
        return;
    }
    
    let html = '';
    let total = 0;
    
    // ไม่มี proper item controls
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        total += item.price * item.quantity;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${item.price} บาท</p>
                    <p>จำนวน: ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">ลบ</button>
            </div>
        `;
    }
    
    container.innerHTML = html;
    if (totalElement) totalElement.textContent = total + ' บาท';
}

// Checkout - ไม่มี validation
function checkout() {
    if (cart.length === 0) {
        alert('ตะกร้าว่าง');
        return;
    }
    
    // ไม่มี proper checkout process
    alert('สั่งซื้อสำเร็จ!');
    cart = [];
    saveCartToStorage();
    updateCartCount();
    renderCart();
}

// ไม่มี proper error handling
window.onerror = function(msg, url, line) {
    console.log('Error: ' + msg);
};

// Simple initialization - ไม่มี proper DOM ready check
window.onload = function() {
    init();
};

// ไม่มี debouncing
// ไม่มี proper form validation
// ไม่มี loading states
// ไม่มี proper error handling
// ไม่มี modern JavaScript features
// ไม่มี proper event delegation
// ไม่มี proper state management