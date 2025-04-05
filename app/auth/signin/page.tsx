"use client";

import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useState } from "react";

import { SignInDTO } from "@/modules/users/application/dtos/SignInDTO";
import { AuthService } from "@/modules/users/infrastructure/auth/AuthService";
import { SignInUseCase } from "@/modules/users/application/use-cases/SignIn";

const SignInPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignInDTO>();

  const [isLoading, setIsLoading] = useState(false);

  const authService = new AuthService();
  const signInUseCase = new SignInUseCase(authService);

  const onSubmit = async (data: SignInDTO) => {
    try {
      setIsLoading(true);
      await signInUseCase.execute(data);
      router.push("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.error("Error signing in:", error);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center">
      <Card
        as="form"
        className="w-96 p-4 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Sign In</h1>
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
            Sign In
          </Button>
          <Link as={NextLink} href="/auth/signup">
            Sign Up
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default SignInPage;
