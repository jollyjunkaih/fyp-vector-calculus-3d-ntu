import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { backgroundColor } from "./Colours";
import { BlockMath } from "react-katex";
export const Vector = ({ text }) => {
  return (
    <b>
      <i>{text}</i>
    </b>
  );
};

export const Card = ({ children }) => {
  return (
    <Flex
      direction={"column"}
      bgColor={backgroundColor}
      borderRadius={5}
      boxShadow={"3px 3px #A0AEC0"}
      width={"90%"}
      margin={5}
      padding={5}
    >
      {children}
    </Flex>
  );
};

export const Heading = ({ children }) => {
  return (
    <Text
      paddingLeft={16}
      paddingTop={10}
      paddingBottom={5}
      fontSize={"2xl"}
      as={"b"}
      id={children}
    >
      {children}
    </Text>
  );
};
export const SubHeading1 = ({ children }) => {
  return (
    <Text
      paddingLeft={16}
      paddingTop={5}
      paddingBottom={5}
      fontSize={"lg"}
      as={"b"}
    >
      {children}
    </Text>
  );
};
export const SubHeading2 = ({ children }) => {
  return (
    <Text
      paddingLeft={16}
      paddingTop={2}
      paddingBottom={5}
      fontSize={"md"}
      as={"b"}
    >
      {children}
    </Text>
  );
};
export const Body = ({ children }) => {
  return (
    <Text maxWidth={"90%"} paddingLeft={16} paddingBottom={5} fontSize={"md"}>
      {children}
    </Text>
  );
};

export const LatexFormula = ({ children }) => {
  return (
    <Box alignSelf={"center"}>
      <BlockMath>{children}</BlockMath>
    </Box>
  );
};
