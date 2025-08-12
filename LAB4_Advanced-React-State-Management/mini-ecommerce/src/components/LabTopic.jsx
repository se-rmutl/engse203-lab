export function LabTopic({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-700">{title}</h2>
      {children}
    </div>
  );
}
