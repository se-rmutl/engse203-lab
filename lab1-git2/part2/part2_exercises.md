# Part 2: Team Collaboration - Exercises & Challenges

## 📋 Exercise Instructions

**Time Limit**: 3 hours  
**Total Score**: 100 points  
**Passing Score**: 70 points  
**Team Size**: 3-4 members

### Submission Requirements:
1. Complete all exercises as a team
2. All work must be in shared GitHub repository
3. Document team member contributions
4. Submit GitHub repository URL
5. Include reflection on team collaboration experience

---

## Exercise 1: Team Repository Setup (15 points)

### Challenge 1.1: Repository Configuration (10 points)
**Team Lead Task**: Set up the main repository

**Requirements**:
1. Create repository named `team-[team-name]-final-project`
2. Add comprehensive README with team information
3. Set up proper project structure
4. Add all team members as collaborators
5. Configure branch protection for `main` and `develop`

**Project Structure**:
```
team-project/
├── frontend/
├── backend/
├── docs/
├── tests/
├── .github/
│   └── workflows/
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

**Scoring Criteria**:
- Repository created with proper structure: 3 points
- Team members added as collaborators: 2 points
- Branch protection configured: 3 points
- README and CONTRIBUTING files: 2 points

**Team Lead Deliverable**:
- Repository URL: ________________
- Branch protection screenshots: ✅/❌
- Team member access verified: ✅/❌

### Challenge 1.2: Initial Commit Strategy (5 points)
**All Team Members Task**: Create initial commits

**Requirements**:
1. Each team member creates initial file in their domain
2. Use conventional commit messages
3. Create and push to separate feature branches
4. Maintain clean commit history

**Scoring Criteria**:
- Initial commits from all members: 2 points
- Proper commit message format: 2 points
- Clean commit history: 1 point

**Team Progress**:
- Member 1 initial commit: ✅/❌
- Member 2 initial commit: ✅/❌
- Member 3 initial commit: ✅/❌
- Member 4 initial commit: ✅/❌

---

## Exercise 2: Feature Development & Pull Requests (25 points)

### Challenge 2.1: Parallel Feature Development (15 points)
**All Team Members Task**: Develop features simultaneously

**Feature Assignments**:
- **Frontend Developer**: User authentication interface
- **Backend Developer**: Authentication API endpoints
- **Full-Stack Developer**: Product management system
- **DevOps Engineer**: CI/CD pipeline setup

**Requirements**:
1. Create feature branch for each task
2. Implement assigned feature completely
3. Include unit tests for your feature
4. Document your code properly
5. Push to GitHub regularly

**Frontend Feature Requirements**:
- Login/Register forms
- Form validation
- Responsive design
- Error handling
- Loading states

**Backend Feature Requirements**:
- User registration endpoint
- User login endpoint
- JWT token generation
- Input validation
- Error handling

**Product Management Requirements**:
- Product CRUD operations
- Search functionality
- Filtering capabilities
- Pagination
- Admin interface

**CI/CD Requirements**:
- GitHub Actions workflow
- Automated testing
- Code quality checks
- Deployment pipeline
- Status badges

**Scoring Criteria**:
- Feature completeness: 4 points
- Code quality: 3 points
- Testing: 3 points
- Documentation: 2 points
- Regular commits: 3 points

**Individual Progress**:
- Feature implementation: ✅/❌
- Tests written: ✅/❌
- Documentation added: ✅/❌
- Regular commits made: ✅/❌

### Challenge 2.2: Pull Request Process (10 points)
**All Team Members Task**: Create and manage PRs

**Requirements**:
1. Create PR with proper template
2. Include detailed description and screenshots
3. Link to relevant issues
4. Request specific reviewers
5. Respond to review feedback

**PR Template**:
```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

**Scoring Criteria**:
- PR template completed: 3 points
- Detailed description: 2 points
- Screenshots/evidence: 2 points
- Reviewer assignment: 1 point
- Response to feedback: 2 points

**PR Status**:
- PR created: ✅/❌
- Template filled: ✅/❌
- Reviews requested: ✅/❌
- Feedback addressed: ✅/❌

---

## Exercise 3: Code Review & Collaboration (20 points)

### Challenge 3.1: Peer Code Review (12 points)
**All Team Members Task**: Review teammates' code

