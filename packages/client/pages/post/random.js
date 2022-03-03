// import { useRouter } from 'next/router';
import * as Post from '../../lib/post'

// export async function getStaticProps() {
//     return {
//         redirect: {
//             destination: '/post/10',
//             permanent: false
//         }
//     }
// }

export async function getServerSideProps(context) {

    const randomPostID = await Post.getRandomPost();

    return {
        redirect: {
            destination: `/post/${randomPostID}`,
            permanent: false
        },
        // revalidate: 1
    }
}

export default function Random() {
    return <></>;
}



// function Random({}) {
//     console.log("ran into random");
//     return <></>;
// }

// Random.getInitialProps = async (ctx) => {
//     // console.log(ctx);

//     // const randomImg = Post.getRandomPost();
//     // console.log(`Next image: ${randomImg.pid}`);

//     const randomPostResponse = await fetch('http://localhost:3000/api/post/random');
//     const randomPost = await randomPostResponse.json();

//     ctx.res.writeHead(307, {
//         Location: `/post/${randomPost.pid}`
//         // Location: `/post/${randomImg.pid}`
//     });
//     ctx.res.end();
//     return {};

// }

// export default Random;