"use client";

import { Card } from "@heroui/card";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import NextLink from "next/link";
import { Link } from "@heroui/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { SignUpDTO } from "@/modules/users/application/dtos/SignUpDTO";
import { AuthService } from "@/modules/users/infrastructure/auth/AuthService";

const SignUpPage = () => {
  const { control, handleSubmit } = useForm<SignUpDTO>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const authService = new AuthService();
  const onSubmit = async (data: SignUpDTO) => {
    try {
      setIsLoading(true);
      await authService.signUp(data);
      setIsLoading(false);
      router.push("/auth/signin");
    } catch (error) {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.error("Error signing up:", error);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center">
      <Card
        as="form"
        className="w-96 p-4 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Sign Up</h1>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input {...field} required placeholder="Name" type="text" />
          )}
          rules={{
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long",
            },
          }}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input {...field} required placeholder="Email" type="email" />
          )}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input {...field} required placeholder="Password" type="password" />
          )}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
        />
        <div className="flex flex-col gap-1 justify-center items-center">
          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            type="submit"
          >
            Sign Up
          </Button>
          <Link as={NextLink} href="/auth/signin">
            Sign In
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default SignUpPage;
