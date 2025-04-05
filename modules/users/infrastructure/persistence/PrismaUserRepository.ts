import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

import prisma from "@/lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user
      ? new User(user.id, user.name, user.email, user.password, user.createdAt)
      : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user
      ? new User(user.id, user.name, user.email, user.password, user.createdAt)
      : null;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(
      (user) =>
        new User(user.id, user.name, user.email, user.password, user.createdAt),
    );
  }

  async update(user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
