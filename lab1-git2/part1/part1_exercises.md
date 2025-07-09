# Part 1: Git Fundamentals - Exercises & Challenges

## 📋 Exercise Instructions

**Time Limit**: 90 minutes  
**Total Score**: 100 points  
**Passing Score**: 70 points

### Submission Requirements:
1. Complete all exercises in order
2. Record your answers in the provided spaces
3. Submit screenshots where requested
4. Push all work to your GitHub repository

---

## Exercise 1: Git Setup & Configuration (10 points)

### Challenge 1.1: Environment Setup (5 points)
**Task**: Set up Git with proper configuration

**Requirements**:
1. Configure Git with your name and email
2. Set default branch to `main`
3. Set VS Code as default editor
4. Generate and add SSH key to GitHub

**Deliverables**:
```bash
# Run this command and paste output
git config --list | grep user
```

**Your Answer**:
```
Name: ________________
Email: ________________
SSH Key Added: ✅/❌
```

### Challenge 1.2: Repository Creation (5 points)
**Task**: Create a new repository called `git-exercises`

**Requirements**:
1. Create local repository
2. Add initial README.md with your name and today's date
3. Make first commit
4. Create GitHub repository
5. Push to GitHub

**Deliverables**:
- GitHub repository URL: ________________
- First commit hash: ________________

---

## Exercise 2: Basic Git Operations (20 points)

### Challenge 2.1: File Management (10 points)
**Task**: Create a simple blog website structure

**Requirements**:
Create the following structure:
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

**Content Requirements**:
- `index.html`: Basic blog homepage with navigation
- `posts/post1.html`: First blog post about learning Git
- `posts/post2.html`: Second blog post about GitHub
- `css/styles.css`: Basic styling for all pages
- `js/main.js`: Simple JavaScript for interactivity
- `README.md`: Project description and usage instructions

**Scoring**:
- Correct file structure: 3 points
- Proper HTML content: 3 points
- CSS styling: 2 points
- JavaScript functionality: 2 points

**Your Progress**:
- Files created: ✅/❌
- Content added: ✅/❌
- Commit made: ✅/❌

### Challenge 2.2: Commit History (10 points)
**Task**: Create meaningful commit history

**Requirements**:
1. Make at least 5 separate commits:
   - Initial commit with README
   - Add HTML structure
   - Add CSS styling
   - Add JavaScript functionality
   - Add blog posts content

**Commit Message Format**:
```
type(scope): description

Examples:
feat(html): add basic blog structure
style(css): add responsive design
feat(js): add navigation functionality
content(posts): add first two blog posts
docs(readme): update project description
```

**Scoring**:
- 5 meaningful commits: 5 points
- Proper commit message format: 3 points
- Logical commit sequence: 2 points

**Your Commit History**:
```bash
# Run: git log --oneline
# Paste your output here:

```

---

## Exercise 3: Branching & Merging (25 points)

### Challenge 3.1: Feature Branch Development (15 points)
**Task**: Develop new features using branches

**Requirements**:
1. Create branch `feature/contact-page`
2. Add contact.html with contact form
3. Update navigation in all pages
4. Commit changes in feature branch
5. Push feature branch to GitHub

**Contact Form Requirements**:
- Name field
- Email field
- Message textarea
- Submit button
- Basic form validation with JavaScript

**Scoring**:
- Branch created correctly: 3 points
- Contact page implemented: 5 points
- Navigation updated: 3 points
- Form validation: 4 points

**Your Progress**:
- Feature branch created: ✅/❌
- Contact page added: ✅/❌
- Navigation updated: ✅/❌
- Validation working: ✅/❌

### Challenge 3.2: Branch Merging (10 points)
**Task**: Merge feature branch back to main

**Requirements**:
1. Switch to main branch
2. Merge feature branch
3. Resolve any conflicts (if any)
4. Push updated main to GitHub
5. Delete feature branch locally and remotely

**Scoring**:
- Successful merge: 4 points
- Conflict resolution (if applicable): 3 points
- Branch cleanup: 3 points

**Your Progress**:
- Merged successfully: ✅/❌
- Conflicts resolved: ✅/❌ (or N/A)
- Branch deleted: ✅/❌

---

## Exercise 4: Advanced Git Operations (20 points)

### Challenge 4.1: History Manipulation (10 points)
**Task**: Practice working with Git history

**Requirements**:
1. View commit history in different formats
2. Check differences between commits
3. Create and apply Git tags
4. Use git show for specific commits

**Commands to Execute**:
```bash
# 1. Show last 3 commits in oneline format
git log --oneline -3

# 2. Show changes between first and last commit
git diff <first-commit-hash> <last-commit-hash>

# 3. Create tag for current version
git tag -a v1.0 -m "First release of blog website"

# 4. Show tag information
git show v1.0

# 5. Push tags to GitHub
git push origin --tags
```

**Scoring**:
- Correct log commands: 3 points
- Diff between commits: 3 points
- Tag created and pushed: 4 points

**Your Results**:
```bash
# Paste output of git log --oneline -3:

# Tag created: ✅/❌
# Tag pushed: ✅/❌
```

### Challenge 4.2: Undoing Changes (10 points)
**Task**: Practice safe ways to undo changes

