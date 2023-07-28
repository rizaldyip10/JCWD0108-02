import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { CardItem } from "./card"
import { HiOutlineDocumentText, HiOutlineUsers } from "react-icons/hi"
import { TbReportMoney } from "react-icons/tb"
import { LineChart } from "../charts/lineCharts"
import { Board } from "./board"
import { RecentTrans } from "./recentTrans"
import { CashierPerform } from "./cashierPerformance"


export const AdminHome = () => {
    return (
        <Flex direction="column" bg={useColorModeValue("green.50", "green.800")} p="30px">
            <Box>
                <Heading fontSize={{ base: '18px', lg: '22px'}}>Overview</Heading>
                <Flex direction={{ base: 'column', md: 'row'}} >
                    <CardItem title="Total Cashier" detail="10" icon={HiOutlineUsers} mt="20px" 
                    maxW="330px" maxH="150px" />
                    <CardItem title="Total Order" detail="50" icon={HiOutlineDocumentText} mt="20px" 
                    maxW="330px" maxH="150px" ml={{ base: '0px', md: '30px'}}/>
                    <CardItem title="Income this month" detail="Rp 15.000.000,00" mt="20px"
                    maxW="330px" maxH="150px" ml={{ base: '0px', md: '30px'}} icon={TbReportMoney}/>
                </Flex>
            </Box>
            <Box mt="30px">
                <Heading fontSize="22px">Sales Update</Heading>
                <Flex direction={{ base: 'column', md: 'row'}} w={{base: "300px", lg: "720px"}}>
                    <LineChart />
                    <Board />
                </Flex>
                <Flex direction={{ base: "column", lg: "row"}}>
                    <RecentTrans />
                    <CashierPerform />
                </Flex>
            </Box>
        </Flex>
    )
}