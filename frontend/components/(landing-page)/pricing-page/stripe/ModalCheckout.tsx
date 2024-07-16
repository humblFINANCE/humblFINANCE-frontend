import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Autocomplete,
  AutocompleteItem,
  Spacer,
  Input,
  Divider,
  Spinner,
} from '@nextui-org/react'
import PaymentForm from './FormCheckout'
import countries from './countries'
import { Icon } from '@iconify/react'
import { Tier } from '../pricing-types'
import {
  CardNumberElement,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js'
import { useTheme } from 'next-themes'
import { StripeError } from '@stripe/stripe-js'
import { createPaymentIntent } from '@/utils/stripe/action'
import { IPaymentFormValues, usePaymentValidation } from '../hooks/validation'
import { Controller, SubmitHandler } from 'react-hook-form'
import { redirect, useRouter } from 'next/navigation'
import { Router } from 'next/router'
import { createClient } from '@/utils/supabase/client'
import { useUser } from '@/features/user/hooks/use-user'

type ModalCheckoutProps = {
  isOpen: boolean
  onOpenChange: () => void
  tier: Tier
  price: number
}

export default function ModalCheckout({
  isOpen,
  onOpenChange,
  tier,
  price,
}: ModalCheckoutProps) {
  const { theme } = useTheme()
  const supabase = createClient()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  )
  const [input, setInput] = React.useState<{
    price: number
    cardholderName: string
  }>({
    price: price,
    cardholderName: '',
  })
  const [paymentType, setPaymentType] = React.useState<string>('')
  const [payment, setPayment] = React.useState<{
    status: 'initial' | 'processing' | 'error' | 'succeeded'
  }>({ status: 'initial' })
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const { control, handleSubmit: handleFormSubmit } = usePaymentValidation()

  const handleSubmit: SubmitHandler<IPaymentFormValues> = async (data) => {
    try {
      if (!elements || !stripe) return
      const cardElement = elements.getElement('card')

      if (!cardElement) return
      const user = await supabase.auth.getUser()
      setPayment({ status: 'processing' })

      const formData = new FormData()
      formData.append('price', price.toString())
      formData.append('cardholderName', data.cardholderName)
      formData.append('title', tier.title)

      const { client_secret: clientSecret } =
        await createPaymentIntent(formData)

      const { error: confirmError } = await stripe!.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              address: {
                country: data.country,
                state: data.state,
              },
            },
          },
        }
      )

      if (confirmError) {
        console.log(confirmError)

        setPayment({ status: 'error' })
        setErrorMessage(confirmError.message ?? 'An unknown error occurred')
      }

      const membership = tier.title.toLowerCase().replace('humbl', '')

      console.log(membership)

      await supabase
        .from('profiles')
        .update({
          membership,
        })
        .eq('id', user?.data.user?.id)
      setPayment({ status: 'succeeded' })
      router.push('/dashboard/home')
    } catch (err) {
      const { message } = err as StripeError

      setPayment({ status: 'error' })
      setErrorMessage(message ?? 'An unknown error occurred')
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="">
                You Will Pay For {tier.title}
              </ModalHeader>
              <ModalBody>
                <form
                  className="px-2 py-4"
                  onSubmit={handleFormSubmit(handleSubmit)}
                >
                  <CardElement
                    key={theme}
                    className="p-3 bg-[#F2F2F3] dark:bg-[#27272A]  dark:border-gray-600 rounded-xl"
                    options={{
                      style: {
                        base: {
                          'fontSize': '16px',
                          'color': theme === 'dark' ? '#fff' : '#000',
                          'fontFamily': 'Roboto, sans-serif',
                          'fontStyle': 'normal',
                          '::placeholder': {
                            fontWeight: 'thin',
                            color: theme === 'dark' ? '#A1A1AA' : '#71717A',
                            fontSize: '14px',
                            iconColor: theme === 'dark' ? '#fff' : '#000',
                          },
                        },
                        invalid: {
                          color: 'red',
                        },
                      },
                    }}
                  />
                  <Controller
                    control={control}
                    name="cardholderName"
                    render={({ field, fieldState }) => (
                      <Input
                        labelPlacement="outside"
                        className="mt-4"
                        placeholder="Cardholder name"
                        {...field}
                        isInvalid={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                  <fieldset className="mt-4">
                    <legend className="pb-1.5 text-small font-medium">
                      Billing address
                    </legend>
                    <Controller
                      control={control}
                      name="country"
                      render={({ field, fieldState }) => (
                        <Autocomplete
                          defaultItems={countries}
                          labelPlacement="outside"
                          placeholder="Select country"
                          showScrollIndicators={false}
                          {...field}
                          selectedKey={field.value}
                          onSelectionChange={field.onChange}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                        >
                          {(item) => (
                            <AutocompleteItem
                              key={item.code}
                              startContent={
                                <Avatar
                                  alt="Country Flag"
                                  className="h-6 w-6"
                                  src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                                />
                              }
                              value={item.code}
                            >
                              {item.name}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      )}
                    />
                    <Spacer y={2} />
                    <div className="flex gap-2">
                      <Controller
                        control={control}
                        name="state"
                        render={({ field, fieldState }) => (
                          <Input
                            labelPlacement="outside"
                            placeholder="State"
                            {...field}
                            isInvalid={!!fieldState.error}
                            errorMessage={fieldState.error?.message}
                          />
                        )}
                      />
                    </div>
                  </fieldset>
                  <Spacer y={4} />
                  <Button
                    fullWidth
                    color="secondary"
                    size="lg"
                    type="submit"
                    isDisabled={
                      payment.status === 'processing' ||
                      payment.status === 'succeeded'
                    }
                  >
                    {payment.status === 'processing' ? (
                      <Spinner color="default" />
                    ) : payment.status === 'succeeded' ? (
                      'Purchased'
                    ) : (
                      `Pay $${price}`
                    )}
                  </Button>
                  {orDivider}

                  <Button fullWidth isDisabled>
                    <Icon
                      className="dark:text-white text-dark-300 "
                      icon="ic:sharp-apple"
                      fontSize={'40px'}
                    />
                    Pay with Apple
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter className="items-center justify-center gap-1 pb-5">
                <Icon
                  className="text-default-300"
                  icon="solar:shield-check-bold"
                  width={20}
                />
                <p className="text-small text-default-300">
                  Payments are secure and encrypted.
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

const cardElementOptions = {
  style: {
    base: {
      'color': '#fff',
      'fontWeight': '500',
      'fontFamily': 'Roboto, Open Sans, Segoe UI, sans-serif',
      'fontSize': '16px',
      '::placeholder': {
        color: '#fff',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  },
}
