
# 🎯 **MIDTERM INDIVIDUAL PROJECT**
## **Week 7.5 | Duration: 1 Week | Weight: 25%**

### 📋 **Project Overview**
นักศึกษาแต่ละคนจะสร้าง **Personal Finance Management Application** ที่ครบถ้วนด้วยทั้ง Frontend และ Backend เพื่อแสดงความสามารถในการใช้เทคโนโลยีที่เรียนมาในสัปดาห์ที่ 1-7

### 🎯 **Project Objectives**
สร้างแอปพลิเคชันจัดการการเงินส่วนบุคคลที่มีฟีเจอร์:
- 💰 **Income/Expense Tracking**: บันทึกรายรับ-รายจ่าย
- 📊 **Data Visualization**: กราฟและสถิติการใช้จ่าย
- 🏷️ **Category Management**: จัดหมวดหมู่รายการ
- 📱 **Responsive Design**: ใช้งานได้ทุกอุปกรณ์
- 🔒 **Data Persistence**: เก็บข้อมูลในฐานข้อมูล

---

## 📋 **Technical Requirements**

### **Frontend Requirements**
```javascript
Technology Stack:
✅ HTML5 with semantic structure
✅ CSS3 with Grid/Flexbox layouts
✅ Vanilla JavaScript ES6+ (NO frameworks)
✅ Responsive design (mobile-first)
✅ Chart.js or D3.js for data visualization
✅ Local Storage for client-side caching
```

### **Backend Requirements**
```javascript
Technology Stack:
✅ Node.js with Express.js framework
✅ RESTful API design principles
✅ JSON file storage (database simulation)
✅ Middleware implementation
✅ Error handling and validation
✅ CORS configuration
```

### **Project Structure**
```
personal-finance-app/
├── 📁 frontend/
│   ├── 📄 index.html
│   ├── 📄 styles.css
│   ├── 📄 app.js
│   ├── 📄 chart-utils.js
│   └── 📁 assets/
├── 📁 backend/
│   ├── 📄 server.js
│   ├── 📄 routes.js
│   ├── 📄 middleware.js
│   ├── 📄 data-handler.js
│   └── 📁 data/
│       └── 📄 transactions.json
├── 📄 README.md
├── 📄 API-Documentation.md
└── 📄 package.json
```

---

## 🔧 **Required Features**

### **Core Features (Must Have - 70%)**

#### **1. Transaction Management**
```javascript
// API Endpoints Required:
GET /api/transactions        // Get all transactions
POST /api/transactions       // Create new transaction
PUT /api/transactions/:id    // Update transaction
DELETE /api/transactions/:id // Delete transaction

// Transaction Object Structure:
{
  id: "unique-id",
  type: "income" | "expense",
  amount: number,
  category: string,
  description: string,
  date: "YYYY-MM-DD",
  createdAt: timestamp
}
```

#### **2. Category Management**
```javascript
// Default Categories:
Income: ["Salary", "Freelance", "Investment", "Other"]
Expense: ["Food", "Transportation", "Utilities", "Entertainment", "Shopping", "Healthcare", "Other"]

// API Endpoints:
GET /api/categories
POST /api/categories
DELETE /api/categories/:id
```

#### **3. Data Visualization**
- 📊 **Monthly Summary Chart**: Bar chart showing income vs expenses
- 🥧 **Category Breakdown**: Pie chart of expense categories  
- 📈 **Trend Analysis**: Line chart showing spending trends over time
- 💯 **Summary Statistics**: Total income, expenses, balance

#### **4. User Interface**
- 📱 **Dashboard**: Overview with key metrics and charts
- ➕ **Add Transaction Form**: Modal or dedicated page
- 📋 **Transaction List**: Filterable and sortable table
- 🔍 **Search & Filter**: By date range, category, type

### **Advanced Features (Should Have - 20%)**

#### **5. Data Export**
```javascript
// Export functionality:
- Export to CSV format
- Export specific date ranges
- Export by category
```

#### **6. Budget Management**
```javascript
// Budget object structure:
{
  id: "unique-id",
  category: string,
  monthlyLimit: number,
  currentSpent: number,
  month: "YYYY-MM"
}

// Budget tracking features:
- Set monthly budget per category
- Visual progress indicators
- Budget warning notifications
```

### **Excellence Features (Could Have - 10%)**

#### **7. Advanced Analytics**
- 📊 **Spending Patterns**: Weekly/monthly spending analysis
- 🎯 **Goal Tracking**: Savings goals with progress tracking
- 📈 **Predictions**: Simple spending forecasts

#### **8. Enhanced UX**
- 🌙 **Dark Mode**: Theme switcher
- ⌨️ **Keyboard Shortcuts**: Quick transaction entry
- 📱 **Offline Support**: Works without internet connection

---

## 📋 **Assessment Timeline & Deadlines**

### **Midterm Project Schedule**
```
📅 Midterm Assessment Timeline:

Week 7 (Monday):
├── 📢 Project announcement and requirements release
├── 🎯 Technology stack and scope clarification
└── 🤔 Q&A session for project understanding

Week 7 (Wednesday):
├── 🛠️ Development environment setup verification
├── 💡 Project planning and architecture design
└── 📝 Initial commit and repository setup

Week 7 (Friday):
├── 🎯 Midpoint check-in (optional consultation)
├── 🔧 Technical troubleshooting session
└── 📊 Progress assessment and guidance

Week 8 (Wednesday):
├── 🚀 Final day for major feature implementation
├── 🧪 Testing and bug fixing recommendations
└── 📝 Documentation completion guidance

Week 8 (Sunday, 23:59):
├── 📤 Final submission deadline
├── 🔗 Repository URL and demo link submission
└── 📊 Self-assessment form completion

Week 9 (Lab Session):
├── 🎤 Individual presentations (5 minutes each)
├── 👥 Peer review and feedback session
└── 🏆 Recognition of outstanding projects
```

