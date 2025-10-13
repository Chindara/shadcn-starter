import { SignupForm } from "@/components/signup-form";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/src/assets/login-background.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex justify-center items-center">
          <div className="text-primary flex size-10 items-center justify-center rounded-md">
            <Sparkles className="size-8" />
          </div>
          <h1 className="text-primary text-2xl font-bold">Shadcn Starter</h1>
        </div>
        <div className="w-full max-w-sm border p-8 rounded-lg">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
