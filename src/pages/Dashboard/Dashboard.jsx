import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserTable from "../../components/UserTable/UserTable";
import Pagination from "../../components/Pagination/Pagination";
import "./Dashboard.css";

function Dashboard() {
  const [users] = useState([]);

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="dashboard-header">
          <h1>Users</h1>

          <button className="add-btn">
            + Add User
          </button>
        </div>

        <SearchBar />

        <UserTable users={users} />

        <Pagination />

      </div>
    </>
  );
}

export default Dashboard;