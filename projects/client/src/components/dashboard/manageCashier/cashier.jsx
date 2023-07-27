import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import { AiOutlinePlus } from "react-icons/ai"
import { CashierTable } from "./cashierTable"


export const Cashier = () => {
    return (
        <Flex ml={{ base: '20px', lg: '330px'}} mt="30px" direction="column">
            <Heading fontSize={{ base: '24px', lg: '34px'}}>Cashier Management</Heading>
            <Flex alignItems="center" mt="30px" justifyContent="space-between" w="71vw">
                <Flex>
                    <Heading fontSize={{ base: '18px', lg: '22px'}}>All Users</Heading>
                    <Text ml="5px" fontSize={{ base: '18px', lg: '22px'}}>|</Text>
                    <Text ml="5px" fontSize={{ base: '18px', lg: '22px'}}>10</Text>
                </Flex>
                <Flex>
                    <Button>
                        <AiOutlinePlus />
                        <Text>Add Cashier</Text>
                    </Button>
                </Flex>
            </Flex>
            <Flex>
                <CashierTable />
                {/* Pagination */}
            </Flex>

        </Flex>
    )
}