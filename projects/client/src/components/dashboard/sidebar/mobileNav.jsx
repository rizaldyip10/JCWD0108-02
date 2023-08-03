import { Avatar, Box, Flex, HStack, IconButton, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const MobileNav = ({ onOpen, ...rest }) => {
    const data = useSelector((state) => state.cashier.value)
    const navigate = useNavigate()

    const logOut = () => {
      localStorage.removeItem("token")
      setTimeout(() => {
        navigate("/login")
      },2000)
    }
    return (
      <Flex
        ml={{ base: 0, lg: 60 }}
        px={{ base: 4, lg: 4 }}
        height="20"
        alignItems="center"
        bg={'white'}
        borderBottomWidth="1px"
        borderBottomColor={'gray.200'}
        justifyContent={{ base: 'space-between', lg: 'flex-end' }}
        {...rest}
      >
        <IconButton
          display={{ base: 'flex', lg: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Image src="https://media.discordapp.net/attachments/1133287275015446530/1136147280282538084/veganers-high-resolution-logo-color-on-transparent-background.png?width=582&height=655"
          w="60px" display={{ base: 'flex', lg: 'none' }} />
        <HStack spacing={{ base: '0', lg: '6' }}>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar size={'sm'} bg="green" src={`http://localhost:8000/${data.imgProfile}`} />
                  <VStack
                    display={{ base: 'none', lg: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm" color="green">{`${data.firstName} ${data.lastName}`}</Text>
                    <Text fontSize="xs" color="green.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', lg: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg='white'
                borderColor='green.200'
              >
                <MenuItem color="green">Profile</MenuItem>
                <MenuDivider />
                <MenuItem color="red" onClick={logOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
  };