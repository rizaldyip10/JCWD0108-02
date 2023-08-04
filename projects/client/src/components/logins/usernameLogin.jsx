import  { useState } from "react";
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

export const UsernameLogin = ({ handleSubmit }) => {
  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
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
        username: "",
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
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Field as={Input} name="username" type="text" placeholder="Enter your username" />
              <ErrorMessage style={{ color: "red" }} name="username" component="div" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Field
                as={Input}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <ErrorMessage style={{ color: "red" }} name="password" component="div" />
            </FormControl>
            <VStack spacing={4} align="stretch">
              <Checkbox colorScheme="green" isChecked={showPassword} onChange={() => setShowPassword(!showPassword)}>
                Show Password
              </Checkbox>
              <Text as={Link} href="http://localhost:3000/forgotpass" color="blue.400">
                Forgot Password?
              </Text>
              <Button colorScheme="green"  isDisabled={!props.dirty || !props.isValid} type="submit">
                Login
              </Button>
            </VStack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};


