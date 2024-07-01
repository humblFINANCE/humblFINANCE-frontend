'use client'

import { Switch, SwitchProps, useSwitch } from '@nextui-org/react'
import { useIsSSR } from '@react-aria/ssr'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { forwardRef, useImperativeHandle } from 'react'

import { MoonFilledIcon, SunFilledIcon } from '@/components/icons/Icons'

export interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps['classNames']
}

export const ThemeSwitch = forwardRef((props: ThemeSwitchProps, ref) => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const onChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useImperativeHandle(ref, () => ({
    onChange,
  }))

  const {} = useSwitch({
    'isSelected': theme === 'light' || isSSR,
    'aria-label': `Switch to ${theme === 'light' || isSSR ? 'dark' : 'light'} mode`,
    onChange,
  })

  return <Switch onChange={onChange} isSelected={theme === 'light'} />
})

ThemeSwitch.displayName = 'ThemeSwitcher'
