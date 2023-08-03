import { Box, Center, Flex, Heading, Stack,Text,useColorModeValue} from "@chakra-ui/react";
import { Product } from "../components/landingPage/cardProduct";
import { Category } from "../components/landingPage/cardCategory";
import { CartCard } from "../components/landingPage/cartDetail";

import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const Homepage = ({ searchQuery }) => {
  const [reload, setReload] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const location = useLocation();


  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('catId');

  const handleCategoryClick = (category) => {
    queryParams.set('catId', category);
    navigate(`/?${queryParams.toString()}`);
  };
  useEffect(() => {}, [reload])


  return token ? (
    <Center minH="100vh" bg={"green.50"}>
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
              <Product reload={reload} setReload={setReload}/>
            </Stack>
          </Box>
        </Box>
        <Flex justifyContent="center" h="100%">
          <CartCard reload={reload} setReload={setReload} selectedCategory={selectedCategory} searchQuery={searchQuery}/>
        </Flex>
      </Flex>
    </Center>
  ) : (<Navigate to="/login"/>) ;
};
