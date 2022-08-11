import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query, Render, Res } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { Response } from 'express';

@Controller('pictures')
export class PicturesController {

    constructor(private readonly picturesService : PicturesService) {}

    @Get()
    async findAll(@Query('orderBy') orderBy: string, @Res() response : Response) {

        const randomId = await this.picturesService.getRandomId();
        const count = await this.picturesService.getCount();

        if (orderBy && orderBy === 'random') {
            // const randomId = this.picturesService.getRandomIndex();            
            return response.redirect(HttpStatus.FOUND, `/pictures/${randomId}`);
        }

        return response.render(
            'pictures.hbs',
            { 
                randomIndex : randomId,
                count : count
            }
        );
    }

    @Get(':id')
    @Render('picture.hbs')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.picturesService.getOne(id);
    }
}
