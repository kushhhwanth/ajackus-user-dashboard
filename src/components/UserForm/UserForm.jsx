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

                {
                    users.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="empty"
                            >
                                No users found
                            </td>

                        </tr>

                    ) : null
                }

            </tbody>

        </table>

    );
}

export default UserTable;