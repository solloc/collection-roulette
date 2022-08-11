import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService, PrismaService],
})
export class PicturesModule {}
