import { Button, ButtonProps, Spinner } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'
import RenderIf from '@/features/shared/RenderIf'

export interface SubmitButtonProps extends ButtonProps {
  isLoading?: boolean
}

export function SubmitButton({ isLoading, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const loading = isLoading || pending
  return (
    <Button disabled={loading} {...props}>
      <RenderIf condition={loading}>
        <Spinner color="white" />
      </RenderIf>
      <RenderIf condition={!loading}>{props.children}</RenderIf>
    </Button>
  )
}
