import { Box, Button, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";

export const Counter = ({ id, reload, setReload }) => {
    const [quantity, setQuantity] = useState(1);
    const [isBuying, setIsBuying] = useState(false);
    const TOKEN = localStorage.getItem("token")
    const toast = useToast()

    const handleBuyClick = () => {
     setIsBuying(true);
    };

  const handlePlusClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleMinusClick = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
  };

  const handleConfirmClick = async () => {
    try {
      const response = await Axios.post(`http://localhost:8000/api/carts`, {
        ProductId: id,
        totalItems: quantity
      }, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })
      setReload(!reload)
    } catch (error) {
      toast({
        title: "Failed",
        description: "Oops.. There is something wrong",
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: "top"
      })
    }
  };
    return(
        <Box w={"100%"}>
        {isBuying ? (
            <Box align="center">
            <Stack direction="row" alignContent={"center"} >
              <Flex alignItems={"center"} mx={"auto"}>
              <Button
                onClick={handleMinusClick}
                bg="white"
                color="green"
                _hover={{ bg: 'white', color: 'green', boxShadow: 'md' }}
                >
                -
              </Button>
              <Text fontWeight={800} fontSize="sm" color="green" >
                {quantity}
              </Text>
              <Button
                onClick={handlePlusClick}
                bg="white"
                color="green"
                _hover={{ bg: 'white', color: 'green', boxShadow: 'md' }}
                >
                +
              </Button>
            </Flex>
            </Stack>
              <Button
                onClick={quantity === 0 ? setIsBuying(false) : handleConfirmClick}
                alignItems={"center"}
                bg="green"
                color="white"
                _hover={{ bg: 'white', color: 'green', boxShadow: 'md' }}
                >
                Confirm
              </Button>
            </Box>
          ) : (
            <Flex alignContent={"center"}>
              <Button
              bg="green"
              w={"100%"}
              color="white"
              _hover={{ bg: 'white', color: 'green', boxShadow: 'md' }}
              onClick={handleBuyClick}
              >
              Buy
            </Button>
                </Flex>
          )}
          </Box>
) 
}
