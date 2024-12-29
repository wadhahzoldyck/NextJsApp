"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useUserStore } from "../../store/useUserStore"; // Import Zustand store
import { useRouter } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { data: session } = useSession(); 
  const setUser = useUserStore((state:any) => state.setUser); 

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        fullName: session.user.fullName,
        token: session.accessToken,
      });
    }
  }, [session, setUser]);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        alert("Login failed: " + result.error);
      } else {
   

        router.push('/hello');       }
    } catch (error: any) {
      console.error("An error occurred:", error.message || error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto my-10 p-5 max-w-lg">
      <div className="bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-2xl font-bold mb-5 text-center">Login to Your Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="form-label font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="form-label font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "border-red-500" : ""}`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
