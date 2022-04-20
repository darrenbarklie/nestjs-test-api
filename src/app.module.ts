import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

console.log(`ENV: process.env.${process.env.NODE_ENV}`);

let environmentConfig: object;

if (process.env.NODE_ENV === 'development') {
  environmentConfig = {
    type: 'postgres',
    host: process.env.DEVELOPMENT_DATABASE_HOST, // Proxy
    port: +process.env.DEVELOPMENT_DATABASE_PORT, // Proxy
    database: process.env.DEVELOPMENT_DATABASE_NAME,
    username: process.env.DEVELOPMENT_DATABASE_USER,
    password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
    entities: ['dist/**/*.entity.js'],
    autoLoadEntities: true,
    // IMPORTANT: disable synchronize setting in Production
    synchronize: true,
  };
} else if (process.env.NODE_ENV === 'staging') {
  environmentConfig = {
    type: 'postgres',
    host: process.env.STAGING_DATABASE_HOST,
    extra: {
      socketPath: process.env.STAGING_DATABASE_SOCKET,
    },
    database: 'postgres',
    username: 'postgres',
    password: '109876543210',
    entities: ['dist/**/*.entity.js'],
    autoLoadEntities: true,
    // IMPORTANT: disable synchronize setting in Production
    synchronize: true,
  };
} else {
  // Should error
  environmentConfig = {};
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => environmentConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
