import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello NestJS Test API, with Cloud SQL database connection from local, in ${process.env.NODE_ENV} environment!`;
  }
}
