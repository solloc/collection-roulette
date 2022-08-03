import { Controller, Get, Render } from '@nestjs/common';

@Controller('jobs')
export class JobsController {

    @Get()
    @Render('jobs.hbs')
    findAll() {
        return;
    }
}
