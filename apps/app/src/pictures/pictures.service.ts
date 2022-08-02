import { Injectable } from '@nestjs/common';

class Picture {
    location: string;
}

@Injectable()
export class PicturesService {

    protected mockData : Picture[] = [
        { location : '/examples/luka-senica-mvKaZllalAQ-unsplash.jpg' },
        { location : '/examples/maksym-tymchyk-KMDGu1blGi8-unsplash.jpg' },
        { location : '/examples/andres-molina-umon_iZ7HIA-unsplash.jpg' }
    ];

    getAll() : Picture[] {
        return this.mockData;
    }

    getOne(index : number) : Picture {
        return this.mockData[index];
    }

    getRandomIndex() : number {
        return Math.floor( Math.random() * this.getCount() );
    }

    getCount() : number {
        return this.mockData.length;
    }
}
