const departments = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Finance",
  "Sales",
  "Support",
];

export function getDepartment(id) {
  return departments[id % departments.length];
}