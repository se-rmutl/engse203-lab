# Part 2: Team Collaboration & Advanced Workflow

## 🎯 Learning Objectives
หลังจากจบ Lab นี้ นักเรียนจะสามารถ:
- ทำงานร่วมกันเป็นทีมผ่าน GitHub
- ใช้งาน Pull Request และ Code Review process
- จัดการ Merge Conflicts อย่างมีประสิทธิภาพ
- ใช้ Advanced Git workflows และ branching strategies
- ทำงานกับ GitHub Actions สำหรับ CI/CD

## 📋 Prerequisites
- เสร็จสิ้น Part 1 ด้วยคะแนน 70+ 
- มีความเข้าใจพื้นฐาน Git commands
- มี GitHub account พร้อม SSH key
- มี text editor และ Git GUI tool

## 🕐 Time Required
**4-5 hours** (including team exercises)

## 👥 Team Setup
**จำนวนสมาชิก**: 3-4 คนต่อทีม  
**บทบาท**:
- **Team Lead**: จัดการ main repository และ merge
- **Frontend Developer**: ทำงานด้าน UI/UX
- **Backend Developer**: ทำงานด้าน API และ Database
- **DevOps Engineer**: ทำงานด้าน CI/CD และ deployment

---

## Lab 2.1: Team Repository Setup (45 minutes)

### Task 2.1.1: Create Team Repository
**Team Lead Instructions:**

1. Create new repository on GitHub:
   - Name: `team-ecommerce-project`
   - Description: "E-commerce website built by Team [X]"
   - Public repository
   - Initialize with README

2. Set up repository structure:
```bash
git clone git@github.com:TEAM_LEAD/team-ecommerce-project.git
cd team-ecommerce-project
```

3. Create project structure:
```
team-ecommerce-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── public/
│   └── package.json
├── backend/
│   ├── api/
│   ├── models/
│   ├── middleware/
│   └── server.js
├── docs/
├── tests/
├── .github/
│   └── workflows/
├── .gitignore
└── README.md
```

4. Create initial files:

**README.md**:
```markdown
# Team E-commerce Project

## Team Members
- **Team Lead**: [Name] - Repository management, integration
- **Frontend Developer**: [Name] - UI/UX, React components
- **Backend Developer**: [Name] - API, database, server
- **DevOps Engineer**: [Name] - CI/CD, deployment

## Project Overview
Modern e-commerce platform with:
- Product catalog
- Shopping cart
- User authentication
- Payment processing
- Admin dashboard

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (React)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **DevOps**: GitHub Actions, Docker

## Development Workflow
1. Create feature branch from `develop`
2. Implement feature with tests
3. Create Pull Request
4. Code review (2+ approvals required)
5. Merge to `develop`
6. Deploy to staging
7. Merge to `main` for production

## Getting Started
1. Clone repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm start`
```

**package.json** (frontend):
```json
{
  "name": "ecommerce-frontend",
  "version": "1.0.0",
  "description": "E-commerce frontend application",
  "main": "src/index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^2.0.20"
  }
}
```

**package.json** (backend):
```json
{
  "name": "ecommerce-backend",
  "version": "1.0.0",
  "description": "E-commerce backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^6.7.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^2.0.20"
  }
}
```

**.gitignore**:
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary files
tmp/
temp/
```

5. Commit initial structure:
```bash
git add .
git commit -m "feat: add initial project structure and configuration"
git push origin main
```

**📝 Record your results:**
- Repository created: ✅/❌
- Team members added as collaborators: ✅/❌
- Initial structure committed: ✅/❌

### Task 2.1.2: Add Team Members as Collaborators
**Team Lead Instructions:**

1. Go to repository Settings → Collaborators
2. Add each team member with "Write" access
3. Send invitation links to team members

**Team Members Instructions:**
1. Accept GitHub invitation
2. Clone repository:
```bash
git clone git@github.com:TEAM_LEAD/team-ecommerce-project.git
cd team-ecommerce-project
```

3. Verify access:
```bash
git remote -v
git status
```

**📝 Record your results:**
- Invitation accepted: ✅/❌
- Repository cloned: ✅/❌
- Write access verified: ✅/❌

### Task 2.1.3: Set Up Branch Protection
**Team Lead Instructions:**

1. Go to repository Settings → Branches
2. Add protection rule for `main` branch:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date
   - Require conversation resolution
   - Restrict pushes to matching branches

3. Create `develop` branch:
```bash
git checkout -b develop
git push origin develop
```

4. Set up protection for `develop` branch:
   - Require pull request reviews (1 approval minimum)
   - Require status checks to pass

**📝 Record your results:**
- Branch protection enabled: ✅/❌
- Develop branch created: ✅/❌
- Protection rules configured: ✅/❌

---

## Lab 2.2: Feature Development Workflow (90 minutes)

### Task 2.2.1: Frontend Development
**Frontend Developer Instructions:**

1. Create feature branch:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/product-catalog
```

2. Create product catalog component:

**frontend/src/components/ProductCard.js**:
```javascript
class ProductCard {
    constructor(product) {
        this.product = product;
    }
    
