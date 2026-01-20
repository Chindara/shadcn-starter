import type { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Ellipsis,
  Eye,
  Pencil,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { User, UserStatus, UserFilters } from "../types/schema";
import { DataTable } from "@/components/data-table";
import { OPERATION_MODE } from "@/constants/enums";
import { UserService } from "@/services/userService";
import { UserListFilters } from "./user-list-filters";

const callTypes = new Map<UserStatus, string>([
  [
    "active",
    "bg-green-100 text-green-800 dark:text-green-800 border-green-800",
  ],
  [
    "inactive",
    "bg-purple-100 text-purple-800 dark:text-purple-800 border-purple-800",
  ],
  ["invited", "bg-blue-100 text-blue-800 dark:text-blue-800 border-blue-800"],
  ["suspended", "bg-red-100 text-red-800 dark:text-red-800 border-red-800"],
]);

const roles = [
  {
    label: "Superadmin",
    value: "superadmin",
    icon: Shield,
  },
  {
    label: "Admin",
    value: "admin",
    icon: UserCheck,
  },
  {
    label: "Manager",
    value: "manager",
    icon: Users,
  },
  {
    label: "Cashier",
    value: "cashier",
    icon: CreditCard,
  },
] as const;

const UserList = () => {
  const navigate = useNavigate({ from: "/users" });
  const searchParams = useSearch({ from: "/_authenticated/users" });

  // Parse filters from URL search params
  const filters: UserFilters = {
    departments: searchParams.departments?.split(",").filter(Boolean) || [],
    roles: searchParams.roles?.split(",").filter(Boolean) || [],
    statuses: searchParams.statuses?.split(",").filter(Boolean) || [],
  };

  const page = searchParams.page || 1;
  const limit = searchParams.limit || 10;

  const hasActiveFilters =
    filters.departments.length > 0 ||
    filters.roles.length > 0 ||
    filters.statuses.length > 0;

  const handleKebab = (mode: number, recordId: string) => {
    console.log(`Kebab menu opened for record ${recordId} in mode ${mode}`);
  };

  // Handle filter changes - update URL params and reset to page 1
  const handleFiltersChange = (newFilters: UserFilters) => {
    navigate({
      search: {
        ...searchParams,
        departments:
          newFilters.departments.length > 0
            ? newFilters.departments.join(",")
            : undefined,
        roles:
          newFilters.roles.length > 0 ? newFilters.roles.join(",") : undefined,
        statuses:
          newFilters.statuses.length > 0
            ? newFilters.statuses.join(",")
            : undefined,
        page: 1, // Reset to first page when filters change
      },
    });
  };


  const columns: ColumnDef<User>[] = [
    {
      id: "actions",
      enableHiding: false,
      enableSorting: false,
      size: 40,
      cell: ({ row }) => {
        const userItem = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem
                onClick={() => handleKebab(OPERATION_MODE.View, userItem.id!)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleKebab(OPERATION_MODE.Edit, userItem.id!)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      meta: {
        className: cn("sticky md:table-cell start-0 z-10 rounded-tl-[inherit]"),
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }) => {
        const { firstName, lastName } = row.original;
        const fullName = `${firstName} ${lastName}`;
        return <Label className="max-w-36">{fullName}</Label>;
      },
      enableHiding: false,
      enableSorting: true,
    },
    {
      accessorKey: "username",
      header: "Username",
      enableHiding: false,
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
      enableHiding: true,
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;
        const badgeColor = callTypes.get(status);
        return (
          <div className="flex space-x-2">
            <Badge
              variant="outline"
              className={cn("capitalize", badgeColor)}
            >
              {row.getValue("status")}
            </Badge>
          </div>
        );
      },
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const { role } = row.original;
        const userType = roles.find(({ value }) => value === role);

        if (!userType) {
          return null;
        }

        return (
          <div className="flex items-center gap-x-2">
            {userType.icon && (
              <userType.icon
                size={16}
                className="text-muted-foreground"
              />
            )}
            <span className="text-sm capitalize">{row.getValue("role")}</span>
          </div>
        );
      },
      enableHiding: true,
      enableSorting: false,
    },
  ];

  const {
    data: {
      items = [],
      pagination = { hasMore: false, page: 1, limit: 0, totalRecords: 0 },
    } = {},
  } = useQuery({
    queryKey: ["users", { page, limit, ...filters }],
    queryFn: () => UserService.getUsers(page, limit, filters),
    refetchOnWindowFocus: false,
    enabled: true,
  });

  console.log("User list items", items);

  return (
    <div>
      <UserListFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <DataTable
        columns={columns}
        data={items}
        page={page}
        pageSize={limit}
        totalRows={pagination.totalRecords}
        searchParams={searchParams}
        navigate={navigate}
        emptyMessage={
          hasActiveFilters
            ? "No users match your filters. Try clearing filters."
            : "No users found."
        }
      />
    </div>
  );
};

export default UserList;
