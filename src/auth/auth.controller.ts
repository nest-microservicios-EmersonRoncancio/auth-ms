import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register.user')
  register() {
    return {
      message: 'User registered successfully',
    };
  }

  @MessagePattern('login.user')
  login() {
    return {
      message: 'User logged in successfully',
    };
  }

  @MessagePattern('verify.user')
  verify() {
    return {
      message: 'User verified successfully',
    };
  }
}
