import { User } from "../../domain/entities/User";

export interface SignUpDTO extends Omit<User, "id" | "createdAt"> {}
