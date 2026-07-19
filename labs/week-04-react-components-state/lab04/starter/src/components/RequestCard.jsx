function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3>{request.requestType}</h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
      </div>
      <button type="button" onClick={() => onDeleteRequest(request.id)}>ลบ</button>
    </article>
  );
}

export default RequestCard;

