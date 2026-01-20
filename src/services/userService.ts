import { faker } from "@faker-js/faker";
import type { UserFilters } from "@/features/users/types/schema";

/**
 * Fetches paginated user data with optional filtering
 * @param page - Page number (1-based)
 * @param limit - Number of items per page
 * @param filters - Optional filter criteria (departments, roles, statuses)
 * @returns Paginated user data with filtered results
 * @note Client-side filtering pattern - can be migrated to server-side by moving filter logic to API call
 */
const getUsers = (
  page: number,
  limit: number,
  filters?: Partial<UserFilters>
) => {
  // Generate mock data
  const data = Array.from({ length: 500 }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      id: faker.string.uuid(),
      firstName,
      lastName,
      username: faker.internet
        .username({ firstName, lastName })
        .toLocaleLowerCase(),
      email: faker.internet.email({ firstName }).toLocaleLowerCase(),
      mobile: faker.phone.number({ style: "international" }),
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      linkedIn: faker.internet.url(),
      image: faker.image.avatar(),
      department: faker.helpers.arrayElement([
        "Administration",
        "Sales",
        "Finance",
        "Human Resources",
      ]),
      reportingManager: `${faker.person.firstName()} ${faker.person.lastName()}`,
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "invited",
        "suspended",
      ]),
      role: faker.helpers.arrayElement([
        "superadmin",
        "admin",
        "cashier",
        "manager",
      ]),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
  });

  // Apply filters (AND logic between filter groups, OR logic within each group)
  const filteredData = data.filter((user) => {
    // Filter by departments (OR logic: match any selected department)
    if (filters?.departments && filters.departments.length > 0) {
      if (!filters.departments.includes(user.department)) {
        return false;
      }
    }

    // Filter by roles (OR logic: match any selected role)
    if (filters?.roles && filters.roles.length > 0) {
      if (!filters.roles.includes(user.role)) {
        return false;
      }
    }

    // Filter by statuses (OR logic: match any selected status)
    if (filters?.statuses && filters.statuses.length > 0) {
      if (!filters.statuses.includes(user.status)) {
        return false;
      }
    }

    return true;
  });

  // Apply pagination to filtered results
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filteredData.slice(start, end);

  return {
    items: paginatedData,
    pagination: {
      hasMore: end < filteredData.length,
      page,
      limit,
      totalRecords: filteredData.length, // Total count of filtered results
    },
  };
};

export const UserService = { getUsers };