    render() {
        return `
            <div class="product-card" data-id="${this.product.id}">
                <img src="${this.product.image}" alt="${this.product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${this.product.name}</h3>
                    <p class="product-description">${this.product.description}</p>
                    <div class="product-price">$${this.product.price}</div>
                    <button class="add-to-cart-btn" data-id="${this.product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }
}

export default ProductCard;
```

**frontend/src/components/ProductCatalog.js**:
```javascript
import ProductCard from './ProductCard.js';

class ProductCatalog {
    constructor(container) {
        this.container = container;
        this.products = [];
        this.filters = {
            category: 'all',
            priceRange: 'all',
            sortBy: 'name'
        };
    }
    
    async loadProducts() {
        try {
            const response = await fetch('/api/products');
            this.products = await response.json();
            this.render();
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError('Failed to load products');
        }
    }
    
    filterProducts() {
        let filtered = [...this.products];
        
        if (this.filters.category !== 'all') {
            filtered = filtered.filter(product => 
                product.category === this.filters.category
            );
        }
        
        if (this.filters.priceRange !== 'all') {
            const [min, max] = this.filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(product => 
                product.price >= min && product.price <= max
            );
        }
        
        // Sort products
        filtered.sort((a, b) => {
            switch (this.filters.sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });
        
        return filtered;
    }
    
    render() {
        const filtered = this.filterProducts();
        
        this.container.innerHTML = `
            <div class="catalog-header">
                <h2>Products</h2>
                <div class="filters">
                    <select id="category-filter">
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                    </select>
                    <select id="price-filter">
                        <option value="all">All Prices</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-500">$100 - $500</option>
                    </select>
                    <select id="sort-filter">
                        <option value="name">Sort by Name</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div class="products-grid">
                ${filtered.map(product => new ProductCard(product).render()).join('')}
            </div>
        `;
        
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        // Filter event listeners
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.render();
        });
        
        document.getElementById('price-filter').addEventListener('change', (e) => {
            this.filters.priceRange = e.target.value;
            this.render();
        });
        
        document.getElementById('sort-filter').addEventListener('change', (e) => {
            this.filters.sortBy = e.target.value;
            this.render();
        });
        
        // Add to cart event listeners
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                this.addToCart(productId);
            });
        });
    }
    
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            // Dispatch custom event for cart management
            document.dispatchEvent(new CustomEvent('addToCart', {
                detail: { product }
            }));
            
            // Show success message
            this.showSuccess(`${product.name} added to cart!`);
        }
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

export default ProductCatalog;
```

**frontend/src/styles/components.css**:
```css
/* Product Catalog Styles */
.catalog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
}

.filters {
    display: flex;
    gap: 1rem;
}

.filters select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem;
}

.product-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 1rem;
}

.product-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #333;
}

.product-description {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.5;
}

.product-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #27ae60;
    margin-bottom: 1rem;
}

.add-to-cart-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
    background-color: #2980b9;
}

/* Notifications */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    z-index: 1000;
    animation: slideIn 0.3s ease;
}

.notification.success {
    background-color: #27ae60;
}

.notification.error {
    background-color: #e74c3c;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .catalog-header {
        flex-direction: column;
        gap: 1rem;
    }
    
    .filters {
        flex-direction: column;
        width: 100%;
    }
    
    .products-grid {
        grid-template-columns: 1fr;
    }
}
```

3. Create main HTML file:

**frontend/public/index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-commerce Store</title>
    <link rel="stylesheet" href="/styles/components.css">
    <link rel="stylesheet" href="/styles/main.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="nav-brand">
                <h1>E-Store</h1>
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#cart">Cart (<span id="cart-count">0</span>)</a></li>
                <li><a href="#account">Account</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="hero">
            <div class="hero-content">
                <h2>Welcome to E-Store</h2>
                <p>Discover amazing products at great prices</p>
                <button class="cta-button">Shop Now</button>
            </div>
        </section>
        
        <section id="products">
            <div class="container">
                <div id="product-catalog"></div>
            </div>
        </section>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; 2024 E-Store. All rights reserved.</p>
        </div>
    </footer>
    
    <script type="module" src="/src/app.js"></script>
</body>
</html>
```

4. Create main application file:

**frontend/src/app.js**:
```javascript
import ProductCatalog from './components/ProductCatalog.js';

class App {
    constructor() {
        this.cart = [];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeComponents();
    }
    
    setupEventListeners() {
        // Cart event listener
        document.addEventListener('addToCart', (e) => {
            this.addToCart(e.detail.product);
        });
        
        // Navigation event listeners
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.navigateToSection(target);
            });
        });
        
        // CTA button
        document.querySelector('.cta-button').addEventListener('click', () => {
            this.navigateToSection('products');
        });
    }
    
    initializeComponents() {
        const catalogContainer = document.getElementById('product-catalog');
        this.catalog = new ProductCatalog(catalogContainer);
        this.catalog.loadProducts();
    }
    
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartCount();
        this.saveCart();
    }
    
    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    
    loadCart() {
        const saved = localStorage.getItem('cart');
        if (saved) {
            this.cart = JSON.parse(saved);
            this.updateCartCount();
        }
    }
    
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
```

5. Add additional styling:

**frontend/src/styles/main.css**:
```css
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Header Styles */
.navbar {
    background: #2c3e50;
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-brand h1 {
    font-size: 1.8rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #3498db;
}

/* Main Content */
main {
    margin-top: 80px;
}

/* Hero Section */
#hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.hero-content h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.cta-button {
    background-color: #e74c3c;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cta-button:hover {
    background-color: #c0392b;
}

/* Products Section */
#products {
    padding: 4rem 0;
}

/* Footer */
footer {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: 4rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .navbar .container {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-links {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .hero-content h2 {
        font-size: 2rem;
    }
    
    main {
        margin-top: 150px;
    }
}
```

6. Commit and push feature:
```bash
git add .
git commit -m "feat(frontend): add product catalog with filtering and cart functionality"
git push origin feature/product-catalog
```

**📝 Record your results:**
- Feature branch created: ✅/❌
- Product catalog implemented: ✅/❌
- Styling completed: ✅/❌
- Feature pushed to GitHub: ✅/❌

### Task 2.2.2: Backend Development