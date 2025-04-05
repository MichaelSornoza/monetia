import { NextResponse } from "next/server";

import { SignUpUseCase } from "@/modules/users/application/use-cases/SignUp";
import { PrismaUserRepository } from "@/modules/users/infrastructure/persistence/PrismaUserRepository";

export const POST = async (request: Request) => {
  try {
    const userRepository = new PrismaUserRepository();
    const signUpUseCase = new SignUpUseCase(userRepository);

    const data = await request.json();
    const newUser = await signUpUseCase.execute(data);

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 400 },
    );
  }
};
