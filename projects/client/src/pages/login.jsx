import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaKey } from "react-icons/fa";
import { UsernameLogin } from "../components/logins/usernameLogin";
import { EmailLogin } from "../components/logins/emailLogin";
import { PhoneLogin } from "../components/logins/phoneLogin";
import { OTPLogin } from "../components/logins/otpLogin";
import { useDispatch } from "react-redux";
import { setValue } from "../redux/cashierSlice";

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
  const toast = useToast();
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const handleShowLogin = (value) => {
    setLoginMethod(value);
  };

  const dispatch = useDispatch()
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post("http://localhost:8000/api/auth/login", data);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      dispatch(setValue(response.data.result))
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
      }, 1000);
      navigate("/");
      

    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return !token ?( 
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

                  <CustomRadioButton
                    icon={FaKey}
                    value="otp"
                    isChecked={loginMethod === "otp"}
                    onChange={() => handleShowLogin("otp")}
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {loginMethod === "username" ? (
            <UsernameLogin handleSubmit={handleSubmit} />
          ) : loginMethod === "email" ? (
            <EmailLogin handleSubmit={handleSubmit} />
          ) : loginMethod === "phone" ? (
            <PhoneLogin handleSubmit={handleSubmit} />
          ) : (
            <OTPLogin />
          )}
        </Stack>
      </Flex>
    </Box>
  ) : (<Navigate to="/"/>) ;
};
