'use client'

import type { AvatarProps } from '@nextui-org/avatar'

import React from 'react'
import { Avatar } from '@nextui-org/avatar'

import { cn } from '@/utils/nextui/cn'

const AbbreviatedAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, className, classNames = {}, ...props }, ref) => (
    <Avatar
      {...props}
      ref={ref}
      classNames={{
        ...classNames,
        base: cn(
          'bg-transparent border border-divider',
          classNames?.base,
          className
        ),
        name: cn(
          'text-default-500 text-[0.6rem] font-semibold',
          classNames?.name
        ),
      }}
      getInitials={(name) =>
        (name[0] || '') + (name[name.lastIndexOf(' ') + 1] || '').toUpperCase()
      }
      name={name}
      radius="md"
      size="sm"
    />
  )
)

AbbreviatedAvatar.displayName = 'AbbreviatedAvatar'

export default AbbreviatedAvatar
