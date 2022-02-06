import * as Post from '../../../lib/Post'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const randomPost = Post.getRandomPost();
    res.status(200).json(randomPost);
}
  