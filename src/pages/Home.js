/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Text, Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const GridContainer = styled.div({
  display: "grid",
  padding: "1rem",
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
    minHeight: 150,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.lg,
    border: `0.1px solid ${colors.gray[300]}`,
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
  const hobbies = useSelector(({ projectsData }) => projectsData.projects);
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
      <GridContainer>
        {hobbies &&
          hobbies.map((hobby, index) => (
            <ClassContainer
              onClick={() => history.push(`/projects/${index}/view`)}
            >
              <Heading size="md">{hobby.title}</Heading>
              <Text fontSize="sm">{hobby.desc}</Text>
            </ClassContainer>
          ))}
        <ClassContainer onClick={() => history.push(`/projects/add`)}>
          <FiPlus size={30} />
        </ClassContainer>
      </GridContainer>
    </>
  );
};

export default Home;
