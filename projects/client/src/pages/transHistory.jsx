import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { CashierTrans } from "../components/transHistory/transCashier"
import { useEffect, useState } from "react"


export const TransHistory = () => {
    const [reload, setReload] = useState(true)
    useEffect(() => {}, [reload])

    return (
        <Box py={20} px={10}  minH="100vh" bg={useColorModeValue("green.50","green.800")}>
            <Heading mb="30px">Transaction History</Heading>
            <CashierTrans />
        </Box>
    )
}