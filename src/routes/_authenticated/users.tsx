import UserListIndex from "@/features/users/user-list-index";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/users")({
  component: UserListIndex,
});
