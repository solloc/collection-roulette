import path from 'path';
import globSync from 'glob/sync';
import probe from 'probe-image-size';
import fs from 'fs';
import { prisma, PrismaClient } from '@prisma/client';
import { resolve } from 'path/posix';

export function getPosts() {
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

    for (const file of files) {
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
    }

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

    return {
        id: file.id,
        public: new URL(file.path, imageBase).href,
        file: file.path,
    }

}

export async function getRandomPost() {
    return await getRandomPostId();
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
