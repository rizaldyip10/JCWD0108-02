import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react';
import { Counter } from '../counter';
import Axios from 'axios';

export const Category = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/categories');
      console.log(response);
      setCategories(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex direction="row" justifyContent="center" flexWrap="wrap">
      {categories?.map((item) => (
        <Box
          key={item.id}
          p={4}
          m={3}
          maxW="180px"
          w="100px"
          bg={"white"}
          boxShadow="md"
          rounded="lg"
          justifyContent="center"
          _hover={{
            boxShadow: 'xl',
            cursor: 'pointer',
          }}
        >
          <Text color={"green"} fontSize="sm" fontWeight="bold" textAlign={"center"}>
            {item.Category}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};
