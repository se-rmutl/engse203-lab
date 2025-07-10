# Part 2: Team Collaboration - Solutions & Answer Key

## 🔑 Exercise Solutions

**Note**: This is the instructor's answer key. Students should not access this until after completing the exercises.

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

**CI/CD Pipeline Solution**:

**.github/workflows/ci.yml**:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop