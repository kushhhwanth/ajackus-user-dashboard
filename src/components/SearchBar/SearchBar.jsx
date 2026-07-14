import "./SearchBar.css";

function SearchBar() {
    return (
        <div className="search-container">

            <input
                type="text"
                placeholder="Search users..."
            />

            <button>
                Filter
            </button>

        </div>
    );
}

export default SearchBar;