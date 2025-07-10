        const { name, description, price, category, image, stock } = req.body;
        
        const newProduct = new Product({
            name,
            description,
            price: parseFloat(price),
            category,
            image: image || 'https://via.placeholder.com/400',
            stock: parseInt(stock) || 0,
            ratings: {
                average: 0,
                count: 0
            }
        });
        
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT /api/products/:id - Update product
router.put('/:id', [
    body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors: errors.array() 
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(updatedProduct);
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;
```

**backend/models/Product.js**:
```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['electronics', 'clothing', 'books', 'home', 'sports', 'beauty']
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/400'
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be negative'],
            max: [5, 'Rating cannot exceed 5']
        },
        count: {
            type: Number,
            default: 0,
            min: [0, 'Rating count cannot be negative']
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create indexes for better performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'ratings.average': -1 });

// Virtual for availability
productSchema.virtual('isAvailable').get(function() {
    return this.stock > 0 && this.isActive;
});

// Transform JSON output
productSchema.set('toJSON', {
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Product', productSchema);
```

**CI/CD Pipeline Solution**:

**.github/workflows/ci.yml**:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

env:
  NODE_VERSION: '18'
  MONGODB_URI: mongodb://localhost:27017/ecommerce_test

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Run ESLint
      run: |
        cd frontend
        npm run lint
    
    - name: Run tests
      run: |
        cd frontend
        npm test -- --coverage --watchAll=false
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./frontend/coverage/lcov.info
        flags: frontend
    
    - name: Build frontend
      run: |
        cd frontend
        npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: frontend-build
        path: frontend/build/

  test-backend:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        cache-dependency-path: backend/package-lock.json
    
    - name: Install dependencies
      run: |
        cd backend
        npm ci
    
    - name: Run ESLint
      run: |
        cd backend
        npm run lint
    
    - name: Wait for MongoDB
      run: |
        sleep 10
    
    - name: Run tests
      run: |
        cd backend
        npm test -- --coverage
      env:
        NODE_ENV: test
        MONGODB_URI: ${{ env.MONGODB_URI }}
        JWT_SECRET: test_secret
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./backend/coverage/lcov.info
        flags: backend

  security-scan:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
    
    - name: Install dependencies
      run: |
        cd backend && npm ci
        cd ../frontend && npm ci
    
    - name: Run security audit
      run: |
        cd backend
        npm audit --audit-level moderate
        cd ../frontend
        npm audit --audit-level moderate
    
    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high

  e2e-tests:
    runs-on: ubuntu-latest
    needs: [test-frontend, test-backend]
    
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
    
    - name: Install dependencies
      run: |
        cd backend && npm ci
        cd ../frontend && npm ci
    
    - name: Download frontend build
      uses: actions/download-artifact@v3
      with:
        name: frontend-build
        path: frontend/build/
    
    - name: Start backend server
      run: |
        cd backend
        npm start &
        sleep 10
      env:
        NODE_ENV: production
        MONGODB_URI: ${{ env.MONGODB_URI }}
        JWT_SECRET: test_secret
    
    - name: Run E2E tests
      run: |
        cd frontend
        npm run test:e2e
      env:
        API_URL: http://localhost:3000

  deploy-staging:
    runs-on: ubuntu-latest
    needs: [test-frontend, test-backend, security-scan, e2e-tests]
    if: github.ref == 'refs/heads/develop' && github.event_name == 'push'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Download frontend build
      uses: actions/download-artifact@v3
      with:
        name: frontend-build
        path: frontend/build/
    
    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment..."
        echo "Frontend URL: https://staging-ecommerce.herokuapp.com"
        echo "API URL: https://staging-api-ecommerce.herokuapp.com"
        # Here you would add actual deployment commands
    
    - name: Run smoke tests
      run: |
        echo "Running smoke tests on staging..."
        # Add smoke test commands here

  deploy-production:
    runs-on: ubuntu-latest
    needs: [test-frontend, test-backend, security-scan, e2e-tests]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Download frontend build
      uses: actions/download-artifact@v3
      with:
        name: frontend-build
        path: frontend/build/
    
    - name: Deploy to production
      run: |
        echo "Deploying to production environment..."
        echo "Frontend URL: https://ecommerce.herokuapp.com"
        echo "API URL: https://api-ecommerce.herokuapp.com"
        # Here you would add actual deployment commands
    
    - name: Create release
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: v${{ github.run_number }}
        release_name: Release v${{ github.run_number }}
        body: |
          Changes in this release:
          - Automated release from main branch
          - All tests passing
          - Security scans clean
        draft: false
        prerelease: false
```

**Test Files**:

**frontend/src/components/LoginForm.test.js**:
```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mock fetch
global.fetch = jest.fn();

describe('LoginForm', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders login form elements', () => {
        render(<LoginForm onLogin={jest.fn()} onSwitchToRegister={jest.fn()} />);
        
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('handles form submission successfully', async () => {
        const mockOnLogin = jest.fn();
        const mockResponse = {
            ok: true,
            json: async () => ({
                token: 'mock-token',
                user: { id: '1', firstName: 'John', lastName: 'Doe' }
            })
        };
        
        fetch.mockResolvedValueOnce(mockResponse);
        
        render(<LoginForm onLogin={mockOnLogin} onSwitchToRegister={jest.fn()} />);
        
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });
        
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        
        await waitFor(() => {
            expect(mockOnLogin).toHaveBeenCalledWith({
                id: '1',
                firstName: 'John',
                lastName: 'Doe'
            });
        });
    });

    test('displays error message on login failure', async () => {
        const mockResponse = {
            ok: false,
            json: async () => ({ message: 'Invalid credentials' })
        };
        
        fetch.mockResolvedValueOnce(mockResponse);
        
        render(<LoginForm onLogin={jest.fn()} onSwitchToRegister={jest.fn()} />);
        
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpassword' }
        });
        
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        
        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});
```

**backend/tests/auth.test.js**:
```javascript
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('Authentication API', () => {
    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
    });

    afterAll(async () => {
        // Clean up and close connection
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clear users collection before each test
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () => {
        test('should register a new user successfully', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.token).toBeDefined();
            expect(response.body.user.email).toBe(userData.email);
            expect(response.body.user.password).toBeUndefined();
        });

        test('should return 400 for invalid input', async () => {
            const userData = {
                firstName: 'John',
                // Missing required fields
                email: 'invalid-email',
                password: '123' // Too short
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Validation failed');
        });

        test('should return 409 for existing user', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'password123'
            };

            // Create user first
            await request(app)
                .post('/api/auth/register')
                .send(userData);

            // Try to register same user again
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData);

            expect(response.status).toBe(409);
            expect(response.body.message).toBe('User already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Create test user
            await request(app)
                .post('/api/auth/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    password: 'password123'
                });
        });

        test('should login successfully with valid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'john@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.token).toBeDefined();
            expect(response.body.user.email).toBe('john@example.com');
        });

        test('should return 401 for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'john@example.com',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
        });

        test('should return 401 for non-existent user', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
});
```

**Grading Criteria**:
- Feature completeness (4 points): All required functionality implemented
- Code quality (3 points): Clean, readable, well-structured code
- Testing (3 points): Comprehensive test coverage
- Documentation (2 points): Clear documentation and comments
- Regular commits (3 points): Consistent commit history with meaningful messages

### Solution 2.2: Pull Request Process (10 points)

**Sample Pull Request**:

**Title**: `feat(auth): add user authentication with JWT tokens`

**Description**:
```markdown
## Description
This PR implements user authentication system with registration, login, and JWT token management.

## Type of Change
- [x] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added user registration endpoint with validation
- Implemented login functionality with JWT tokens
- Created React components for login/register forms
- Added password hashing with bcrypt
- Included comprehensive error handling
- Added authentication middleware
- Created responsive UI for auth forms

## API Endpoints Added
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

## Testing
- [x] Unit tests for API endpoints
- [x] Component tests for React forms
- [x] Integration tests for auth flow
- [x] Manual testing completed
- [x] Error handling tested
- [x] Security validation tested

## Screenshots
![Login Form](./screenshots/login-form.png)
![Register Form](./screenshots/register-form.png)
![Error Handling](./screenshots/error-handling.png)

## Security Considerations
- Passwords are hashed using bcrypt with salt rounds
- JWT tokens have expiration time
- Input validation on all endpoints
- Protection against common attacks (XSS, injection)

## Breaking Changes
None

## Checklist
- [x] Code follows project style guide
- [x] Self-review completed
- [x] Tests added and passing
- [x] Documentation updated
- [x] No console errors
- [x] Responsive design verified
- [x] Cross-browser compatibility tested
```

**Grading Criteria**:
- PR template completed (3 points): All sections filled appropriately
- Detailed description (2 points): Clear explanation of changes
- Screenshots/evidence (2 points): Visual proof of functionality
- Reviewer assignment (1 point): Appropriate reviewers requested
- Response to feedback (2 points): Constructive interaction with reviewers

---

## Exercise 3: Code Review & Collaboration (20 points)

### Solution 3.1: Peer Code Review (12 points)

**Sample Code Review Comments**:

**Constructive Feedback Examples**:

```javascript
// File: frontend/src/components/LoginForm.js
// Line 45-50

// Good feedback:
"Great implementation of the login form! A few suggestions:

1. Consider extracting the API call into a separate service function for reusability
2. The error handling looks good, but we might want to add specific error codes for different scenarios
3. Could we add a 'Remember Me' checkbox functionality?

Overall, the code is clean and well-structured. The validation logic is solid!"

// Code suggestion:
"```javascript
// Consider creating a separate auth service:
// services/authService.js
export const loginUser = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error(await response.json());
  }
  
  return response.json();
};
```"
```

