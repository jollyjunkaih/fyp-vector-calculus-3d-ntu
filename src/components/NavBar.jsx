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
import { useRouter, useRoute } from "wouter";
import { navBarColor } from "../styles/Colours";
import {
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";

export const NavBar = () => {
  const router = useRouter();
  const route = useRoute("/playground");
  console.log(router);

  console.log(route);
  const path = "/";
  return (
    <HStack padding={4} width={"100%"} bgColor={navBarColor}>
      <Container width={"33%"}></Container>
      <HStack width={"33%"} justifyContent={"space-around"}>
        <Breadcrumb color={"white"} separator='-'>
          <BreadcrumbItem isCurrentPage={useRoute("/")[0]}>
            <BreadcrumbLink href='/'>
              <Text fontSize={"xl"} as={useRoute("/")[0] ? "b" : null}>
                Home
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage={useRoute("/lesson")[0]}>
            <BreadcrumbLink href='/lesson'>
              <Text fontSize={"xl"} as={useRoute("/lesson")[0] ? "b" : null}>
                Lesson
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage={useRoute("/playground")[0]}>
            <BreadcrumbLink href='/playground'>
              <Text
                fontSize={"xl"}
                as={useRoute("/playground")[0] ? "b" : null}
              >
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
