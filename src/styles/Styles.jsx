import React from "react";
import { Flex } from "@chakra-ui/react";
import { backgroundColor } from "./Colours";

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
