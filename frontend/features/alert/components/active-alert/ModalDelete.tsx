import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import React from 'react'

interface Props {
  onClickDelete: () => void
  onOpenChange: () => void
  isOpen: boolean
}

const ModalDelete: React.FC<Props> = ({
  onClickDelete,
  onOpenChange,
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Alert
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this alert?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" onPress={onClickDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalDelete
