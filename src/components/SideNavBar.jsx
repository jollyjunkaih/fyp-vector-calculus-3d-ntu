import {
  HStack,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  AccordionIcon,
  Divider,
  RadioGroup,
  Radio,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../styles/Styles";

export const SideNavBar = ({}) => {
  const [value, setValue] = useState("1");

  return (
    <HStack width='20%' height={"100%"} alignItems={"start"}>
      <Accordion allowMultiple width={"100%"}>
        <RadioGroup onChange={setValue} value={value}>
          <Card>
            <AccordionItem width={"100%"} border={0}>
              <h2>
                <AccordionButton width={"100%"}>
                  <Box as='span' flex='1' textAlign='left'>
                    1. Introduction to Multivariable Calculus
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack alignItems={"start"}>
                  <Radio value='vectors'>Vectors and Matrices</Radio>
                  <Radio value='scalar fields'>
                    Scalar Valued Functions / Fields
                  </Radio>
                  <Radio value='vector fields'>
                    Vector Valued Functions / Fields
                  </Radio>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem border={0}>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    2. Derivatives of Multivariable Functions
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack alignItems={"start"}>
                  <Radio value='partial derivatives'>Partial Derivatives</Radio>
                  <Radio value='gradient'>
                    Gradient and Directional Derivatives
                  </Radio>
                  <Radio value='divergence'>Divergence</Radio>
                  <Radio value='curl'>Curl</Radio>
                  <Radio value='laplacian'>Laplacian</Radio>
                </VStack>
              </AccordionPanel>
            </AccordionItem>{" "}
          </Card>
          <Card>
            <AccordionItem border={0}>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    3. Integrating Multivariable Functions
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack alignItems={"start"}>
                  <Radio value='integrals'>
                    Single, Double and Triple Integrals
                  </Radio>
                  <Radio value='line integrals'>
                    Line Integrals in Vector Fields
                  </Radio>
                  <Radio value='surface integrals'>
                    Surface Integrals in Vector Fields
                  </Radio>
                  <Radio value='flux'>Flux in Vector Fields</Radio>
                </VStack>
              </AccordionPanel>
            </AccordionItem>{" "}
          </Card>
          <Card>
            <AccordionItem border={0}>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    4. Green's, Stoke's and Divergence Theorem
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack alignItems={"start"}>
                  <Radio value="green's theorem">Green's Theorem</Radio>
                  <Radio value='divergenc theorem'>Divergence Theorem</Radio>
                  <Radio value="stoke's theorem">Stoke's Theorem</Radio>
                </VStack>
              </AccordionPanel>
            </AccordionItem>{" "}
          </Card>
        </RadioGroup>
      </Accordion>
      <Divider orientation='vertical' padding={0} margin={0} />
    </HStack>
  );
};
