import path from 'path';
import globSync from 'glob/sync';
import probe from 'probe-image-size';

export function getPosts() {

    // console.log("getting all posts");

    const imgfolder = "data_test";
    const basepath = path.join("public",imgfolder);

    // const files = fs.readdirSync(basepath);

    const options = {
        "nodir": true,
        "cwd": path.join(process.cwd(), "public", imgfolder)
    }

    const files = globSync("**/*", options);

    // console.log(files);
    // console.log("Files: " + files.length);

    let pid = 0;

    const file_data = files.map(filePath => {
        // console.log(filePath)
        let rObj = {};
        const publicPath = path.posix.join("/",imgfolder, filePath);
        const absolutePath = path.join(basepath, filePath);
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
