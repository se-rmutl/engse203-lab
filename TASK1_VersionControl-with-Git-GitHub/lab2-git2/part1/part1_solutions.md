# Part 1: Git Fundamentals - Solutions & Answer Key

## 🔑 Exercise Solutions

**Note**: This is the instructor's answer key. Students should not access this until after completing the exercises.

---

## Exercise 1: Git Setup & Configuration (10 points)

### Solution 1.1: Environment Setup (5 points)

**Expected Git Configuration**:
```bash
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
```

**Verification Command Output**:
```bash
git config --list | grep user
# Expected output:
user.name=Student Name
user.email=student@example.com
```

**SSH Key Generation**:
```bash
ssh-keygen -t ed25519 -C "student@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**Grading Criteria**:
- User name configured: 1 point
- User email configured: 1 point
- Default branch set to main: 1 point
- Editor configured: 1 point
- SSH key generated and added: 1 point

### Solution 1.2: Repository Creation (5 points)

**Expected Steps**:
```bash
mkdir git-exercises
cd git-exercises
git init
```

**README.md Content**:
```markdown
# Git Exercises

**Student Name**: [Student's Name]  
**Date**: [Today's Date]  
**Course**: DevOps & Software Engineering  

This repository contains exercises for learning Git fundamentals.

## Exercises Completed:
- [x] Git Setup & Configuration
- [ ] Basic Git Operations
- [ ] Branching & Merging
- [ ] Advanced Git Operations
- [ ] Git Tools & Integration
- [ ] Portfolio Enhancement
```

**Commands**:
```bash
git add README.md
git commit -m "Initial commit: Add README with student info"
git remote add origin git@github.com:USERNAME/git-exercises.git
git push -u origin main
```

**Grading Criteria**:
- Repository created locally: 1 point
- README.md with proper content: 2 points
- First commit made: 1 point
- GitHub repository created and pushed: 1 point

---

## Exercise 2: Basic Git Operations (20 points)

### Solution 2.1: File Management (10 points)

**Expected File Structure**:
```
blog-website/
├── index.html
├── posts/
│   ├── post1.html
│   └── post2.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

**Sample index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Blog</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>My Learning Blog</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="posts/post1.html">Git Basics</a></li>
                <li><a href="posts/post2.html">GitHub Guide</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h2>Welcome to My Blog</h2>
            <p>This blog documents my journey learning Git and GitHub.</p>
        </section>
    </main>
    <script src="js/main.js"></script>
</body>
</html>
```

**Sample posts/post1.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learning Git Basics</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Learning Git Basics</h1>
        <nav>
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="post1.html">Git Basics</a></li>
                <li><a href="post2.html">GitHub Guide</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <article>
            <h2>My First Day with Git</h2>
            <p>Today I learned about version control and Git basics. Key concepts include:</p>
            <ul>
                <li>Repository initialization</li>
                <li>Staging and committing changes</li>
                <li>Working with remotes</li>
                <li>Basic branching</li>
            </ul>
        </article>
    </main>
</body>
</html>
```

**Sample posts/post2.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Guide</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>GitHub Guide</h1>
        <nav>
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="post1.html">Git Basics</a></li>
                <li><a href="post2.html">GitHub Guide</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <article>
            <h2>Understanding GitHub</h2>
            <p>GitHub is a cloud-based platform for Git repositories. I learned:</p>
            <ul>
                <li>Creating repositories</li>
                <li>Push and pull operations</li>
                <li>Collaboration features</li>
                <li>Issues and pull requests</li>
            </ul>
        </article>
    </main>
</body>
</html>
```

**Sample css/styles.css**:
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

header {
    background: #2c3e50;
    color: white;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

h1 {
    margin-bottom: 1rem;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
}

nav a:hover {
    background-color: #34495e;
}

main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

section, article {
    padding: 2rem;
}

h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
}

ul {
    margin-left: 2rem;
}

li {
    margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    main {
        margin: 1rem;
    }
}
```

**Sample js/main.js**:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog website loaded successfully!');
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.backgroundColor = '#1abc9c';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
    });
    
    // Add current page highlighting
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.style.backgroundColor = '#34495e';
        }
    });
});
```

**Sample README.md**:
```markdown
# Blog Website

A simple blog website created for learning Git and GitHub fundamentals.

## Features

- Responsive design
- Multiple blog posts
- Clean navigation
- Modern CSS styling
- Interactive JavaScript elements

## Technologies Used

- HTML5
- CSS3 (with responsive design)
- JavaScript (ES6+)
- Git version control
- GitHub hosting

