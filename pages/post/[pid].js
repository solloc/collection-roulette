import Head from "next/head";
import styles from '../../styles/Home.module.css'
import Image from "next/image";
import * as Posts from '../../lib/post';
import Link from "next/link";
import { useRouter } from "next/router";
// import { Router, useRouter } from "next/router";

// export async function getStaticProps({ params }) {
export async function getStaticProps({ params }) {

    // console.log("Context:" + context);

    // const randomImg = Posts.getRandomPost();


    // if (context) {
    //     if (context['params']) {
    //         if(context['params']['pid']) {
            
        
    // if (params.pid === `random`) {
    //     console.log('random');
    //     return {
    //         redirect: {
    //             destination: `/post/${randomImg.pid}`,
    //             permanent: false
    //         },
    //         revalidate: 1
    //     }
    // }
    
    let img = Posts.getPost(params.pid); 
    // let img = Posts.getRandomPost();

    return {
        props: {
            img
        }
    };    
            // }
    //     }
    // }

    // return {
    //     notFound: true
        // redirect: {
        //     destination: '/',
        //     permanent: false
        // }
    // };


}

export default function Post({ img }) {

    // const router = useRouter();
    // router.push(`/post/${img.pid}`);

    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    }


    return (
        <div className={styles.container}>
        <Head>
            <title>PP #{img.pid}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <div style={{padding: "10px", textAlign: "center", height: "90vh", border: 10, borderStyle: 'solid', position: "relative"}}>
            {/* <Image src={img.public} alt="" layout="fill" objectFit='contain'></Image> */}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.public} style={{maxHeight:"100%", maxWidth:"100%"}} alt={img.file}/>
            </div>        
            <div style={{ width: "100%", textAlign: "center"}}>
            {/* <div>#{img.index}</div> */}
            {/* <div>
                <Link href={"/post/" + randomImg.pid}>
                    <a>NEXT</a>            
                </Link>
            </div> */}

            </div>
        </main>
        </div>
    )
}

export async function getStaticPaths() {

    // const posts = Posts.getPosts();
    // const paths = posts.map((post) => ({
    //     params: { pid: `${post.pid}` }
    // }));

    const paths = [];

    // paths.push({
    //     params: { pid: `random` }
    // });

    return {
        paths,
        fallback: 'blocking',
    };
}