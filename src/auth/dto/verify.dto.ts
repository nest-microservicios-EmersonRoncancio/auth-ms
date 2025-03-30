import { IsEmail, IsString } from 'class-validator';

export class VerifyDto {
  @IsString()
  token: string;
}

export class UserDto {
  @IsString()
  id: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  user: string;

  @IsString()
  password: string;
}
