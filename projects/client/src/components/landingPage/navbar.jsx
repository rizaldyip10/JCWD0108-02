import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Searchbar } from "./searchbar";
import { GrDocumentText } from "react-icons/gr";
import { Link, Outlet } from "react-router-dom";
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
        <Box as={Link}>
          <Image src={logo} w={"60px"} />
        </Box>
        <Searchbar onSearchQueryChange={onSearchQueryChange} />
        <HStack spacing={4}>
          <Box as={Link} to={"/transaction"} color="white">
            <GrDocumentText size={24} style={{ cursor: "pointer" }} />
          </Box>
          <AvatarMenu/>
        </HStack>
      </Flex>
      <Outlet/>
    </Box>
  );
};
