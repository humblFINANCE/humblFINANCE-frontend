import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import React from 'react'
import { EvervaultCard } from './CustomCard'

interface IProps {
  isOpen: boolean
  onOpenChange: () => void
}

const AskAuthModal: React.FC<IProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="">{(onClose) => <EvervaultCard />}</ModalContent>
    </Modal>
  )
}

export default AskAuthModal
