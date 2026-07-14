import "./FilterModal.css";

function FilterModal({
  filters,
  setFilters,
  setShowFilter,
}) {
  return (
    <div className="modal-overlay">

      <div className="filter-modal">

        <h2>Filters</h2>

        <input
          placeholder="First Name"
          value={filters.firstName}
          onChange={(e) =>
            setFilters({
              ...filters,
              firstName: e.target.value,
            })
          }
        />

        <input
          placeholder="Last Name"
          value={filters.lastName}
          onChange={(e) =>
            setFilters({
              ...filters,
              lastName: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={filters.email}
          onChange={(e) =>
            setFilters({
              ...filters,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Department"
          value={filters.department}
          onChange={(e) =>
            setFilters({
              ...filters,
              department: e.target.value,
            })
          }
        />

        <button
          onClick={() => setShowFilter(false)}
        >
          Apply
        </button>

      </div>

    </div>
  );
}

export default FilterModal;