import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { SidebarContent } from '../components/dashboard/sidebar/sidebarContent';
import { MobileNav } from '../components/dashboard/sidebar/mobileNav'
import { Outlet } from 'react-router-dom';
  
export const AdminDashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Box>
        <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
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
        <Box ml={{ base: 0, md: 60 }}>
            <Outlet />
        </Box>
      </Box>
    );
  };