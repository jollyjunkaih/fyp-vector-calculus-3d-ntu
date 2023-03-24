import {
  HStack,
  Box,
  Divider,
  RadioGroup,
  Radio,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store";
import { getClosestNumber } from "../utils/helperFunctions";

export const SideNavBar = ({}) => {
  const [value, setValue] = useState("1");
  const { scrollPosition, headerPosition, headerScrollPosition } =
    useContext(StoreContext);
  useEffect(() => {
    if (headerPosition.length && headerScrollPosition.length) {
      const closestScroll = getClosestNumber(
        headerScrollPosition,
        scrollPosition
      );
      const index = headerScrollPosition.findIndex((e) => e === closestScroll);
      setValue(headerPosition[index]);
    }
  }, [scrollPosition]);
  return (
    <HStack width='20%' height={"100%"} alignItems={"start"} padding={5}>
      <RadioGroup
        onChange={(val) => {
          const lesson = document.getElementById("lesson");
          const ele = document.getElementById(val);
          lesson.scroll({
            top: ele.offsetTop - 70,
            behavior: "smooth",
          });

          setValue(val);
        }}
        value={value}
      >
        <Box as='span' flex='1' textAlign='left'>
          1. Introduction to Multivariable Calculus
        </Box>

        <VStack alignItems={"start"} margin={5}>
          <Radio value='Vectors and Calculus'>Vectors and Calculus</Radio>
          <Radio value='Scalar Fields'>Scalar Fields</Radio>
          <Radio value='Vector Fields'>Vector Fields</Radio>
        </VStack>

        <Box as='span' flex='1' textAlign='left'>
          2. Derivatives of Multivariable Functions
        </Box>

        <VStack margin={5} alignItems={"start"}>
          <Radio value='Partial Derivatives'>Partial Derivatives</Radio>
          <Radio value='Gradient and Directional Derivatives'>
            Gradient and Directional Derivatives
          </Radio>
          <Radio value='Divergence'>Divergence</Radio>
          <Radio value='Curl'>Curl</Radio>
          <Radio value='Laplacian'>Laplacian</Radio>
        </VStack>

        <Box as='span' flex='1' textAlign='left'>
          3. Integrating Multivariable Functions
        </Box>

        <VStack margin={5} alignItems={"start"}>
          <Radio value='Single, Double and Triple Integrals'>
            Single, Double and Triple Integrals
          </Radio>
          <Radio value='Line Integrals in Vector Fields'>
            Line Integrals in Vector Fields
          </Radio>
          <Radio value='Surface Integrals in Vector Fields'>
            Surface Integrals in Vector Fields
          </Radio>
          <Radio value='Flux in Vector Fields'>Flux in Vector Fields</Radio>
        </VStack>

        <Box as='span' flex='1' textAlign='left'>
          4. Green's, Stoke's and Divergence Theorem
        </Box>

        <VStack margin={5} alignItems={"start"}>
          <Radio value="Green's Theorem">Green's Theorem</Radio>
          <Radio value='Divergence Theorem'>Divergence Theorem</Radio>
          <Radio value="Stoke's Theorem">Stoke's Theorem</Radio>
        </VStack>
      </RadioGroup>
      <Divider orientation='vertical' padding={0} margin={0} />
    </HStack>
  );
};
