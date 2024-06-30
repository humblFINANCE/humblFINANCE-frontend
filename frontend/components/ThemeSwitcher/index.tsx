import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import styles from './style.module.css'
import { MoonFilledIcon, SunFilledIcon } from '../icons/Icons'
import { cn } from '@/utils/nextui/cn'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  // initialize the customClassName according to the
  // state of the "isOn" using ternary operator
  const customClassName = `toggleSwitch ${theme === 'dark' ? 'on' : 'off'}`

  // initialize the src according to the
  // state of the "isOn" using ternary operator
  return (
    <motion.div
      animate
      className={cn(
        'flex w-1/3 p-[5px] rounded-full ease-in duration-500 transition-all',
        {
          'justify-end': theme === 'dark',
          'justify-start': theme !== 'dark',
          'bg-default-200 dark:bg-default-100': true,
        }
      )}
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
          <MoonFilledIcon size={18} />
        ) : (
          <SunFilledIcon size={18} className="text-yellow-300" />
        )}
      </motion.div>
    </motion.div>
  )
}

export default ThemeSwitcher
