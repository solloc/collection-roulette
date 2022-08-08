import { Injectable } from '@nestjs/common';

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

    findAll(): Job[] {
        return this.jobs.sort((job1, job2) => {
            return job2.started.valueOf() - job1.started.valueOf();
        });
    }

    async create(): Promise<Job> {
        console.log(`Jobs: ${this.jobs.length}`);
        const job : Job = {
            id: this.jobs.length + 1,
            type: 'reindex',
            started: null,
            completed: null,
            status: JobStatus.created
        }
        this.jobs.push(job);

        console.log(`Job ${job.id} in progress`);

        await setTimeout(async () => {
            console.log(`Job ${job.id} completed`);    
            job.status = JobStatus.completed;
            job.completed = new Date();
        }, 3000);        

        return job;
    }
}
