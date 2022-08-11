import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PicturesService } from '../pictures/pictures.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [JobsService, PicturesService, PrismaService],
  controllers: [JobsController],
})
export class JobsModule {}
