# 🚀 Portfolio Website Development Workshop Guide
## TASK2: HTML5 & CSS3 Fundamentals with Git Version Control

### 📋 Workshop Overview
**Duration:** 1.5 hours (Individual Work)  
**Objective:** Create a complete responsive portfolio website using HTML5, CSS3, and JavaScript with proper Git version control

---

## 🎯 Learning Outcomes
By the end of this workshop, students will be able to:
- ✅ Create semantic HTML5 structure
- ✅ Implement modern CSS3 styling with responsive design
- ✅ Add interactive JavaScript functionality
- ✅ Use Git for version control and collaboration
- ✅ Deploy a live website
- ✅ Document their development process

---

## 🛠️ Prerequisites & Setup

### Required Tools:
- **Code Editor:** Visual Studio Code
- **Browser:** Chrome/Firefox (with Developer Tools)
- **Git:** Latest version installed
- **GitHub Account:** For repository hosting

### VS Code Extensions (Recommended):
```
- Live Server
- Prettier - Code formatter
- HTML CSS Support
- GitLens
- Auto Rename Tag
```

---

## 📁 Project Structure Setup

### Step 1: Initial Project Setup (10 minutes)

#### 1.1 Create Project Directory
```bash
# Navigate to your workspace
cd ~/Desktop/projects

# Create main project folder
mkdir my-portfolio-website
cd my-portfolio-website

# Initialize Git repository
git init

# Create basic project structure
mkdir css js images
touch index.html css/style.css js/script.js README.md
```

#### 1.2 Verify Project Structure
```
my-portfolio-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Images folder
│   ├── profile.jpg     # Your profile photo
│   ├── about.jpg       # About section image
│   ├── project1.jpg    # Project screenshots
│   ├── project2.jpg
│   └── project3.jpg
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

#### 1.3 Create .gitignore File
```bash
# Create .gitignore
echo "# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log

