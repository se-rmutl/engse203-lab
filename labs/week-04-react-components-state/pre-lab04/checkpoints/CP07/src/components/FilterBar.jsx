const filters = [
  ['all', 'ทั้งหมด'],
  ['todo', 'ต้องทำ'],
  ['doing', 'กำลังทำ'],
  ['done', 'เสร็จแล้ว'],
];

function FilterBar({ value, onFilterChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="กรองสถานะงาน">
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

