import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Searchbar } from "./searchbar";
import { BsCart4 } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { AvatarMenu } from "../avatar/avatar";

const logo = "https://i.ibb.co/ZhZssqF/logomcd.png"

export const Navbar = () => {
  return (
    <Box>
      <Flex
        bg="green"
        color="white"
        w="100%"
        h={16}
        alignItems="center"
        justifyContent="space-between" 
        position="fixed"
        px={4}
        boxShadow="md"
        zIndex={3}
      >

        <Image src={logo} w={20}/>
        <Searchbar />
        <HStack spacing={4}>
          <BsCart4 size={24} style={{ cursor: "pointer" }} />
          <AvatarMenu/>
        </HStack>
      </Flex>
      <Outlet/>
    </Box>
  );
};