**Scenario**: You made some mistakes and need to fix them

**Requirements**:
1. Make a change to any file but don't commit
2. Use git checkout to undo the change
3. Make another change and stage it
4. Use git reset to unstage
5. Create a "bad" commit, then revert it

**Steps**:
```bash
# Step 1: Make change and undo
echo "temporary change" >> index.html
git checkout -- index.html

# Step 2: Stage and unstage
echo "another change" >> index.html
git add index.html
git reset HEAD index.html

# Step 3: Create bad commit and revert
echo "bad change" >> index.html
git add index.html
git commit -m "This is a bad commit"
git revert HEAD
```

**Scoring**:
- Undo unstaged changes: 3 points
- Unstage staged changes: 3 points
- Create and revert commit: 4 points

**Your Progress**:
- Undid unstaged changes: ✅/❌
- Unstaged changes: ✅/❌
- Created revert commit: ✅/❌

---

## Exercise 5: Git Tools & Integration (15 points)

### Challenge 5.1: GUI Tools Usage (8 points)
**Task**: Use Git GUI tools for repository management

**Requirements**:
Choose ONE of the following tools and complete the tasks:

**Option A: GitHub Desktop**
1. Clone your repository in GitHub Desktop
2. Make a change using the GUI
3. Commit and push using GitHub Desktop
4. Create a branch using the GUI

**Option B: VS Code Git Integration**
1. Open project in VS Code
2. Make changes and use Source Control panel
3. Stage, commit, and push using VS Code
4. Use VS Code's diff viewer

**Scoring**:
- Tool setup: 2 points
- Made changes using GUI: 3 points
- Committed using GUI: 3 points

**Your Choice**: GitHub Desktop / VS Code / Other: ________________

**Your Progress**:
- Tool used successfully: ✅/❌
- Changes committed via GUI: ✅/❌
- Pushed via GUI: ✅/❌

### Challenge 5.2: GitHub Features (7 points)
**Task**: Explore GitHub web interface features

**Requirements**:
1. Add repository description and topics
2. Create a release (v1.0) with release notes
3. Add repository README badges
4. Explore repository insights

**Scoring**:
- Repository description/topics: 2 points
- Release created: 3 points
- README badges added: 2 points

**Your Progress**:
- Description added: ✅/❌
- Release created: ✅/❌
- Badges added: ✅/❌

---

## Exercise 6: Portfolio Enhancement (10 points)

### Challenge 6.1: Project Improvement (10 points)
**Task**: Enhance your portfolio project

**Requirements**:
1. Add a projects section to showcase your work
2. Include at least 3 project cards with:
   - Project name
   - Description
   - Technologies used
   - GitHub link (can be placeholder)
3. Make it responsive
4. Add smooth scrolling navigation

**Scoring**:
- Projects section added: 3 points
- 3 project cards: 3 points
- Responsive design: 2 points
- Smooth scrolling: 2 points

**Your Progress**:
- Projects section: ✅/❌
- Project cards: ✅/❌
- Responsive: ✅/❌
- Smooth scrolling: ✅/❌

---

## 🎯 Bonus Challenges (Extra Credit: +10 points)

### Bonus 1: Custom Git Aliases (5 points)
**Task**: Create useful Git aliases

**Requirements**:
Create at least 3 custom aliases:
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.unstage 'reset HEAD --'
git config --global alias.visual '!gitk'
```

**Your Aliases**:
```bash
# List your custom aliases:
git config --global --get-regexp alias
```

### Bonus 2: .gitignore Mastery (5 points)
**Task**: Create comprehensive .gitignore file

**Requirements**:
Add .gitignore file with patterns for:
- Node.js dependencies
- OS-specific files
- IDE/Editor files
- Log files
- Environment variables

**Your .gitignore**:
```gitignore
# Add your .gitignore content here
```

---

## 📊 Self-Assessment Rubric

### Excellent (90-100 points):
- All exercises completed correctly
- Proper Git workflow demonstrated
- Clean commit history
- GitHub integration working
- Bonus challenges attempted

### Good (80-89 points):
- Most exercises completed
- Basic Git operations working
- Some minor issues with workflow
- GitHub connected properly

### Satisfactory (70-79 points):
- Core exercises completed
- Basic Git commands working
- Repository created and pushed
- Some advanced features missing

### Needs Improvement (Below 70 points):
- Missing core functionality
- Git workflow not demonstrated
- Repository not properly set up
- Need to review fundamentals

---

## 📝 Final Submission Checklist

Before submitting, ensure you have:

- [ ] Completed all required exercises
- [ ] Recorded all answers in the spaces provided
- [ ] Pushed all work to GitHub repository
- [ ] Repository is public and accessible
- [ ] Screenshots captured where requested
- [ ] Commit history shows proper workflow
- [ ] README.md updated with exercise completion

**Repository URL**: ________________  
**Total Score**: ______ / 100  
**Completion Time**: ______ minutes

---

## 🚀 Ready for Part 2?

Once you've completed these exercises with a score of 70+, you're ready to move on to **Part 2: Team Collaboration & Advanced Workflow**.

**Congratulations on completing Part 1!** 🎉