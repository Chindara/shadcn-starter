import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => <h2 className="text-2xl font-bold">About Page</h2>,
});
