import React, { useState, useEffect } from 'react';
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
import Axios from 'axios';
import { Counter } from '../counter';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export  const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  const getProducts = async (page, limit) => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}`);
      const { result, totalPage: totalPages } = response.data;
      console.log(result);
      setProducts(result);
      setTotalPage(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  return (
    <>
      <Flex direction={{ base: 'column', sm: 'row', md: 'row', lg: 'row' }} justifyContent={'center'} flexWrap={'wrap'} gap={5}>
        {products?.map((item) => (
          <Box
            key={item.id}
            mt={5}
            role={'group'}
            p={4}
            maxW={'200px'}
            w={'full'}
            bg={'white'}
            boxShadow={'2xl'}
            rounded={'lg'}
            justifyContent={'center'}
            transition={'transform .2s'}
            zIndex={1}
            _hover={{
              transform: 'scale(1.05)',
            }}
          >
            <Box rounded={'lg'} height={'140px'} overflow="hidden">
              <Image
                rounded={'lg'}
                height={140}
                width={140}
                mx={'auto'}
                objectFit={'cover'}
                src={`http://localhost:8000/${item?.productImage}`}
                alt={'#'}
                transition="transform 0.2s ease-in-out" 
                 _groupHover={{
                transform: 'scale(1.1)', 
                }}
              />
            </Box>
            <Stack pt={4} align={'center'}>
              <Heading fontSize={'sm'} fontFamily={'body'} fontWeight={500} mt={2}>
                {item.productName}
              </Heading>
              <Heading fontSize={'sm'} fontFamily={'body'} fontWeight={500} color={'green'}>
                {item.productPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
              </Heading>
              <Counter />
            </Stack>
          </Box>
        ))}
      </Flex>

      <Box mt={5} display="flex" justifyContent="center" alignItems="center">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          mr={2}
          size="sm"
          bg={"green"}
        >
        <ArrowBackIcon color={"white"}></ArrowBackIcon>
        </Button>
        <Text fontSize="sm" mr={2}>
          Page {currentPage} of {totalPage}
        </Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage >= totalPage}
          ml={2}
          size="sm"
          bg={"green"}

        >
        <ArrowForwardIcon color={"white"}></ArrowForwardIcon>
        </Button>
      </Box>
    </>
  );
};