# Dependencies
node_modules/" > .gitignore
```

---

## 🏗️ HTML5 Structure Implementation

### Step 2: Create Semantic HTML Structure (25 minutes)

#### 2.1 Basic HTML Template
Create the main `index.html` file with semantic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[Your Name] - Full Stack Developer Portfolio">
    <meta name="keywords" content="web developer, full stack, HTML, CSS, JavaScript">
    <meta name="author" content="[Your Name]">
    
    <title>[Your Name] - Portfolio</title>
    
    <!-- External Resources -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navigation Header -->
    <nav class="navbar" role="navigation" aria-label="Main navigation">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="#home" aria-label="Go to home section">Portfolio</a>
            </div>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#skills" class="nav-link">Skills</a></li>
                <li><a href="#projects" class="nav-link">Projects</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <div class="nav-toggle" aria-label="Toggle navigation menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section id="home" class="hero">
            <div class="hero-content">
                <h1>Hello, I'm <span class="highlight">[Your Name]</span></h1>
                <p class="hero-subtitle">Full Stack Developer</p>
                <p class="hero-description">I create beautiful and functional web applications using modern technologies</p>
                <div class="hero-buttons">
                    <a href="#projects" class="btn btn-primary">View My Work</a>
                    <a href="#contact" class="btn btn-secondary">Get In Touch</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="images/profile.jpg" alt="[Your Name] - Profile Picture">
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="about">
            <div class="container">
                <h2 class="section-title">About Me</h2>
                <div class="about-content">
                    <div class="about-text">
                        <p>I am a passionate Full Stack Developer with experience in creating web applications using modern technologies. I love solving complex problems and learning new technologies to deliver exceptional user experiences.</p>
                        <p>My journey in web development started during my studies in Software Engineering at RMUTL, where I discovered my passion for creating digital solutions that make a difference.</p>
                        
                        <div class="about-stats">
                            <div class="stat-item">
                                <h3>2+</h3>
                                <p>Years Experience</p>
                            </div>
                            <div class="stat-item">
                                <h3>15+</h3>
                                <p>Projects Completed</p>
                            </div>
                            <div class="stat-item">
                                <h3>10+</h3>
                                <p>Happy Clients</p>
                            </div>
                        </div>
                    </div>
                    <div class="about-image">
                        <img src="images/about.jpg" alt="About me - workspace setup">
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="skills">
            <div class="container">
                <h2 class="section-title">My Skills</h2>
                <div class="skills-grid">
                    <div class="skill-item">
                        <i class="fab fa-html5" aria-hidden="true"></i>
                        <h3>HTML5</h3>
                        <p>Semantic markup, accessibility best practices, and modern HTML5 features</p>
                        <div class="skill-level">
                            <div class="skill-bar" data-skill="90"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <i class="fab fa-css3-alt" aria-hidden="true"></i>
                        <h3>CSS3</h3>
                        <p>Responsive design, CSS Grid, Flexbox, animations, and modern CSS techniques</p>
                        <div class="skill-level">
                            <div class="skill-bar" data-skill="85"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <i class="fab fa-js-square" aria-hidden="true"></i>
                        <h3>JavaScript</h3>
                        <p>ES6+ features, DOM manipulation, async programming, and modern JavaScript</p>
                        <div class="skill-level">
                            <div class="skill-bar" data-skill="80"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <i class="fab fa-react" aria-hidden="true"></i>
                        <h3>React</h3>
                        <p>Component-based architecture, hooks, state management, and modern React patterns</p>
                        <div class="skill-level">
                            <div class="skill-bar" data-skill="75"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <i class="fab fa-node-js" aria-hidden="true"></i>
                        <h3>Node.js</h3>
                        <p>Server-side development, REST APIs, database integration, and Express.js</p>
                        <div class="skill-level">
                            <div class="skill-bar" data-skill="70"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <i class="fas fa-database" aria-hidden="true"></i>
                        <h3>MongoDB</h3>
                        <p>NoSQL database design, queries, indexing, and performance optimization</p>
                        <div class="skill-level">
                            <div class="skill-bar" data-skill="65"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="projects">
            <div class="container">
                <h2 class="section-title">My Projects</h2>
                <div class="projects-filter">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="web">Web Apps</button>
                    <button class="filter-btn" data-filter="mobile">Mobile</button>
                    <button class="filter-btn" data-filter="design">Design</button>
                </div>
                <div class="projects-grid">
                    <article class="project-card" data-category="web">
                        <img src="images/project1.jpg" alt="E-commerce Website Project">
                        <div class="project-info">
                            <h3>E-commerce Platform</h3>
                            <p>A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.</p>
                            <div class="project-tech">
                                <span class="tech-tag">React</span>
                                <span class="tech-tag">Node.js</span>
                                <span class="tech-tag">MongoDB</span>
                                <span class="tech-tag">Stripe API</span>
                            </div>
                            <div class="project-links">
                                <a href="#" class="btn btn-small" target="_blank" rel="noopener">Live Demo</a>
                                <a href="#" class="btn btn-small btn-secondary" target="_blank" rel="noopener">GitHub</a>
                            </div>
                        </div>
                    </article>
                    
                    <article class="project-card" data-category="web">
                        <img src="images/project2.jpg" alt="Task Management Application">
                        <div class="project-info">
                            <h3>Task Management App</h3>
                            <p>A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.</p>
                            <div class="project-tech">
                                <span class="tech-tag">Vue.js</span>
                                <span class="tech-tag">Socket.io</span>
                                <span class="tech-tag">Express</span>
                                <span class="tech-tag">PostgreSQL</span>
                            </div>
                            <div class="project-links">
                                <a href="#" class="btn btn-small" target="_blank" rel="noopener">Live Demo</a>
                                <a href="#" class="btn btn-small btn-secondary" target="_blank" rel="noopener">GitHub</a>
                            </div>
                        </div>
                    </article>
                    
                    <article class="project-card" data-category="mobile">
                        <img src="images/project3.jpg" alt="Weather Application">
                        <div class="project-info">
                            <h3>Weather Forecast App</h3>
                            <p>A responsive weather application with location-based forecasts, interactive maps, and beautiful weather animations.</p>
                            <div class="project-tech">
                                <span class="tech-tag">JavaScript</span>
                                <span class="tech-tag">Weather API</span>
                                <span class="tech-tag">CSS3</span>
                                <span class="tech-tag">Chart.js</span>
                            </div>
                            <div class="project-links">
                                <a href="#" class="btn btn-small" target="_blank" rel="noopener">Live Demo</a>
                                <a href="#" class="btn btn-small btn-secondary" target="_blank" rel="noopener">GitHub</a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="contact">
            <div class="container">
                <h2 class="section-title">Get In Touch</h2>
                <div class="contact-content">
                    <div class="contact-info">
                        <h3>Let's Work Together</h3>
                        <p>I'm always interested in hearing about new projects and opportunities. Whether you're looking for a developer, have a question, or just want to connect.</p>
                        
                        <div class="contact-details">
                            <div class="contact-item">
                                <i class="fas fa-envelope" aria-hidden="true"></i>
                                <span>your.email@example.com</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-phone" aria-hidden="true"></i>
                                <span>+66 12 345 6789</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                                <span>Bangkok, Thailand</span>
                            </div>
                        </div>
                        
                        <div class="social-links">
                            <a href="#" target="_blank" rel="noopener" aria-label="GitHub Profile">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener" aria-label="LinkedIn Profile">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener" aria-label="Twitter Profile">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                    
                    <form class="contact-form" id="contactForm">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="your.email@example.com" required>
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" placeholder="Tell me about your project..." rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p>&copy; 2025 [Your Name]. Software Engineering, RMUTL. All rights reserved.</p>
                <div class="footer-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="backToTop" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-chevron-up"></i>
    </button>

    <script src="js/script.js"></script>
</body>
</html>
```

