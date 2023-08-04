import React, { useState, useEffect } from 'react';
import { Box, Button, Center, Heading, Text, Stack, Image, Flex, HStack, SimpleGrid, Select } from '@chakra-ui/react';
import Axios from 'axios';
import { DeactivateProduct } from './deactivateProduct';
import { EditIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EditModal } from './editModal';
import { PaginationControls } from '../pagination';
import { AddProductButton } from './addProductButton';
import { AddCategoryButton } from './addCategoryButton';
import { DashboardCategory } from './dashboardCategory';
import { Searchbar } from '../landingPage/searchbar';

export const DashboardProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('catId');
  
  const getSortOptionFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('sort') || 'productName'; 
  };
  const [sortOption, setSortOption] = useState(getSortOptionFromURL());
  const getProducts = async (page, limit, category,sortField) => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}&=${id}&catId=${category}&sortField=${sortField}`);
      const { result, totalPage: totalPages } = response.data;
      setProducts(result);
      setTotalPage(totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/categories');
      setCategories(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryClick = (category) => {
    queryParams.set('catId', category);
    navigate(`/admin/product?${queryParams.toString()}`);
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage && newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };


  const getCurrentPageFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(searchParams.get('page'), 10) || 1;
    return currentPage;
  };
  const [currentPage, setCurrentPage] = useState(getCurrentPageFromURL());

  const handleProductEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleProductSave = (updatedProduct) => {
    const updatedProducts = products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
    setIsModalOpen(false);
  };
  useEffect(() => {
    getProducts(currentPage, itemsPerPage, selectedCategory,sortOption);
    getCategories();
  }, [currentPage, itemsPerPage, selectedCategory,sortOption]);
  return (
    <Center bg={'green.50'}>
      <Box w={'90%'} py={10}>
        <Text size={'2xl'}>Category</Text>
        <AddCategoryButton />
        <DashboardCategory selectedCategory={selectedCategory} onSelectCategory={handleCategoryClick} />
        <Text size={'2xl'}>Product</Text>
        <AddProductButton />
        <Select
            value={sortOption}
            onChange={(event) => {
              const sortValue = event.target.value;
              setSortOption(sortValue);
              navigate(`/admin/product?sort=${sortValue}`, { replace: true });
            }}
            maxW="350px"
          >
            <option value="productName">Sort by Name (A-Z)</option>
            <option value="productNameDESC">Sort by Name (Z-A)</option>
            <option value="productPrice">Sort by Price (Low to High)</option>
            <option value="productPriceDESC">Sort by Price (High to Low)</option>
          </Select>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={5} mx={'auto'}>
          {products?.map((item) => (
            <Box
              key={item.id}
              mx={'auto'}
              mt={5}
              role={'group'}
              p={4}
              bg={'white'}
              boxShadow={'2xl'}
              rounded={'lg'}
              justifyContent={'center'}
              transition={'transform .2s'}
              zIndex={1}
              _hover={{
                transform: 'scale(1.05)',
                cursor: 'pointer'
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
                <HStack>
                  <Button onClick={() => handleProductEdit(item)} bg={'transparent'} size="sm">
                    <EditIcon color={'green'} />
                  </Button>
                  <DeactivateProduct productId={item?.id} isDeleted={item?.isDeleted} />
                </HStack>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
        <Box mt={5} display="flex" justifyContent="center" alignItems="center">
          <PaginationControls currentPage={currentPage} totalPage={totalPage} handlePageChange={handlePageChange} />
        </Box>
        <EditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedProduct={selectedProduct} onSave={handleProductSave} categories={categories} />
      </Box>
    </Center>
  );
};
