import { Controller, Get, Render } from '@nestjs/common';

@Controller('pictures')
export class PicturesController {
    @Get()
    @Render('pictures.hbs')
    findAll() {
        return { content: 'pictures' };
    }
}
