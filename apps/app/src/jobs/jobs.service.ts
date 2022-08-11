import { Injectable, Logger } from '@nestjs/common';
import { PicturesService } from '../pictures/pictures.service';

enum JobStatus {
    created = 'CREATED',
    started = 'STARTED',
    completed = 'COMPLETED'
}

class Job {
    id: number;
    type: string;
    started: Date;
    completed: Date | void;
    status: JobStatus;
}

@Injectable()
export class JobsService {

    private jobs : Job[] = [];
    private readonly logger = new Logger(JobsService.name);

    constructor (private picturesService : PicturesService) {}    

    findAll(): Job[] {
        return this.jobs.sort((job1, job2) => {
            return job2.started.valueOf() - job1.started.valueOf();
        });
    }

    async create(): Promise<Job> {
        // console.log(`Jobs: ${this.jobs.length}`);
        const job : Job = {
            id: this.jobs.length + 1,
            type: 'reindex',
            started: null,
            completed: null,
            status: JobStatus.created
        }
        this.jobs.push(job);

        this.logger.log(`Job ${job.id} in progress`);

        // console.log(`Job ${job.id} in progress`);

        await this.picturesService.reindex();

        await setTimeout(async () => {
            // console.log(`Job ${job.id} completed`);    
            this.logger.log(`Job ${job.id} completed`);
            job.status = JobStatus.completed;
            job.completed = new Date();
        }, 3000);        

        return job;
    }
}
