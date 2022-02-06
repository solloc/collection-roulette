import path from 'path';
import fs from 'fs';
import imageSize from 'image-size';

export function getPosts() {

    // console.log("getting all posts");

    const imgfolder = "photos2";
    const basepath = path.join("public",imgfolder);

    // glob: https://www.npmjs.com/package/glob

    const files = fs.readdirSync(basepath);

    let pid = 0;

    const file_data = files.map(filePath => {
        let rObj = {};
        const publicPath = path.posix.join("/",imgfolder, filePath);
        const absolutePath = path.join(basepath, filePath);
        const dimensions = imageSize(absolutePath);
        rObj.pid = `${++pid}`;
        rObj.abs = absolutePath;
        rObj.file = filePath;
        rObj.dimensions = dimensions;
        rObj.public = publicPath;
        return rObj;
    });

    return file_data;
}

export function getPost(pid) {
    let posts = getPosts();
    let post = posts.filter(post => {
        return post.pid === pid;
    })
    return post[0];
}

export function getRandomPost() {
    const posts = getPosts();
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
}
