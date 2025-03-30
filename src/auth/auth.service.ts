import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { RpcException } from '@nestjs/microservices';
import { compareSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { envs } from 'src/configs/dotenv.configs';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  private readonly logger = new Logger(AuthService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  async registerUser(registeruserdto: RegisterDto) {
    try {
      const validateUser = await this.user.findUnique({
        where: {
          email: registeruserdto.email, // Ensure 'email' is marked as unique in the Prisma schema
        },
      });
      console.log('validateUser', validateUser);

      if (validateUser) {
        throw new RpcException({
          status: 'error',
          message: 'User already exists',
        });
      }

      const user = await this.user.create({
        data: {
          email: registeruserdto.email,
          password: hashSync(registeruserdto.password, 10),
          user: registeruserdto.user,
        },
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new RpcException({
        status: 'error',
        message: 'Failed to register user',
      });
    }
  }

  async loginUser(loginuserdto: LoginDto) {
    const user = await this.user.findUnique({
      where: {
        email: loginuserdto.email,
      },
    });

    if (!user) {
      throw new RpcException({
        status: 'error',
        message: 'User not found',
      });
    }

    if (!compareSync(loginuserdto.password, user.password)) {
      throw new RpcException({
        status: 'error',
        message: 'Invalid password',
      });
    }

    const payload: JwtPayload = {
      email: user.email,
    };

    return {
      user: user,
      message: 'Login successful',
      token: this.jwtService.sign(payload, {
        secret: envs.SECRET_JWT,
      }),
    };
  }

  async verifyUser(token: string) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: envs.SECRET_JWT,
      });

      const user = await this.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        throw new RpcException({
          status: 401,
          message: 'Unauthorized',
        });
      }

      return {
        user: user,
        token: token,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RpcException({
        status: 401,
        message: 'Unauthorized',
      });
    }
  }
}
