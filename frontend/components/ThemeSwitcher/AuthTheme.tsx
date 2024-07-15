'use client'
import {motion} from 'framer-motion'
import {useTheme} from 'next-themes'
import {MoonFilledIcon, SunFilledIcon} from '../icons/Icons'
import {cn} from '@/utils/nextui/cn'
import React, {useEffect, useState} from 'react'
import {useUpdateProfile} from "@/features/profile/hooks/use-update-profile";
import {useUser} from "@/features/user/hooks/use-user";
import {toast, ToastContainer} from 'react-toastify';

const AuthTheme = () => {
    const [isMounted, setIsMounted] = useState(false)   // fix hydration error
    const [IsThemeUpdate, setIsThemeUpdate] = useState("")
    const {theme, setTheme} = useTheme()
    const {user} = useUser()
    const {updateProfile} = useUpdateProfile()

    const handleDefaultTheme = async (val: string) => {
        let res: any = await updateProfile(user.id, {default_theme: val});

        if (res?.id) {
            toast.success(`Default Theme Changed to ${res?.default_theme === 'light' ? 'Light' : 'Dark'}`);
            setIsThemeUpdate(res?.default_theme)
            setTheme(res?.default_theme)
        }
    }

    useEffect(() => {
        setIsMounted(true)
    }, [theme, IsThemeUpdate])

    if (!isMounted) return null

    return (
        <motion.div
            animate
            className={cn(
                'flex  p-[5px] rounded-full ease-in duration-500 transition-all w-full',
                {
                    'justify-end': theme === 'dark',
                    'justify-start': theme !== 'dark',
                    'bg-default-200 dark:bg-default-100': true,
                }
            )}
            onClick={() => handleDefaultTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <motion.div
                animate
                className={cn('p-[5px] rounded-full  ', {
                    'bg-primary-100': theme === 'dark',
                    'bg-gray-500': theme !== 'dark',
                })}
            >
                {theme === 'dark' ? (
                    <MoonFilledIcon size={18}/>
                ) : (
                    <SunFilledIcon size={18} className="text-yellow-300"/>
                )}
            </motion.div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === "dark" ? "light" : "dark"}/>
        </motion.div>
    )
}

export default AuthTheme
