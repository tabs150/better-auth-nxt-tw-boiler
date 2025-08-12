"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    const password = String(formData.get("password"));
    if (!password) return toast.error("Please enter your password.");

    const confirmPassword = String(formData.get("confirm-password"));
    if (password !== confirmPassword) {
      return toast.error("Password do not match.");
    }

    await authClient.resetPassword({
      newPassword: password,
      token,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Password reset successfully.");
          router.push("/auth/login");
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-sm w-full space-y-4'>

      <div className='space-y-2'>
        <div className='flex justify-between items-center gap-2'>
          <Label htmlFor='password'>Password</Label>
        </div>

        <Input type='password' id='password' name='password' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <Input type='password' id='confirm-password' name='confirm-password' />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        Reset Password
      </Button>
    </form>
  );
};
