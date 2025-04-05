import { hash } from "bcryptjs";

import { User } from "../../domain/entities/User";
import { SignUpDTO } from "../dtos/SignUpDTO";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: SignUpDTO): Promise<void> {
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 10);
    const user = new User("", name, email, hashedPassword, new Date());

    return this.userRepository.save(user);
  }
}
