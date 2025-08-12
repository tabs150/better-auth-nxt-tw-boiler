"use server";

import { auth } from "@/lib/auth";

export async function  signInEmailAction(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required" };
  const password = formData.get("password") as string;
  if (!password) return { error: "Password is required" };

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      }
    });

    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Internal Server Error" };
  }
  
}