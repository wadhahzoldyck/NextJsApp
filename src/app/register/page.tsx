"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const { confirmPassword, ...userData } = data; // Exclude confirmPassword
    try {
      const response = await axios.post("http://127.0.0.1:4000/auth/register", userData);
      alert("Registration successful!");
      console.log(response.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  // Watch password for confirm password validation
  const password = watch("password");

  return (
    <div className="container mx-auto my-10 p-5 max-w-lg">
      <div className="bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-2xl font-bold mb-5 text-center">Create Your Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="form-label font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className={`form-control ${errors.fullName ? "border-red-500" : ""}`}
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="form-label font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`form-control ${errors.confirmPassword ? "border-red-500" : ""}`}
              placeholder="Re-enter your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
