import path from 'path';
import fs from 'fs';
import imageSize from 'image-size';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default function handler(req, res) {

  // const basepath = "./public/photos";
  const imgfolder = "photos2";
  const basepath = path.join("public",imgfolder);
  // fs.readdirSync(path);
  
  // console.log(fs.readdirSync(path));

  // glob: https://www.npmjs.com/package/glob

  const files = fs.readdirSync(basepath);
//   const randomFile = Math.floor(Math.random() * files.length);
//   const currentFile = files[randomFile];
  // const currentFile = files[2];






  let pid = 0;
  const file_paths = files.map((filePath) => {
    
    let rObj = {};
    const abs = path.join(basepath, filePath);
    const dimensions = imageSize(abs);
    rObj.pid = ++pid
    rObj.abs = abs
    rObj.file = filePath;
    rObj.dimensions = dimensions;
    rObj.public = path.posix.join("/","photos", filePath);
    return rObj;
  });
  // console.log(file_paths);


//   const publicPath = path.posix.join("/",imgfolder, currentFile);
//   const absolutePath = path.join(basepath, currentFile);
//   console.log("Absolut path: " + absolutePath); 
//   const dimensions = imageSize(absolutePath);

//   const img = { 
//     index: randomFile,
//     file: currentFile,
//     public: publicPath,
//     absolute: absolutePath,
//     dimensions: dimensions
//     // address: "/photos/mileena_s_secret_workout__mortal_kombat__by_pactdart_dezd2c2-pre.jpg"
//   }    





    res.status(200).json({ file_paths })
  }
  