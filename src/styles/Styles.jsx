import React from "react";
import { Flex } from "@chakra-ui/react";

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
      bgColor={"white"}
      borderRadius={5}
      boxShadow={"2px 2px #525252"}
      width={"90%"}
      margin={5}
      padding={5}
    >
      {children}
    </Flex>
  );
};
