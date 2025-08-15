"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type LoginFormFields = {
  email: string;
  password: string;
}

export const Login = () => {
  const { 
    register, 
    handleSubmit, 
    setError, 
    formState: { 
      errors, 
      isSubmitting 
    } 
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: "test@email.com",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      throw new Error(); // Simulate an error for demonstration   
      console.log(data);   
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "This email is already registered or invalid.",
      });
    }
  }

  return (
    <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input {...register("email", {
          required: "Email is required",
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })} type="email" id="email" name="email" />
      </div>
      {errors.email && 
        (<div className="text-destructive">
          <span>{errors.email.message}</span>
        </div>)
      }

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })} type="password" id="password" name="password" />
      </div>
      {errors.password &&  
        (<div className="text-destructive">
          <span>{errors.password.message}</span>
        </div>)
      }

      <button disabled={isSubmitting} type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
      {errors.root &&  
        (<div className="text-destructive">
          <span>{errors.root.message}</span>
        </div>)
      }
    </form>
  )
  }