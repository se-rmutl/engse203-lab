# ตั้งค่า ENGSE203 Student Repository Template สำหรับผู้สอน

ใช้โฟลเดอร์/ZIP `engse203-student-labs-template` ที่ส่งมอบคู่กับ Course Repository นี้

## 1. สร้าง Template Repository

1. สร้าง GitHub repository เช่น `engse203-student-labs-template`
2. push เนื้อหาของ template ไปที่ `main`
3. เปิด **Settings → General → Template repository**
4. ตรวจว่า repository สาธารณะไม่มี Instructor Solution หรือข้อมูลลับ
5. ส่ง Template URL พร้อม [คู่มือก่อน LAB01](./CREATE_STUDENT_REPOSITORY_BEFORE_LAB01_TH.md)

## 2. Smoke Test ก่อนประกาศ

สร้าง repository ทดลองจาก template แล้วรัน:

```bash
npm install
npm run setup -- \
  --student-id 6501234567 \
  --name "Template Test" \
  --section SEC1 \
  --github <test-username> \
  --mode new-course
npm run build:pages
npm run verify:setup
```

จากนั้นจำลอง LAB01 หนึ่งรอบ: branch → source → evidence → metadata → Pages → PR → merge → tag

## 3. Release Gate

- [ ] Template มี LAB01–04
- [ ] `START_HERE_BEFORE_LAB01.md` เปิดอ่านได้
- [ ] `START_HERE_LAB01_TO_LAB03.md` รองรับรุ่น migration
- [ ] Pages Hub สร้างการ์ด 4 LAB
- [ ] `npm run verify:lab -- week-04` รองรับ LAB04
- [ ] ไม่มี `.git`, `node_modules`, `.env`, token หรือ solution
- [ ] ทดสอบบน macOS และ Windows/WSL2 อย่างละหนึ่งเครื่อง
