import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <h2 className="text-2xl font-bold">Home Page</h2>,
});
