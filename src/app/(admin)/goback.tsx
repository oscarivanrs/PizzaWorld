import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function GoBack() {

    const router = useRouter();

    useEffect(()=>{
            router.push('/index');
    },[]);
}
