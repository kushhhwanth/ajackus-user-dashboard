export function searchUsers(users, searchTerm, filters) {
  return users.filter((user) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);

    const matchesFilters =
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
        .includes(filters.department.toLowerCase());

    return matchesSearch && matchesFilters;
  });
}