import { Injectable } from '@nestjs/common';
import { glob } from "glob";
import { join } from 'path/posix';
// import { globby } from 'globby';
// import { micromatch } from "micromatch";

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

    protected data : Picture[] = [];

    constructor () {
        this.reindex();
        if (this.data.length === 0) {
            this.data = this.mockData;
        }        
    }

    getAll() : Picture[] {
        return this.data;
    }

    getOne(index : number) : Picture {
        return this.data[index];
    }

    getRandomIndex() : number {
        return Math.floor( Math.random() * this.getCount() );
    }

    getCount() : number {
        return this.data.length;
    }

    async reindex() {

        // glob('apps/app/src/assets/data/**/*', (err, data) => {
        //     const paths = data;
        //     console.log(data);
        // });

        const paths = glob.sync(
            'data/**/*', 
            {
                cwd: 'apps/app/src/assets',
                nodir: true,
            });

        // console.log(paths);

        this.data = paths.map((path) => {
            return { location: join('/', path) };
        })

        // console.log(this.data);

        return;
    }
}
