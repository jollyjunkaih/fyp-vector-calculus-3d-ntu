import {
  Container,
  Divider,
  Flex,
  Input,
  Text,
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import nerdamer from "nerdamer/all.min";
import katex from "katex";
import React, { useContext, useState } from "react";
import { VectorContext } from "../context/vector";
const SideMenu = () => {
  const {
    vectorFormula,
    setVectorFormula,
    setVectorData,
    gridSize,
    setGridSize,
    planeSelected,
    setPlaneSelected,
  } = useContext(VectorContext);
  const [error, setError] = useState(false);
  const displayFormula = () => {
    try {
      if (
        nerdamer.convertToLaTeX(vectorFormula.i) &&
        nerdamer.convertToLaTeX(vectorFormula.j) &&
        nerdamer.convertToLaTeX(vectorFormula.k)
      ) {
        return (
          <div
            style={{
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "black",
              padding: 10,
              display: "flex",
              justifyContent: "center",
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(
                `f(x,y,z) = ${nerdamer.convertToLaTeX(
                  vectorFormula.i
                )} i + ${nerdamer.convertToLaTeX(
                  vectorFormula.j
                )} j + ${nerdamer.convertToLaTeX(vectorFormula.k)} k`
              ),
            }}
          />
        );
      }
    } catch (e) {
      {
        try {
          return (
            <>
              <Text>{`f(x,y) = ${nerdamer.convertToLaTeX(
                vectorFormula.i
              )} i + ${nerdamer.convertToLaTeX(
                vectorFormula.j
              )} j + ${nerdamer.convertToLaTeX(vectorFormula.k)} k`}</Text>
              <Text fontSize={"xs"} color='red'>
                There is something wrong with your formula. Please try again
              </Text>
            </>
          );
        } catch (e) {
          return (
            <>
              <Text color='red'>
                There is something wrong with your formula. Please try again
              </Text>
            </>
          );
        }
      }
    }
  };

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
    <Flex direction={"row"} alignItems={"center"} height={"100%"}>
      <Container height={"90%"} width={0} padding={0}>
        <Divider orientation='vertical' colorScheme='grey' />
      </Container>
      <Flex direction={"column"}>
        <Flex
          direction={"column"}
          bgColor={"white"}
          borderRadius={5}
          boxShadow={"2px 2px #525252"}
          width={"80%"}
          margin={10}
          padding={10}
        >
          <HStack justifyContent={"space-between"}>
            <Text>Choose a grid size </Text>
            <NumberInput
              step={2}
              size={"sm"}
              width={"30%"}
              min={5}
              max={30}
              value={gridSize}
              onChange={(val) => {
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
            <PlaneButton
              plane={"X"}
              planeSelected={planeSelected}
              setPlaneSelected={setPlaneSelected}
            />
            <PlaneButton
              plane={"Y"}
              planeSelected={planeSelected}
              setPlaneSelected={setPlaneSelected}
            />
            <PlaneButton
              plane={"Z"}
              planeSelected={planeSelected}
              setPlaneSelected={setPlaneSelected}
            />
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
        </Flex>
        <Flex direction={"column"}>
          <Flex
            direction={"column"}
            bgColor={"white"}
            borderRadius={5}
            boxShadow={"2px 2px #525252"}
            width={"80%"}
            margin={10}
            padding={10}
          >
            {displayFormula()}
            {error ? (
              <Text fontSize={"xs"} color='red'>
                While our Math Latex parser works for this equation,
                regretabbly, we are unable to parse it with our math engine,
                please try something else
              </Text>
            ) : null}
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
            <Button marginTop={2} onClick={onUpdate}>
              <Text>Update</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default SideMenu;

const FormulaInput = ({ vector, vectorFormula, setVectorFormula }) => {
  return (
    <Container marginTop={2}>
      <Text>Type the formula for {vector}</Text>
      <Input
        onChange={(val) => {
          if (vector === "i") {
            setVectorFormula({ ...vectorFormula, i: val.target.value });
          } else if (vector === "j") {
            setVectorFormula({ ...vectorFormula, j: val.target.value });
          } else if (vector === "k") {
            setVectorFormula({ ...vectorFormula, k: val.target.value });
          }
        }}
      />
    </Container>
  );
};

const PlaneButton = ({ plane, planeSelected, setPlaneSelected }) => {
  return (
    <Button
      colorScheme={planeSelected.plane == plane ? "cyan" : "gray"}
      onClick={() => {
        if (planeSelected.plane != plane)
          setPlaneSelected({ ...planeSelected, plane: plane });
        else {
          setPlaneSelected({ ...planeSelected, plane: "" });
        }
      }}
    >
      {plane}
    </Button>
  );
};
