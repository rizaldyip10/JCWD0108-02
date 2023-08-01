import Axios from "axios"

const { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useToast, Flex, Text } = require("@chakra-ui/react")

export const CardModal = ({ isOpen, onClose, totalPrice, reload, setReload })  => {
    const toast = useToast()
    const TOKEN = localStorage.getItem("token")

    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
    }
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
            <ModalHeader>Enter Card Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name on Card</FormLabel>
                <Input placeholder='Cardholder Name' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Card Number</FormLabel>
                <Input placeholder='Credit/Debit Card Number' />
              </FormControl>
                <Flex justifyContent="space-between" mt="20px">
                    <Text fontWeight="bold">Total Price</Text>
                    <Text fontWeight="bold">{formatIDR(totalPrice)}</Text>
                </Flex>
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