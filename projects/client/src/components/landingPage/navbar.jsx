import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Searchbar } from "./searchbar";
import { BsCart4 } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { AvatarMenu } from "../avatar/avatar";

const logo ="https://i.ibb.co/yBWXpX3/veganers-high-resolution-logo-white-on-transparent-background.png"

export const Navbar = ({onSearchQueryChange }) => {
  return (
    <Box>
      <Flex
        bg="green"
        mb={5}
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

        <Image src={logo} w={"60px"}/>
        <Searchbar onSearchQueryChange={onSearchQueryChange} />
        <HStack spacing={4}>
          <BsCart4 size={24} style={{ cursor: "pointer" }} />
          <AvatarMenu/>
        </HStack>
      </Flex>
      <Outlet/>
    </Box>
  );
};
