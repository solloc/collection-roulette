import path from 'path';
import globSync from 'glob/sync';
import probe from 'probe-image-size';
import fs from 'fs';
import { prisma, PrismaClient } from '@prisma/client';
import { resolve } from 'path/posix';

export function getPosts() {
    // const post_data = fs.readFileSync('./.pp/posts.json');
    // return JSON.parse(post_data);
}

export async function findPosts() {

    // e.g. data
    const imgfolder = process.env.IMAGE_FOLDER;

    console.log(`imgfolder: ${imgfolder}`);

    // e.g. http://localhost:8080
    const imageBase = process.env.IMAGE_BASE;

    const options = {
        "nodir": true,
        "cwd": path.join(process.cwd(), "./", imgfolder)
    }

    const files = globSync("**/*", options);

    prisma = new PrismaClient();

    await files.forEach(async file => {
        try {
            await prisma.file.create({
                data: {
                    path: file,
                    size: Buffer.byteLength(file),
                    added: new Date(),
                    digest: "0"
                }
            })
        } catch (error) {
            console.log(error)
        }
        // .then(data => {console.log(data)})
        // .catch(err => {console.log(err)})
    });

    console.log(`${files.length} files indexed`)
}

export async function getPost(pid) {

    const prisma = new PrismaClient();
    const file = await prisma.file.findUnique({
        where: {
            id: parseInt(pid)
        }
    });

    // e.g. http://localhost:8080
    const imageBase = process.env.IMAGE_BASE;    

    // e.g. data
    // const imgfolder = process.env.IMAGE_FOLDER;    

    // const publicPath = new URL(filePath, imageBase).href;



    return {
        id: file.id,
        public: new URL(file.path, imageBase).href,
        file: file.path,
    }




    // let posts = getPosts();
    // let post = posts.filter(post => {
    //     return post.pid === pid;
    // })
    // return post[0];


}

export async function getRandomPost() {

    // async () => { return await getRandomPostId() }

    return await getRandomPostId();

    // getRandomPostId().then(result => result);

    // const posts = getPosts();
    // const randomIndex = Math.floor(Math.random() * posts.length);
    // return posts[randomIndex];

}

async function getRandomPostId() {
    prisma = new PrismaClient();
    const fileCount = await prisma.file.count()
    const randomIndex = Math.floor(Math.random() * fileCount);
    const randomFile = await prisma.file.findFirst({
        skip: randomIndex,
        take: 1
    });
    const randomID = randomFile.id;
    return randomID;
}
