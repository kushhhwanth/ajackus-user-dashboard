import "./SearchBar.css";

function SearchBar({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  setShowFilter,
}) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="id-asc">ID ↑</option>
        <option value="id-desc">ID ↓</option>
        <option value="name-asc">A - Z</option>
        <option value="name-desc">Z - A</option>
        </select>

      <button onClick={() => setShowFilter(true)}>Filter</button>
    </div>
  );
}

export default SearchBar;