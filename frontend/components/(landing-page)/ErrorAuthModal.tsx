'use client'

import { createClient } from '@/utils/supabase/client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  UseDisclosureProps,
  useDisclosure,
} from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getCookie, deleteCookie } from 'cookies-next'

export default function ErrorAuthModal() {
  const { onOpenChange, onClose, isOpen, onOpen } = useDisclosure()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')
  const supabase = createClient()

  const resendEmail = async () => {
    setLoading(true)
    const email = localStorage.getItem('email')
    console.log(email)

    if (!email) {
      setLoading(false)
      return toast.error('Failed to resend email')
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${origin}/auth/callback/confirm`,
      },
    })

    if (error) {
      setError(error.message)
      console.log(error)
    } else {
      setError('')
    }

    setLoading(false)
    toast.success('Email confirmation link has been sent')

    onClose()
  }

  useEffect(() => {
    if (errorParam) {
      setError(errorParam)
      onOpen()
    }
  }, [errorParam, onOpen])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      closeButton
      backdrop="blur"
      aria-labelledby="modal-title"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-danger-400">
              Error
            </ModalHeader>
            <ModalBody>
              <p>
                Looks like your confirmation link has expired. <br /> Please try
                again.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={resendEmail} isLoading={loading}>
                Resend Email Confirmation
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
