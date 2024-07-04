'use client'

import {useUser} from '@/features/user/hooks/use-user'
import {useTheme} from "next-themes";
import {useEffect} from "react";

export default function PrivateTestPage() {
    const {user, profile}: any = useUser()
    const {setTheme} = useTheme()

    useEffect(() => {
        return setTheme(profile?.default_theme);
    }, [profile?.default_theme])

    return (
        <>
            <p>Hello </p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    )
}