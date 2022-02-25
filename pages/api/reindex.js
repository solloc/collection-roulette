import * as Post from '../../lib/post';
import fs from 'fs';
import sleep from 'atomic-sleep';
// import { prisma, PrismaClient } from '@prisma/client';
// import crypto from 'crypto'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


// async function addFilesToDb(posts) {

//     // console.dir(posts)

//     prisma = new PrismaClient();
//     await posts.forEach(async post => {

//         let hash = crypto.createHash('sha256');
//         let fileBuffer = fs.readFileSync(post.abs);
//         hash.update(fileBuffer);
//         const digest = hash.digest('hex');

//         const existingFile = await prisma.file.findFirst({
//             where: {
//                 digest: digest
//             }
//         });

//         console.log(existingFile);

//         if (existingFile === null) {
//             await prisma.file.create({
//                 data: {
//                     path: post.abs,
//                     size: Buffer.byteLength(fileBuffer),
//                     added: new Date(),
//                     digest: digest,
//                 }
//             });            
//         }
//     });
// }

export default async function handler(req, res) {

    if (process.env.NODE_ENV == 'development') sleep(3000);

    Post.findPosts();
    // const posts = Post.findPosts();
    // const posts_s = JSON.stringify(posts);

    // if (!fs.existsSync('./.pp')) {
    //     fs.mkdirSync('./.pp');
    // }

    // fs.writeFileSync('./.pp/posts.json', posts_s)
    // fs.writeFileSync('./.pp/postcount.txt', `${posts.length}`);
    
    // // res.redirect('/', 307)
    // await addFilesToDb(posts)



    res.status(200).json({ message: 'reindexed' });
}