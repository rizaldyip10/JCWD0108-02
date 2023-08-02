import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  VStack,
  Checkbox,
  useToast
} from "@chakra-ui/react";
import Axios from "axios";

export const OTPLogin = () => {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false); 
  const toast = useToast()
  const navigate = useNavigate()
  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{4}$/, "OTP must be exactly 4 digits"),
  });

  const handleEmailFormSubmit = async (values) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/auth/loginOtp",
        values
      );
      console.log(response);
      setEmail(response.data.email);
      toast({
        title: "OTP",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "OTP",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleOTPFormSubmit = async (values) => {
    try {
      values.email = email;
      const response = await Axios.post(
        "http://localhost:8000/api/auth/verifyOtp",
        values
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/")
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

  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={emailSchema}
        onSubmit={handleEmailFormSubmit}
      >
        {(props) => (
          <Form>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="email"
                  component="div"
                />
              </FormControl>
              <VStack spacing={4} align="stretch">
                <Button
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                  isDisabled={!props.dirty || !props.isValid}
                  type="submit"
                >
                  Send OTP
                </Button>
              </VStack>
            </Stack>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={otpSchema}
        onSubmit={handleOTPFormSubmit}
      >
        {(props) => (
          <Form>
            <Stack spacing={4}>
              <FormControl id="otp">
                <FormLabel>OTP</FormLabel>
                <Field
                  as={Input}
                  name="otp"
                  type={showOTP ? "text" : "password"} // 4. Tipe input diubah berdasarkan showOTP
                  placeholder="Enter your OTP"
                />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="otp"
                  component="div"
                />
              </FormControl>
              <VStack spacing={4} align="stretch">
                <Checkbox // 3. Checkbox untuk show OTP
                  colorScheme="green"
                  isChecked={showOTP}
                  onChange={() => setShowOTP(!showOTP)}
                >
                  Show OTP
                </Checkbox>
                <Button
                  colorScheme="green"
                  isLoading={props.isSubmitting}
                  isDisabled={!props.dirty || !props.isValid}
                  type="submit"
                >
                  Verify OTP
                </Button>
              </VStack>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};
