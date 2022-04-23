import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { accessSecretVersion } from 'src/utils/secretManager.util';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      ...(process.env.NODE_ENV === 'development' && {
        port: Number(process.env.DATABASE_PORT) || 5432,
      }),
      ...(process.env.NODE_ENV === ('staging' || 'production') && {
        extra: {
          socketPath: process.env.DATABASE_SOCKET,
        },
      }),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: () =>
        accessSecretVersion(
          process.env.GCP_PROJECT_ID,
          'nestjs-test-api-database-password',
          'latest',
        ),
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      // IMPORTANT: Disable synchronize setting in Production
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    };
  }
}
