import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import { SideBar } from "../components/dashboard/sidebar/sidebar"
import { AdminHome } from "../components/dashboard/home/adminHome"
import { MobileNav } from "../components/dashboard/sidebar/mobileNav"
import { Outlet } from "react-router-dom"


export const AdminDashboard = () => {
    return (
        <Flex bgColor={useColorModeValue("green.50", "green.800")} id="admin">
            <SideBar />
            <MobileNav />
            <Outlet />  
        </Flex>
    )
}