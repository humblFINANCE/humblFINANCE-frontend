'use server'

import type { Stripe } from 'stripe'

import { headers } from 'next/headers'

import { formatAmountForStripe } from '@/utils/stripe/stripe-helper'
import { stripe } from '@/utils/stripe/stripe-lib'

export async function createCheckoutSession(
  data: FormData
): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = data.get(
    'uiMode'
  ) as Stripe.Checkout.SessionCreateParams.UiMode
  const mode: Stripe.Checkout.SessionCreateParams.Mode =
    data.get('title') === 'humblPERMANENT' ? 'payment' : 'subscription'

  const origin: string = headers().get('origin') as string

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode,
      submit_type: 'pay',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.get('title') as string,
            },
            unit_amount: formatAmountForStripe(
              Number(data.get('price') as string),
              'usd'
            ),
          },
        },
      ],
      ui_mode,
    })

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  }
}

export async function createPaymentIntent(
  data: FormData
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(Number(data.get('price') as string), 'usd'),
      //   automatic_payment_methods: { enabled:  },
      payment_method_types: ['card'],
      currency: 'usd',
    })

  return { client_secret: paymentIntent.client_secret as string }
}
