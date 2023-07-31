import { Box, Divider, Flex, Heading, IconButton, Text, useDisclosure } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";
import { BsCash, BsFillCreditCardFill, BsQrCode } from "react-icons/bs"


export const Payment = ({ data, totalPrice }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const TOKEN = localStorage.getItem("token")
    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
      };
    const handleCheckOut = async (totalPrice) => {
        try {
            const response = await Axios.put(`http://localhost:8000/api/carts`, {
                totalPrice
            }, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box mt="15px">
            <Heading fontSize="24px">Order Summary</Heading>
            <Flex mt="15px" justifyContent="space-between">
                <Text fontWeight="bold">Total Price</Text>
                <Text fontWeight="bold">
                    {formatIDR(totalPrice)}
                </Text>
            </Flex>
            <Divider mt="15px" />
            <Box mt="15px">
                <Heading fontSize="24px">Payment Method</Heading>
                <Flex mt="15px" justifyContent="space-around">
                    <IconButton size="lg" icon={<BsFillCreditCardFill />} onClick={() => handleCheckOut(totalPrice)} />
                    <IconButton size="lg" icon={<BsQrCode />} onClick={() => handleCheckOut(totalPrice)} />
                    <IconButton size="lg" icon={<BsCash />}  />
                </Flex>
            </Box>
        </Box>
    )
}