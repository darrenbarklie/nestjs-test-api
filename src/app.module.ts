import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';

console.log(`ENV: process.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    // Must be declared first
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      load: [databaseConfig],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      ...(process.env.NODE_ENV === 'development' && {
        port: Number(process.env.DATABASE_PORT),
      }),
      ...(process.env.NODE_ENV === ('staging' || 'production') && {
        extra: {
          socketPath: process.env.DATABASE_SOCKET,
        },
      }),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      // IMPORTANT: Disable synchronize setting in Production
      synchronize: Boolean(process.env.DATABASE_PASSWORD),
    }),
    // UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
