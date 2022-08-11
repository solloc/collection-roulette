import { Injectable } from '@nestjs/common';
import { glob } from "glob";
import { join } from 'path/posix';
import { PrismaService } from '../prisma/prisma.service';
// import { PrismaService } from '../prisma/prisma.service';
// import { globby } from 'globby';
// import { micromatch } from "micromatch";

class Picture {
    location: string;
}

@Injectable()
export class PicturesService {

    // protected mockData : Picture[] = [
    //     { location : '/examples/luka-senica-mvKaZllalAQ-unsplash.jpg' },
    //     { location : '/examples/maksym-tymchyk-KMDGu1blGi8-unsplash.jpg' },
    //     { location : '/examples/andres-molina-umon_iZ7HIA-unsplash.jpg' }
    // ];

    // protected data : Picture[] = [];

    constructor (private prisma : PrismaService) {
        // this.reindex();
        // if (this.data.length === 0) {
        //     this.data = this.mockData;
        // }        
    }

    // getAll() : Picture[] {
    //     return this.data;
    // }

    async getOne(id : number) : Promise<Picture> {
        // return this.data[index]; 

        const picture = new Picture();

        const data = await this.prisma.picture.findUnique({
            where: {
                id: id
            }
        });

        if (data) {
            picture.location = data.location;
        }
        
        return picture;

    }

    async getRandomId() : Promise<number> {
        // return Math.floor( Math.random() * this.getCount() );
        // const pictureCount = await this.prisma.picture.count();
        const pictureCount = await this.getCount();
        const randomIndex = Math.floor( Math.random() * pictureCount );
        const randomPicture = await this.prisma.picture.findFirst({
            skip: randomIndex,
            take: 1
        });
        let randomID = 0;
        if (randomPicture) {
            randomID = randomPicture.id;
        }
        return randomID;
    }

    async getCount() : Promise<number> {
        // return this.data.length;
        const pictureCount = await this.prisma.picture.count();
        return pictureCount;
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

        // this.data = paths.map((path) => {
        //     return { location: join('/', path) };
        // });

        for (const path of paths) {

            const location = join('/', path);

            const alreadyIndexed = await this.prisma.picture.count({
                where: {
                    location: location
                }
            });

            if (alreadyIndexed < 1) {
                await this.prisma.picture.create({
                    data: { 
                        location: location
                    }
                });               
            }

        }

        return;
    }
}