#### 2.2 First Git Commit
```bash
# Add HTML file to staging
git add index.html

# Create initial commit
git commit -m "feat: Add semantic HTML5 structure with accessibility features

- Implement semantic HTML5 layout
- Add navigation with mobile-friendly toggle
- Create hero, about, skills, projects, and contact sections
- Include proper ARIA labels and semantic elements
- Add meta tags for SEO optimization"
```

---

## 🎨 CSS3 Styling Implementation

### Step 3: Modern CSS3 Styling (30 minutes)

Create comprehensive styling in `css/style.css`:

```css
/* ===== CSS RESET & BASE STYLES ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*::before,
*::after {
    box-sizing: border-box;
}

:root {
    /* Color Variables */
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --accent-color: #f39c12;
    --text-dark: #333333;
    --text-light: #666666;
    --text-white: #ffffff;
    --bg-light: #f8f9fa;
    --bg-white: #ffffff;
    --border-color: #e9ecef;
    
    /* Typography */
    --font-primary: 'Poppins', sans-serif;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    --font-size-5xl: 3rem;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
}

body {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: 1.6;
    color: var(--text-dark);
    overflow-x: hidden;
    background-color: var(--bg-white);
}

/* ===== UTILITY CLASSES ===== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
}

.section-title {
    font-size: var(--font-size-4xl);
    font-weight: 700;
    text-align: center;
    margin-bottom: var(--spacing-3xl);
    color: var(--secondary-color);
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    border-radius: 2px;
}

/* ===== NAVIGATION STYLES ===== */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1000;
    padding: var(--spacing-md) 0;
    transition: all var(--transition-normal);
    border-bottom: 1px solid var(--border-color);
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-md);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo a {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--secondary-color);
    text-decoration: none;
    transition: color var(--transition-fast);
}

.nav-logo a:hover {
    color: var(--primary-color);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: var(--spacing-xl);
    margin: 0;
    padding: 0;
}

.nav-link {
    color: var(--text-dark);
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-fast);
    position: relative;
    padding: var(--spacing-sm) 0;
}

.nav-link:hover,
.nav-link.active {
    color: var(--primary-color);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width var(--transition-fast);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: var(--spacing-sm);
}

.bar {
    width: 25px;
    height: 3px;
    background: var(--text-dark);
    margin: 3px 0;
    transition: var(--transition-normal);
    border-radius: 2px;
}

/* ===== HERO SECTION ===== */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 100px var(--spacing-lg) 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: var(--text-white);
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
}

.hero-content {
    flex: 1;
    max-width: 600px;
    z-index: 2;
    position: relative;
}

.hero h1 {
    font-size: var(--font-size-5xl);
    font-weight: 700;
    margin-bottom: var(--spacing-lg);
    line-height: 1.2;
}

.highlight {
    color: var(--accent-color);
    background: linear-gradient(45deg, var(--accent-color), #e74c3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: var(--font-size-2xl);
    font-weight: 500;
    margin-bottom: var(--spacing-md);
    opacity: 0.9;
}

.hero-description {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xl);
    opacity: 0.8;
    line-height: 1.7;
}

.hero-buttons {
    display: flex;
    gap: var(--spacing-lg);
    flex-wrap: wrap;
}

/* ===== BUTTON STYLES ===== */
.btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 12px 30px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: var(--font-size-base);
    transition: all var(--transition-normal);
    text-align: center;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left var(--transition-slow);
}

.btn:hover::before {
    left: 100%;
}

.btn-primary {
    background: var(--primary-color);
    color: var(--text-white);
}

.btn-primary:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background: transparent;
    color: var(--text-white);
    border: 2px solid var(--text-white);
}

.btn-secondary:hover {
    background: var(--text-white);
    color: var(--text-dark);
    transform: translateY(-2px);
}

.btn-small {
    padding: 8px 20px;
    font-size: var(--font-size-sm);
}

.hero-image {
    flex: 1;
    text-align: center;
    z-index: 2;
    position: relative;
}

.hero-image img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid rgba(255, 255, 255, 0.2);
    box-shadow: var(--shadow-lg);
    transition: transform var(--transition-normal);
}

.hero-image img:hover {
    transform: scale(1.05);
}

/* ===== ABOUT SECTION ===== */
.about {
    padding: 100px 0;
    background: var(--bg-light);
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: center;
}

.about-text {
    font-size: var(--font-size-lg);
    line-height: 1.7;
}

.about-text p {
    margin-bottom: var(--spacing-lg);
    color: var(--text-light);
}

.about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
    margin-top: var(--spacing-xl);
}

.stat-item {
    text-align: center;
    padding: var(--spacing-lg);
    background: var(--bg-white);
    border-radius: 10px;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-normal);
}

.stat-item:hover {
    transform: translateY(-5px);
}

.stat-item h3 {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: var(--spacing-sm);
}

.about-image {
    position: relative;
}

.about-image img {
    width: 100%;
    border-radius: 15px;
    box-shadow: var(--shadow-lg);
}

/* ===== SKILLS SECTION ===== */
.skills {
    padding: 100px 0;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-xl);
}

.skill-item {
    background: var(--bg-white);
    padding: var(--spacing-xl);
    border-radius: 15px;
    text-align: center;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-normal);
    border: 1px solid var(--border-color);
    position: relative;
    overflow: hidden;
}

.skill-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(52, 152, 219, 0.1), transparent);
    transition: left var(--transition-slow);
}

.skill-item:hover::before {
    left: 100%;
}

.skill-item:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}

.skill-item i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
    transition: all var(--transition-normal);
}

.skill-item:hover i {
    transform: scale(1.1);
    color: var(--accent-color);
}

.skill-item h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    color: var(--secondary-color);
}

.skill-item p {
    color: var(--text-light);
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
}

/* Skill Progress Bars */
.skill-level {
    background: var(--border-color);
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: var(--spacing-md);
}

.skill-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    border-radius: 4px;
    width: 0;
    transition: width 2s ease-in-out;
}

/* ===== PROJECTS SECTION ===== */
.projects {
    padding: 100px 0;
    background: var(--bg-light);
}

.projects-filter {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-3xl);
    flex-wrap: wrap;
}

.filter-btn {
    padding: 10px 20px;
    background: var(--bg-white);
    color: var(--text-dark);
    border: 2px solid var(--border-color);
    border-radius: 25px;
    cursor: pointer;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary-color);
    color: var(--text-white);
    border-color: var(--primary-color);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: var(--spacing-xl);
}

.project-card {
    background: var(--bg-white);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-normal);
    position: relative;
    border: 1px solid var(--border-color);
}

.project-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
}

.project-card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: transform var(--transition-normal);
}

.project-card:hover img {
    transform: scale(1.05);
}

.project-info {
    padding: var(--spacing-xl);
}

.project-info h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    color: var(--secondary-color);
}

.project-info p {
    color: var(--text-light);
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
}

.tech-tag {
    padding: 4px 12px;
    background: var(--primary-color);
    color: var(--text-white);
    border-radius: 15px;
    font-size: var(--font-size-xs);
    font-weight: 500;
}

.project-links {
    display: flex;
    gap: var(--spacing-md);
}

/* ===== CONTACT SECTION ===== */
.contact {
    padding: 100px 0;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
}

.contact-info h3 {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    color: var(--secondary-color);
}

.contact-info p {
    color: var(--text-light);
    margin-bottom: var(--spacing-xl);
    line-height: 1.7;
}

.contact-details {
    margin-bottom: var(--spacing-xl);
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    transition: all var(--transition-fast);
    padding: var(--spacing-md);
    border-radius: 8px;
}

.contact-item:hover {
    background: var(--bg-light);
    transform: translateX(5px);
}

.contact-item i {
    font-size: var(--font-size-lg);
    color: var(--primary-color);
    margin-right: var(--spacing-lg);
    width: 20px;
    text-align: center;
}

.social-links {
    display: flex;
    gap: var(--spacing-md);
}

.social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: var(--text-white);
    border-radius: 50%;
    text-decoration: none;
    transition: all var(--transition-normal);
    font-size: var(--font-size-lg);
}

.social-links a:hover {
    background: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
}

/* ===== CONTACT FORM ===== */
.contact-form {
    background: var(--bg-white);
    padding: var(--spacing-2xl);
    border-radius: 15px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
}

.form-group {
    margin-bottom: var(--spacing-lg);
}

.form-group label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: 500;
    color: var(--text-dark);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: var(--font-size-base);
    font-family: var(--font-primary);
    transition: all var(--transition-fast);
    background: var(--bg-white);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

/* ===== FOOTER ===== */
.footer {
    background: var(--secondary-color);
    color: var(--text-white);
    padding: var(--spacing-xl) 0;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-md);
}

.footer-links {
    display: flex;
    gap: var(--spacing-lg);
}

.footer-links a {
    color: var(--text-white);
    text-decoration: none;
    opacity: 0.8;
    transition: opacity var(--transition-fast);
}

.footer-links a:hover {
    opacity: 1;
}

/* ===== BACK TO TOP BUTTON ===== */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: var(--text-white);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: var(--font-size-lg);
    box-shadow: var(--shadow-md);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
    z-index: 1000;
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background: var(--accent-color);
    transform: translateY(-3px);
}

/* ===== ANIMATIONS ===== */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-on-scroll {
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
    :root {
        --font-size-5xl: 2.25rem;
        --font-size-4xl: 1.875rem;
        --font-size-3xl: 1.5rem;
    }

    .container {
        padding: 0 var(--spacing-md);
    }

    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: var(--bg-white);
        width: 100%;
        text-align: center;
        transition: left var(--transition-normal);
        box-shadow: var(--shadow-lg);
        padding: var(--spacing-xl) 0;
        gap: var(--spacing-lg);
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-toggle {
        display: flex;
    }

    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    .hero {
        flex-direction: column-reverse;
        text-align: center;
        padding: 120px var(--spacing-md) 50px;
    }

    .hero-content {
        max-width: 100%;
    }

    .hero-image {
        margin-bottom: var(--spacing-xl);
    }

    .hero-image img {
        width: 200px;
        height: 200px;
    }

    .hero-buttons {
        justify-content: center;
    }

    .about-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
    }

    .about-stats {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .skills-grid {
        grid-template-columns: 1fr;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .contact-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
    }

    .footer-content {
        flex-direction: column;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .hero h1 {
        font-size: var(--font-size-4xl);
    }

    .section-title {
        font-size: var(--font-size-3xl);
    }

    .project-links {
        flex-direction: column;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }

    .btn {
        width: 100%;
        max-width: 250px;
    }
}

/* ===== LOADING ANIMATIONS ===== */
.loading {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.loading.loaded {
    opacity: 1;
    transform: translateY(0);
}

/* ===== PRINT STYLES ===== */
@media print {
    .navbar,
    .back-to-top,
    .nav-toggle {
        display: none;
    }
    
    .hero {
        min-height: auto;
        padding: 2rem 0;
    }
    
    * {
        box-shadow: none !important;
    }
}
```

