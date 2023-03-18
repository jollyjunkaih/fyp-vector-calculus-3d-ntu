import {
  Container,
  Divider,
  Flex,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import nerdamer from "nerdamer/all.min";
import katex from "katex";
import React, { useContext } from "react";
import { VectorContext } from "../context/vector";
const SideMenu = () => {
  const { vectorFormula, setVectorFormula, setVectorData, gridSize } =
    useContext(VectorContext);
  const displayFormula = () => {
    try {
      if (
        nerdamer.convertToLaTeX(vectorFormula.i) &&
        nerdamer.convertToLaTeX(vectorFormula.j) &&
        nerdamer.convertToLaTeX(vectorFormula.k)
      ) {
        return (
          <div
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
              <text>{`f(x,y) = ${nerdamer.convertToLaTeX(
                vectorFormula.i
              )} i + ${nerdamer.convertToLaTeX(
                vectorFormula.j
              )} j + ${nerdamer.convertToLaTeX(vectorFormula.k)} k`}</text>
              <text>
                There is an error while parsing your formula. Please try again
              </text>
            </>
          );
        } catch (e) {
          return (
            <>
              <text>
                There is an error while parsing your formula. Please try again
              </text>
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
      setVectorData(newValueList);
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
          width={"max"}
          margin={10}
          padding={10}
        >
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
          {displayFormula()}
          <Button onClick={onUpdate}>
            <Text>Update</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default SideMenu;

const FormulaInput = ({ vector, vectorFormula, setVectorFormula }) => {
  return (
    <>
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
    </>
  );
};
