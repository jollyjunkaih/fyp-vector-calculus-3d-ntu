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
import { buttonColor, selectedButtonColor } from "../styles/Colours";
const SideMenu = () => {
  const {
    vectorFormula,
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
  const [error, setError] = useState(false);

  const useFormula = (x, y, z, vectorFormula) => {
    if (vectorFormula) {
      return nerdamer(vectorFormula, { x: x, y: y, z: z }).toString();
    }
  };
  const onUpdate = () => {
    try {
      if (vectorFormula.i && vectorFormula.j && vectorFormula.k) {
        let newValueList = [];
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
        setError(false);
        setVectorData(newValueList);
      }
    } catch (e) {
      setVectorData([]);
      setError(true);
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
        <Divider orientation='vertical' colorScheme='grey' />
      </Container>
      {/* this causes the weird white color crop */}
      <Flex direction={"column"} height={"100%"}>
        <Card>
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
                setPlaneSelected({ ...planeSelected, value: parseInt(val) });
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </Card>
        <Card>
          {vectorFormula.i && vectorFormula.j && vectorFormula.k ? (
            <Flex
              borderRadius={5}
              borderWidth={2}
              borderColor={selectedButtonColor}
              padding={4}
              alignSelf={"center"}
              height={"fit-content"}
              width={"90%"}
              justifyContent={"center"}
            >
              <FormulaDisplay />
            </Flex>
          ) : null}

          {error ? (
            <Text fontSize={"xs"} color='red'>
              While our Math Latex parser works for this equation, regretabbly,
              we are unable to parse it with our math engine, please try
              something else
            </Text>
          ) : null}
          <FormulaInput vector={"i"} />
          <FormulaInput vector={"j"} />
          <FormulaInput vector={"k"} />
          <Button
            marginTop={2}
            alignSelf={"center"}
            width={"fit-content"}
            onClick={onUpdate}
            bgColor={buttonColor}
          >
            <Text>Update</Text>
          </Button>
        </Card>
        <Card>
          <Text>Add a shape</Text>

          <HStack>
            <ShapeButton shapeText={"Circle"} />
            <ShapeButton shapeText={"Square"} />
            <ShapeButton shapeText={"Sphere"} />
            <ShapeButton shapeText={"Cube"} />
          </HStack>

          {shape.shapeType == "Circle" ? (
            <VStack alignItems={"start"}>
              <HStack
                width={"100%"}
                justifyContent={"space-between"}
                marginTop={2}
              >
                <Text mb='8px'>Radius</Text>

                <NumberInput
                  size={"sm"}
                  defaultValue={1}
                  onChange={(val) =>
                    setShape({
                      ...shape,
                      formula: { ...shape.formula, radius: parseInt(val) },
                    })
                  }
                  width={"30%"}
                  min={1}
                  max={5}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
              <HStack
                width={"100%"}
                justifyContent={"space-between"}
                marginTop={2}
              >
                <Text mb='8px'>Center</Text>

                <CircleCenterInput vector='i' />
                <CircleCenterInput vector='j' />
                <CircleCenterInput vector='k' />
              </HStack>
              <Text>Rotation</Text>
              <RotationSlider text={"x-axis"} />
              <RotationSlider text={"y-axis"} />
              <RotationSlider text={"z-axis"} />
              <Button
                bgColor={planeOnly ? selectedButtonColor : buttonColor}
                onClick={() => {
                  setPlaneOnly(!planeOnly);
                }}
                alignSelf={"center"}
              >
                Only show vectors on the plane
              </Button>
            </VStack>
          ) : (
            <></>
          )}
        </Card>
      </Flex>
    </Flex>
  );
};
export default SideMenu;
