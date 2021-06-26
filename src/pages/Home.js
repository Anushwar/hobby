/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Text, CloseButton, Box } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { uuid } from "uuidv4";
import { useTheme } from "@emotion/react";
import Navbar from "../components/Navbar";
import { deleteProjectDispatch } from "../redux/triggers/project";

const GridContainer = styled.div({
  display: "grid",
  padding: "1rem",
  columnGap: 20,
  rowGap: 20,
  alignItems: "center",
  justifyItems: "center",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  marginTop: "2rem",
});

const ProjectBox = styled(Box)(({ theme }) => {
  const { colors, transition, radii } = theme;
  return {
    minHeight: 150,
    width: "100%",
    border: `0.1px solid ${colors.gray[300]}`,
    borderRadius: radii.lg,
    overflow: "hidden",
    transition: `all ${transition.duration.normal} ease`,
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  };
});

const Home = () => {
  const projects = useSelector(({ projectsData }) => projectsData.projects);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  // const [projects, setProjects] = useState([
  //   { title: "My Project 1", description: "Ths is a sample text" },
  //   { title: "My Project 2", description: "Ths is a sample text" },
  //   { title: "My Project 3", description: "Ths is a sample text" },
  //   { title: "My Project 4", description: "Ths is a sample text" },
  // ]);
  const history = useHistory();

  const onDelete = (index) => {
    deleteProjectDispatch(index)(dispatch);
  };
  return (
    <>
      <Navbar />
      <GridContainer>
        {projects &&
          projects.map(({ title, images }, index) => (
            <ProjectBox
              key={`${title}-${uuid()}`}
              position="relative"
              cursor="pointer"
              onClick={() => history.push(`projects/${index}`)}
            >
              <CloseButton
                top="5px"
                right="5px"
                position="absolute"
                _hover={{
                  background: colors.gray[200],
                }}
                onClick={(e) => {
                  onDelete(index);
                  e.stopPropagation();
                }}
              />
              {images[0] && (
                <img
                  alt={title}
                  src={images[0]}
                  css={{
                    overflow: "hidden",
                    height: "140px",
                    width: "100%",
                  }}
                />
              )}
              <Text fontSize="md" my={2} mx={3} color="gray.600">
                {title}
              </Text>
            </ProjectBox>
          ))}
        <ProjectBox
          as={Link}
          to="projects/add"
          css={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FiPlus size={30} />
        </ProjectBox>
      </GridContainer>
    </>
  );
};

export default Home;
