import { Box, Flex, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NavItem = ({ icon, children, hoverColor, hoverBg, page, ...rest }) => {
    return (
      <Box as={Link} to={page} href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex align="center" p="4" mx="4" borderRadius="lg"
          role="group" cursor="pointer" _hover={{ bg: hoverBg, color: hoverColor, }} {...rest}>
            {icon && (
                <Icon mr="4" fontSize="16" _groupHover={{ color: 'white', }} as={icon}/>
            )}
            {children}
        </Flex>
      </Box>
    );
  };