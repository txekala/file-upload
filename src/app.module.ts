import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';

@Module({
  imports: [
    MulterModule.register({ dest: './files' }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
})
export class AppModule {}
