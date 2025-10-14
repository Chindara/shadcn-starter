import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/users")({
  component: () => <h2 className="text-2xl font-bold">Users Page</h2>,
});
