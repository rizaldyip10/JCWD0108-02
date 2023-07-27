import { Avatar, Box, Button, CloseButton, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { NavItem } from './navItems'
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineTransaction } from 'react-icons/ai'
import { HiOutlineUsers } from 'react-icons/hi'

export const SideBar = () => {
    return (
        <Flex display={{ base: 'none', lg: 'flex'}}>
            {/* <Button display={{ base: navOpen ? 'none' : 'flex', lg: 'none'}} onClick={onOpen}>Open</Button> */}
            <Flex pos="fixed" h="100vh" w="250px" bgColor="white" pl="20px"
            borderRightRadius="10px" boxShadow="1px 1px 3px black">
                <Flex direction="column" justifyContent="space-between">
                    <Flex direction="column">
                        <Heading fontSize="38px" color="green" mt="20px"
                         pl="10px">
                            Ini Logo
                        </Heading>
                        <Flex direction="column" color="green" fontSize="20px" mt="20px" ml="10px">
                            <NavItem title={'Home'} icon={AiOutlineHome} mt="20px" h="50px" pl="10px" 
                             _hover={{ transform: 'scale(1.1)', transition: '0.3s', fontWeight: 'bold' }}
                             page="/admin" />
                            <NavItem title={'Cashiers'} icon={HiOutlineUsers} mt="5px" h="50px" pl="10px"
                             _hover={{ transform: 'scale(1.1)', transition: '0.3s', fontWeight: 'bold' }}
                             page="/admin/cashier" />
                            <NavItem title={'Products'} icon={AiOutlineShoppingCart} mt="5px" h="50px" pl="10px"
                             _hover={{ transform: 'scale(1.1)', transition: '0.3s', fontWeight: 'bold' }}/>
                            <NavItem title={'Transactions'} icon={AiOutlineTransaction} mt="5px" h="50px" pl="10px"
                             _hover={{ transform: 'scale(1.1)', transition: '0.3s', fontWeight: 'bold' }}/>
                        </Flex>
                    </Flex>
                    <Menu placement='right'>
                            <MenuButton h='60px' w="250px" mb={10} ml="-10px" pl="20px"
                            borderRadius="10px">
                                <Flex color="green" alignItems="center">
                                    <Avatar size="md" bg="green" />
                                    <Box>
                                        <Heading fontSize="20px" fontWeight="bold" ml="16px">Rizaldy</Heading>
                                    </Box>
                                </Flex>
                            </MenuButton>
                            <MenuList mb={10}>
                                <MenuItem>Settings</MenuItem>
                                <MenuItem color="red">Sign Out</MenuItem>
                            </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Flex>
    )
}