# 03 — JSX Fundamentals

## เป้าหมาย

ผู้เรียนสามารถเขียน JSX ที่ถูกต้อง แทรก JavaScript expression และวิเคราะห์ syntax error ที่พบบ่อยได้

## JSX คืออะไร

JSX ทำให้เราเขียนโครงสร้าง UI คล้าย HTML ภายใน JavaScript:

```jsx
const courseName = 'ENGSE203';

const heading = <h1>{courseName} Study Task Board</h1>;
```

วงเล็บปีกกา `{}` เปิดพื้นที่สำหรับ JavaScript expression เช่น ตัวแปร การคำนวณ ternary หรือการเรียก `map()` แต่ไม่ใช่ที่วาง statement เช่น `if` แบบเต็ม

## กฎพื้นฐาน

### 1. คืนค่า Root เดียว

ผิด:

```jsx
return (
  <h1>Task Board</h1>
  <p>รายการเรียนของฉัน</p>
);
```

ถูกด้วย Fragment:

```jsx
return (
  <>
    <h1>Task Board</h1>
    <p>รายการเรียนของฉัน</p>
  </>
);
```

### 2. ปิด tag ทุกตัว

```jsx
<img src={imageUrl} alt="ตัวอย่างหน้าจอ" />
<input type="text" />
```

### 3. ใช้ `className`

```jsx
<section className="panel">...</section>
```

### 4. ใช้ `htmlFor` เชื่อม label กับ control

```jsx
<label htmlFor="task-title">ชื่องาน</label>
<input id="task-title" name="title" />
```

### 5. ชื่อ event ใช้ camelCase และส่ง function

```jsx
<button type="button" onClick={handleClick}>
  เพิ่มคะแนน
</button>
```

ระวัง:

```jsx
// ผิด: เรียก function ทันทีระหว่าง render
<button onClick={handleClick()}>เพิ่มคะแนน</button>
```

## แทรกข้อมูลด้วย `{}`

```jsx
const task = {
  title: 'ทบทวน JSX',
  priority: 'high',
};

return (
  <article>
    <h2>{task.title}</h2>
    <p>ความสำคัญ: {task.priority}</p>
    <p>{2 + 3} ขั้นตอน</p>
  </article>
);
```

ค่า boolean, `null` และ `undefined` ไม่แสดงเป็นข้อความโดยตรง จึงควรออกแบบ conditional UI ให้ชัดเจน

## Style ใน JSX

Inline style ใช้ object และ camelCase:

```jsx
<p style={{ backgroundColor: '#eef2ff', padding: '0.75rem' }}>
  สถานะพร้อมเรียน
</p>
```

ในงานจริงของ Week 04 ให้ใช้ `styles.css` เป็นหลัก เพื่อแยก responsibility และรองรับ responsive design

## Conditional แบบสั้น

```jsx
{isReady ? <p>พร้อมเริ่ม</p> : <p>กรุณาตรวจเครื่องมือ</p>}
```

หรือแสดงเฉพาะเมื่อเงื่อนไขเป็นจริง:

```jsx
{errorMessage && <p className="error">{errorMessage}</p>}
```

## ทดลองทีละขั้น

เริ่มจาก:

```jsx
function WelcomePanel() {
  const learnerName = 'Nina';
  const completed = 2;
  const total = 7;

  return (
    <section className="panel">
      <h2>สวัสดี {learnerName}</h2>
      <p>
        ผ่านแล้ว {completed} จาก {total} checkpoint
      </p>
      {completed === total ? <strong>สำเร็จ</strong> : <span>ทำต่อได้เลย</span>}
    </section>
  );
}
```

ทำตาม:

1. **Predict:** ถ้า `completed` เปลี่ยนเป็น `7` จะเห็นอะไร
2. **Edit:** เปลี่ยนค่า
3. **Run:** บันทึกและดู browser
4. **Observe:** ตรวจข้อความและ Console
5. **Explain:** ชี้ว่า expression ใดทำให้ UI ต่างกัน

## Mini Challenge

เพิ่มตัวแปร `isOnline` แล้วแสดง “เชื่อมต่อแล้ว” หรือ “กำลังทำงานแบบ local” ด้วย ternary

## Common Errors

| อาการ | สาเหตุที่ควรตรวจ |
|---|---|
| `Adjacent JSX elements...` | มี root มากกว่าหนึ่งตัว |
| `Expected corresponding JSX closing tag` | ปิด tag ไม่ครบหรือสลับลำดับ |
| `class is not a valid DOM property` | ใช้ `class` แทน `className` |
| handler ทำงานทันที | เขียน `handler()` แทน `handler` |
| แสดง `[object Object]` | พยายามแสดง object ทั้งก้อนแทน property |

## Checkpoint

ผ่านเมื่อสามารถแก้ตัวอย่างที่ผิดให้ถูก:

```jsx
function BrokenCard() {
  return (
    <article class="card">
      <label for="title">Title</label>
      <input id="title">
      <button onClick={saveTask()}>Save</button>
    </article>
    <p>Ready</p>
  );
}
```

ต่อไป: [04 — Functional Components](./04_FUNCTIONAL_COMPONENTS_TH.md)
