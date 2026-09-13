const filters = [
  ['all', 'ทั้งหมด'],
  ['pending', 'รอดำเนินการ'],
  ['in-progress', 'กำลังดำเนินการ'],
  ['completed', 'เสร็จสิ้น'],
];

function FilterBar({ value, onFilterChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="กรองสถานะคำร้อง">
      {filters.map(([filterValue, label]) => (
        <button
          className={value === filterValue ? 'filter-active' : 'filter-button'}
          key={filterValue}
          type="button"
          onClick={() => onFilterChange(filterValue)}
          aria-pressed={value === filterValue}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
