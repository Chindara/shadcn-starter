import SignInPage from "@/features/auth/signIn";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signIn")({
  component: SignInPage,
});
