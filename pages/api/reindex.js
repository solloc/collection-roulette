import * as Post from '../../lib/post';
import fs from 'fs';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    // res.status(200).json({ name: 'John Doe' })
    const posts = Post.findPosts();
    const posts_s = JSON.stringify(posts);

    if (!fs.existsSync('./.pp')) {
        fs.mkdirSync('./.pp');
    }

    fs.writeFileSync('./.pp/posts.json', posts_s)
    fs.writeFileSync('./.pp/postcount.txt', `${posts.length}`);
    
    res.redirect('/', 307)
}