**Security Review Comments**:
```javascript
// File: backend/api/auth.js
// Line 25-30

"Security review:
✅ Password hashing with bcrypt - good!
✅ JWT token expiration - excellent!
⚠️ Consider adding rate limiting to prevent brute force attacks
⚠️ Missing input sanitization - could add express-validator for additional security

Suggestion: Add rate limiting middleware:
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later'
});

router.post('/login', loginLimiter, [...validation], async (req, res) => {
  // existing code
});
```"
```

**Performance Review Comments**:
```javascript
// File: frontend/src/components/ProductCatalog.js
// Line 65-80

"Performance considerations:
✅ Good use of React hooks
⚠️ Consider implementing pagination for large product lists
⚠️ Missing memoization for expensive calculations

Suggestions:
1. Add React.memo to prevent unnecessary re-renders
2. Use useMemo for filtered products
3. Implement virtual scrolling for large lists

```javascript
const ProductCatalog = React.memo(({ products, filters }) => {
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // filtering logic
    });
  }, [products, filters]);
  
  // rest of component
});
```"
```

**Code Quality Review**:
```javascript
// File: backend/models/User.js
// Line 15-25

"Code quality feedback:
✅ Good use of Mongoose schema validation
✅ Proper indexing on email field
⚠️ Missing some common user fields (createdAt, updatedAt)
⚠️ Consider adding user roles/permissions

