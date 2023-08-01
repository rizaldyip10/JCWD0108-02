import { Box, Center, Flex, Heading, Stack,Text,useColorModeValue} from "@chakra-ui/react";
import { Product } from "../components/landingPage/cardProduct";
import { Category } from "../components/landingPage/cardCategory";
import { CartCard } from "../components/landingPage/cartDetail";

export const Homepage = () => {
  
  return (
    <Center minH="100vh" bg={useColorModeValue("green.50","green.800")}>
      <Flex py={20} zIndex={2} w={"90%"} justifyContent="space-between" direction={{ base: 'column', lg: 'row'}}>
        <Box>
          <Box>
            <Stack mt={10}>
              <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500} color={'green'}>
                Category
              </Heading>
              <Flex justifyContent="center">
                <Category/>
              </Flex>
            </Stack>
          </Box>
          <Box>
            <Stack mt={10}>
              <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500} color={'green'}>
                    Product
              </Heading>
              <Product/>
            </Stack>
          </Box>
        </Box>
        <Flex justifyContent="center" h="100%">
          <CartCard />
        </Flex>
      </Flex>
    </Center>
  );
};
