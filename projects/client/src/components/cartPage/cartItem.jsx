import React, { useState } from "react";
import { Box, Grid, GridItem, Image, Text, IconButton, Flex } from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const CartItem = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 109900,
      quantity: 1,
      image: "https://awsimages.detik.net.id/community/media/visual/2019/05/15/21b8a225-ae37-443c-b27d-b2197b36b527.jpeg?w=700&q=90",
    },
    {
      id: 2,
      name: "Product 2",
      price: 154900,
      quantity: 2,
      image: "https://www.cookmeindonesian.com/wp-content/uploads/2020/04/Ayam-Goreng-Kalasan1.jpeg",
    },
    // Add more items here
  ]);

  const formatIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const increaseQuantity = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  return (
    <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(4, 1fr)"]} gap={4} maxW="1200px" mx="auto">
      {items.map((item) => (
        <GridItem key={item.id} alignItems="center" justifyContent="center">
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Flex justify={"center"} align={"center"}>
                
            <Image src={item.image} alt={item.name} maxH="200px" w={"100%"} />
            </Flex>
            <Box p="4">
              <Text fontWeight="bold" fontSize="lg" mb="2" textAlign="center">
                {item.name}
              </Text>
              <Text textAlign="center">{formatIDR(item.price)}</Text>
              <Box mt="4" textAlign="center">
                <IconButton
                  icon={<AiOutlineMinus />}
                  onClick={() => decreaseQuantity(item.id)}
                />
                <Text display="inline-block" mx={2}>
                  {item.quantity}
                </Text>
                <IconButton
                  icon={<AiOutlinePlus />}
                  onClick={() => increaseQuantity(item.id)}
                />
              </Box>
              <Text mt="4" fontWeight="bold" textAlign="center">
                Total Price: {formatIDR(item.price * item.quantity)}
              </Text>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};