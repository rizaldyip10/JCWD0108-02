import { Box, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"


export const Board = () => {
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
                        <Tr>
                            <Td>Minuman</Td>
                            <Td>65</Td>
                        </Tr>
                        <Tr>
                            <Td>Kebutuhan Dapur</Td>
                            <Td>55</Td>
                        </Tr>
                        <Tr>
                            <Td>Makanan</Td>
                            <Td>50</Td>
                        </Tr>
                        <Tr>
                            <Td>Fashion</Td>
                            <Td>30</Td>
                        </Tr>
                        <Tr>
                            <Td>Electronic</Td>
                            <Td>5</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}