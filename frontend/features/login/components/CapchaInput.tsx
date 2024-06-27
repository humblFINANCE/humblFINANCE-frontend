import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useCallback, useRef } from 'react'

type CaptchaInputProps = {
  formRef: React.MutableRefObject<HTMLFormElement | null>
  captchaInputRef: React.MutableRefObject<HTMLInputElement | null>
}

export function CaptchaInput(props: CaptchaInputProps) {
  const { formRef, captchaInputRef } = props
  const captchaRef = useRef<HCaptcha | undefined>()
  const onVerify = useCallback(
    (token: string) => {
      if (formRef.current && captchaRef.current && captchaInputRef.current) {
        captchaInputRef.current.value = token
        formRef.current?.requestSubmit()
        captchaRef.current?.resetCaptcha()
      }
    },
    [captchaInputRef, formRef, captchaRef]
  )

  return (
    <HCaptcha
      ref={captchaRef as any}
      onVerify={onVerify}
      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
      theme={'dark'}
    />
  )
}
