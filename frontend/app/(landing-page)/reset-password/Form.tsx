'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RenderIf from '@/components/RenderIf'
import { title } from '@/components/Primitives'
import { Button , Input, InputProps } from '@nextui-org/react'
import { resetPassword } from './action'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'

const schema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match',
  })

const inputClasses: InputProps['classNames'] = {
  inputWrapper:
    'border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20',
}

const buttonClasses = 'bg-foreground/10 dark:bg-foreground/20'
type Inputs = z.infer<typeof schema>

export default function PricingPage() {
  const [isPending, startTransition] = useTransition()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      resetPassword(data)
    })
  })

  return (
    <div>
      <h1 className={title()}>Pricing</h1>
      <div className=" fixed inset-0 flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-background/60 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
          <p className="pb-2 text-xl font-medium">Reset Password</p>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <Input
              type="password"
              classNames={inputClasses}
              label="New Password"
              placeholder="New Password"
              variant="bordered"
              {...register('newPassword', { maxLength: 1 })}
            />
            <RenderIf condition={Boolean(errors.newPassword)}>
              <span className="text-danger-500">
                {' '}
                {errors.newPassword?.message}{' '}
              </span>
            </RenderIf>

            <Input
              type="password"
              classNames={inputClasses}
              label="Confirm New Password"
              placeholder="Confirm New Password"
              variant="bordered"
              {...register('confirmPassword')}
            />
            <RenderIf condition={Boolean(errors.confirmPassword)}>
              <span className="text-danger-500">
                {' '}
                {errors.confirmPassword?.message}{' '}
              </span>
            </RenderIf>
            <Button
              disabled={isPending}
              type="submit"
              className={buttonClasses}
            >
              {isPending ? 'loading ...' : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
