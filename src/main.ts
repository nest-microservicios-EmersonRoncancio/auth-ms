import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './configs/dotenv.configs';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.NATS_SERVER,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen();
}
bootstrap()
  .then(() => {})
  .catch((err) => {
    console.error('Error starting the application:', err);
  });
