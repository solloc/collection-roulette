import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { JobsModule } from '../jobs/jobs.module';
import { PicturesModule } from '../pictures/pictures.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PicturesModule, AdminModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
