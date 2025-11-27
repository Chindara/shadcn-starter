import SignUpPage from "@/features/auth/signUp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signUp")({
  component: SignUpPage,
});
