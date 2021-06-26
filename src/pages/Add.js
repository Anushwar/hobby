/** @jsxImportSource @emotion/react */

import {
  Button,
  Input,
  FormControl,
  Container,
  Textarea,
  Heading,
  useToast,
  FormLabel,
  FormErrorMessage,
  Grid,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { uuid } from "uuidv4";
import { storage } from "../firebase";
import Navbar from "../components/Navbar";
import { addProjectDispatch } from "../redux/triggers/project";

const Form = styled.form({
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
});

const Add = () => {
  const [title, setTitle] = useState("");
  const [titleValid, setTitleValid] = useState(true);
  const [desc, setDesc] = useState("");
  const [descValid, setDescValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const imageUploadRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (!e.target?.files) {
      return;
    }
    const { files } = e.target;
    setImages([...images, ...files]);
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    if (!title) {
      setTitleValid(false);
    } else if (!desc) {
      setDescValid(false);
    } else {
      try {
        const imagesTask = await Promise.all(
          images.map((image) =>
            storage.ref().child(`images/${uuid()}`).put(image)
          )
        );
        const imagesURL = await Promise.all(
          imagesTask.map((snapshot) => snapshot.ref.getDownloadURL())
        );
        addProjectDispatch({
          title,
          desc,
          images: imagesURL,
        })(dispatch);
        toast({
          title: "Project created.",
          description: `Created a new Project "${title}"`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (e) {
        toast({
          title: `Error occured`,
          description: e.message ? e.message : "Unknown error",
          status: "error",
          isClosable: true,
        });
      }
    }
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <Container alignItems="center" w="100%" maxW="700" mt={50}>
        <Heading>Enter your project details:</Heading>
        <Form onSubmit={handleSubmit} noValidate>
          <FormControl mt="2rem" isInvalid={!titleValid}>
            <FormLabel htmlFor="project">Project Name</FormLabel>
            <Input
              name="project"
              id="project"
              placeholder="Enter your Project title"
              errorBorderColor="red.300"
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <FormErrorMessage>Project Title cannot be Empty</FormErrorMessage>
          </FormControl>
          <FormControl mt="1rem" isInvalid={!descValid}>
            <FormLabel htmlFor="desc">Project Description</FormLabel>
            <Textarea
              id="desc"
              name="desc"
              errorBorderColor="red.300"
              placeholder="Enter your project description here."
              onChange={(e) => setDesc(e.target.value)}
              isRequired
            />
            <FormErrorMessage>
              Project Description cannot be Empty
            </FormErrorMessage>
          </FormControl>
          <Heading size="l" mt="5" mb="3">
            Upload file here:
          </Heading>
          <Button onClick={() => imageUploadRef.current.click()}>Upload</Button>
          <input
            type="file"
            ref={imageUploadRef}
            onChange={handleChange}
            multiple
            accept="image/*"
            css={{ display: "none" }}
          />
          <Button
            type="subtmit"
            appearance="primary"
            mt="40px"
            width="100%"
            isLoading={loading}
          >
            Add new project.
          </Button>
        </Form>
        <Heading size="l" mt="5" mb="3">
          Image Preview:
        </Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" mt="5">
          {images.map((image) => {
            return (
              <img
                src={image ? URL.createObjectURL(image) : null}
                key={image.name}
                alt={image.name}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Add;
