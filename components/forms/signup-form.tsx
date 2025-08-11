"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    if (!name) {
      toast.error("Name is required");
      setIsPending(false);
      return;
    }
    const email = formData.get("email") as string;
    if (!email) {
      toast.error("Email is required");
      setIsPending(false);
      return;
    }
    const password = formData.get("password") as string;
    if (!password) {
      toast.error("Password is required");
      setIsPending(false);
      return;
    }
    const confirmPassword = formData.get("confirm-password") as string;
    if (!confirmPassword) {
      toast.error("Please confirm your password");
      setIsPending(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsPending(false);
      return;
    }
    
    await signUp.email({
      name,
      email,
      password,
    },
    {
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
        toast.success("Registration successful");
        setIsPending(false);
        router.push("/profile");                                                                                                                                                                                      
      },
    }); 
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input type="password" id="confirm-password" name="confirm-password" />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        Register
      </Button>
    </form>
  );
};
