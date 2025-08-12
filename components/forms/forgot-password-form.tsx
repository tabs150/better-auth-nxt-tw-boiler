"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const ForgotPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.currentTarget as HTMLFormElement);

    const email = formData.get("email") as string;

    if (!email) { 
      toast.error("Email is required");
      setIsPending(false);
      return;
    };

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      setIsPending(false);
      return;
    };

    await authClient.forgetPassword({
      email,
      redirectTo: "/reset-password",
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
          toast.success("Reset link sent to your email!");
          router.push("/forgot-password/success");
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-sm w-full space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' id='email' name='email' />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        Reset Password
      </Button>
    </form>
  );
};
