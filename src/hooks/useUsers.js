import { useMemo } from "react";
import { searchUsers } from "../utils/searchUsers";
import { sortUsers } from "../utils/sortUsers";

export function useUsers(
  users,
  searchTerm,
  filters,
  sortOption
) {
  return useMemo(() => {
    const searched = searchUsers(
      users,
      searchTerm,
      filters
    );

    return sortUsers(
      searched,
      sortOption
    );
  }, [
    users,
    searchTerm,
    filters,
    sortOption,
  ]);
}