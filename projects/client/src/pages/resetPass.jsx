import  { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Checkbox,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const { token } = useParams();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const resetSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol")
      .matches(/.*[0-9].*/, "Password must contain at least one number"),
    confirmPassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.patch(
        "http://localhost:8000/api/auth/forgotPass",
        data,
        { headers }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
        recaptcha: "",
      }}
      validationSchema={resetSchema}
      onSubmit={(value, action) => {
        handleSubmit(value);
        //action.resetForm();
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
            <Box
              w={"100%"}
              maxW={{ base: "90%", sm: "80%", md: "60%", lg: "25%" }}
              py={8}
              px={4}
            >
              <Stack
                spacing={8}
                bg={"white"}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                textAlign="center"
                opacity={isLoaded ? 1 : 0}
                transform={isLoaded ? "translateY(0)" : "translateY(20px)"}
                transition="opacity 0.5s, transform 0.5s"
                justify="center"
              >
                <Heading
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color={"green.500"}
                >
                  Enter new password
                </Heading>
                <FormControl id="password">
                  <FormLabel color={"gray.800"} htmlFor="password">
                    Password
                  </FormLabel>
                  <Field
                    as={Input}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    color={"gray.800"}
                  />
                </FormControl>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="password"
                  component="div"
                />
                <FormControl id="confirmPassword">
                  <FormLabel color={"gray.800"} htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <Field
                    as={Input}
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    color={"gray.800"}
                  />
                </FormControl>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="confirmPassword"
                  component="div"
                />
                <Checkbox
                  isChecked={showPassword}
                  onChange={handleShowPassword}
                  colorScheme="green"
                >
                  Show Password
                </Checkbox>
                <Stack spacing={6}>
                <Box mt={4} w="100%" mx="auto">
                      <Flex justify={"center"} align={"center"}>
                        <ReCAPTCHA
                          sitekey={"6Lc05mgnAAAAAAwI0woSJin3hN9d-FymlUvqssLo"}
                          onChange={(value) =>
                            props.setFieldValue("recaptcha", value)
                          }
                        />
                      </Flex>
                    </Box>
                  <Button
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "green.500",
                    }}
                    isLoading={props.isSubmitting}
                    isDisabled={!props.dirty|| !props.isValid ||!props.values.recaptcha}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Flex>
        );
      }}
    </Formik>
  );
};