## File Structure

```
blog-website/
├── index.html          # Main homepage
├── posts/             # Blog posts directory
│   ├── post1.html     # Git basics post
│   └── post2.html     # GitHub guide post
├── css/
│   └── styles.css     # Main stylesheet
├── js/
│   └── main.js        # JavaScript functionality
└── README.md          # This file
```

## How to Run

1. Clone this repository
2. Open `index.html` in your web browser
3. Navigate through the blog posts using the navigation menu

## Learning Objectives

This project demonstrates:
- Basic HTML structure
- CSS styling and responsive design
- JavaScript DOM manipulation
- Git version control workflow
- GitHub repository management
```

**Grading Criteria**:
- Correct file structure (3 points): All files and folders created in proper hierarchy
- Proper HTML content (3 points): Valid HTML with navigation, proper structure
- CSS styling (2 points): Responsive design, proper styling
- JavaScript functionality (2 points): DOM manipulation, event handling

### Solution 2.2: Commit History (10 points)

**Expected Commit Sequence**:
```bash
# 1. Initial commit
git add README.md
git commit -m "docs(readme): add initial project documentation"

# 2. HTML structure
git add index.html posts/
git commit -m "feat(html): add basic blog structure with navigation"

# 3. CSS styling
git add css/styles.css
git commit -m "style(css): add responsive design and modern styling"

# 4. JavaScript functionality
git add js/main.js
git commit -m "feat(js): add navigation interactivity and page highlighting"

# 5. Content addition
git add posts/post1.html posts/post2.html
git commit -m "content(posts): add blog posts about Git and GitHub"

# 6. Final update
git add README.md
git commit -m "docs(readme): update project description and usage instructions"
```

**Expected Log Output**:
```bash
git log --oneline
# Should show something like:
a1b2c3d docs(readme): update project description and usage instructions
e4f5g6h content(posts): add blog posts about Git and GitHub
i7j8k9l feat(js): add navigation interactivity and page highlighting
m0n1o2p style(css): add responsive design and modern styling
q3r4s5t feat(html): add basic blog structure with navigation
u6v7w8x docs(readme): add initial project documentation
```

**Grading Criteria**:
- 5+ meaningful commits (5 points): Each commit serves a logical purpose
- Proper commit message format (3 points): Uses conventional commits format
- Logical commit sequence (2 points): Commits follow development workflow

---

## Exercise 3: Branching & Merging (25 points)

### Solution 3.1: Feature Branch Development (15 points)

**Expected Commands**:
```bash
# Create and switch to feature branch
git checkout -b feature/contact-page

# Verify branch
git branch
# Should show: * feature/contact-page
```

**Sample contact.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - My Blog</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Contact Me</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="posts/post1.html">Git Basics</a></li>
                <li><a href="posts/post2.html">GitHub Guide</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h2>Get in Touch</h2>
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Name *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea id="message" name="message" rows="6" required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </section>
    </main>
    <script src="js/main.js"></script>
    <script src="js/contact.js"></script>
</body>
</html>
```

**Updated CSS (add to styles.css)**:
```css
/* Contact Form Styles */
.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #2c3e50;
}

input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

input:focus, textarea:focus {
    outline: none;
    border-color: #3498db;
}

button {
    background-color: #3498db;
    color: white;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #2980b9;
}

.error {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.success {
    color: #27ae60;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
```

**JavaScript validation (js/contact.js)**:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                showSuccess('Thank you! Your message has been sent.');
                form.reset();
            }
        });
    }
    
    function validateForm() {
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function showSuccess(message) {
        const form = document.getElementById('contactForm');
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        form.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function clearErrors() {
        const errors = document.querySelectorAll('.error, .success');
        errors.forEach(error => error.remove());
    }
});
```

**Update Navigation in All Files**:
All HTML files should have updated navigation:
```html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="posts/post1.html">Git Basics</a></li>
        <li><a href="posts/post2.html">GitHub Guide</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

**Commit Changes**:
```bash
git add contact.html
git commit -m "feat(contact): add contact page with form"

git add css/styles.css
git commit -m "style(contact): add form styling and validation styles"

git add js/contact.js
git commit -m "feat(contact): add form validation functionality"

git add index.html posts/post1.html posts/post2.html
git commit -m "feat(nav): update navigation to include contact page"

git push origin feature/contact-page
```

**Grading Criteria**:
- Branch created correctly (3 points): Feature branch exists and is active
- Contact page implemented (5 points): HTML form with required fields
- Navigation updated (3 points): All pages have updated navigation
- Form validation (4 points): JavaScript validation working correctly

