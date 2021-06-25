/** @jsxImportSource */

import {
  Button,
  Input,
  FormControl,
  Container,
  Text,
  Textarea,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import Navbar from "../components/Navbar";

const Form = styled.form({
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
});

const Add = () => {
  return (
    <>
      <Navbar />
      <Container centerContent alignItems="center" w="100%" maxW="325" mt={50}>
        <Text>Enter your project details</Text>
        <Form noValidate>
          <FormControl>
            <Input
              name="project"
              id="project"
              placeholder="Enter your Project title"
              autoFocus
            />
          </FormControl>
          <FormControl mt="1rem">
            <Textarea
              id="password"
              name="password"
              type="textarea"
              placeholder="Enter your project description here."
              isRequired
            />
          </FormControl>
          <Button type="submit" appearance="primary" mt="40px" width="100%">
            Add new project.
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Add;
