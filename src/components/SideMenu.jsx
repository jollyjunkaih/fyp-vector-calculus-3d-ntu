import {
  Container,
  Divider,
  Flex,
  Text,
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import nerdamer from "nerdamer/all.min";
import React, { useContext, useState } from "react";
import { PlaygroundStoreContext } from "../context/playgroundStore";
import {
  FormulaInput,
  PlaneButton,
  ShapeButton,
  CircleCenterInput,
  RotationSlider,
  FormulaDisplay,
} from "./smaller_components/SideMenuComponents";
import { Card } from "../styles/Styles";
import {
  buttonColor,
  navBarColor,
  selectedButtonColor,
} from "../styles/Colours";
import {
  getDivergence,
  getGradient,
  useFormula,
  getCurl,
} from "../utils/helperFunctions";
import { ShapeSelection } from "./smaller_components/SideMenuComponents";
import { InlineMath } from "react-katex";
const SideMenu = () => {
  const {
    vectorFormula,
    setVectorFormula,
    setVectorData,
    gridSize,
    setGridSize,
    planeSelected,
    setPlaneSelected,
    shape,
    setShape,
    planeOnly,
    setPlaneOnly,
  } = useContext(PlaygroundStoreContext);
  // const [error, setError] = useState(false);

  const onUpdate = () => {
    try {
      if (vectorFormula.i && vectorFormula.j && vectorFormula.k) {
        const newValueList = [];
        for (let x = -gridSize / 2; x < gridSize / 2 + 1; x++) {
          for (let y = -gridSize / 2; y < gridSize / 2 + 1; y++) {
            for (let z = -gridSize / 2; z < gridSize / 2 + 1; z++) {
              newValueList.push({
                i: useFormula(x, y, z, vectorFormula.i),
                j: useFormula(x, y, z, vectorFormula.j),
                k: useFormula(x, y, z, vectorFormula.k),
                x: x,
                y: y,
                z: z,
              });
            }
          }
        }
        // setError(false);
        setVectorData(newValueList);
      }
    } catch (e) {
      setVectorData([]);
      // setError(true);
    }
  };
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      height={"100%"}
      width={"100%"}
    >
      <Container height={"90%"} width={0} padding={0}>
        <Divider
          height={"90%"}
          orientation='vertical'
          borderColor={navBarColor}
        />
      </Container>
      <VStack height={"100%"} width={"100%"} overflowY={"scroll"}>
        <Accordion
          defaultIndex={[0]}
          allowToggle
          borderColor='white'
          borderWidth={0}
          width={"100%"}
        >
          <AccordionItem borderWidth={0}>
            <Card>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  <FormulaDisplay vectorFormula={vectorFormula} />
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Divider marginBottom={5} borderColor={navBarColor} />
                {/* {error ? ( */}
                {/* <Text fontSize={"xs"} color='red'>
                  While our Math Latex parser works for this equation,
                  regretabbly, we are unable to parse it with our math engine,
                  please try something else
                </Text> */}
                {/* ) : null} */}
                <FormulaInput
                  vector={"i"}
                  vectorFormula={vectorFormula}
                  setVectorFormula={setVectorFormula}
                />
                <FormulaInput
                  vector={"j"}
                  vectorFormula={vectorFormula}
                  setVectorFormula={setVectorFormula}
                />
                <FormulaInput
                  vector={"k"}
                  vectorFormula={vectorFormula}
                  setVectorFormula={setVectorFormula}
                />
                <Button
                  marginTop={2}
                  alignSelf={"center"}
                  width={"fit-content"}
                  onClick={onUpdate}
                  bgColor={buttonColor}
                >
                  <Text>Generate</Text>
                </Button>
                <Container height={8}>
                  <Divider padding={2} borderColor={navBarColor} />
                </Container>
                <Text fontSize={"lg"} as='b'>
                  Properties of Field
                </Text>
                <br />
                <InlineMath>{`\\bigtriangledown f = ${getGradient(
                  vectorFormula,
                  0,
                  0,
                  0,
                  true
                )}`}</InlineMath>
                <br />
                <InlineMath>{`\\bigtriangledown \\cdot f = ${getDivergence(
                  vectorFormula,
                  0,
                  0,
                  0,
                  true
                )}`}</InlineMath>{" "}
                <br />
                <InlineMath>{`\\bigtriangledown\\times f = ${getCurl(
                  vectorFormula,
                  0,
                  0,
                  0,
                  true
                )}`}</InlineMath>
              </AccordionPanel>
            </Card>
          </AccordionItem>

          <AccordionItem borderWidth={0}>
            <Card>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  Choose a Shape
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Divider marginBottom={5} borderColor={navBarColor} />

                <HStack>
                  <ShapeButton shapeText={"Circle"} />
                  <ShapeButton shapeText={"Square"} />
                  <ShapeButton shapeText={"Sphere"} />
                  <ShapeButton shapeText={"Cube"} />
                </HStack>

                <ShapeSelection />
              </AccordionPanel>
            </Card>
          </AccordionItem>

          <AccordionItem borderWidth={0}>
            <Card>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  <Text>
                    Current Gridsize: {gridSize} x {gridSize} x {gridSize}
                    <br />
                    {planeSelected.plane
                      ? `Selected Plane: ${planeSelected.plane} = ${planeSelected.value} `
                      : "No Plane Selected"}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Divider marginBottom={5} borderColor={navBarColor} />
                <HStack justifyContent={"space-between"}>
                  <Text>Choose a grid size </Text>
                  <NumberInput
                    step={2}
                    size={"sm"}
                    width={"30%"}
                    min={0}
                    max={30}
                    value={gridSize}
                    onChange={(val) => {
                      if (val % 2 == 1) {
                        val = val - 1;
                      }
                      setGridSize(val);
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </HStack>

                <Text>Choose a plane to inspect</Text>
                <HStack>
                  <PlaneButton plane={"X"} />
                  <PlaneButton plane={"Y"} />
                  <PlaneButton plane={"Z"} />
                  <NumberInput
                    min={-gridSize / 2}
                    max={gridSize / 2}
                    value={planeSelected.value}
                    onChange={(val) => {
                      setPlaneSelected({
                        ...planeSelected,
                        value: parseInt(val),
                      });
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </HStack>
              </AccordionPanel>
            </Card>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Flex>
  );
};
export default SideMenu;
