import { Controller, Get, Render } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('main.hbs')
  findAll() {
    // return this.appService.getData();
    return { content: 'main' };
  }
}
