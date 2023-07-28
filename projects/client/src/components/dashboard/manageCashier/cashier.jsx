import { Box, Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import { AiOutlinePlus } from "react-icons/ai"
import { CashierTable } from "./cashierTable"


export const Cashier = () => {
    return (
        <Flex direction="column" p="30px" bg={useColorModeValue("green.50", "green.800")}>
            <Flex alignItems="center" justifyContent="space-between">
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