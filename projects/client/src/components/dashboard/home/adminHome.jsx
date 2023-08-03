import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { CardItem } from "./card"
import { HiOutlineDocumentText, HiOutlineUsers } from "react-icons/hi"
import { TbReportMoney } from "react-icons/tb"
import { LineChart } from "../charts/lineCharts"
import { Board } from "./board"
import { RecentTrans } from "./recentTrans"
import { CashierPerform } from "./cashierPerformance"
import Axios from "axios"
import { useEffect, useState } from "react"


export const AdminHome = () => {
    const [profit, setProfit] = useState(0)
    const [cashier, setCashier] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)
    const getProfit = async () => {
        try {
            const response = await Axios.get('http://localhost:8000/api/reports/income')
            setProfit(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getTodayOrder = async () => {
        try {
            const response = await Axios.get('http://localhost:8000/api/reports/order')
            setTotalOrder(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
    }

    const totalCashier = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/api/reports/totalCashier")
            setCashier(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfit()
        getTodayOrder()
        totalCashier()
    },[])
    return (
        <Flex direction="column" bg={useColorModeValue("green.50", "green.800")} p="30px"
        minH="100vh">
            <Box>
                <Heading fontSize={{ base: '18px', lg: '22px'}}>Overview</Heading>
                <Flex direction={{ base: 'column', md: 'row'}} >
                    <CardItem title="Total Cashier" detail={cashier} icon={HiOutlineUsers} mt="20px" 
                    maxW="330px" maxH="150px" />
                    <CardItem title="Total Order" detail={totalOrder} icon={HiOutlineDocumentText} mt="20px" 
                    maxW="330px" maxH="150px" ml={{ base: '0px', md: '30px'}}/>
                    <CardItem title="Today's Profit" detail={formatIDR(profit)} mt="20px"
                    maxW="330px" maxH="150px" ml={{ base: '0px', md: '30px'}} icon={TbReportMoney}
                    color={profit >= 0 ? "green" : "red"}/>
                </Flex>
            </Box>
            <Box mt="30px">
                <Heading fontSize="22px">Sales Update</Heading>
                <Flex direction={{ base: 'column', md: 'row'}} w={{ base: "300px", md: "500px", lg: "750px"}}>
                    <LineChart />
                    <Board />
                </Flex>
                <Flex direction={{ base: "column", md: "row"}} >
                    <RecentTrans />
                    <CashierPerform />
                </Flex>
            </Box>
        </Flex>
    )
}