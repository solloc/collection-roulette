import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query, Render, Res } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { Response } from 'express';

@Controller('pictures')
export class PicturesController {

    constructor(private readonly picturesService : PicturesService) {}

    @Get()
    findAll(@Query('orderBy') orderBy: string, @Res() response : Response) {

        if (orderBy && orderBy === 'random') {
            const randomId = this.picturesService.getRandomIndex();
            return response.redirect(HttpStatus.FOUND, `/pictures/${randomId}`);
        }

        return response.render(
            'pictures.hbs',
            { 
                randomIndex : this.picturesService.getRandomIndex(),
                count : this.picturesService.getCount() 
            }
        );
    }

    @Get(':id')
    @Render('picture.hbs')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.picturesService.getOne(id);
    }
}
