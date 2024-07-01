import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export interface IPaymentFormValues {
  cardholderName: string
  country: string
  state: string
}
export const usePaymentValidation = () => {
  const schema = z.object({
    cardholderName: z
      .string()
      .min(1, 'Cardholder name is required')
      .max(100, 'Cardholder name is too long'),

    country: z.string().min(1, 'Country is required'),

    state: z.string().min(1, 'State is required'),
  })

  return useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      cardholderName: '',
      country: '',
      state: '',
    },
  })
}