### Solution 3.2: Branch Merging (10 points)

**Expected Commands**:
```bash
# Switch to main branch
git checkout main

# Merge feature branch
git merge feature/contact-page

# Push updated main
git push origin main

# Delete feature branch locally
git branch -d feature/contact-page

# Delete feature branch remotely
git push origin --delete feature/contact-page
```

**Handling Merge Conflicts** (if any):
```bash
# If conflicts occur during merge:
git status
# Shows conflicted files

# Edit conflicted files, resolve conflicts manually
# Remove conflict markers: <<<<<<<, =======, >>>>>>>

# Stage resolved files
git add .

# Complete merge
git commit -m "resolve: merge conflicts in feature/contact-page"
```

**Grading Criteria**:
- Successful merge (4 points): Feature branch merged without issues
- Conflict resolution (3 points): Any conflicts properly resolved
- Branch cleanup (3 points): Feature branch deleted locally and remotely

---

## Exercise 4: Advanced Git Operations (20 points)

### Solution 4.1: History Manipulation (10 points)

**Expected Command Outputs**:

```bash
# 1. Last 3 commits
git log --oneline -3
# Sample output:
a1b2c3d feat(nav): update navigation to include contact page
e4f5g6h feat(contact): add form validation functionality
i7j8k9l style(contact): add form styling and validation styles
```

```bash
# 2. Difference between commits
git log --oneline | tail -1  # Get first commit hash
git log --oneline | head -1  # Get latest commit hash
git diff <first-hash> <latest-hash>
# Should show all changes made throughout the project
```

```bash
# 3. Create and push tag
git tag -a v1.0 -m "First release: Basic blog with contact form"
git push origin v1.0
git push origin --tags
```

```bash
# 4. Show tag information
git show v1.0
# Should display tag information and commit details
```

**Grading Criteria**:
- Correct log commands (3 points): Proper use of git log with options
- Diff between commits (3 points): Shows understanding of git diff
- Tag created and pushed (4 points): Tag created with annotation and pushed

### Solution 4.2: Undoing Changes (10 points)

**Expected Workflow**:

```bash
# Step 1: Make change and undo
echo "This is a temporary change" >> index.html
git status  # Should show index.html as modified
git checkout -- index.html
git status  # Should show working directory clean

# Step 2: Stage and unstage
echo "Another temporary change" >> index.html
git add index.html
git status  # Should show index.html as staged
git reset HEAD index.html
git status  # Should show index.html as unstaged but modified
git checkout -- index.html  # Clean up

# Step 3: Create bad commit and revert
echo "<!-- This is a bad change -->" >> index.html
git add index.html
git commit -m "bad: add unnecessary comment"
git revert HEAD
# This creates a new commit that undoes the bad commit
```

**Grading Criteria**:
- Undo unstaged changes (3 points): Successfully used git checkout --
- Unstage staged changes (3 points): Successfully used git reset HEAD
- Create and revert commit (4 points): Created commit and reverted it safely

---

## Exercise 5: Git Tools & Integration (15 points)

### Solution 5.1: GUI Tools Usage (8 points)

**GitHub Desktop Solution**:
1. Open GitHub Desktop
2. Clone repository: File → Clone Repository → URL tab
3. Make changes to any file using your editor
4. In GitHub Desktop:
   - Changes appear in left panel
   - Add commit message
   - Click "Commit to main"
   - Click "Push origin"
5. Create branch: Branch → New Branch → "test-gui-branch"

**VS Code Solution**:
1. Open project folder in VS Code
2. Make changes to any file
3. Click Source Control icon (Ctrl+Shift+G)
4. Stage changes by clicking + icon
5. Write commit message
6. Click ✓ to commit
7. Click "..." → Push

**Grading Criteria**:
- Tool setup (2 points): Successfully opened project in chosen tool
- Made changes using GUI (3 points): Changes visible in GUI
- Committed using GUI (3 points): Commit made through graphical interface

### Solution 5.2: GitHub Features (7 points)

**Repository Description & Topics**:
1. Go to repository on GitHub
2. Click "Edit" next to description
3. Add: "A blog website for learning Git and GitHub fundamentals"
4. Add topics: git, github, html, css, javascript, learning

**Create Release**:
1. Go to repository → Releases
2. Click "Create a new release"
3. Tag: v1.0
4. Title: "First Release"
5. Description:
```markdown
## Features
- Basic blog structure
- Contact form with validation
- Responsive design
- Navigation system

## Files Changed
- Added contact page
- Enhanced CSS styling
- JavaScript form validation
- Updated navigation across all pages
```

