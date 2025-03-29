import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './configs/dotenv.configs';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(envs.MONGO_DB, {
      dbName: 'auth',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
