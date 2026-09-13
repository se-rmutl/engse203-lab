function AboutPage() {
  return (
    <section data-testid="page-about">
      <div className="page-heading"><div><p className="eyebrow dark">ABOUT THE LAB</p><h1>เกี่ยวกับระบบ</h1></div></div>
      <article className="panel prose"><p>Campus Service Request เป็นกรณีศึกษาสำหรับเรียนรู้ React Routing, Effect, Service Layer และ client-side persistence</p><h2>สถาปัตยกรรม</h2><p>Page เรียก Service API ส่วน Service จัดการ seed JSON และ Storage module โดย UI ไม่เข้าถึง browser storage โดยตรง</p><h2>ความเป็นส่วนตัว</h2><p>ข้อมูลใน LAB เป็นข้อมูลสาธิต ห้ามบันทึกข้อมูลส่วนบุคคลจริง รหัสผ่าน token หรือ secret</p></article>
    </section>
  );
}

export default AboutPage;