#### 3.1 Add CSS to Git
```bash
# Add CSS file
git add css/style.css

# Commit CSS implementation
git commit -m "feat: Add comprehensive CSS3 styling with modern features

- Implement CSS custom properties (variables)
- Add responsive grid layouts and flexbox
- Create smooth animations and transitions
- Include hover effects and micro-interactions
- Add mobile-first responsive design
- Implement accessibility features and print styles"
```

---

## ⚡ JavaScript Functionality

### Step 4: Interactive JavaScript Features (25 minutes)

Create enhanced JavaScript functionality in `js/script.js`:

```javascript
// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

class PortfolioWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupSkillBars();
        this.setupProjectFilter();
        this.setupTypewriter();
        this.setupScrollAnimations();
    }

    // ===== EVENT LISTENERS SETUP =====
    setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.handleBackToTop();
            this.updateActiveNavLink();
        });

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Skill items hover effects
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ===== NAVBAR SCROLL HANDLING =====
    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    // ===== BACK TO TOP BUTTON =====
    handleBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    // ===== ACTIVE NAVIGATION LINK =====
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                    
                    // Trigger skill bar animations
                    if (entry.target.classList.contains('skills')) {
                        this.animateSkillBars();
                    }
                    
                    // Trigger counter animations
                    if (entry.target.classList.contains('about')) {
                        this.animateCounters();
                    }
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe individual cards and items
        document.querySelectorAll('.skill-item, .project-card, .stat-item').forEach(item => {
            observer.observe(item);
        });
    }

    // ===== SKILL BARS SETUP =====
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const skillLevel = bar.getAttribute('data-skill');
            bar.style.width = '0%';
            bar.setAttribute('data-target', skillLevel);
        });
    }

    // ===== ANIMATE SKILL BARS =====
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.getAttribute('data-target');
                bar.style.width = targetWidth + '%';
            }, index * 200);
        });
    }

    // ===== ANIMATE COUNTERS =====
    animateCounters() {
        const counters = document.querySelectorAll('.stat-item h3');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }

    // ===== PROJECT FILTER =====
    setupProjectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== TYPEWRITER EFFECT =====
    setupTypewriter() {
        const typewriterElement = document.querySelector('.hero-subtitle');
        if (typewriterElement) {
            const texts = [
                'Full Stack Developer',
                'Web Designer',
                'Problem Solver',
                'Tech Enthusiast'
            ];
            
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            const typeWriter = () => {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                if (!isDeleting && charIndex === currentText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                    }, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
                
                const speed = isDeleting ? 50 : 100;
                setTimeout(typeWriter, speed);
            };
            
            // Start typewriter effect after page load
            setTimeout(typeWriter, 1000);
        }
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Stagger animation for grid items
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.skill-item, .project-card');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-on-scroll');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skills-grid, .projects-grid').forEach(grid => {
            staggerObserver.observe(grid);
        });
    }

    // ===== FORM SUBMISSION =====
    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Get form data
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (name && email && subject && message) {
                this.showNotification('Thank you for your message! I will get back to you soon.', 'success');
                form.reset();
            } else {
                this.showNotification('Please fill in all fields.', 'error');
            }
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // ===== NOTIFICATION SYSTEM =====
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            backgroundColor: type === 'success' ? '#27ae60' : '#e74c3c',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ===== LAZY LOADING FOR IMAGES =====
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ===== DARK MODE TOGGLE (BONUS FEATURE) =====
    setupDarkMode() {
        const darkModeBtn = document.querySelector('.dark-mode-toggle');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDark);
            });
            
            // Load saved preference
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize the portfolio website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioWebsite();
});

// Handle page load animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// ===== SERVICE WORKER REGISTRATION (OPTIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
```

