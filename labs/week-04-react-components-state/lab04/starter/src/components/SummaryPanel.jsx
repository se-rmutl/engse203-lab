const items = [
  ['total', 'ทั้งหมด'],
  ['pending', 'รอดำเนินการ'],
  ['inProgress', 'กำลังดำเนินการ'],
  ['completed', 'เสร็จสิ้น'],
];

function SummaryPanel({ summary }) {
  return (
    <section className="summary-grid" aria-label="สรุปคำร้อง">
      {items.map(([key, label]) => (
        <article className="summary-card" key={key}>
          <span>{label}</span>
          <strong>{summary[key]}</strong>
        </article>
      ))}
    </section>
  );
}

export default SummaryPanel;

