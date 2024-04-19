"use client";
import LogoutButton from "@/components/(landing-page)/logout/LogoutButton";
import { Button } from "@nextui-org/button";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";

type LogoutModalProps = {
	isOpen: boolean;
	onOpen?: () => void;
	onOpenChange: (open: boolean) => void; // Add this line
};

export default function LogoutModal({
	isOpen,
	onOpen,
	onOpenChange,
}: LogoutModalProps) {
	// const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			{/* <Button onPress={onOpen}>Open Modal</Button> */}
			<Modal
				backdrop="opaque"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				classNames={{
					backdrop:
						"bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Powering Down...
							</ModalHeader>
							<ModalBody>
								<h1>You are about to log out.</h1>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Close
								</Button>
								<LogoutButton onClose={onClose} />
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
