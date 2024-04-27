import React, { useCallback, useState } from "react";
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

type ModalProps = {
  isOpen: boolean;
  onOpen?: () => void;
  onOpenChange: (open: boolean) => void
  onSignIn: (type: "magicLink" | "phoneNumber", input: string) => Promise<void>
  type: "magicLink" | "phoneNumber"
};

export default function PasswordLessLoginModal({
  isOpen,
  onOpenChange,
  onSignIn,
  type,
}: ModalProps) {

  const [ value, setValue ] = useState<null | string>()
  const [ result, setResult ] = useState({
    error: '',
    submitted: false,
  })
  const [ isLoading, setLoading ] = useState(false)
  const inputProps = type === 'magicLink' ? ({
    label: "Email",
    placeHolder: "Enter your email"
  }) : ({
    label: "Phone Number",
    placeHolder: "Enter your phone number"
  })


  const handleSignIn = useCallback(async () => {
    setLoading(true)
    try {
      await onSignIn(type, value as string)
      setResult({
        submitted: true,
        error: '',
      })
    } catch (e: any) {
      setResult({
        submitted: true,
        error: e.message,
      })
    }

    setLoading(false)

  }, [onSignIn, type, value])


  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose: () => void) => (
            <form onSubmit={e => e.preventDefault()}> 
              <ModalHeader className="flex flex-col gap-1">Continue with {type === "magicLink" ? "Magic Link" : "Phone"}</ModalHeader>
              <ModalBody>
                <Input
                  name="input"
                  autoFocus
                  variant="bordered"
                  isRequired={true}
                  onChange={(e) => setValue(e.target.value)}
                  value={value as string}
                  {...inputProps}
                />
                {
                  Boolean(result.error) && (
                    <div className="text-red-500">{result.error}</div>
                  )
                }
                {
                  result.submitted && !Boolean(result.error) && (
                    <div className="text-lime-500">Check your {type === 'magicLink' ? 'email' : 'phone'}</div>
                  )
                }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" disabled={isLoading} onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" disabled={isLoading} onClick={handleSignIn} type="submit">
                  { isLoading ? "..." : "Sign in"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

