# **งานเพิ่มเติม - Additional Challenges สำหรับ SEC1**
## สำหรับ ENGSE203 Midterm V2

**⚠️ ทำหลังจากเสร็จข้อปกติทั้งหมดแล้วเท่านั้น**

---

## **📋 Overview**

หลังจากทำข้อสอบหลักเสร็จแล้ว ให้ทำงานเพิ่มเติมเหล่านี้เพื่อ:
- 🎯 **วัดความสามารถการแก้ปัญหา** โดยไม่มี template
- 🧠 **ทดสอบการประยุกต์ใช้ความรู้** ในสถานการณ์ใหม่
- 💪 **เพิ่มคะแนนการการทำ V1 หลัก** สำหรับนักศึกษาที่มีความสามารถตามจริง

**เวลาที่เหลือ:** ใช้เวลาที่เหลือหลังจากทำข้อหลักเสร็จ  
**การคิดคะแนน:** V2 หลัก คิดเป็น 60คะแนน **งานเพิ่ม +40คะแนน** (รวม 100คะแนน)

---

## **🚀 Part 1 Additional Challenges (เลือกทำ 2 จาก 4 ข้อ)**

### **Challenge 1.A: Search History (10 คะแนน)**
**งานที่ต้องทำ:** เพิ่มฟีเจอร์บันทึกประวัติการค้นหา

**Requirements:**
- บันทึกคำค้นหาล่าสุด 5 คำใน localStorage
- แสดงประวัติการค้นหาเป็น dropdown หรือ list
- คลิกที่ประวัติแล้วค้นหาคำนั้นใหม่ได้
- มีปุ่ม "Clear History"

**ไม่มี template code - ต้องคิดและเขียนเอง**

**Hint เท่านั้น:**
```javascript
// localStorage methods ที่อาจใช้
localStorage.setItem('searchHistory', JSON.stringify(array))
localStorage.getItem('searchHistory')
```

---

### **Challenge 1.B: Favorites System (10 คะแนน)**
**งานที่ต้องทำ:** เพิ่มระบบเก็บอาหารที่ชื่นชอb

**Requirements:**
- เพิ่มปุ่ม "❤️ Add to Favorites" ในหน้ารายละเอียด
- บันทึกรายการโปรดใน localStorage
- แสดงจำนวนรายการโปรดที่ header
- สร้างหน้า "My Favorites" (แยกจากหน้าค้นหา)

**การทำงาน:**
- คลิก ❤️ → เก็บ meal ID และข้อมูลพื้นฐาน
- แสดงจำนวนที่ header: "❤️ (3)"
- หน้า Favorites แสดง meal cards ของรายการโปรด

---

### **Challenge 1.C: Advanced Filtering (10 คะแนน)**
**งานที่ต้องทำ:** เพิ่มตัวกรองข้อมูลขั้นสูง

**Requirements:**
- เพิ่ม dropdown filter: Category, Area (Country)  
- ใช้ API endpoints เหล่านี้:
  - Categories: `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  - Areas: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  - Filter by category: `https://www.themealdb.com/api/json/v1/1/filter.php?c=CATEGORY`
  - Filter by area: `https://www.themealdb.com/api/json/v1/1/filter.php?a=AREA`

**การทำงาน:**
- โหลด categories และ areas เมื่อเปิดหน้าเว็บ
- ผู้ใช้เลือก filter → แสดงผลอาหารตาม filter
- รวมกับการค้นหาแบบเดิมได้ด้วย

---

### **Challenge 1.D: Random Meal Generator (10 คะแนน)**
**งานที่ต้องทำ:** เพิ่มฟีเจอร์สุ่มอาหาร

**Requirements:**
- เพิ่มปุ่ม "🎲 Random Meal" ที่ header
- ใช้ API: `https://www.themealdb.com/api/json/v1/1/random.php`
- คลิกแล้วสุ่มอาหาร 1 อย่างแล้วไปหน้ารายละเอียดทันที
- เพิ่ม loading animation ขณะกำลังสุ่ม

**Bonus:** สุ่มได้หลายอย่างพร้อมกัน (3-5 อย่าง) และให้ผู้ใช้เลือก

---

## **⚛️ Part 2 Additional Challenges (เลือกทำ 2 จาก 4 ข้อ)**

### **Challenge 2.A: Search Suggestions (10 คะแนน)**
**งานที่ต้องทำ:** เพิ่ม Auto-complete สำหรับการค้นหา

**Requirements:**
- เมื่อพิมพ์ในช่องค้นหา แสดง suggestions แบบ real-time
- ใช้ API search กับทุกตัวอักษรที่พิมพ์ (มี debounce)
- แสดงชื่ออาหารที่เริ่มต้นด้วยตัวอักษรที่พิมพ์
- คลิกเลือก suggestion แล้วค้นหาทันที

**Technical Challenge:**
- ต้องจัดการ debouncing (ห้ามเรียก API ทุกตัวอักษร)
- จัดการ async race conditions
- UX ที่ดี (keyboard navigation)

---

### **Challenge 2.B: Recipe Comparison (10 คะแนน)**
**งานที่ต้องทำ:** เปรียบเทียบสูตรอาหาร 2 อย่าง

**Requirements:**
- เพิ่มปุ่ม "Compare" ในหน้ารายละเอียด
- เก็บอาหารที่เลือกไว้เปรียบเทียบ (สูงสุด 2 อย่าง)
- สร้างหน้า `/compare` แสดงการเปรียบเทียบแบบเคียงข้างกัน
- เปรียบเทียบ: ส่วนผสม, เวลาทำ, ประเทศ, หมวดหมู่

**UI Challenge:**
- Layout แบบ side-by-side 
- Highlight ความแตกต่าง
- Responsive design

