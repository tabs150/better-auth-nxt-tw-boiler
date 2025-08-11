import { LoginForm } from "@/components/forms/login-form";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex justify-center gap-8 flex-col items-center">
        <h1 className="text-6xl font-bold">Better Auth Pro</h1>

        <LoginForm />
      </div>
    </div>
  );
}