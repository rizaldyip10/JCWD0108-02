import { Avatar, Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { AiOutlineEdit } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"

export const CashierTable = () => {
    return (
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Status</Th>
                        <Th>Address</Th>
                        <Th>Phone</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            <Flex alignItems="center">
                                <Avatar size="sm" />
                                <Box ml="10px">
                                    <Text fontWeight="bold" fontSize="14px">Ahmad Mawardi</Text>
                                    <Text fontSize="14px">ahmad.mawardi@gmail.com</Text>
                                </Box>
                            </Flex>
                        </Td>
                        <Td>
                            <Text color="green.500">Active</Text> 
                        </Td>
                        <Td>
                            <Text>Jl. Burangrang No.69</Text> 
                        </Td>
                        <Td>
                            <Text>09876543211</Text> 
                        </Td>
                        <Td>
                            <Flex>
                                <Button>
                                    <AiOutlineEdit />
                                    <Text>Change Password</Text>
                                </Button>
                                <Button ml="10px">
                                    <BiTrash />
                                    <Text>Remove</Text>
                                </Button>
                            </Flex>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}