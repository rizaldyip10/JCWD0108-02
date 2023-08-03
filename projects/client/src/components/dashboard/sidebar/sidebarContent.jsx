import { Box, CloseButton, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { NavItem } from "./navItems";
import { FiBox, FiHome, FiSettings, FiTrendingUp, FiUsers } from "react-icons/fi";
import { AiFillAppstore } from "react-icons/ai"

export const SidebarContent = ({ onClose, ...rest }) => {
    const LinkItems = [
        { name: 'Home', icon: FiHome, page: "/admin" },
        { name: 'Cashier', icon: FiUsers,  page: "/admin/cashier" },
        { name: 'Product', icon: FiBox },
        { name: 'Report', icon: FiTrendingUp, page: "/admin/report" },
        { name: 'App', icon: AiFillAppstore, page: "/" },
        { name: 'Settings', icon: FiSettings },
      ];
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="3xl" fontFamily="monospace" fontWeight="extrabold" color="green">
            Ini Logo
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem color="green" hoverBg="green" hoverColor="white"
          key={link.name} icon={link.icon} page={link.page}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    );
  };