---

### **Challenge 2.C: Meal Planning Calendar (10 คะแนน)**  
**งานที่ต้องทำ:** เพิ่มปฏิทินวางแผนอาหาร

**Requirements:**
- สร้างหน้า `/calendar` แสดงปฏิทิน 7 วัน
- ลากอาหารจากหน้าค้นหาไปใส่ในวันที่ต้องการ
- บันทึกแผนการกินใน localStorage
- แสดงรูปย่อของอาหารในปฏิทิน

**Technical Challenge:**
- Drag & Drop functionality
- Date manipulation
- State management across routes
- Data persistence

---

### **Challenge 2.D: Social Features (10 คะแนน)**
**งานที่ต้องทำ:** เพิ่มฟีเจอร์ social sharing และ rating

**Requirements:**
- เพิ่ม star rating (1-5 ดาว) ในหน้ารายละเอียด
- บันทึก rating ใน localStorage
- แสดง average rating ที่ meal cards
- เพิ่มปุ่ม share (Facebook, Twitter, หรือ copy link)
- เพิ่ม comment system พื้นฐาน (บันทึกใน localStorage)

**Advanced Feature:**
- Export meal plan เป็น PDF หรือ image
- Share meal combination ได้

---

## **📝 การส่งงาน Additional Challenges**

### **Git Workflow:**

```bash
# หลังจากทำ main challenges เสร็จ
git add .
git commit -m "เสร็จสิ้น main challenges V2"

# เริ่ม additional challenges
git checkout -b additional-features

# ทำงานเพิ่มเติม (เลือกข้อที่สนใจ)
git add .
git commit -m "Challenge 1.A: เพิ่ม Search History ด้วย localStorage"

git add .  
git commit -m "Challenge 2.B: เพิ่ม Recipe Comparison feature"

# เสร็จแล้ว merge กลับ
git checkout version-2-development
git merge additional-features
git tag v2-with-challenges-complete
```

### **ส่งงานใน git repository ของตนเอง:**

เพิ่มในส่วน README.md:

```markdown
## 🎯 Additional Challenges Completed

### Part 1 Challenges:
- [x] Challenge 1.A: Search History
- [x] Challenge 1.C: Advanced Filtering  

### Part 2 Challenges:  
- [x] Challenge 2.B: Recipe Comparison
- [ ] Challenge 2.D: Social Features (ทำไม่ทัน)

### Technical Highlights:
- ใช้ localStorage สำหรับ data persistence
- Implement debouncing สำหรับ search suggestions
- สร้าง drag & drop interface สำหรับ calendar
- จัดการ state management ข้าม components

### Self Assessment:
- Main Exam: 50/60
- Additional Challenges: 30/40
- **Total: 95/100**
```

---

## **🎯 เกณฑ์การให้คะแนนเพิ่มเติม**

### **ระดับความสำเร็จ:**

| ระดับ | งานที่ทำ | คะแนนพิเศษ |
|:---|:---|:---:|
| **Bronze** | 1 Challenge ใดก็ได้ | +3 |
| **Silver** | 2 Challenges (1 จาก Part 1, 1 จาก Part 2) | +7 |
| **Gold** | 3 Challenges | +12 |
| **Platinum** | 4 Challenges + Creative Enhancement | +15 |

### **Bonus Points:**
- **Code Quality** (+2): Clean code, good variable names, comments
- **Creative Enhancement** (+3): เพิ่ม feature ที่ไม่มีในโจทย์
- **Exceptional UX** (+2): Animation, loading states, error handling
- **Responsive Design** (+1): ใช้งานได้ดีในมือถือ

---

## **💡 Tips สำหรับ Additional Challenges**

### **เริ่มต้น:**
1. **ทำข้อหลักให้เสร็จก่อน** - อย่าเพิ่งมา challenge
2. **เลือกข้อที่ถนัด** - ไม่จำเป็นต้องทำทุกข้อ
3. **Plan ก่อนเขียน** - คิดโครงสร้างก่อนลงมือ
4. **ทำทีละข้อ** - commit เมื่อเสร็จแต่ละข้อ

### **การจัดการเวลา:**
- **มีเวลาเหลือ 30+ นาที**: ลอง 1 challenge ง่ายๆ
- **มีเวลาเหลือ 60+ นาที**: ลอง 2 challenges  
- **มีเวลาเหลือ 90+ นาที**: ลอง 3-4 challenges

### **เมื่อติดปัญหา:**
- **Google เฉพาะ syntax**: อนุญาตให้ค้น "localStorage javascript" หรือ "drag drop html5"
- **ไม่ติดที่ข้อเดียว**: หากติด 15+ นาที ให้เปลี่ยนไปทำข้ออื่น
- **Focus on functionality**: ทำให้ทำงานได้ก่อน แล้วค่อยทำให้สวย

---

## **🏆 ผลที่คาดหวัง**

หลังจากทำ Additional Challenges นักศึกษาจะได้:

### **Technical Skills:**
- 💾 **Data Persistence**: localStorage, state management
- 🔄 **Advanced API Usage**: multiple endpoints, filtering
- 🎨 **UX/UI Enhancement**: animations, responsive design
- 🧩 **Component Architecture**: complex state sharing

### **Problem Solving:**  
- 🧠 **Independent Thinking**: แก้ปัญหาโดยไม่มี template
- 🔍 **Research Skills**: หาข้อมูลและใช้งานได้
- ⚡ **Performance**: debouncing, optimization
- 🎯 **User-Centric Design**: คิดจากมุมผู้ใช้

**Good luck! Remember: ทำข้อหลักให้เสร็จก่อน แล้วค่อยมา challenge 🚀**