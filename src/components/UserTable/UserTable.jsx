import "./UserTable.css";

function UserTable({
    users,
    setEditingUser,
    setIsEditing,
    setShowForm,
    handleDeleteClick,
}){
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>ID ↑ </th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th>DEPARTMENT</th>
                    <th>ACTIONS</th>
                    </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td><span className="department-badge">{user.department}</span></td>
                    <td>
                        <div className="action-buttons">
                            <button className="edit-btn" onClick={() => {
                                setEditingUser(user);
                                setIsEditing(true);
                                setShowForm(true);
                            }} > Edit </button>
                            <button className="delete-btn" onClick={() => {
                                handleDeleteClick(user.id); }} >
                                    Delete </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
    );
}

export default UserTable;