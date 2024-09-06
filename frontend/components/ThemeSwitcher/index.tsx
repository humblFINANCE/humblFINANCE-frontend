'use client'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { MoonFilledIcon, SunFilledIcon } from '../../features/icons/Icons'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  // fix hydration error
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    toast.success(
      `Theme Changed to ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`,
      {
        theme: newTheme,
      }
    )
  }

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
      onClick={handleThemeChange}
    >
      <motion.div
        animate
        className={cn('p-[5px] rounded-full  ', {
          'bg-primary-100': theme === 'dark',
          'bg-gray-500': theme !== 'dark',
        })}
      >
        {theme === 'dark' ? (
          <MoonFilledIcon size={18} />
        ) : (
          <SunFilledIcon size={18} className="text-yellow-300" />
        )}
      </motion.div>
    </motion.div>
  )
}

export default ThemeSwitcher
