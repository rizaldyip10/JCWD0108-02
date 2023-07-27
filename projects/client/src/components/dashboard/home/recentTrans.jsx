import { Box, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"


export const RecentTrans = () => {
    return (
        <Box mt="20px" mb={{ base: "70px", md: "30px", lg: "30px"}}>
            <Heading fontSize="22px">Recent Order</Heading>
            <TableContainer bgColor="white" boxShadow="1px 1px 3px black" mt="20px">
                <Table size={{ base: 'sm', lg: 'lg'}}>
                    <Thead>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>Date</Th>
                            <Th>Ammount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>#0928</Td>
                            <Td>23 Jun 2023</Td>
                            <Td>Rp 25.000,00</Td>
                        </Tr>
                        <Tr>
                            <Td>#2910</Td>
                            <Td>23 Jun 2023</Td>
                            <Td>Rp 100.000,00</Td>
                        </Tr>
                        <Tr>
                            <Td>#3210</Td>
                            <Td>23 Jun 2023</Td>
                            <Td>Rp 50.000,00</Td>
                        </Tr>
                        <Tr>
                            <Td>#4167</Td>
                            <Td>23 Jun 2023</Td>
                            <Td>Rp 35.000,00</Td>
                        </Tr>
                        <Tr>
                            <Td>#1467</Td>
                            <Td>23 Jun 2023</Td>
                            <Td>Rp 65.000,00</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}