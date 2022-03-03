import Link from "next/link"
import { useRouter } from "next/router"
import styles from '../styles/RandomButton.module.css'

export default function RandomButton(){
    const router = useRouter()
    return (
        // <button type="button" onClick={() => router.replace('/post/random')}>
        //     random
        // </button>
        <Link href="/post/random">
            <a className={styles.link}>random</a>
        </Link>
    )
}