Suggestions:
```javascript
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, {
  timestamps: true // adds createdAt and updatedAt
});
```"
```

**Grading Criteria**:
- Number of reviews (3 points): Minimum 2 thorough reviews
- Quality of feedback (4 points): Constructive, specific, helpful
- Use of GitHub tools (2 points): Proper use of review interface
- Professional communication (3 points): Respectful and constructive tone

### Solution 3.2: Conflict Resolution (8 points)

**Conflict Resolution Example**:

**Scenario**: Two developers modified the same API endpoint

**Conflicted File** (backend/api/products.js):
```javascript
// GET /api/products endpoint
router.get('/', async (req, res) => {
<<<<<<< HEAD
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
=======
  try {
    const { category, search, minPrice, maxPrice, sortBy = 'name' } = req.query;
    
    let query = {};
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'price-low':
        sortOptions.price = 1;
        break;
      case 'price-high':
        sortOptions.price = -1;
        break;
      case 'name':
        sortOptions.name = 1;
        break;
      default:
        sortOptions.createdAt = -1;
    }
    
    const products = await Product.find(query).sort(sortOptions);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
>>>>>>> feature/product-search
});
```

**Resolution Strategy**:

1. **Team Communication**:
```markdown
**Conflict Resolution Discussion**

**Developers involved**: @dev1, @dev2
**Files affected**: backend/api/products.js
**Conflict type**: Feature overlap

**Dev1's changes**: Added pagination functionality
**Dev2's changes**: Added search and filtering functionality

**Proposed resolution**: Combine both features
**Action plan**: 
1. Merge both filtering and pagination
2. Add comprehensive tests
3. Update API documentation
```

2. **Combined Resolution**:
```javascript
// Resolved version combining both features
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      minPrice, 
      maxPrice, 
      sortBy = 'name',
      page = 1, 
      limit = 10 
    } = req.query;
    
    const skip = (page - 1) * limit;
    let query = {};
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'price-low':
        sortOptions.price = 1;
        break;
      case 'price-high':
        sortOptions.price = -1;
        break;
      case 'name':
        sortOptions.name = 1;
        break;
      default:
        sortOptions.createdAt = -1;
    }
    
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sortOptions);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        category,
        search,
        minPrice,
        maxPrice,
        sortBy
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
```

3. **Resolution Commit**:
```bash
git add backend/api/products.js
git commit -m "resolve: merge pagination and search features in products API

- Combined pagination functionality from feature/product-pagination
- Integrated search and filtering from feature/product-search  
- Added comprehensive query parameter support
- Maintained backward compatibility
- Added proper error handling

