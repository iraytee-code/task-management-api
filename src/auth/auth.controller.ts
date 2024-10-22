import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupCredentialsDto } from "./dto/signup-credentials.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
// import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() SignupCredentialsDto: SignupCredentialsDto): Promise<void> {
    return this.authService.signUp(SignupCredentialsDto);
  }

  @Post("/signin")
  signIn(
    @Body() loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginCredentialsDto);
  }
}
