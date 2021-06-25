/** @jsxImportSource */

import {
  useColorMode,
  Flex,
  Heading,
  Spacer,
  IconButton,
} from "@chakra-ui/react";

import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      direction="row"
      wrap="no-wrap"
      height="5rem"
      px={8}
    >
      <Heading ml="8" size="xl" fontWeight="semibold" color="orange.400">
        Hobby
      </Heading>

      <Spacer />
      <IconButton
        ml={8}
        icon={isDark ? <FaSun /> : <FaMoon />}
        isRound="true"
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Navbar;
