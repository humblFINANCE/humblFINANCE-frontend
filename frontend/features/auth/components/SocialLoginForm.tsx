import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/react'
import { m } from 'framer-motion'
import { useLogin } from '@/features/auth/hooks/use-login'

export function SocialLoginForm() {
  const { handleLoginWithOauth } = useLogin()
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  }

  return (
    <m.form
      animate="visible"
      className="flex flex-col gap-2"
      exit="hidden"
      variants={variants}
      id="social-login-form"
    >
      <div className="flex flex-row gap-3 justify-center">
        <Button
          id="login-with-google"
          fullWidth
          startContent={<Icon icon="flat-color-icons:google" width={24} />}
          variant="flat"
          onClick={handleLoginWithOauth('google')}
        />
        <Button
          id="login-with-github"
          fullWidth
          startContent={
            <Icon className="text-default-500" icon="fe:github" width={24} />
          }
          variant="flat"
          onClick={handleLoginWithOauth('github')}
        />
        <Button
          id="login-with-discord"
          fullWidth
          startContent={
            <Icon
              className="text-default-500"
              icon="ic:baseline-discord"
              width={24}
            />
          }
          variant="flat"
          onClick={handleLoginWithOauth('discord')}
        />
      </div>
      <div className="flex flex-row gap-3 justify-center">
        <Button
          id="login-with-twitter"
          fullWidth
          startContent={
            <Icon className="text-default-500" icon="fe:twitter" width={24} />
          }
          variant="flat"
          onClick={handleLoginWithOauth('twitter')}
        />
        <Button
          id="login-with-linkedin"
          fullWidth
          startContent={
            <Icon className="text-default-500" icon="mdi:linkedin" width={24} />
          }
          variant="flat"
          onClick={handleLoginWithOauth('linkedin_oidc')}
        />
        <Button
          id="login-with-apple"
          isDisabled
          fullWidth
          startContent={
            <Icon
              className="text-default-500"
              icon="ic:baseline-apple"
              width={24}
            />
          }
          variant="flat"
        />
      </div>
    </m.form>
  )
}