#### 4.1 Add JavaScript to Git
```bash
# Add JavaScript file
git add js/script.js

# Commit JavaScript implementation
git commit -m "feat: Add interactive JavaScript functionality

- Implement smooth scrolling and navigation
- Add mobile menu toggle functionality
- Create intersection observer for scroll animations
- Add skill bar animations and counter animations
- Implement project filtering system
- Add typewriter effect for hero subtitle
- Create form validation and submission handling
- Add notification system for user feedback
- Include performance optimizations with debounce/throttle"
```

---

## 🖼️ Image Assets & Content Setup

### Step 5: Content Enhancement (10 minutes)

#### 5.1 Prepare Image Assets
Create placeholder images or use royalty-free images:

```bash
# Create images directory structure
mkdir -p images/{projects,icons}

# Download sample images or create placeholders
# For this workshop, students should add their own images:
# - profile.jpg (personal photo)
# - about.jpg (workspace/coding setup)
# - project1.jpg, project2.jpg, project3.jpg (project screenshots)
```

#### 5.2 Update Content with Real Information
Replace placeholder content in `index.html` with your actual information:

```html
<!-- Example personalization -->
<h1>Hello, I'm <span class="highlight">John Doe</span></h1>
<p class="hero-description">I create beautiful and functional web applications using React, Node.js, and modern web technologies</p>

<!-- Update contact information -->
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>john.doe@example.com</span>
</div>
```

