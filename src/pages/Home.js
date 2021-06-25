/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Text, Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

const GridContainer = styled.div({
  display: "grid",
  columnGap: 20,
  rowGap: 20,
  alignItems: "center",
  justifyItems: "center",
  gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
  marginTop: "2rem",
});
const ClassContainer = styled.div(({ theme }) => {
  const { transition, colors, radii } = theme;
  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: radii.lg,
    border: `0.1px solid ${colors.gray[400]}`,
    userSelect: "none",
    padding: "1rem 0",
    textAlign: "center",
    cursor: "pointer",
    transition: `all ${transition.duration.normal} ease`,
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  };
});
const Home = () => {
  const [projects, setProjects] = useState([
    { title: "My Project 1", description: "Ths is a sample text" },
    { title: "My Project 2", description: "Ths is a sample text" },
    { title: "My Project 3", description: "Ths is a sample text" },
    { title: "My Project 4", description: "Ths is a sample text" },
  ]);

  const history = useHistory();
  return (
    <>
      <Navbar />
      <Flex
        align="center"
        justify="space-between"
        direction="row"
        wrap="no-wrap"
        height="5rem"
        px={8}
        mt={10}
      >
        <Spacer />
        <Button colorScheme="red" onClick={() => history.push(`/projects/add`)}>
          Add Project
        </Button>
      </Flex>
      <GridContainer>
        {projects &&
          projects.map((project) => (
            <ClassContainer
              onClick={() => history.push(`/projects/${project.title}`)}
            >
              <Text>{project.title}</Text>
              <Text fontSize="sm">{project.description}</Text>
            </ClassContainer>
          ))}
      </GridContainer>
    </>
  );
};

export default Home;
