import {
  Container,
  Heading,
  Text,
  Stack,
  Image,
  IconButton,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import Navbar from "../components/Navbar";

const ProjectDetails = () => {
  const { index } = useParams();
  const project = useSelector(
    ({ projectsData }) => projectsData.projects[index]
  );
  if (!project) {
    return (
      <>
        <h1>Aww snap</h1>
        <Link to="/" replace>
          <Button>GO BACK!!</Button>
        </Link>
      </>
    );
  }
  const { title, desc, images } = project;
  return (
    <>
      <Navbar />
      <Container alignItems="center" w="100%" maxW="700" mt={50} mb={45}>
        <HStack justifyContent="space-between">
          <Heading>{title}</Heading>
          <IconButton
            as={Link}
            icon={<AiOutlineEdit />}
            ms="auto"
            isRound
            to={`/projects/add/${index}`}
          />
        </HStack>
        <Text color="gray.500" my="10">
          {desc}
        </Text>
        {images && images.length !== 0 && (
          <Heading size="md" my="2">
            Images:
          </Heading>
        )}
        <Stack>
          {images.map((image) => {
            return (
              <Image
                src={image}
                key={image}
                objectFit="scale-down"
                width="100%"
              />
            );
          })}
        </Stack>
      </Container>
    </>
  );
};

export default ProjectDetails;
