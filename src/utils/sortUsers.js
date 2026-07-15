export function sortUsers(users, sortOption) {
  return [...users].sort((a, b) => {
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
}