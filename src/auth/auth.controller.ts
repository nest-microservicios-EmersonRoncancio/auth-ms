import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register.user')
  register(@Payload() registeruserdto: RegisterDto) {
    return this.authService.registerUser(registeruserdto);
  }

  @MessagePattern('login.user')
  login(@Payload() loginuserdto: LoginDto) {
    return this.authService.loginUser(loginuserdto);
  }

  @MessagePattern('verify.user')
  verify(@Payload() verifyDto: VerifyDto) {
    return this.authService.verifyUser(verifyDto.token);
  }
}
