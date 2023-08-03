import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Axios from "axios"
import { useEffect, useState } from "react"


export const RecentTrans = () => {
    const [order, setOrder] = useState()
    
    const getOrder = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/api/reports?limit=5")
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
    return (
        <Box mt="20px">
            <Heading fontSize="22px">Recent Order</Heading>
            <TableContainer bgColor="white" boxShadow="1px 1px 3px black" mt="20px"
            borderRadius="5px">
                <Table size={{ base: 'sm', md: 'md', lg: 'lg'}}>
                    <Thead>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>Date</Th>
                            <Th>Ammount</Th>
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
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}