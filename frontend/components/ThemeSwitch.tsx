'use client'

import {SwitchProps, useSwitch} from '@nextui-org/switch'
import {useIsSSR} from '@react-aria/ssr'
import {VisuallyHidden} from '@react-aria/visually-hidden'
import clsx from 'clsx'
import {useTheme} from 'next-themes'
import {FC} from 'react'

import {MoonFilledIcon, SunFilledIcon} from '@/components/icons/Icons'
import {useUser} from "@/features/user/hooks/use-user";
import {useUpdateProfile} from "@/features/profile/hooks/use-update-profile";

export interface ThemeSwitchProps {
    className?: string
    classNames?: SwitchProps['classNames']
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
                                                      className,
                                                      classNames,
                                                  }) => {
    const {theme, setTheme} = useTheme()
    const isSSR = useIsSSR()
    const {user} = useUser()
    const {updateProfile} = useUpdateProfile()

    const handleDefaultTheme = async (val: string) => {
        let res: any = await updateProfile(user.id, {default_theme: val});
        setTheme(res?.default_theme)
    }

    const onChange = () => {
        handleDefaultTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps,
    } = useSwitch({
        'isSelected': theme === 'light' || isSSR,
        'aria-label': `Switch to ${theme === 'light' || isSSR ? 'dark' : 'light'} mode`,
        onChange,
    })
    return (
        <Component
            {...getBaseProps({
                className: clsx(
                    'px-px transition-opacity hover:opacity-80 cursor-pointer',
                    className,
                    classNames?.base
                ),
            })}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: clsx(
                        [
                            'w-auto h-auto',
                            'bg-transparent',
                            'rounded-lg',
                            'flex items-center justify-center',
                            'group-data-[selected=true]:bg-transparent',
                            '!text-default-500',
                            'pt-px',
                            'px-0',
                            'mx-0',
                        ],
                        classNames?.wrapper
                    ),
                })}
            >
                {!isSelected || isSSR ? (
                    <SunFilledIcon size={22}/>
                ) : (
                    <MoonFilledIcon size={22}/>
                )}
            </div>
        </Component>
    )
}
