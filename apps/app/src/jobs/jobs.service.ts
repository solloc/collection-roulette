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
}