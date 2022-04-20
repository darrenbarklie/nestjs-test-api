import { registerAs } from '@nestjs/config';

// Not currently in use

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT, // Cloud Proxy
  socket: process.env.DATABASE_SOCKET, // Cloud SQL
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  synchronize: process.env.DATABASE_SYNCHRONIZE,
}));
