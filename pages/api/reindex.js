import * as Post from '../../lib/post';
import fs from 'fs';
import sleep from 'atomic-sleep';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    if (process.env.NODE_ENV == 'development') sleep(3000);

    const posts = Post.findPosts();
    const posts_s = JSON.stringify(posts);

    if (!fs.existsSync('./.pp')) {
        fs.mkdirSync('./.pp');
    }

    fs.writeFileSync('./.pp/posts.json', posts_s)
    fs.writeFileSync('./.pp/postcount.txt', `${posts.length}`);
    
    // res.redirect('/', 307)
    res.status(200).json({ message: 'reindexed' });
}