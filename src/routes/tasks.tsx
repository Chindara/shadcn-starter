import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks")({
  component: () => <h2 className="text-2xl font-bold">Tasks Page</h2>,
});
