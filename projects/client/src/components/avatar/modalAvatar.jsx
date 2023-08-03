import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeProfilePicture } from "../imgProfle";
export function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text onClick={onOpen}>Profile Picture</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChangeProfilePicture />
          </ModalBody>
          
        </ModalContent>
      </Modal>
    </>
  );
}
