import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex justify-center gap-8 flex-col items-center">
        <h1 className="text-6xl font-bold">Better Auth Pro</h1>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}