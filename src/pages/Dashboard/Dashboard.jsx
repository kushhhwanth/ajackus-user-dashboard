import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchBar from "../../components/SearchBar/SearchBar";
import Navbar from "../../components/Navbar/Navbar";
import UserTable from "../../components/UserTable/UserTable";
import Pagination from "../../components/Pagination/Pagination";
import FilterModal from "../../components/FilterModal/FilterModal";
import UserForm from "../../components/UserForm/UserForm";
import Loader from "../../components/Loader/Loader";
import { useUsers } from "../../hooks/useUsers";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
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
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function fetchUsers() {
    try {
      setLoading(true);

      const savedUsers = localStorage.getItem("users");
      
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
        return;
      }

      const response = await api.get("/users");

      const formattedUsers = [];

      for (let i = 0; i < 20; i++) { response.data.forEach((user) => { const names = user.name.split(" ");
        
        formattedUsers.push({
            id: i * 10 + user.id,
            firstName: names[0],
            lastName: names.slice(1).join(" "),
            email: `user${i * 10 + user.id}@example.com`,
            department: getDepartment(i * 10 + user.id),});
        });
    }

      setUsers(formattedUsers);

      localStorage.setItem("users", JSON.stringify(formattedUsers));

    } catch (error) {
      console.error(error);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  const handleAddUser = async (data) => {
    const emailExists = users.some(
            (user) => user.email.toLowerCase() === data.email.toLowerCase());
        if (emailExists) {
            toast.error("Email already exists.");
            return;
        }
    const userExists = users.some(
        (user) =>
            user.firstName.toLowerCase() === data.firstName.toLowerCase() && user.lastName.toLowerCase() === data.lastName.toLowerCase());
        if (userExists) {
            toast.warning("User already exists.");
            return;
        }
    try {
        await api.post("/users", data);
        
        const newUser = {
            id: Math.max(...users.map((u) => u.id)) + 1,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            department: data.department,
        };
            
            setUsers((prev) => [newUser, ...prev]);
            toast.success("User added successfully!");
            setSearchTerm("");
            setCurrentPage(1);
            setShowForm(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add user."); }
        };

        const handleEditUser = async (data) => {
            const emailExists = users.some(
                (user) =>
                    user.email.toLowerCase() === data.email.toLowerCase() &&user.id !== editingUser.id);
                if (emailExists) {
                    toast.error("Email already exists.");
                    return;
                }
            try {
                await api.put(`/users/${editingUser.id}`, data);
                setUsers((prev) =>
                    prev.map((user) => user.id === editingUser.id ? { ...user,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        department: data.department,
                    }
                    : user
                )
            );

            toast.success("User updated successfully!");
            
            setShowForm(false);
            setIsEditing(false);
            setEditingUser(null);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update user.");
        }
    };

    const handleDeleteClick = (id) => {
        console.log("Opening dialog for:", id);
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
    try {
      await api.delete(`/users/${deleteId}`);

      setUsers((prev) =>
        prev.filter((user) => user.id !== deleteId)
      );

      toast.success("User deleted successfully!");

      setShowConfirm(false);
      setDeleteId(null);

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const loadUsers = async () => {
        await fetchUsers();
    };
    loadUsers();
}, []);

  useEffect(() => {
  if (users.length > 0) {
    localStorage.setItem("users", JSON.stringify(users));
  }
}, [users]);

  const filteredUsers = useUsers(
    users,
    searchTerm,
    filters,
    sortOption );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedUsers = filteredUsers.slice( (currentPage - 1) * pageSize, safeCurrentPage * pageSize );
  const totalUsers = users.length;
  const totalDepartments = new Set(
  users.map((user) => user.department)).size;
  const searchResults = filteredUsers.length;

  return (
    <>
      

      <div className="dashboard">
        <div className="dashboard-header">
            <div>
                <h1>User Management</h1>
                <p>Manage Users and their details</p>
            </div>
        <button
        className="add-btn"
        onClick={() => setShowForm(true)}> Add User
        </button>
        </div>

        <div className="stats-container">
            <div className="stat-card">
                <h4>Total Users</h4>
                <h2>{totalUsers}</h2>
                </div>
                
        <div className="stat-card">
            <h4>Departments</h4>
            <h2>{totalDepartments}</h2>
        </div>
        
        <div className="stat-card">
            <h4>Search Results</h4>
            <h2>{searchResults}</h2>
        </div>
        
        <div className="stat-card">
            <h4>Current Page</h4>
            <h2>{currentPage}</h2>
        </div>
        
        </div>

        <div className="search-wrapper">
            <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOption={sortOption}
            setSortOption={setSortOption}
            setShowFilter={setShowFilter}
            setCurrentPage={setCurrentPage} />
        </div>

        {loading ? (
            <h2>Loading Users...</h2>
        ) : error ? ( <h2>{error}</h2> ) : filteredUsers.length === 0 ? (
        <div className="empty-state">
            <h2>No users found</h2>
        </div>
        ) : (
        <div className="table-wrapper">
            <UserTable
            users={paginatedUsers}
            setEditingUser={setEditingUser}
            setIsEditing={setIsEditing}
            setShowForm={setShowForm}
            handleDeleteClick={handleDeleteClick} />
        </div>
        )}

        <Pagination
        currentPage={safeCurrentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}/>
      </div>

      {showConfirm && (
        <ConfirmDialog
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={() => {
            setShowConfirm(false);
            setDeleteId(null);}}/>
        )}

      {showForm && (
        <UserForm
        title={isEditing ? "Edit User" : "Add User"}
        defaultValues={editingUser || {}}
        onSubmit={isEditing ? handleEditUser : handleAddUser}
        onClose={() => {
            setShowForm(false);
            setIsEditing(false);
            setEditingUser(null);
        }} />
    )}

      {showFilter && (
        <FilterModal
        filters={filters}
        setFilters={setFilters}
        setShowFilter={setShowFilter}
        />
        )}
    
    <footer className="footer">
        © {new Date().getFullYear()} User Management Dashboard
    </footer>
        
    </>
  );
}

export default Dashboard;