#### 5.3 Create README.md Documentation
```markdown
# Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and JavaScript.

## 🚀 Features

- **Responsive Design**: Works on all devices
- **Modern CSS3**: Grid, Flexbox, animations
- **Interactive JavaScript**: Smooth scrolling, animations
- **Accessibility**: ARIA labels, semantic HTML
- **Performance Optimized**: Lazy loading, optimized assets

## 🛠️ Technologies Used

- HTML5 (Semantic markup)
- CSS3 (Grid, Flexbox, animations)
- JavaScript (ES6+, DOM manipulation)
- Font Awesome (Icons)
- Google Fonts (Typography)

## 📱 Responsive Breakpoints

- Mobile: 480px and below
- Tablet: 768px and below
- Desktop: 1200px and above

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth hover animations
- Interactive skill progress bars
- Project filtering system
- Contact form with validation

## 📂 Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets
└── README.md           # Documentation
```

## 🚀 Deployment

This website can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## 📞 Contact

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

## 📝 License

This project is licensed under the MIT License.
```

---

## 🔀 Git Branch Management & Advanced Features

### Step 6: Advanced Git Workflow (10 minutes)

#### 6.1 Create Feature Branches
```bash
# Create and switch to feature branch for enhancements
git checkout -b feature/enhanced-animations

# Add enhanced CSS animations
git add .
git commit -m "feat: Add enhanced CSS animations and transitions

- Implement stagger animations for grid items
- Add parallax scrolling effect
- Create smooth hover transitions
- Add loading animations for better UX"

# Switch back to main branch
git checkout main

# Create another feature branch
git checkout -b feature/form-integration

# Simulate form integration work
git add .
git commit -m "feat: Integrate contact form with backend API

- Add form validation with real-time feedback
- Implement email sending functionality
- Add success/error notification system
- Include form submission analytics"

# Merge feature branches
git checkout main
git merge feature/enhanced-animations
git merge feature/form-integration

# Clean up branches
git branch -d feature/enhanced-animations
git branch -d feature/form-integration
```

#### 6.2 Add Additional Features (Feature 1 & 2)

**Feature 1: Enhanced Content Details**
```html
<!-- Add to skills section - more detailed skill descriptions -->
<div class="skill-details">
    <h4>Professional Experience</h4>
    <ul>
        <li>Built 5+ responsive websites using HTML5/CSS3</li>
        <li>Developed interactive web applications with JavaScript</li>
        <li>Implemented RESTful APIs with Node.js and Express</li>
        <li>Managed databases using MongoDB and SQL</li>
        <li>Collaborated using Git version control</li>
    </ul>
</div>

<!-- Add to about section - education and certifications -->
<div class="education">
    <h3>Education & Certifications</h3>
    <div class="education-item">
        <h4>Bachelor of Software Engineering</h4>
        <p>Rajamangala University of Technology Lanna (RMUTL)</p>
        <span class="year">2022 - 2026</span>
    </div>
    <div class="certification-item">
        <h4>Web Development Bootcamp</h4>
        <p>Completed comprehensive full-stack development course</p>
        <span class="year">2024</span>
    </div>
