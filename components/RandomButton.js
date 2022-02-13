import { useRouter } from "next/router"

export default function RandomButton(){
    const router = useRouter()
    return (
        <button type="button" onClick={() => router.replace('/post/random')}>
            random
        </button>
    )
}