---

## 📊 **Assessment Criteria & Rubric**

### **CLO Mapping**
| CLO | Description | Assessment Method | Weight |
|-----|-------------|-------------------|---------|
| **CLO1** | อธิบายหลักการ Frontend/Backend architecture | Code structure & documentation | 15% |
| **CLO2** | พัฒนาแอปพลิเคชัน Full-stack ด้วยเทคโนโลยีสมัยใหม่ | Working application | 35% |
| **CLO4** | ออกแบบ User Interface ที่ตอบสนองและเป็นมิตร | UI/UX evaluation | 25% |
| **CLO5** | ประยุกต์ใช้เครื่องมือพัฒนาและ best practices | Code quality & tools usage | 15% |
| **CLO6** | ใช้ระบบควบคุมเวอร์ชันและ collaboration | Git workflow & documentation | 10% |

### **Detailed Rubric (100 points total)**

#### **🏗️ Technical Implementation (40 points)**

| Criteria | Excellent (36-40) | Good (32-35) | Satisfactory (28-31) | Needs Improvement (0-27) |
|----------|-------------------|--------------|----------------------|---------------------------|
| **Frontend Development** | Semantic HTML5, advanced CSS3, ES6+ features used effectively | Good HTML/CSS structure, some modern JS features | Basic HTML/CSS, minimal JS functionality | Poor structure, limited functionality |
| **Backend Development** | RESTful API, proper Express.js implementation, good error handling | Functional API with most endpoints working | Basic API with some endpoints | Limited or non-functional backend |
| **Data Management** | Efficient data handling, proper JSON structure, data validation | Good data structure with some validation | Basic data handling | Poor or missing data management |
| **Integration** | Seamless frontend-backend communication | Good integration with minor issues | Basic integration working | Poor or broken integration |

#### **🎨 User Interface & Experience (25 points)**

| Criteria | Excellent (23-25) | Good (20-22) | Satisfactory (18-19) | Needs Improvement (0-17) |
|----------|-------------------|--------------|----------------------|---------------------------|
| **Design Quality** | Professional, intuitive, consistent design | Good design with minor inconsistencies | Acceptable design, some usability issues | Poor design, difficult to use |
| **Responsiveness** | Perfect responsive design, works on all devices | Good responsive design with minor issues | Basic responsive features | Not responsive or broken on mobile |
| **Data Visualization** | Interactive, clear, meaningful charts | Good charts with proper data representation | Basic charts showing data | Poor or missing visualizations |
| **User Experience** | Intuitive navigation, smooth interactions | Good UX with minor friction points | Acceptable UX, some confusion | Poor UX, difficult to navigate |

#### **🔧 Code Quality & Practices (20 points)**

| Criteria | Excellent (18-20) | Good (16-17) | Satisfactory (14-15) | Needs Improvement (0-13) |
|----------|-------------------|--------------|----------------------|---------------------------|
| **Code Organization** | Clean, modular, well-structured code | Good organization with clear separation | Basic organization, some structure | Poor organization, messy code |
| **Documentation** | Comprehensive README, API docs, code comments | Good documentation with most details | Basic documentation | Poor or missing documentation |
| **Best Practices** | Follows conventions, proper error handling, validation | Mostly follows best practices | Some best practices implemented | Limited best practices |
| **Git Usage** | Meaningful commits, proper branching, clear history | Good Git practices with regular commits | Basic Git usage | Poor Git practices |

#### **💡 Innovation & Features (15 points)**

| Criteria | Excellent (14-15) | Good (12-13) | Satisfactory (10-11) | Needs Improvement (0-9) |
|----------|-------------------|--------------|----------------------|---------------------------|
| **Feature Completeness** | All required + advanced + excellence features | All required + some advanced features | All required features working | Missing some required features |
| **Creativity** | Innovative solutions, creative problem-solving | Some creative elements | Standard implementation | Lacks creativity |
| **Technical Challenges** | Tackles complex problems, advanced implementations | Handles moderate complexity well | Basic problem-solving | Avoids challenges |

---

## 📝 **Submission Requirements**

### **Deliverables Checklist**
- [ ] **Source Code**: Complete project in GitHub repository
- [ ] **README.md**: Setup instructions, features overview, technology stack
- [ ] **API Documentation**: All endpoints with examples
- [ ] **Demo Video**: 5-minute walkthrough of features (optional for bonus points)
- [ ] **Reflection Report**: 2-page technical reflection on learning outcomes

### **GitHub Repository Structure**
```
📁 [student-id]-personal-finance-app/
├── 📄 README.md (Setup & overview)
├── 📄 API-Documentation.md
├── 📄 REFLECTION.md
├── 📁 frontend/ (Client-side code)
├── 📁 backend/ (Server-side code)
├── 📁 docs/ (Additional documentation)
├── 📁 screenshots/ (App screenshots)
└── 📄 package.json
```

### **Submission Timeline**
```
📅 Project Announcement: End of Week 7 (Monday)
📅 Project Due Date: End of Week 8 (Sunday, 23:59)
📅 Presentation: Week 9 (First 30 minutes of lab)
📅 Peer Review: Week 9 (During lab session)
```

---
