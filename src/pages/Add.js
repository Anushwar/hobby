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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { uuid } from "uuidv4";
import { useHistory, useParams } from "react-router-dom";
import { storage } from "../firebase";
import Navbar from "../components/Navbar";
import {
  addProjectDispatch,
  updateProjectDispatch,
} from "../redux/triggers/project";

const Form = styled.form({
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
});

const MODE = {
  ADD: "add",
  EDIT: "edit",
};

const Add = () => {
  const [mode, setMode] = useState(MODE.ADD);
  const [title, setTitle] = useState("");
  const [titleValid, setTitleValid] = useState(true);
  const [desc, setDesc] = useState("");
  const [descValid, setDescValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const { index } = useParams();
  const project = useSelector(
    ({ projectsData }) => index && projectsData.projects[index]
  );
  useEffect(() => {
    if (index) {
      if (project) {
        setTitle(project.title);
        setDesc(project.desc);
        setImages(project.images);
        setMode(MODE.EDIT);
      } else {
        setMode(MODE.ADD);
      }
    } else {
      setMode(MODE.ADD);
    }
  }, [index, project]);
  const imageUploadRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    if (!e.target?.files) {
      return;
    }
    const { files } = e.target;
    if (mode === MODE.EDIT) {
      setNewImages([...newImages, ...files]);
    } else {
      setImages([...images, ...files]);
    }
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    if (!title) {
      setTitleValid(false);
    } else if (!desc || desc.length <= 150) {
      setDescValid(false);
    } else {
      setTitleValid(true);
      setDescValid(true);
      switch (mode) {
        case MODE.ADD: {
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
          break;
        }
        case MODE.EDIT: {
          try {
            const imagesTask = await Promise.all(
              newImages.map((image) =>
                storage.ref().child(`images/${uuid()}`).put(image)
              )
            );
            const imagesURL = await Promise.all(
              imagesTask.map((snapshot) => snapshot.ref.getDownloadURL())
            );
            updateProjectDispatch(index, {
              title,
              desc,
              images: [...images, ...imagesURL],
            })(dispatch);
            setNewImages([]);
            toast({
              title: "Project Updated.",
              description: `Update Project "${title}"`,
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } catch (e) {
            toast({
              title: "Error occured",
              description: e.message ? e.message : "Unknown error",
              status: "error",
              isClosable: true,
            });
          }
          break;
        }
        default: {
          //
        }
      }
    }
    history.go(-1);
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <Container alignItems="center" w="100%" maxW="700" my={50}>
        <Heading>
          {mode === MODE.EDIT ? "Edit" : "Add"} your project details:
        </Heading>
        <Form onSubmit={handleSubmit} noValidate>
          <FormControl mt="2rem" isInvalid={!titleValid}>
            <FormLabel htmlFor="project">Project Name</FormLabel>
            <Input
              name="project"
              id="project"
              value={title}
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
              height="300px"
              value={desc}
              errorBorderColor="red.300"
              placeholder="Enter your project description here."
              onChange={(e) => setDesc(e.target.value)}
              isRequired
            />
            <FormErrorMessage>
              Project Description needs to be a minimum of 150 characters
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
            {mode === MODE.EDIT ? "Update Project" : "Add a Project"}
          </Button>
        </Form>
        {images && images.length !== 0 && (
          <Heading size="l" mt="5" mb="3">
            Image Preview:
          </Heading>
        )}
        <Grid
          templateColumns="repeat(auto-fill, minmax(325px, 1fr))"
          mt="5"
          gap="2"
        >
          {images.map((image) => {
            return (
              <img
                src={
                  // eslint-disable-next-line no-nested-ternary
                  image
                    ? mode === MODE.EDIT
                      ? image
                      : URL.createObjectURL(image)
                    : null
                }
                key={image.name}
                alt={image.name}
              />
            );
          })}
          {newImages.map((image) => {
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