**README Badges**:
```markdown
# Blog Website

![GitHub last commit](https://img.shields.io/github/last-commit/username/repo)
![GitHub repo size](https://img.shields.io/github/repo-size/username/repo)
![GitHub language count](https://img.shields.io/github/languages/count/username/repo)
![GitHub top language](https://img.shields.io/github/languages/top/username/repo)
```

**Grading Criteria**:
- Repository description/topics (2 points): Proper description and relevant topics
- Release created (3 points): Release with proper notes and versioning
- README badges added (2 points): Functional badges displaying repo info

---

## Exercise 6: Portfolio Enhancement (10 points)

### Solution 6.1: Project Improvement (10 points)

**Enhanced index.html with Projects Section**:
```html
<!-- Add this section to index.html -->
<section id="projects">
    <h2>My Projects</h2>
    <div class="projects-grid">
        <div class="project-card">
            <h3>Blog Website</h3>
            <p>A responsive blog website built with HTML, CSS, and JavaScript. Features include contact form validation and smooth navigation.</p>
            <div class="tech-stack">
                <span class="tech">HTML5</span>
                <span class="tech">CSS3</span>
                <span class="tech">JavaScript</span>
                <span class="tech">Git</span>
            </div>
            <a href="https://github.com/username/blog-website" class="project-link">View on GitHub</a>
        </div>
        
        <div class="project-card">
            <h3>Portfolio Website</h3>
            <p>A personal portfolio website showcasing my projects and skills. Built with modern web technologies and responsive design.</p>
            <div class="tech-stack">
                <span class="tech">HTML5</span>
                <span class="tech">CSS3</span>
                <span class="tech">JavaScript</span>
                <span class="tech">Bootstrap</span>
            </div>
            <a href="https://github.com/username/portfolio" class="project-link">View on GitHub</a>
        </div>
        
        <div class="project-card">
            <h3>Task Manager App</h3>
            <p>A simple task management application with local storage. Users can add, edit, and delete tasks with priority levels.</p>
            <div class="tech-stack">
                <span class="tech">HTML5</span>
                <span class="tech">CSS3</span>
                <span class="tech">JavaScript</span>
                <span class="tech">Local Storage</span>
            </div>
            <a href="https://github.com/username/task-manager" class="project-link">View on GitHub</a>
        </div>
    </div>
</section>
```

**Enhanced CSS for Projects Section**:
```css
/* Projects Section */
#projects {
    padding: 4rem 2rem;
    background-color: #f8f9fa;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.project-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-card h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
}

.project-card p {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tech {
    background-color: #3498db;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
}

.project-link {
    display: inline-block;
    background-color: #2c3e50;
    color: white;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.project-link:hover {
    background-color: #34495e;
}

/* Smooth Scrolling */
html {
    scroll-behavior: smooth;
}

/* Responsive Design */
@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    #projects {
        padding: 2rem 1rem;
    }
}
```

**Enhanced JavaScript for Smooth Navigation**:
```javascript
// Add to main.js
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Smooth scrolling for internal links
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
    
    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
```

**Grading Criteria**:
- Projects section added (3 points): Proper HTML structure for projects
- 3 project cards (3 points): Each card with name, description, tech stack
- Responsive design (2 points): Grid layout works on different screen sizes
- Smooth scrolling (2 points): JavaScript smooth scrolling implemented

---

## 🎯 Bonus Challenges Solutions (Extra Credit: +10 points)

### Bonus 1: Custom Git Aliases (5 points)

**Expected Aliases**:
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
git config --global alias.hist 'log --oneline --graph --decorate --all'
```

**Verification**:
```bash
git config --global --get-regexp alias
# Expected output:
alias.st status
alias.co checkout
alias.br branch
alias.ci commit
alias.unstage reset HEAD --
alias.last log -1 HEAD
alias.visual !gitk
alias.hist log --oneline --graph --decorate --all
```

### Bonus 2: .gitignore Mastery (5 points)

**Expected .gitignore Content**:
```gitignore
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE/Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Build directories
build/
dist/

# Temporary folders
tmp/
temp/

# Cache
.cache/
.parcel-cache/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache
```

---

## 📊 Grading Summary

### Score Distribution:
- **Exercise 1**: 10 points (Setup & Configuration)
- **Exercise 2**: 20 points (Basic Operations)
- **Exercise 3**: 25 points (Branching & Merging)