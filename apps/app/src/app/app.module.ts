import { Module } from '@nestjs/common';
import { PicturesModule } from '../pictures/pictures.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PicturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
