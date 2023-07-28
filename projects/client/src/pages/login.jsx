import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Icon,
  Link
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import * as Yup from "yup";
import Axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
  });
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/login",
        data
      );
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
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(value, action) => {
          handleSubmit(value);
        }}
      >
        {(props) => {
          return (
            <Flex
              as={Form}
              minH={"100vh"}
              align={"center"}
              justify={"center"}
              bg={"green.50"}
            >
              <Stack
                spacing={8}
                mx={"auto"}
                maxW={"lg"}
                py={12}
                px={6}
                textAlign="center"
                opacity={showLogin ? 1 : 0}
                transform={showLogin ? "translateY(0)" : "translateY(20px)"}
                transition="opacity 0.5s, transform 0.5s"
              >
                <Heading fontSize={"4xl"} color={"green.500"}>
                  Login to Your Cashier Account
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  Manage transactions and enjoy our user-friendly interface.
                </Text>
                <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                  <Stack spacing={4}>
                    <FormControl id="username">
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Field
                        as={Input}
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                      />
                    </FormControl>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="username"
                      component="div"
                    />
                    <FormControl id="password">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="password"
                      component="div"
                    />
                    <Stack spacing={4} direction="row" align="center">
                      <Checkbox
                        colorScheme="green"
                        isChecked={showPassword}
                        onChange={handleShowPassword}
                      >
                        Show Password
                      </Checkbox>
                      <Text as={Link} href='http://localhost:3000/forgotpass' color={"blue.400"}>Forgot password?</Text>
                    </Stack>
                    <Button
                      leftIcon={<Icon as={FaLock} boxSize={4} />}
                      bg={"green.400"}
                      color={"white"}
                      _hover={{
                        bg: "green.500",
                      }}
                      isDisabled={!props.dirty}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          );
        }}
      </Formik>
    </Box>
  );
};
