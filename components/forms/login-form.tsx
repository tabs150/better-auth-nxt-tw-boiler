"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInEmailAction } from '@/app/actions/signin-email.action';

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.currentTarget as HTMLFormElement);

    const { error } = await signInEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success('Welcome back!');
      setIsPending(false);
      router.push('/profile');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-sm w-full space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' id='email' name='email' />
      </div>

      <div className='space-y-2'>
        <div className='flex justify-between items-center gap-2'>
          <Label htmlFor='password'>Password</Label>
        </div>

        <Input type='password' id='password' name='password' />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        Login
      </Button>
    </form>
  );
};
