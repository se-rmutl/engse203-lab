function ErrorState({ message, onRetry }) {
  return (
    <section className="state-card error-state" data-testid="error-state" role="alert">
      <h2>โหลดข้อมูลไม่สำเร็จ</h2>
      <p>{message}</p>
      <button className="button primary" data-testid="retry-button" type="button" onClick={onRetry}>ลองอีกครั้ง</button>
    </section>
  );
}

export default ErrorState;