Co-authored-by: Dev1 <dev1@example.com>
Co-authored-by: Dev2 <dev2@example.com>"
```

**Grading Criteria**:
- Conflicts identified (2 points): Proper identification of conflict sources
- Team communication (2 points): Effective collaboration during resolution
- Resolution strategy (2 points): Logical approach to combining changes
-# Part 2: Team Collaboration - Complete Solutions & Answer Key

## 🔑 Exercise Solutions

**Note**: This is the instructor's complete answer key. Students should not access this until after completing the exercises.

---

## Exercise 1: Team Repository Setup (15 points)

### Solution 1.1: Repository Configuration (10 points)

**Expected Repository Structure**:
```
team-[team-name]-final-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── styles/
│   ├── public/
│   └── package.json
├── backend/
│   ├── api/
│   ├── models/
│   ├── middleware/
│   ├── tests/
│   └── server.js
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── TESTING.md
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

**Sample README.md**:
```markdown
# Team [Team Name] E-commerce Project

## Team Members
- **Team Lead**: [Name] - [@username](https://github.com/username) - Repository management, integration
- **Frontend Developer**: [Name] - [@username](https://github.com/username) - UI/UX, React components
- **Backend Developer**: [Name] - [@username](https://github.com/username) - API, database, authentication
- **DevOps Engineer**: [Name] - [@username](https://github.com/username) - CI/CD, deployment

## Project Description
Modern e-commerce platform built with React frontend and Node.js backend. Features include user authentication, product catalog, shopping cart, and order management.

## Features
- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 👤 User authentication and profiles
- 📦 Order management
- 🔐 Secure payment processing
- 📱 Responsive design
- 🚀 Real-time updates

## Tech Stack
- **Frontend**: React, CSS3, JavaScript ES6+
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT
- **Testing**: Jest, Supertest
- **CI/CD**: GitHub Actions
- **Deployment**: Docker, AWS/Heroku

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- Git

### Installation
1. Clone the repository
```bash
git clone https://github.com/[username]/team-[team-name]-final-project.git
cd team-[team-name]-final-project
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the application
```bash
# Start backend
cd backend
npm run dev

# Start frontend (in new terminal)
cd frontend
npm start
```

## Development Workflow
1. Create feature branch from `develop`
2. Make changes and commit regularly
3. Push to your feature branch
4. Create Pull Request to `develop`
5. Request code review from team members
6. Address feedback and merge

## Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e
```

## Deployment
- **Staging**: Auto-deployed from `develop` branch
- **Production**: Auto-deployed from `main` branch
- **URL**: https://team-[team-name]-ecommerce.herokuapp.com

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

**Sample CONTRIBUTING.md**:
```markdown
# Contributing to Team E-commerce Project

## Development Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Create Pull Request

## Code Style
- Use ESLint configuration provided
- Follow Conventional Commits format
- Write meaningful commit messages
- Include tests for new features

## Commit Message Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore

Examples:
- `feat(auth): add user registration`
- `fix(cart): resolve quantity calculation bug`
- `docs(api): update authentication endpoints`

## Pull Request Process
1. Update README.md with details of changes
2. Increase version numbers in package.json
3. PR will be merged once you have sign-off from two developers
4. Ensure all tests pass
5. Update documentation as needed

## Testing Requirements
- Unit tests for new functions
- Integration tests for API endpoints
- E2E tests for critical user paths
- Minimum 80% code coverage

## Code Review Checklist
- [ ] Code is readable and well-documented
- [ ] Tests are included and passing
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Error handling implemented
- [ ] Follows project conventions
```

**Branch Protection Configuration**:
```yaml
# Settings → Branches → Add rule
Branch name pattern: main
□ Require pull request reviews before merging
  ☑ Require review from code owners
  ☑ Dismiss stale reviews when new commits are pushed
  ☑ Require review from at least 2 reviewers
□ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging
  Required status checks:
  - ci/build
  - ci/test
  - ci/security-scan
