import type { ButtonProps } from '@nextui-org/react'

export enum FrequencyEnum {
  Yearly = 'yearly',
  Monthly = 'monthly',
}

export enum TiersEnum {
  humblPEON = 'humblPEON',
  humblPREMIUM = 'humblPREMIUM',
  humblPOWER = 'humblPOWER',
  humblPERMANENT = 'humblPERMANENT',
}

export type Frequency = {
  key: FrequencyEnum
  label: string
  priceSuffix: string
}

export type Tier = {
  key: TiersEnum
  title: string
  price:
    | {
        [FrequencyEnum.Yearly]: string
        [FrequencyEnum.Monthly]: string
      }
    | string
  priceSuffix?: string
  href: string
  description?: string
  mostPopular?: boolean
  featured?: boolean
  features?: string[]
  buttonText: string
  buttonColor?: ButtonProps['color']
  buttonVariant: ButtonProps['variant']
}
