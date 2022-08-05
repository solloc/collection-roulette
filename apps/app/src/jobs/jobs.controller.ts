import { Controller, Get, HttpStatus, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {

    constructor(private readonly jobsService : JobsService) {};

    @Get()
    @Render('jobs.hbs')
    findAll() {
        const jobs = this.jobsService.findAll();
        console.log(`Jobs in controller: ${jobs.length}`);
        return {
            Jobs: jobs,
        };
    }

    @Post()
    create(@Res() res : Response) {
        const job = this.jobsService.create();
        job.started = new Date();
        // job.status = 
        return res.redirect(HttpStatus.FOUND, '/jobs');
    }
}
