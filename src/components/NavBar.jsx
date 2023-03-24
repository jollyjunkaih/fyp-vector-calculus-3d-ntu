import {
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Container,
  Icon,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { usePath } from "hookrouter";
import { navBarColor } from "../styles/Colours";
import {
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";

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
        <Button
          onClick={() =>
            window.open("https://twitter.com/jollyjunkaih", "_blank")
          }
          variant={"link"}
        >
          <Icon boxSize={7} color={"white"} as={AiOutlineTwitter} />
        </Button>
        <Button
          onClick={() =>
            window.open(
              "https://github.com/jollyjunkaih/vector_calculus_visual_learning_aid",
              "_blank"
            )
          }
          variant={"link"}
        >
          <Icon boxSize={7} color={"white"} as={AiOutlineGithub} />
        </Button>
        <Button
          onClick={() =>
            window.open("https://www.linkedin.com/in/jun-kaih/", "_blank")
          }
          variant={"link"}
        >
          <Icon boxSize={7} color={"white"} as={AiOutlineLinkedin} />
        </Button>
      </HStack>
    </HStack>
  );
};
