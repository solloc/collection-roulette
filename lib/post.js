import path from 'path';
import globSync from 'glob/sync';
import probe from 'probe-image-size';
import fs from 'fs';

export function getPosts() {
    const post_data = fs.readFileSync('./.pp/posts.json');
    return JSON.parse(post_data);
}

export function findPosts() {

    // console.log("getting all posts");

    // const imgfolder = "data_test";
    const imgfolder = process.env.IMAGE_FOLDER;
    // const basepath = path.join("public",imgfolder);
    // console.log(`basepath: ${basepath}`)
    console.log(`imgfolder: ${imgfolder}`);

    const imageBase = process.env.IMAGE_BASE;

    // const files = fs.readdirSync(basepath);

    const options = {
        "nodir": true,
        "cwd": path.join(process.cwd(), "./", imgfolder)
    }

    const files = globSync("**/*", options);

    // console.log(files);
    // console.log("Files: " + files.length);

    let pid = 0;

    const file_data = files.map(filePath => {
        // console.log(filePath)
        let rObj = {};
        // const publicPath = path.join(imageBase, filePath);
        const publicPath = new URL(filePath, imageBase).href;
        const absolutePath = path.join(imgfolder, filePath);
        // console.log(absolutePath);
        // const dimensions = imageSize(absolutePath);
        const dimensions = probe.sync(absolutePath);
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
