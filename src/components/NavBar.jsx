import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { usePath } from "hookrouter";

export const NavBar = () => {
  const path = usePath();
  return (
    <Box margin={3} alignSelf={"center"}>
      <Breadcrumb separator='-'>
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
    </Box>
  );
};
