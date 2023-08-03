import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { SidebarContent } from '../components/dashboard/sidebar/sidebarContent';
import { MobileNav } from '../components/dashboard/sidebar/mobileNav'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
  
export const AdminDashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const data = useSelector((state) => state.cashier.value)
    const navigate = useNavigate()
    const TOKEN = localStorage.getItem("token")
    const accessAdmin = data.isAdmin && TOKEN 
    return TOKEN && data.isAdmin ?  (
      <Box>
        <SidebarContent onClose={onClose} display={{ base: 'none', lg: 'block' }} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, lg: 60 }}>
            <Outlet />
        </Box>
      </Box>
    ) : TOKEN && !data.isAdmin ? navigate("/") : navigate("/login")
  };