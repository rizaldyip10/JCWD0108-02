import { Box, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";


export const Board = () => {
    const [item, setItem] = useState()

    const getItem = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/api/reports/product")
            setItem(response.data)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getItem()
    }, [])
    return (
        <Flex bgColor="white" direction="column" alignItems="center" p="10px" borderRadius="5px"
         boxShadow="1px 1px 3px black" ml={{ base: '0px', md:'20px', lg: '30px'}} mt={{ base: '20px', lg: '0px'}}>
            <Heading fontSize="20px">Top Selling Products</Heading>
            <TableContainer mt="10px">
                <Table variant="simple" size={{ base: 'sm', lg: 'md'}}>
                    <Thead>
                        <Tr>
                            <Th>Product</Th>
                            <Th>Total Sale</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {item?.map((v, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>{v.productName}</Td>
                                    <Td>{v.salesCount}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}