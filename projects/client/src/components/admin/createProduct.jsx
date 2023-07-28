import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Box,
  Heading,
  Select,
  Center,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import Axios from 'axios';
import { Form } from 'react-router-dom';

export const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [CategoryId, setCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productDescription', productDescription);
    formData.append('CategoryId', CategoryId);
    if (productImage) formData.append('productImage', productImage);

    try {
      const response = await Axios.post('http://localhost:8000/api/products', formData);
      setSuccessMessage(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to add product');
      setSuccessMessage('');
    }
  };

  const getCategories = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Center>
      <Box mt={20}>
        <Heading size="lg">Add Product</Heading>
        <Form onSubmit={handleSubmit} style={{ display: 'flex' }}>
          <Box flex="1" mr={8}>
            <FormControl id="productName" mt={4} isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </FormControl>

            <FormControl id="productPrice" mt={4} isRequired>
              <FormLabel>Product Price</FormLabel>
              <Input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </FormControl>

            <FormControl id="productDescription" mt={4} isRequired>
              <FormLabel>Product Description</FormLabel>
              <Textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            </FormControl>
          </Box>

          {/* Second Column */}
          <Box flex="1">
            <FormControl id="Category" mt={4} isRequired>
              <FormLabel>Category</FormLabel>
              <Select value={CategoryId} onChange={handleChange} placeholder="Select category">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.Category}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="productImage" mt={4} isRequired>
              <FormLabel>Product Image</FormLabel>
              <Input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
            </FormControl>

            <Button colorScheme="teal" mt={4} type="submit">
              Add Product
            </Button>
          </Box>
        </Form>

        {successMessage && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Center>
  );
};
