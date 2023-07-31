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
  Text,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export const ForgotPassword = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.put(
        "http://localhost:8000/api/auth/forgotPass",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const forgotSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Formik
      initialValues={{
        email: "",
        recaptcha: "",
      }}
      validationSchema={forgotSchema}
      onSubmit={(value, action) => {
        handleSubmit(value);
        // action.resetForm()
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
                  Forgot your password?
                </Heading>
                <Text fontSize={{ base: "sm", sm: "md" }} color={"gray.600"}>
                  You'll get an email with a reset link
                </Text>
                <FormControl id="email">
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="your-email@example.com"
                    _placeholder={{ color: "gray.500" }}
                  />
                </FormControl>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="email"
                  component="div"
                />
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
                    isDisabled={!props.dirty || !props.isValid || !props.values.recaptcha} 
                    type="submit"
                  >
                    Request Reset
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
