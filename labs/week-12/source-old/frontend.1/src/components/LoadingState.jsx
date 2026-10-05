function LoadingState({ message = 'กำลังโหลดข้อมูล…' }) {
  return <div className="state-card" data-testid="loading-state" role="status"><span className="spinner" aria-hidden="true" />{message}</div>;
}

export default LoadingState;