</div>
```

**Feature 2: Advanced CSS & JavaScript Techniques**

Add to `style.css`:
```css
/* Advanced CSS Features */
.glassmorphism {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.gradient-text {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Advanced Animations */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.floating {
    animation: float 3s ease-in-out infinite;
}

/* CSS Grid Advanced Layout */
.advanced-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: masonry; /* Future CSS feature */
    gap: var(--spacing-lg);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--bg-light);
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
}
```

Add to `script.js`:
```javascript
// Feature 2: Advanced JavaScript Techniques

// Intersection Observer with more advanced options
const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add multiple animation classes based on scroll direction
            const rect = entry.boundingClientRect;
            const isScrollingDown = rect.top < window.innerHeight / 2;
            
            if (isScrollingDown) {
                entry.target.classList.add('animate-fade-up');
            } else {
                entry.target.classList.add('animate-fade-down');
            }
            
            // Add stagger effect for child elements
            const children = entry.target.querySelectorAll('.animate-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-in');
                }, index * 100);
            });
        }
    });
}, {
    threshold: [0.1, 0.5, 0.9],
    rootMargin: '-10% 0px -10% 0px'
});

// Advanced scroll-triggered animations
class ScrollAnimationController {
    constructor() {
        this.scrollPosition = 0;
        this.animationFrame = null;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (!this.animationFrame) {
                this.animationFrame = requestAnimationFrame(() => {
                    this.handleScroll();
                    this.animationFrame = null;
                });
            }
        });
    }
    
    handleScroll() {
        this.scrollPosition = window.scrollY;
        
        // Parallax backgrounds
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(this.scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Progress bar for reading
        const progressBar = document.querySelector('.reading-progress');
        if (progressBar) {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (this.scrollPosition / windowHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
}

// Dynamic theme switching
class ThemeController {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Animate theme transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimationController();
    new ThemeController();
});
```

#### 6.3 Commit Enhanced Features
```bash
# Add enhanced features
git add .
git commit -m "feat: Add enhanced content and advanced CSS/JavaScript techniques

Feature 1 - Enhanced Content:
- Add detailed professional experience section
- Include education and certification information
- Expand skill descriptions with real examples
- Add portfolio project case studies

Feature 2 - Advanced Techniques:
- Implement glassmorphism design effects
- Add advanced CSS animations and transitions
- Create intersection observer with stagger animations
- Add scroll-triggered parallax effects
- Implement dynamic theme switching
- Add custom scrollbar styling
- Create reading progress indicator
- Optimize performance with requestAnimationFrame"
```

---

## 📊 Testing & Quality Assurance

### Step 8: Testing Checklist (5 minutes)

#### 8.1 Manual Testing Checklist
```markdown
## Testing Checklist

### ✅ Functionality Testing
- [ ] Navigation menu works on desktop
- [ ] Mobile hamburger menu toggles correctly
- [ ] Smooth scrolling works for all anchor links
- [ ] Contact form validates input fields
- [ ] Contact form shows success/error messages
- [ ] All external links open in new tabs
- [ ] Back to top button appears after scrolling
- [ ] Project filter buttons work correctly
- [ ] Skill bars animate when scrolled into view

### ✅ Responsive Design Testing
- [ ] Layout works on mobile (320px+)
- [ ] Layout works on tablet (768px+)
- [ ] Layout works on desktop (1024px+)
- [ ] Images scale properly on all devices
- [ ] Text remains readable on all screen sizes
- [ ] Navigation adapts to mobile view
- [ ] Grid layouts stack properly on mobile

### ✅ Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### ✅ Performance Testing
- [ ] Page loads in under 3 seconds
- [ ] Images are optimized for web
- [ ] CSS and JS files are minified
- [ ] No console errors
- [ ] Smooth animations (60fps)

### ✅ Accessibility Testing
- [ ] All images have alt text
- [ ] Color contrast meets WCAG standards
- [ ] Site works with keyboard navigation
- [ ] Screen reader compatible
- [ ] Semantic HTML structure
```

#### 8.2 Performance Optimization
```bash
# Add performance improvements commit
git add .
git commit -m "perf: Optimize website performance and accessibility

- Compress and optimize image assets
- Minify CSS and JavaScript files
- Add lazy loading for images
- Implement proper semantic HTML structure
- Ensure WCAG accessibility compliance
- Add meta tags for SEO optimization
- Optimize font loading performance"
```

---

## 📝 Submission Requirements & Grading

### Final Submission Checklist

#### Required Deliverables:
1. **✅ GitHub Repository** with complete source code
2. **✅ Live Website** deployed on GitHub Pages/Netlify
3. **✅ README.md** with comprehensive documentation
4. **✅ Git History** showing proper branch management and commits
5. **✅ Reflection Report** (1-2 pages) documenting learning experience

#### Git History Requirements:
```bash
# Your final git history should show:
git log --oneline

# Example output:
a1b2c3d feat: Add deployment configuration and final documentation
e4f5g6h feat: Add enhanced content and advanced CSS/JavaScript techniques  
i7j8k9l feat: Integrate contact form with backend API
m0n1o2p feat: Add enhanced CSS animations and transitions
q3r4s5t feat: Add interactive JavaScript functionality
u6v7w8x feat: Add comprehensive CSS3 styling with modern features
y9z0a1b feat: Add semantic HTML5 structure with accessibility features
c2d3e4f Initial commit: Repository setup
```

#### Documentation Requirements:
```markdown
# Required in README.md:
1. Project overview and features
2. Technologies used
3. Installation/setup instructions
4. Live demo link
5. Screenshots of different sections
6. Responsive design examples
7. Browser compatibility information
8. Future enhancement plans
```

---

## 🎯 Grading Rubric Breakdown

| **หัวข้อ** | **ดีเยี่ยม (9-10)** | **ดี (7-8)** | **ปานกลาง (5-6)** | **ต้องปรับปรุง (1-4)** |
|-----------|-------------------|-------------|-----------------|-------------------|
| **Repository Setup (10 คะแนน)** | Repository ตั้งค่าสมบูรณ์ พร้อม branch structure และ commit history ที่ชัดเจน | Repository ตั้งค่าถูกต้อง มี commit เพียงพอ | Repository ตั้งค่าได้ แต่ commit ไม่สมบูรณ์ | Repository ไม่สมบูรณ์หรือไม่มี history |
| **Branch Management (10 คะแนน)** | ใช้ branch strategy อย่างถูกต้อง มี feature branches และ merge สำเร็จ | ใช้ branch ได้ แต่ merge มีปัญหาเล็กน้อย | สร้าง branch ได้ แต่ไม่สามารถ merge ได้สมบูรณ์ | ไม่สามารถใช้ branch management ได้ |
| **Code Quality (10 คะแนน)** | Code สะอาด ใช้ best practices ทำงานได้สมบูรณ์ | Code ทำงานได้ดี มีการ comment และ structure ที่ดี | Code ทำงานได้บางส่วน โครงสร้างต้องปรับปรุง | Code ไม่ทำงานหรือมีข้อผิดพลาดมาก |
| **Git Commands (10 คะแนน)** | ใช้ commands หลากหลาย รวมถึง advanced features | ใช้ commands พื้นฐานได้ดี | ใช้ commands ได้บางส่วน | ใช้ commands ไม่ถูกต้องหรือไม่เพียงพอ |

### Bonus Points Opportunities:
- **+2 คะแนน**: Deploy website ด้วย custom domain
- **+2 คะแนน**: ใช้ GitHub Actions สำหรับ CI/CD
- **+1 คะแนน**: เพิ่มฟีเจอร์ accessibility ที่ดีเยี่ยม
- **+1 คะแนน**: การใช้ CSS Grid/Flexbox อย่างสร้างสรรค์
- **+1 คะแนน**: JavaScript animations ที่ซับซ้อนและน่าประทับใจ

---

## 🔗 Additional Resources & Learning Materials

### 📚 Recommended Reading:
- **HTML5**: [MDN HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **CSS3**: [CSS Tricks](https://css-tricks.com/) - Complete guides and tips
- **JavaScript**: [JavaScript.info](https://javascript.info/) - Modern tutorial
- **Git**: [Pro Git Book](https://git-scm.com/book) - Free comprehensive guide
- **Responsive Design**: [A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

### 🛠️ Useful Tools:
- **Design**: Figma, Adobe XD
- **Code Editor**: VS Code with extensions
- **Performance**: Lighthouse, PageSpeed Insights
- **Deployment**: GitHub Pages, Netlify, Vercel
- **Icons**: Font Awesome, Heroicons
- **Fonts**: Google Fonts, Adobe Fonts

### 🎨 Design Inspiration:
- [Dribbble](https://dribbble.com/tags/portfolio)
- [Behance](https://www.behance.net/search/projects?search=portfolio)
- [Awwwards](https://www.awwwards.com/websites/portfolio/)

---

## 🎉 Conclusion

Congratulations! You have successfully completed the Portfolio Website Development workshop. You should now have:

1. ✅ A fully functional, responsive portfolio website
2. ✅ Understanding of semantic HTML5 structure
3. ✅ Proficiency in modern CSS3 features and responsive design
4. ✅ Knowledge of interactive JavaScript functionality
5. ✅ Experience with Git version control and branch management
6. ✅ A live website deployed on the internet
7. ✅ Comprehensive documentation and project structure

### Next Steps:
1. **Customize** your portfolio with personal projects and information
2. **Enhance** with additional features like blog section or CMS integration
3. **Optimize** for better performance and SEO
4. **Share** your portfolio on social media and with potential employers
5. **Maintain** and update regularly with new projects and skills

**Remember**: This portfolio is a living document of your skills and growth as a developer. Keep it updated and continue to enhance it as you learn new technologies!

---

**🚀 Happy Coding! 🚀**