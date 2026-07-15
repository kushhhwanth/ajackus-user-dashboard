import "./FilterModal.css";
import { useEffect } from "react";

function FilterModal({
  filters,
  setFilters,
  setShowFilter,
}) {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setShowFilter(false);
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [setShowFilter]);

  return (
    <div className="modal-overlay" onClick={() => setShowFilter(false)}>

      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
    
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