// loads env file in development
if (process.env.LEVEL === 'development') {
  require('dotenv').config();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from 'cors';
import * as cookieParser from 'cookie-parser';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // CORS configuration
  const dnsWhiteList = ['http://localhost:3000'];
  const corsOptions: CorsOptions = {
    credentials: true,
    exposedHeaders: ['Set-Cookie', 'set-cookie'],
    origin: (origin, callback) => {
      // Skip CORS check in development
      if (process.env.LEVEL !== 'production') return callback(null, true);

      // Perform origin check in production
      if (origin === undefined || dnsWhiteList.includes(origin))
        return callback(null, true);
      return callback(new Error(`Not allowed by CORS ${origin}`));
    },
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();

