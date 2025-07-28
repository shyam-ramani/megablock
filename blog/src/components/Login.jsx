import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        {/* Logo */}
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 pl-1">{errors.email.message}</p>
          )}

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500 pl-1">{errors.password.message}</p>
          )}

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
