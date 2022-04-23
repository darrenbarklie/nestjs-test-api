import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

console.log(`ENV: process.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
      cache: true,
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
