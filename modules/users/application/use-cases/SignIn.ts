import { AuthService } from "../../infrastructure/auth/AuthService";
import { SignInDTO } from "../dtos/SignInDTO";

export class SignInUseCase {
  constructor(private authService: AuthService) {}

  async execute(data: SignInDTO) {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    return this.authService.signIn(data);
  }
}
