import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() BodyUser: RegisterAuthDto) {
    return this.authService.register(BodyUser);
  }

  @Post('login')
  login(@Body() BodyUser: LoginAuthDto) {
    return this.authService.login(BodyUser);
  }
}
