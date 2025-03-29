import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register.user')
  register(@Payload() registeruserdto: RegisterDto) {
    return registeruserdto;
  }

  @MessagePattern('login.user')
  login(@Payload() loginuserdto: LoginDto) {
    return loginuserdto;
  }

  @MessagePattern('verify.user')
  verify() {
    return {
      message: 'User verified successfully',
    };
  }
}
