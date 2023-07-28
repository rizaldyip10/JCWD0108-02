import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export const Counter = () => {
    const [quantity, setQuantity] = useState(1);
    const [isBuying, setIsBuying] = useState(false);

    const handleBuyClick = () => {
     setIsBuying(true);
    };

  const handlePlusClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleMinusClick = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
  };

  const handleConfirmClick = () => {
    if (quantity === 0) {
        setIsBuying(false)
      setQuantity(1);
    } else {
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
                onClick={handleConfirmClick}
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
