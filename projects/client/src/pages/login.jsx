import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Heading,
} from "@chakra-ui/react";
import Axios from "axios";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { UsernameLogin } from "../components/logins/usernameLogin";
import { EmailLogin } from "../components/logins/emailLogin";
import { PhoneLogin } from "../components/logins/phoneLogin";

const CustomRadioButton = ({ icon, value, isChecked, onChange }) => (
  <Box
    as="label"
    display="flex"
    alignItems="center"
    cursor="pointer"
    fontSize={{ base: "18px", md: "24px" }}
    color={isChecked ? "green.500" : "gray.500"}
    _hover={{ color: "green.600" }}
  >
    <input
      type="radio"
      value={value}
      checked={isChecked}
      onChange={onChange}
      style={{ display: "none" }}
    />
    <Box as={icon} boxSize={{ base: "18px", md: "24px" }} mr={2} />
  </Box>
);

export const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginMethod, setLoginMethod] = useState("username");

  const handleShowLogin = (value) => {
    setLoginMethod(value);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post("http://localhost:8000/api/auth/login", data);
      console.log(response);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"green.50"}>
        <Stack
          spacing={8}
          mx={{ base: 4, md: "auto" }}
          maxW={{ base: "auto", md: "lg" }}
          p={6}
          rounded={"xl"}
          boxShadow={"lg"}
          bg={"white"}
          textAlign="center"
          opacity={showLogin ? 1 : 0}
          transform={showLogin ? "translateY(0)" : "translateY(20px)"}
          transition="opacity 0.5s, transform 0.5s"
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} color={"green.500"}>
            Login to Your Cashier Account
          </Heading>
          <Flex justify="center">
            <FormControl as="fieldset">
              <FormLabel as="legend">Login Method</FormLabel>
              <RadioGroup value={loginMethod} onChange={(e) => handleShowLogin(e)}>
                <Stack direction="row" spacing={6} align="center">
                  <CustomRadioButton
                    icon={FaUser}
                    value="username"
                    isChecked={loginMethod === "username"}
                    onChange={() => handleShowLogin("username")}
                  />
                  <CustomRadioButton
                    icon={FaEnvelope}
                    value="email"
                    isChecked={loginMethod === "email"}
                    onChange={() => handleShowLogin("email")}
                  />
                  <CustomRadioButton
                    icon={FaPhone}
                    value="phone"
                    isChecked={loginMethod === "phone"}
                    onChange={() => handleShowLogin("phone")}
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {loginMethod === "username" ? (
            <UsernameLogin handleSubmit={handleSubmit} />
          ) : loginMethod === "email" ? (
            <EmailLogin handleSubmit={handleSubmit} />
          ) : (
            <PhoneLogin handleSubmit={handleSubmit} />
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
