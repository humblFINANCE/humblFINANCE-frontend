'use client'

import type { SwitchProps } from '@nextui-org/react'

import React from 'react'
import { extendVariants, Switch } from '@nextui-org/react'
import { cn } from '@/utils/cn'

const CustomSwitch = extendVariants(Switch, {
  variants: {
    color: {
      foreground: {
        wrapper: [
          'group-data-[selected=true]:bg-foreground',
          'group-data-[selected=true]:text-background',
        ],
      },
    },
  },
})

export type SwitchCellProps = Omit<SwitchProps, 'color'> & {
  label: string
  description: string
  color?: SwitchProps['color'] | 'foreground'
}

export const SwitchCell = React.forwardRef<HTMLInputElement, SwitchCellProps>(
  ({ label, description, classNames, ...props }, ref) => (
    <CustomSwitch
      ref={ref}
      classNames={{
        ...classNames,
        base: cn(
          'inline-flex bg-content2 flex-row-reverse w-full max-w-full items-center',
          'justify-between cursor-pointer rounded-medium gap-2 p-4',
          classNames?.base
        ),
      }}
      {...props}
    >
      <div className="flex flex-col">
        <p className="text-medium">{label}</p>
        <p className="text-small text-default-500">{description}</p>
      </div>
    </CustomSwitch>
  )
)

SwitchCell.displayName = 'SwitchCell'
