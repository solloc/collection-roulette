import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PicturesService } from '../pictures/pictures.service';

@Module({
  providers: [JobsService, PicturesService],
  controllers: [JobsController],
})
export class JobsModule {}
