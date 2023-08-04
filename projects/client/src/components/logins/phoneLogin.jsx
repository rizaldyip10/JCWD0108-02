import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Checkbox,
  Text,
  Link,
  VStack,
} from "@chakra-ui/react";

export const PhoneLogin = ({ handleSubmit }) => {
  const loginSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .min(10, "Phone number too short")
      .max(12, "Phone number too long")
      .matches(/^\d+$/, "Phone number must contain only digits"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing={4}>
            <FormControl id="phone">
              <FormLabel>Phone Number</FormLabel>
              <Field
                as={Input}
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="phone"
                component="div"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Field
                as={Input}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="password"
                component="div"
              />
            </FormControl>
            <VStack spacing={4} align="stretch">
              <Checkbox
                colorScheme="green"
                isChecked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              >
                Show Password
              </Checkbox>
              <Text
                as={Link}
                href="http://localhost:3000/forgotpass"
                color="blue.400"
              >
                Forgot Password?
              </Text>
              <Button
                colorScheme="green"
                
                isDisabled={!props.dirty ||!props.isValid}
                type="submit"
              >
                Login
              </Button>
            </VStack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
