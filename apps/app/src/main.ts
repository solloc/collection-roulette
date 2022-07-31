/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const globalPrefix = '';
  // app.setGlobalPrefix(globalPrefix);

  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, 'assets'))
  app.setBaseViewsDir(join(__dirname, 'assets', 'views'));
  hbs.registerPartials(join(__dirname, 'assets', 'views', 'partials'));  

  const port = process.env.PORT || 3333;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`
  );
}

bootstrap();
