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

  await app.register(helmet);
  app.setGlobalPrefix('api/v1');

  await app.listen(env.API_PORT, env.API_HOST);
}

void bootstrap();
