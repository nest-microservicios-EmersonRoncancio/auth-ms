import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './configs/dotenv.configs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(envs.PORT);
}
bootstrap()
  .then(() => {})
  .catch((err) => {
    console.error('Error starting the application:', err);
  });
