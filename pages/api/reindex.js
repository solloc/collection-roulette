import * as Post from '../../lib/post';
import sleep from 'atomic-sleep';

export default async function handler(req, res) {

    if (process.env.NODE_ENV == 'development') sleep(3000);

    await Post.findPosts();

    res.status(200).json({ message: 'reindexed' });
}