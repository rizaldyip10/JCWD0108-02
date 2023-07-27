import { Box, Flex, HStack, Heading } from "@chakra-ui/react"
import { CardItem } from "./card"
import { BiSolidUser } from "react-icons/bi"
import { HiOutlineDocumentText, HiOutlineUsers } from "react-icons/hi"
import { TbReportMoney } from "react-icons/tb"
import { LineChart } from "../charts/lineCharts"
import { PieChart } from "../charts/pieChart"
import { Board } from "./board"
import { RecentTrans } from "./recentTrans"


export const AdminHome = () => {
    return (
        <Flex ml={{ base: '20px', lg: '300px'}} mt="30px" direction="column">
            <Heading fontSize={{ base: '24px', lg: '34px'}}>Home</Heading>
            <Box mt="30px">
                <Heading fontSize={{ base: '18px', lg: '22px'}}>Overview</Heading>
                <Flex direction={{ base: 'column', md: 'row'}} >
                    <CardItem title="Total Cashier" detail="10" icon={HiOutlineUsers} mt="20px" 
                    maxH="150px" />
                    <CardItem title="Total Order" detail="50" icon={HiOutlineDocumentText} mt="20px" 
                    maxH="150px" ml={{ base: '0px', md: '30px'}}/>
                    <CardItem title="Income this month" detail="Rp 15.000.000,00" mt="20px"
                    maxH="150px" ml={{ base: '0px', md: '30px'}} icon={TbReportMoney}/>
                </Flex>
            </Box>
            <Box mt="30px" w={{ base: '330px',md: '450px', lg: '1060px'}}>
                <Heading fontSize="22px">Sales Update</Heading>
                <Flex direction={{ base: 'column', md: 'row'}} w={{ base: "330px", lg: "800px"}}>
                    <LineChart />
                    <Board />
                </Flex>
                <RecentTrans />
            </Box>
        </Flex>
    )
}