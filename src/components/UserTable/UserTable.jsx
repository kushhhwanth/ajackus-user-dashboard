import "./UserTable.css";

function UserTable({ users }) {
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.department}</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
    );
}

export default UserTable;