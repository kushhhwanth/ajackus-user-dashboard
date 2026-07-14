import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserTable from "../../components/UserTable/UserTable";
import Pagination from "../../components/Pagination/Pagination";
import FilterModal from "../../components/FilterModal/FilterModal";
import api from "../../services/api";
import { getDepartment } from "../../utils/department";
import "./Dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("id-asc");
  const [showFilter, setShowFilter] = useState(false);
  
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "", });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  async function fetchUsers() {
    try {
      setLoading(true);

      const response = await api.get("/users");

      const formattedUsers = response.data.map((user) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: getDepartment(user.id),
        };
      });

      setUsers(formattedUsers);
    } catch (error) {
      console.error(error);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const loadUsers = async () => {
        await fetchUsers();
    };
    loadUsers();
}, []);

  const filteredUsers = users
  .filter((user) => {
    const search = searchTerm.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  })
  .filter((user) => {
    return (
      user.firstName
        .toLowerCase()
        .includes(filters.firstName.toLowerCase()) &&
      user.lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase()) &&
      user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase()) &&
      user.department
        .toLowerCase()
        .includes(filters.department.toLowerCase())
    );
  })
  .sort((a, b) => {
    switch (sortOption) {
      case "id-asc":
        return a.id - b.id;

      case "id-desc":
        return b.id - a.id;

      case "name-asc":
        return a.firstName.localeCompare(b.firstName);

      case "name-desc":
        return b.firstName.localeCompare(a.firstName);

      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice( (currentPage - 1) * pageSize, currentPage * pageSize );

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Users</h1>

          <button className="add-btn">+ Add User</button>
        </div>

        <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setShowFilter={setShowFilter}
        />

        {loading ? (
          <h2>Loading users...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <UserTable users={paginatedUsers} />
        )}

        <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        />
      </div>

      {showFilter && (
        <FilterModal
        filters={filters}
        setFilters={setFilters}
        setShowFilter={setShowFilter}
        />
        )}
    </>
  );
}

export default Dashboard;