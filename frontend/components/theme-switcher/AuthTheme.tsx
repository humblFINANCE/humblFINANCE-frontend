'use client'

import { motion } from 'framer-motion'
import { MoonFilledIcon, SunFilledIcon } from '@/features/icons'
import { cn } from '@/utils/cn'
import React, { useEffect, useState } from 'react'

const AuthTheme = (props: any) => {
  const [isMounted, setIsMounted] = useState(false) // fix hydration error

  useEffect(() => {
    setIsMounted(true)
  }, [props.theme])

  if (!isMounted) return null

  return (
    <motion.div
      animate
      className={cn(
        'flex  p-[5px] rounded-full ease-in duration-500 transition-all w-full',
        {
          'justify-end': props.theme === 'dark',
          'justify-start': props.theme !== 'dark',
          'bg-default-200 dark:bg-default-100': true,
        }
      )}
      onClick={() =>
        props.handleDefaultTheme(props.theme === 'dark' ? 'light' : 'dark')
      }
      data-test="default-theme"
      data-current-theme={props.theme}
    >
      <motion.div
        animate
        className={cn('p-[5px] rounded-full  ', {
          'bg-primary-100': props.theme === 'dark',
          'bg-gray-500': props.theme !== 'dark',
        })}
      >
        {props.theme === 'dark' ? (
          <MoonFilledIcon size={18} />
        ) : (
          <SunFilledIcon size={18} className="text-yellow-300" />
        )}
      </motion.div>
    </motion.div>
  )
}

export default AuthTheme
