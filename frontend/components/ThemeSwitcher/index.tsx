'use client'
import {motion} from 'framer-motion'
import {useTheme} from 'next-themes'
import {MoonFilledIcon, SunFilledIcon} from '../icons/Icons'
import {cn} from '@/utils/nextui/cn'
import {useEffect, useState} from 'react'

const ThemeSwitcher = () => {
    const [isMounted, setIsMounted] = useState(false)   // fix hydration error
    const {theme, setTheme} = useTheme()
    useEffect(() => {
        setIsMounted(true)
    }, [])

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
            // onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
        </motion.div>
    )
}

export default ThemeSwitcher
