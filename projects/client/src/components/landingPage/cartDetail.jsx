import { Box, Divider, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useEffect, useState } from "react";
import { Payment } from "./payment";
import { BsFillTrashFill } from "react-icons/bs";
import Axios from "axios";


export const CartCard = () => {
    const [items, setItems] = useState();
    const [reload, setReload] = useState(true);
    const TOKEN = localStorage.getItem("token")

    const getCart = async () => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/carts`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            console.log(response);
            setItems(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await Axios.delete(`http://localhost:8000/api/carts/${id}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            console.log(response);
            setReload(!reload)
        } catch (error) {
            console.log(error);
        }
    }

    const updateItem = async (id, updatedTotal, updatedPrice) => {
        try {
            const response = await Axios.patch(`http://localhost:8000/api/carts/${id}`, {
                totalItems: updatedTotal,
                totalPrice: updatedPrice
            }, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
      };

    const calculateItemPrice = () => {
        if (items) {
            const price = items.map(item => item.Product.productPrice * item.totalItems, 0)
            return price
        }
        return 0
    }

    const price = calculateItemPrice()
    
    const increaseQuantity = (itemId) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, totalItems: item.totalItems + 1 } : item
          )
        );
        const item = items.find((item) => item.id === itemId);
        if (item) {
            updateItem(itemId, item.totalItems + 1, price);
        }
      };
    
    const decreaseQuantity = (itemId) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId
              ? { ...item, totalItems: item.totalItems - 1 }
              : item
          )
        );
        const item = items.find((item) => item.id === itemId);
        if (item) {
            updateItem(itemId, item.totalItems - 1, price);
        }
      };
    
    const calculateTotalPrice = () => {
        if (items) {
        const totalPrice = items?.reduce(
            (total, item) => total + item.Product.productPrice * item.totalItems, 0);
            return totalPrice;
        }
        return 0;
    };
    const totalPrice = calculateTotalPrice()

    useEffect(() => {
        getCart()
    }, [reload])

    return items?.length > 0 ? (
        <Box bg="white" w="400px" h="100%" p="20px"
        borderRadius="15px" boxShadow="1px 1px 3px black" mt="50px">
            <Heading fontSize="24px">Order Detail</Heading>
                    {items?.map((item, index) => {
                        return (
                            <Flex mt="15px" key={index}>
                                <Image w="100px" h="100px" src={item.Product.productImage} objectFit="cover" />
                                <Box ml="10px">
                                    <Text fontSize="16px" fontWeight="bold">{item.Product.productName}</Text>
                                    <Flex mt="4" alignItems="center">
                                        <IconButton
                                        icon={<AiOutlineMinus />}
                                        onClick={() => decreaseQuantity(item.id)}
                                        borderRadius="50%"
                                        size="sm"
                                        />
                                        <Text display="inline-block" mx={2}>
                                        {item.totalItems}
                                        </Text>
                                        <IconButton
                                        icon={<AiOutlinePlus />}
                                        onClick={() => increaseQuantity(item.id)}
                                        borderRadius="50%"
                                        size="sm"
                                        />
                                        <Text ml="10px" fontWeight="bold">
                                            {formatIDR(item.Product.productPrice * item.totalItems)}
                                        </Text>
                                        <IconButton
                                        icon={<BsFillTrashFill />}
                                        onClick={() => handleDelete(item.id)}
                                        borderRadius="50%"
                                        size="sm"
                                        ml="10px"
                                        />
                                    </Flex>
                                </Box>
                            </Flex>
                        )
                    })}
            <Divider mt="15px"/>
            <Payment totalPrice={totalPrice} reload={reload} setReload={setReload} />
        </Box>
    ) : (
        <Flex bg="white" w="400px" h="100%" p="20px" justifyContent="center"
        borderRadius="15px" boxShadow="1px 1px 3px black" mt="50px" justify="center"
        align="center" direction="column">
            <Image maxW="200px" src="https://img.freepik.com/free-vector/shopping-cart-realistic_1284-6011.jpg?w=2000"/>
            <Heading fontSize="26px">No item in the chart</Heading>
        </Flex>
    )
}