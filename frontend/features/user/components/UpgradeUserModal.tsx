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
  msg?: any
}

export function UpgradeUserModal(props: UpgradeUserModalProps) {
  const { user } = useUser()
  const router = useRouter()
  const loginModalDisclosure = useDisclosure()

  function getExpectedUpgradeRole() {
    if (user.role === 'authenticated' && user.is_anonymous) {
      return 'HumblPEON'
    }

    if (user.role === 'authenticated' && !user.is_anonymous) {
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
      case 'humblPEON/humblPREMIUM':
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
              <span>to access this feature</span>
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
