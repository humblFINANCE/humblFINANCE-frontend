import {
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { UseDisclosureReturn } from '@nextui-org/use-disclosure'
import { useUser } from '@/features/user/hooks/use-user'
import { LoginModal } from '@/features/auth/components/LoginModal'
import { useRouter } from 'next/navigation'

interface UpgradeUserModalProps extends UseDisclosureReturn {
  text?: string
}

const tiers = ['peon', 'premium', 'power', 'permanent', 'admin']
function getNextTier(currentTier: string) {
  console.log(currentTier)

  const currentIndex = tiers.indexOf(currentTier)

  if (currentIndex === -1) {
    throw new Error('Invalid membership tier')
  }

  const nextIndex = currentIndex + 1
  return nextIndex < tiers.length ? tiers[nextIndex] : null
}

export function UpgradeUserModal(props: UpgradeUserModalProps) {
  const { user, profile } = useUser()
  const router = useRouter()
  const loginModalDisclosure = useDisclosure()

  function getExpectedUpgradeRole() {
    if (user.role === 'authenticated' && user.is_anonymous) {
      return 'HumblPEON'
    }

    if (user.role === 'authenticated' && !user.is_anonymous) {
      if (profile?.membership) {
        const nextTier = getNextTier(profile.membership)

        return 'humbl' + nextTier?.toUpperCase()
      }

      // return user.subscription_tier + 1 (one tier higher than they are)
      return 'humblPEON/humblPREMIUM'
    }
  }

  function handleUpgrade() {
    const nextTier = getExpectedUpgradeRole()
    switch (nextTier) {
      case 'HumblPEON':
        loginModalDisclosure.onOpenChange()
        break
      case 'HumblPREMIUM':
        router.push('/pricing')
        break
      default:
        router.push('/pricing')
        break
    }
  }

  return (
    <>
      <LoginModal {...loginModalDisclosure} linkAccount={true} />
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <div>
              <span>Oops... you need to be a</span>
              <span className="font-bold text-primary">
                {' '}
                {getExpectedUpgradeRole()}{' '}
              </span>
              <span>{props.text}</span>
            </div>
          </ModalHeader>
          <ModalBody>
            {"Don't worry, access is as easy as clicking below"}
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose} variant="light" color="danger">
              Go Back
            </Button>
            <Button onClick={handleUpgrade} variant="ghost" color="success">
              Upgrade
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