**Requirements**:
1. Review at least 2 PRs from teammates
2. Provide constructive feedback
3. Check for code quality, bugs, and best practices
4. Use GitHub review tools effectively
5. Approve or request changes appropriately

**Review Checklist**:
- [ ] Code is readable and well-structured
- [ ] Functions are properly documented
- [ ] Error handling is implemented
- [ ] Security considerations addressed
- [ ] Performance implications considered
- [ ] Tests are comprehensive
- [ ] Follows project conventions

**Review Quality Guidelines**:
- **Constructive**: Provide specific suggestions
- **Educational**: Explain why changes are needed
- **Respectful**: Maintain professional tone
- **Thorough**: Check all aspects of the code

**Scoring Criteria**:
- Number of reviews completed: 3 points
- Quality of feedback: 4 points
- Use of GitHub review tools: 2 points
- Constructive communication: 3 points

**Review Progress**:
- Reviews completed: ___/2
- Feedback quality: High/Medium/Low
- Professional communication: ✅/❌

### Challenge 3.2: Conflict Resolution (8 points)
**Team Task**: Handle merge conflicts collaboratively

**Scenario Setup**:
1. Team Lead creates intentional conflicts
2. Multiple team members modify same files
3. Conflicts must be resolved through collaboration
4. Resolution must preserve all important changes

**Conflict Types to Handle**:
- Content conflicts (same line changes)
- Structure conflicts (file moves/renames)
- Dependency conflicts (package.json changes)
- Configuration conflicts (settings files)

**Resolution Process**:
1. Identify conflicted files
2. Communicate with team members
3. Negotiate resolution strategy
4. Implement agreed solution
5. Test resolved code
6. Document resolution

**Scoring Criteria**:
- Conflicts identified correctly: 2 points
- Team communication: 2 points
- Resolution strategy: 2 points
- Successful resolution: 2 points

**Conflict Resolution Record**:
- Conflicts encountered: _____ (number)
- Resolution method used: ________________
- Team communication: ✅/❌
- All conflicts resolved: ✅/❌

---

## Exercise 4: Advanced Git Operations (15 points)

### Challenge 4.1: Git Workflow Mastery (8 points)
**All Team Members Task**: Demonstrate advanced Git skills

**Required Operations**:
1. **Stash Management**: Use stash to switch contexts
2. **Cherry-picking**: Selectively apply commits
3. **Interactive Rebase**: Clean up commit history
4. **Bisect**: Find bug-introducing commit

**Stash Challenge**:
```bash
# Start working on feature
# Urgent bug fix needed
# Stash current work
# Fix bug and commit
# Return to feature work
# Apply stash and continue
```

**Cherry-pick Challenge**:
```bash
# Identify useful commit from another branch
# Cherry-pick to current branch
# Handle any conflicts
# Verify functionality
```

**Interactive Rebase Challenge**:
```bash
# Create 4-5 messy commits
# Use interactive rebase to clean up
# Squash related commits
# Reword commit messages
# Verify clean history
```

**Bisect Challenge**:
```bash
# Use provided repository with hidden bug
# Use git bisect to find bug introduction
# Identify exact commit
# Document findings
```

**Scoring Criteria**:
- Stash operations: 2 points
- Cherry-pick success: 2 points
- Interactive rebase: 2 points
- Bisect bug hunting: 2 points

**Advanced Git Progress**:
- Stash used successfully: ✅/❌
- Cherry-pick completed: ✅/❌
- History cleaned with rebase: ✅/❌
- Bug found with bisect: ✅/❌

### Challenge 4.2: Branch Strategy Implementation (7 points)
**Team Task**: Implement professional branching strategy

**Requirements**:
1. Implement Git Flow or GitHub Flow
2. Create release branches
3. Handle hotfix scenario
4. Maintain clean branch structure
5. Document branching strategy

**Branch Structure**:
```
main (production)
├── develop (integration)
├── feature/user-auth
├── feature/product-catalog
├── feature/payment-system
├── release/v1.0.0
└── hotfix/critical-bug
```

**Branching Rules**:
- No direct commits to main
- Features branch from develop
- Releases branch from develop
- Hotfixes branch from main
- All changes via Pull Requests

**Scoring Criteria**:
- Branching strategy implemented: 3 points
- Release process followed: 2 points
- Hotfix handled correctly: 2 points

**Branch Strategy Progress**:
- Strategy documented: ✅/❌
- Branches created correctly: 