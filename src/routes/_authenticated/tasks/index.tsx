import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tasks/")({
  component: () => <h2 className="text-2xl font-bold">Tasks Page</h2>,
});
