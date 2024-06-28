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
  const stripe = useStripe()
  const elements = useElements()
  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  )
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardNumberElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
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
                  onSubmit={(e) => e.preventDefault()}
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
                  <Input
                    labelPlacement="outside"
                    className="mt-4"
                    placeholder="Cardholder name"
                  />
                  <fieldset className="mt-4">
                    <legend className="pb-1.5 text-small font-medium">
                      Billing address
                    </legend>
                    <Autocomplete
                      defaultItems={countries}
                      label="Country"
                      labelPlacement="outside"
                      placeholder="Select country"
                      showScrollIndicators={false}
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
                    <Spacer y={2} />
                    <div className="flex gap-2">
                      <Input labelPlacement="outside" placeholder="ZIP Code" />
                      <Input labelPlacement="outside" placeholder="State" />
                    </div>
                  </fieldset>
                  <Spacer y={4} />
                  <Button fullWidth color="secondary" size="lg" type="submit">
                    Pay ${price}
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
