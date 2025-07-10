document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    let allProducts = [];

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    async function fetchProducts() {
        try {
            const response = await fetch('js/products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            allProducts = data;
            displayProducts(allProducts);
            showNotification('สินค้าโหลดเรียบร้อยแล้ว!');
        } catch (error) {
            loader.textContent = 'Failed to load products. Please try again later.';
            console.error('Error fetching products:', error);
        } finally {
            loader.classList.remove('is-active');
        }
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        if (products.length === 0) {
            productList.innerHTML = '<p>ไม่พบสินค้าที่ตรงกัน</p>';
            return;
        }
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price.toLocaleString()} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // Improved Search
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Handle empty input
        if (!searchTerm) {
            displayProducts(allProducts);
            return;
        }

        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    fetchProducts();
});