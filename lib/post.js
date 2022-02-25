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

export function findPosts() {

    // console.log("getting all posts");
    // const imgfolder = "data_test";

    // e.g. data
    const imgfolder = process.env.IMAGE_FOLDER;
    // const basepath = path.join("public",imgfolder);

    // console.log(`basepath: ${basepath}`)
    console.log(`imgfolder: ${imgfolder}`);

    // e.g. http://localhost:8080
    const imageBase = process.env.IMAGE_BASE;

    // const files = fs.readdirSync(basepath);

    const options = {
        "nodir": true,
        "cwd": path.join(process.cwd(), "./", imgfolder)
    }

    const files = globSync("**/*", options);

    // console.log(files);
    // console.log("Files: " + files.length);

    // let pid = 0;

    // const file_data = files.map(filePath => {
    //     // console.log(filePath)
    //     let rObj = {};
    //     // const publicPath = path.join(imageBase, filePath);
    //     const publicPath = new URL(filePath, imageBase).href;
    //     const absolutePath = path.join(imgfolder, filePath);
    //     // console.log(absolutePath);
    //     // const dimensions = imageSize(absolutePath);
    //     const dimensions = probe.sync(absolutePath);
    //     rObj.pid = `${++pid}`;
    //     rObj.abs = absolutePath;
    //     rObj.file = filePath;
    //     rObj.dimensions = dimensions;
    //     rObj.public = publicPath;
    //     return rObj;
    // });

    prisma = new PrismaClient();

    files.forEach(file => {
        prisma.file.create({
            data: {
                path: file,
                size: Buffer.byteLength(file),
                added: new Date(),
                digest: "0"
            }
        })
        // .then(data => {console.log(data)})
        .catch(err => {console.log(err)})

    });

    // await posts.forEach(async post => {

    //     let hash = crypto.createHash('sha256');
    //     let fileBuffer = fs.readFileSync(post.abs);
    //     hash.update(fileBuffer);
    //     const digest = hash.digest('hex');

    //     const existingFile = await prisma.file.findFirst({
    //         where: {
    //             digest: digest
    //         }
    //     });

    //     console.log(existingFile);

    //     if (existingFile === null) {
    //         await prisma.file.create({
    //             data: {
    //                 path: post.abs,
    //                 size: Buffer.byteLength(fileBuffer),
    //                 added: new Date(),
    //                 digest: digest,
    //             }
    //         });            
    //     }
    // });

    // return file_data;
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
