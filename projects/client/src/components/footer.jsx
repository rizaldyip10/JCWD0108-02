import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
  Link,
  Input,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box as="footer" mt="auto" py={4} bg="green.400" color="white">
      <Flex direction="column" align="center">
        <Text mb={2}>
          Subscribe to our newsletter:
        </Text>
        <Box mb={2} display="flex">
          <Input
            type="email"
            placeholder="Enter your email"
            bg="white"
            color="gray.800"
            rounded="md"
            px={2}
          />
          <IconButton
            colorScheme="white"
            ml={2}
            bg="green.500"
            _hover={{ bg: "green.600" }}
            aria-label="Subscribe"
            icon={<FaEnvelope />}
          />
        </Box>
        <HStack spacing={4} mb={2}>
          {/* Social media icons */}
          <Link href="#" isExternal>
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              colorScheme="white"
            />
          </Link>
          <Link href="#" isExternal>
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              colorScheme="white"
            />
          </Link>
          <Link href="#" isExternal>
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              colorScheme="white"
            />
          </Link>
          <Link href="#" isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              colorScheme="white"
            />
          </Link>
        </HStack>
        <Text>
          &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};
