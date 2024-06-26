import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/react'
import { m } from 'framer-motion'
import { useLogin } from '@/features/login/hooks/use-login'

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
    >
      <div className="flex flex-row gap-3 justify-center">
        <Button
          fullWidth
          startContent={<Icon icon="flat-color-icons:google" width={24} />}
          variant="flat"
          onClick={handleLoginWithOauth('google')}
        />
        <Button
          fullWidth
          startContent={
            <Icon className="text-default-500" icon="fe:github" width={24} />
          }
          variant="flat"
          onClick={handleLoginWithOauth('github')}
        />
        <Button
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
          fullWidth
          startContent={
            <Icon className="text-default-500" icon="fe:twitter" width={24} />
          }
          variant="flat"
          onClick={handleLoginWithOauth('twitter')}
        />
        <Button
          fullWidth
          startContent={
            <Icon className="text-default-500" icon="mdi:linkedin" width={24} />
          }
          variant="flat"
        />
        <Button
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
          onClick={handleLoginWithOauth('linkedin_oidc')}
        />
      </div>
    </m.form>
  )
}
