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

    private jobs : Job[] = [
        {
            id: 1, 
            type: 'reindex', 
            started: new Date('2022-08-04T01:01:01'), 
            completed: new Date('2022-08-04T02:02:02'),
            status: JobStatus.completed 
        }, 
        {
            id: 2,
            type: 'reindex',
            started: new Date('2022-08-04T03:03:03'),
            completed: null,
            status: JobStatus.started
        }        
    ]

    findAll(): Job[] {
        return this.jobs;
    }

    async create(): Promise<Job> {
        console.log(`Jobs: ${this.jobs.length}`);
        const job : Job = {
            id: Math.floor( Math.random() * 1000 ),
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
