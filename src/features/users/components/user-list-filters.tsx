import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown } from "lucide-react";
import { Shield, UserCheck, Users, CreditCard } from "lucide-react";
import type { UserFilters } from "../types/schema";
import {
  DEPARTMENT_OPTIONS,
  ROLE_OPTIONS,
  STATUS_OPTIONS,
} from "../types/schema";
import { cn } from "@/lib/utils";

interface UserListFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
}

const roleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  superadmin: Shield,
  admin: UserCheck,
  manager: Users,
  cashier: CreditCard,
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:text-green-800",
  inactive: "bg-purple-100 text-purple-800 dark:text-purple-800",
  invited: "bg-blue-100 text-blue-800 dark:text-blue-800",
  suspended: "bg-red-100 text-red-800 dark:text-red-800",
};

/**
 * UserListFilters component provides multi-select filter controls for department, role, and status
 * Features:
 * - Multi-select dropdowns with checkboxes
 * - Visual feedback with badge counts
 * - Clear all filters button
 * - Keyboard accessible (Tab, Enter, Arrow keys)
 * - Mobile responsive (vertical stack on small screens)
 */
export function UserListFilters({
  filters,
  onFiltersChange,
}: UserListFiltersProps) {
  const hasActiveFilters =
    filters.departments.length > 0 ||
    filters.roles.length > 0 ||
    filters.statuses.length > 0;

  const toggleDepartment = (department: string) => {
    const newDepartments = filters.departments.includes(department)
      ? filters.departments.filter((d) => d !== department)
      : [...filters.departments, department];
    onFiltersChange({ ...filters, departments: newDepartments });
  };

  const toggleRole = (role: string) => {
    const newRoles = filters.roles.includes(role)
      ? filters.roles.filter((r) => r !== role)
      : [...filters.roles, role];
    onFiltersChange({ ...filters, roles: newRoles });
  };

  const toggleStatus = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const clearAllFilters = () => {
    onFiltersChange({ departments: [], roles: [], statuses: [] });
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row gap-3 p-4 border-b",
        hasActiveFilters && "bg-muted/30",
      )}
      role="group"
      aria-label="User list filters"
    >
      {/* Department Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-auto justify-between"
            aria-label={`Filter by department${filters.departments.length > 0 ? `, ${filters.departments.length} selected` : ""}`}
          >
            <span className="flex items-center gap-2">
              {filters.departments.length === 0
                ? "All Departments"
                : `Department (${filters.departments.length})`}
            </span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56"
        >
          {DEPARTMENT_OPTIONS.map((dept) => (
            <DropdownMenuCheckboxItem
              key={dept}
              checked={filters.departments.includes(dept)}
              onCheckedChange={() => toggleDepartment(dept)}
            >
              {dept}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Role Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-auto justify-between"
            aria-label={`Filter by role${filters.roles.length > 0 ? `, ${filters.roles.length} selected` : ""}`}
          >
            <span className="flex items-center gap-2">
              {filters.roles.length === 0
                ? "All Roles"
                : `Role (${filters.roles.length})`}
            </span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56"
        >
          {ROLE_OPTIONS.map((role) => {
            const Icon = roleIcons[role];
            return (
              <DropdownMenuCheckboxItem
                key={role}
                checked={filters.roles.includes(role)}
                onCheckedChange={() => toggleRole(role)}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                  <span className="capitalize">{role}</span>
                </div>
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-auto justify-between"
            aria-label={`Filter by status${filters.statuses.length > 0 ? `, ${filters.statuses.length} selected` : ""}`}
          >
            <span className="flex items-center gap-2">
              {filters.statuses.length === 0
                ? "All Statuses"
                : `Status (${filters.statuses.length})`}
            </span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56"
        >
          {STATUS_OPTIONS.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={filters.statuses.includes(status)}
              onCheckedChange={() => toggleStatus(status)}
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn("capitalize h-5 text-xs", statusColors[status])}
                >
                  {status}
                </Badge>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="w-full md:w-auto md:ml-auto"
          aria-label="Clear all filters"
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}

      {/* Screen reader live region for filter changes */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {hasActiveFilters &&
          `Filters applied: ${[
            filters.departments.length > 0 &&
              `${filters.departments.length} department${filters.departments.length > 1 ? "s" : ""}`,
            filters.roles.length > 0 &&
              `${filters.roles.length} role${filters.roles.length > 1 ? "s" : ""}`,
            filters.statuses.length > 0 &&
              `${filters.statuses.length} status${filters.statuses.length > 1 ? "es" : ""}`,
          ]
            .filter(Boolean)
            .join(", ")}`}
      </div>
    </div>
  );
}
