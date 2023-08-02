import Axios from "axios"
import QRCode from "react-qr-code";
const { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useToast, Flex, Text } = require("@chakra-ui/react")

export const QrModal = ({ isOpen, onClose, totalPrice, reload, setReload })  => {
    const toast = useToast()
    const TOKEN = localStorage.getItem("token")

    const handleCheckOut = async (totalPrice) => {
        try {
            const response = await Axios.put(`http://localhost:8000/api/carts`, {
                totalPrice
            }, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            toast({
                title: "Success",
                description: "Transaction completed!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
              })
              setReload(!reload)
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed",
                description: "Oops.. There is something wrong",
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: "top"
              })
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Scan QR Code</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <QRCode
                    size={64}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={totalPrice}
                    viewBox={`0 0 64 64`}
                    />
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='green' mr={3} onClick={() => handleCheckOut(totalPrice)}>
                Confirm
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }