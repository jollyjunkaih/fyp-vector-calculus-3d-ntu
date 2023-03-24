import {
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Container,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { usePath } from "hookrouter";
import { navBarColor } from "../styles/Colours";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineGithub,
} from "react-icons/ai";
import { TfiGithub } from "react-icons/tfi";

export const NavBar = () => {
  const path = usePath();
  return (
    <HStack padding={4} width={"100%"} bgColor={navBarColor}>
      <Container width={"33%"}></Container>
      <HStack width={"33%"} justifyContent={"space-around"}>
        <Breadcrumb color={"white"} separator='-'>
          <BreadcrumbItem isCurrentPage={path == "/" ? true : false}>
            <BreadcrumbLink href='/'>
              <Text fontSize={"xl"} as={path == "/" ? "b" : null}>
                Home
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage={path == "/lesson" ? true : false}>
            <BreadcrumbLink href='/lesson'>
              <Text fontSize={"xl"} as={path == "/lesson" ? "b" : null}>
                Lesson
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage={path == "/playground" ? true : false}>
            <BreadcrumbLink href='/playground'>
              <Text fontSize={"xl"} as={path == "/playground" ? "b" : null}>
                Playground
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      <HStack width={"33%"} justifyContent={"end"}>
        <Icon boxSize={7} color={"white"} as={AiOutlineInstagram} />
        <Icon boxSize={7} color={"white"} as={AiOutlineTwitter} />
        <Icon boxSize={7} color={"white"} as={AiOutlineGithub} />
      </HStack>
    </HStack>
  );
};
