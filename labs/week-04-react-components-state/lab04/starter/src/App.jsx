import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import RequestForm from './components/RequestForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import RequestList from './components/RequestList.jsx';
import { initialRequests } from './data/initialRequests.js';

function App() {
  // TODO LAB4-R04: เปลี่ยน requests/statusFilter เป็น state
  const requests = initialRequests;
  const statusFilter = 'all';

  // TODO LAB4-R04: คำนวณ summary เป็น derived data
  const summary = {
    total: requests.length,
    pending: 0,
    inProgress: 0,
    completed: 0,
  };

  // TODO LAB4-R08: คำนวณ filteredRequests จาก requests + statusFilter
  const filteredRequests = requests;

  function handleAddRequest(requestData) {
    console.log('TODO add request', requestData);
  }

  function handleDeleteRequest(requestId) {
    console.log('TODO delete request', requestId);
  }

  return (
    <>
      <AppHeader
        title="Campus Service Request"
        subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm onAddRequest={handleAddRequest} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar value={statusFilter} onFilterChange={() => {}} />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDeleteRequest}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

