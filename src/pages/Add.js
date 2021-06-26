/** @jsxImportSource */

import {
  Button,
  Input,
  FormControl,
  Container,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addProjectDispatch } from "../redux/triggers/project";

const Form = styled.form({
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
});

const Add = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();
  // const history = useHistory();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    try {
      addProjectDispatch({
        title,
        desc,
      })(dispatch);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <Navbar />
      <Container centerContent alignItems="center" w="100%" maxW="325" mt={50}>
        <Heading fontSize="lg">Enter your project details</Heading>
        <Form onSubmit={handleSubmit}>
          <FormControl mt="2rem">
            <Input
              name="project"
              id="project"
              placeholder="Enter your Project title"
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </FormControl>
          <FormControl mt="1rem">
            <Textarea
              id="desc"
              name="desc"
              placeholder="Enter your project description here."
              onChange={(e) => setDesc(e.target.value)}
              isRequired
            />
          </FormControl>
          <Button type="subtmit" appearance="primary" mt="40px" width="100%">
            Add new project.
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Add;
