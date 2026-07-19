const summaryItems = [
  ['total', 'ทั้งหมด'],
  ['todo', 'ต้องทำ'],
  ['doing', 'กำลังทำ'],
  ['done', 'เสร็จแล้ว'],
];

function SummaryPanel({ summary }) {
  return (
    <section className="summary-grid" aria-label="สรุปจำนวนงาน">
      {summaryItems.map(([key, label]) => (
        <article className="summary-card" key={key}>
          <span>{label}</span>
          <strong>{summary[key]}</strong>
        </article>
      ))}
    </section>
  );
}

export default SummaryPanel;

