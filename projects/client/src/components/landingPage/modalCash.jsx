import Axios from "axios"
import { useState } from "react"

const { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useToast, Flex, Text } = require("@chakra-ui/react")

export const CashModal = ({ isOpen, onClose, totalPrice, reload, setReload })  => {
    const toast = useToast()
    const TOKEN = localStorage.getItem("token")

    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
    }

    const [cash, setCash] = useState("");
    const change = (+cash || 0) - +totalPrice;

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
            <ModalHeader>Enter Amount</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter Cash Amount</FormLabel>
                <Input id="cash" placeholder='Cash Amount' 
                onChange={(e) => setCash(e.target.value)}
                value={cash} />
              </FormControl>
                <Flex justifyContent="space-between" mt="20px">
                    <Text fontWeight="bold">Total Price</Text>
                    <Text fontWeight="bold">{formatIDR(totalPrice)}</Text>
                </Flex>
                <Flex justifyContent="space-between" mt="20px">
                    <Text fontWeight="bold">Change</Text>
                    <Text fontWeight="bold">{formatIDR(change)}</Text>
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