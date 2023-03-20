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
  VStack,
  InputGroup,
  InputRightElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
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
    shape,
    setShape,
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
      <Flex direction={"column"} overflow={"scroll"} height={"100%"}>
        <Flex
          direction={"column"}
          bgColor={"white"}
          borderRadius={5}
          boxShadow={"2px 2px #525252"}
          width={"90%"}
          margin={5}
          padding={5}
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
            width={"90%"}
            margin={5}
            padding={5}
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
            <Button
              marginTop={2}
              alignSelf={"center"}
              width={"fit-content"}
              onClick={onUpdate}
            >
              <Text>Update</Text>
            </Button>
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          bgColor={"white"}
          borderRadius={5}
          boxShadow={"2px 2px #525252"}
          width={"90%"}
          margin={5}
          padding={5}
        >
          <Text>Add a shape</Text>

          <HStack>
            <ShapeButton
              shapeText={"Circle"}
              setShape={setShape}
              shape={shape}
            />
            <ShapeButton
              shapeText={"Square"}
              setShape={setShape}
              shape={shape}
            />
            <ShapeButton
              shapeText={"Sphere"}
              setShape={setShape}
              shape={shape}
            />
            <ShapeButton shapeText={"Cube"} setShape={setShape} shape={shape} />
          </HStack>

          {shape.shape == "Circle" ? (
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

                <CircleCenterInput
                  vector='i'
                  setShape={setShape}
                  shape={shape}
                />
                <CircleCenterInput
                  vector='j'
                  setShape={setShape}
                  shape={shape}
                />
                <CircleCenterInput
                  vector='k'
                  setShape={setShape}
                  shape={shape}
                />
              </HStack>
              <Text>Rotation</Text>
              <RotationSlider
                text={"x-axis"}
                shape={shape}
                setShape={setShape}
              />
              <RotationSlider
                text={"y-axis"}
                shape={shape}
                setShape={setShape}
              />
              <RotationSlider
                text={"z-axis"}
                shape={shape}
                setShape={setShape}
              />
            </VStack>
          ) : (
            <></>
          )}
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

const ShapeButton = ({ shapeText, shape, setShape }) => {
  return (
    <Button
      colorScheme={shapeText == shape.shape ? "cyan" : "gray"}
      onClick={() => {
        setShape({ ...shape, shape: shapeText });
      }}
    >
      {shapeText}
    </Button>
  );
};

const Vector = ({ text }) => {
  return (
    <b>
      <i>{text}</i>
    </b>
  );
};

const CircleCenterInput = ({ setShape, shape, vector }) => {
  return (
    <InputGroup width={"20%"}>
      <Input
        defaultValue={0}
        onChange={(event) => {
          if (vector === "i")
            setShape({
              ...shape,
              formula: {
                ...shape.formula,
                center_x: parseInt(event.target.value),
              },
            });
          else if (vector === "j")
            setShape({
              ...shape,
              formula: {
                ...shape.formula,
                center_y: parseInt(event.target.value),
              },
            });
          else if (vector === "k")
            setShape({
              ...shape,
              formula: {
                ...shape.formula,
                center_z: parseInt(event.target.value),
              },
            });
        }}
      />
      <InputRightElement children={<Vector text={vector} />} />
    </InputGroup>
  );
};

const RotationSlider = ({ text, setShape, shape }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <HStack width={"100%"}>
      <Text minWidth={"fit-content"} marginRight={5}>
        {text}
      </Text>
      <Slider
        min={-90}
        max={90}
        aria-label='slider-ex-1'
        val={sliderValue}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={(val) => {
          setSliderValue(val);
          if (text === "x-axis")
            setShape({
              ...shape,
              formula: { ...shape.formula, rotation_x: parseInt(val) },
            });
          else if (text === "y-axis")
            setShape({
              ...shape,
              formula: { ...shape.formula, rotation_y: parseInt(val) },
            });
          else if (text === "z-axis")
            setShape({
              ...shape,
              formula: { ...shape.formula, rotation_z: parseInt(val) },
            });
        }}
      >
        <SliderMark value={-90} mt='1' ml='-2.5' fontSize='sm'>
          {"-90 \u00B0"}
        </SliderMark>
        <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
          {"0 \u00B0"}
        </SliderMark>
        <SliderMark value={90} mt='1' ml='-2.5' fontSize='sm'>
          {"90 \u00B0"}
        </SliderMark>
        <Tooltip
          hasArrow
          bg='teal.500'
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={`${sliderValue} \u00B0`}
        >
          <SliderThumb />
        </Tooltip>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
      </Slider>
    </HStack>
  );
};