□ Require signed commits
□ Require linear history
□ Restrict pushes that create files
□ Restrict pushes that delete files
```

**Grading Criteria**:
- Repository structure (3 points): All directories and files present
- Team collaboration setup (2 points): All members added with proper access
- Branch protection (3 points): Main and develop branches protected
- Documentation (2 points): README and CONTRIBUTING comprehensive

### Solution 1.2: Initial Commit Strategy (5 points)

**Expected Initial Commits**:

**Team Lead**:
```bash
git checkout -b setup/initial-structure
# Create repository structure
git add .
git commit -m "feat(setup): add initial project structure and documentation"
git push origin setup/initial-structure
```

**Frontend Developer**:
```bash
git checkout -b feat/frontend-setup
# Create React app structure
git add frontend/
git commit -m "feat(frontend): initialize React application with basic structure"
git push origin feat/frontend-setup
```

**Backend Developer**:
```bash
git checkout -b feat/backend-setup
# Create Node.js server structure
git add backend/
git commit -m "feat(backend): initialize Express server with basic configuration"
git push origin feat/backend-setup
```

**DevOps Engineer**:
```bash
git checkout -b feat/cicd-setup
# Create GitHub Actions workflows
git add .github/
git commit -m "feat(ci): add GitHub Actions workflows for CI/CD pipeline"
git push origin feat/cicd-setup
```

**Grading Criteria**:
- All team members committed (2 points): Each member has initial commit
- Conventional commit format (2 points): Proper commit message structure
- Clean history (1 point): No merge commits in initial setup

---

## Exercise 2: Feature Development & Pull Requests (25 points)

### Solution 2.1: Parallel Feature Development (15 points)

**Frontend Developer Solution**:

**Authentication Components**:

**frontend/src/components/LoginForm.js**:
```javascript
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                onLogin(data.user);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p>
                Don't have an account?{' '}
                <button onClick={onSwitchToRegister}>Register here</button>
            </p>
        </div>
    );
};

export default LoginForm;
```

**frontend/src/components/RegisterForm.js**:
```javascript
import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                onRegister(data.user);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p>
                Already have an account?{' '}
                <button onClick={onSwitchToLogin}>Login here</button>
            </p>
        </div>
    );
};

export default RegisterForm;
```

**frontend/src/components/LoginForm.css**:
```css
.login-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background: white;
}

.login-form h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
}

.login-form button[type="submit"] {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-form button[type="submit"]:hover:not(:disabled) {
    background-color: #0056b3;
}

.login-form button[type="submit"]:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.login-form p {
    text-align: center;
    margin-top: 1rem;
    color: #666;
}

.login-form p button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
}

.login-form p button:hover {
    color: #0056b3;
}

@media (max-width: 768px) {
    .login-form {
        margin: 1rem;
        padding: 1.5rem;
    }
}
```

**frontend/src/components/RegisterForm.css**:
```css
.register-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background: white;
}

.register-form h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #28a745;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
}

.error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
}

.register-form button[type="submit"] {
    width: 100%;
    padding: 0.75rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.register-form button[type="submit"]:hover:not(:disabled) {
    background-color: #218838;
}

.register-form button[type="submit"]:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.register-form p {
    text-align: center;
    margin-top: 1rem;
    color: #666;
}

.register-form p button {
    background: none;
    border: none;
    color: #28a745;
    cursor: pointer;
    text-decoration: underline;
}

.register-form p button:hover {
    color: #218838;
}

@media (max-width: 768px) {
    .register-form {
        margin: 1rem;
        padding: 1.5rem;
    }
}
```

**Backend Developer Solution**:

**Authentication API**:

**backend/api/auth.js**:
```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Register endpoint
router.post('/register', [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors: errors.array() 
            });
        }

        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors: errors.array() 
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout endpoint
router.post('/logout', authenticateToken, (req, res) => {
    // In a real app, you might want to blacklist the token
    res.json({ message: 'Logout successful' });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

module.exports = router;
```

**backend/models/User.js**:
```javascript
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    profilePicture: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Create index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ firstName: 1, lastName: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Transform JSON output
userSchema.set('toJSON', {
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model('User', userSchema);
```

**Product Management Solution**:

**backend/api/products.js**:
```javascript
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');

// GET /api/products - Get all products with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            search, 
            minPrice, 
            maxPrice, 
            sortBy = 'name',
            page = 1, 
            limit = 12 
        } = req.query;
        
        const skip = (page - 1) * limit;
        let query = {};
        
        // Category filter
        if (category && category !== 'all') {
            query.category = category;
        }
        
        // Search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Price filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        
        // Sort options
        let sortOptions = {};
        switch (sortBy) {
            case 'price-low':
                sortOptions.price = 1;
                break;
            case 'price-high':
                sortOptions.price = -1;
                break;
            case 'name':
                sortOptions.name = 1;
                break;
            case 'rating':
                sortOptions['ratings.average'] = -1;
                break;
            default:
                sortOptions.createdAt = -1;
        }
        
        const products = await Product.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort(sortOptions);
        
        const total = await Product.countDocuments(query);
        
        res.json({
            products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            },
            filters: {
                category,
                search,
                minPrice,
                maxPrice,
                sortBy
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST /api/products - Create new product (admin only)
router.post('/', [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors: errors.array() 
            });
        }

        const { name, description,