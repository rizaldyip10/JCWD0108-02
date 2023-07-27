import { Avatar, Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { NavItem } from "./navItems"
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser, AiOutlineTransaction } from 'react-icons/ai'


export const MobileNav = () => {
    return (
        <Flex display={{ base: 'flex', md: 'flex', lg: 'none'}} bottom="0" bgColor="green"
        h="65px" w="100vw" position="fixed" justifyContent="space-evenly" color="white">
            <NavItem icon={AiOutlineHome} />
            <NavItem icon={AiOutlineShoppingCart} />
            <NavItem icon={AiOutlineUser} />
            <NavItem icon={AiOutlineTransaction} />
            <Menu placement='top'>
                <MenuButton>
                    <Avatar size="sm" bg="green" />
                </MenuButton>
                <MenuList mb={10}>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem color="red">Sign Out</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}