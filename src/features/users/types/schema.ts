import { z } from "zod";

const userStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("invited"),
  z.literal("suspended"),
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([
  z.literal("superadmin"),
  z.literal("admin"),
  z.literal("cashier"),
  z.literal("manager"),
]);

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  mobile: z.string(),
  gender: z.enum(["Male", "Female"]),
  linkedIn: z.string().url("Invalid URL").optional(),
  image: z.any().optional(),
  department: z.string().min(1, "Department is required"),
  reportingManager: z.string().min(1, "Reporting Manager is required"),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);

// Filter constants
export const DEPARTMENT_OPTIONS = [
  "Administration",
  "Sales",
  "Finance",
  "Human Resources",
] as const;

export const ROLE_OPTIONS = ["superadmin", "admin", "manager", "cashier"] as const;

export const STATUS_OPTIONS = ["active", "inactive", "invited", "suspended"] as const;

// Filter types
/**
 * User list filter configuration
 * @property departments - Array of department names to filter by (OR logic within group)
 * @property roles - Array of role names to filter by (OR logic within group)
 * @property statuses - Array of status values to filter by (OR logic within group)
 * @note AND logic is applied between filter groups
 */
export interface UserFilters {
  departments: string[];
  roles: string[];
  statuses: string[];
}
