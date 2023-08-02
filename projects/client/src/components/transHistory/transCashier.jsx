import { Box, Button, Flex, Input, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";
import { DetailModal } from "./modalDetail";


export const CashierTrans = () => {
    const [order, setOrder] = useState()
    const [selectedOrder, setSelectedOrder] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getOrder = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/api/reports")
            setOrder(response.data.result)
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

    useEffect(() => {
        getOrder()
    },[])

    const openModal = (value) => {
        setSelectedOrder(value);
        onOpen();
      };
    return (
        <Box p={10} bg="white">
            <Flex justifyContent="space-between">
                <Input maxW="300px" />
                <Flex>
                    <Select maxW="100px" mr={{ base: "5px", lg: "20px"}} />
                    <Select maxW="100px" />
                </Flex>
            </Flex>
            <TableContainer mt="20px">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>Date</Th>
                            <Th>Ammount</Th>
                            <Th>Cashier</Th>
                            <Th>Detail</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {order?.map((v, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>{`#${v.id}`}</Td>
                                    <Td>
                                        {new Date(`${v.createdAt}`).toLocaleDateString("en-us", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"})}
                                    </Td>
                                    <Td>{formatIDR(v.amount)}</Td>
                                    <Td>{`${v.Cashier.firstName} ${v.Cashier.lastName}`}</Td>
                                    <Td>
                                        <Button onClick={() => openModal(v)}>Detail</Button>
                                        {selectedOrder && ( <DetailModal isOpen={isOpen} onClose={onClose}
                                        data={selectedOrder}/>
                                        )}
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}