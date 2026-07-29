import 'reflect-metadata';

import helmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './modules/app.module.js';
import { loadEnv } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(process.env);
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: ['/'],
  });

  await app.listen(env.API_PORT, env.API_HOST);
}

void bootstrap();
