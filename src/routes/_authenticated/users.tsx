import UserListIndex from "@/features/users/user-list-index";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Search parameter schema for URL state persistence
const usersSearchSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().optional().default(10),
  departments: z.string().optional(),
  roles: z.string().optional(),
  statuses: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/users")({
  component: UserListIndex,
  validateSearch: (search) => usersSearchSchema.parse(search),
});
