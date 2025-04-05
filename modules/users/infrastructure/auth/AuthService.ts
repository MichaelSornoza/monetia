import { signIn } from "next-auth/react";

import { SignInDTO } from "../../application/dtos/SignInDTO";
import { SignUpDTO } from "../../application/dtos/SignUpDTO";

export class AuthService {
  async signIn(data: SignInDTO) {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      throw new Error(res.error);
    }

    return res;
  }
  async signUp(data: SignUpDTO) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to sign up");
    }

    return res.json();
  }
}
