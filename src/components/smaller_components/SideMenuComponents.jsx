import React, { useContext, useState, useEffect } from "react";
import { PlaygroundStoreContext } from "../../context/playgroundStore";
import {
  Box,
  Button,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  HStack,
  VStack,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Container,
} from "@chakra-ui/react";
import { Vector } from "../../styles/Styles.jsx";
import nerdamer from "nerdamer/all.min";
import {
  getCircleEquation,
  getFluxThroughCircularSurface,
} from "../../utils/helperFunctions";
import * as THREE from "three";
import {
  buttonColor,
  navBarColor,
  selectedButtonColor,
} from "../../styles/Colours";
import { InlineMath } from "react-katex";

export const FormulaInput = ({ vector, vectorFormula, setVectorFormula }) => {
  return (
    <Box marginTop={2} width={"100%"}>
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
    </Box>
  );
};

export const PlaneButton = ({ plane }) => {
  const { planeSelected, setPlaneSelected } = useContext(
    PlaygroundStoreContext
  );

  return (
    <Button
      bgColor={planeSelected.plane == plane ? selectedButtonColor : buttonColor}
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

export const ShapeButton = ({ shapeText }) => {
  const { shape, setShape } = useContext(PlaygroundStoreContext);

  return (
    <Button
      bgColor={shapeText == shape.shapeType ? selectedButtonColor : buttonColor}
      onClick={() => {
        setShape({ ...shape, shapeType: shapeText });
      }}
    >
      {shapeText}
    </Button>
  );
};
export const CircleCenterInput = ({ vector }) => {
  const { shape, setShape } = useContext(PlaygroundStoreContext);
  return (
    <InputGroup width={"20%"}>
      <Input
        type='number'
        defaultValue={0}
        onChange={(event) => {
          if (event.target.value != "" && event.target.value !== "-") {
            if (vector === "i") {
              setShape({
                ...shape,
                circleFormula: {
                  ...shape.circleFormula,
                  center_x: parseInt(event.target.value),
                },
              });
            } else if (vector === "j")
              setShape({
                ...shape,
                circleFormula: {
                  ...shape.circleFormula,
                  center_y: parseInt(event.target.value),
                },
              });
            else if (vector === "k")
              setShape({
                ...shape,
                circleFormula: {
                  ...shape.circleFormula,
                  center_z: parseInt(event.target.value),
                },
              });
          }
        }}
      />
      <InputRightElement children={<Vector text={vector} />} />
    </InputGroup>
  );
};

export const RotationSlider = ({ text }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { shape, setShape } = useContext(PlaygroundStoreContext);

  return (
    <HStack width={"100%"} height={8}>
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
              circleFormula: {
                ...shape.circleFormula,
                rotation_x: parseInt(val),
              },
            });
          else if (text === "y-axis")
            setShape({
              ...shape,
              circleFormula: {
                ...shape.circleFormula,
                rotation_y: parseInt(val),
              },
            });
          else if (text === "z-axis")
            setShape({
              ...shape,
              circleFormula: {
                ...shape.circleFormula,
                rotation_z: parseInt(val),
              },
            });
        }}
      >
        <SliderMark
          width={"fit-content"}
          value={-90}
          mt='1'
          ml='-2.5'
          fontSize='sm'
        >
          {"-90\u00B0"}
        </SliderMark>
        <SliderMark
          width={"fit-content"}
          value={0}
          mt='1'
          ml='-2.5'
          fontSize='sm'
        >
          {"0\u00B0"}
        </SliderMark>
        <SliderMark
          width={"fit-content"}
          value={90}
          mt='1'
          ml='-2.5'
          fontSize='sm'
        >
          {"90\u00B0"}
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

export const FormulaDisplay = ({ vectorFormula }) => {
  try {
    return (
      <InlineMath>{`f(x,y,z) = (${nerdamer.convertToLaTeX(
        vectorFormula.i
      )}) i + (${nerdamer.convertToLaTeX(
        vectorFormula.j
      )}) j + (${nerdamer.convertToLaTeX(vectorFormula.k)}) k`}</InlineMath>
    );
  } catch (e) {
    {
      return <></>;
    }
  }
};

export const ShapeSelection = () => {
  const { shape, setShape, planeOnly, setPlaneOnly } = useContext(
    PlaygroundStoreContext
  );

  if (shape.shapeType === "Circle") return <CircleOptions />;
};

const CircleOptions = () => {
  const { shape, setShape, planeOnly, setPlaneOnly, vectorFormula } =
    useContext(PlaygroundStoreContext);
  const [planeVector1, setPlaneVector1] = useState(new THREE.Vector3(0, 0, 1));
  const [planeVector2, setPlaneVector2] = useState(new THREE.Vector3(1, 0, 0));
  const [normalVector, setNormalVector] = useState(new THREE.Vector3(0, 1, 0));
  const [circleFormula, setCircleFormula] = useState({});
  const { circleFormula: formula } = shape;
  const {
    radius = 1,
    center_x = 0,
    center_y = 0,
    center_z = 0,
    rotation_x = 0,
    rotation_y = 0,
    rotation_z = 0,
  } = formula;
  useEffect(() => {
    const eulerAngles = new THREE.Euler(
      (rotation_x / 180) * Math.PI,
      (rotation_y / 180) * Math.PI,
      (rotation_z / 180) * Math.PI
    );

    const v1 = new THREE.Vector3(0, 0, 1);
    const v2 = new THREE.Vector3(1, 0, 0);
    const v3 = new THREE.Vector3(0, 1, 0);
    v1.applyEuler(eulerAngles);
    v2.applyEuler(eulerAngles);
    v3.applyEuler(eulerAngles);
    setPlaneVector1(v1);
    setPlaneVector2(v2);
    setNormalVector(v3);
  }, [rotation_x, rotation_y, rotation_z]);
  useEffect(() => {
    setCircleFormula({
      x: getCircleEquation(planeVector1.x, planeVector2.x, center_x),
      y: getCircleEquation(planeVector1.y, planeVector2.y, center_y),
      z: getCircleEquation(planeVector1.z, planeVector2.z, center_z),
    });
  }, [planeVector1, planeVector2, center_x, center_y, center_z]);
  return (
    <VStack alignItems={"start"} minHeight={"fit-content"}>
      <HStack width={"100%"} justifyContent={"space-between"} marginTop={2}>
        <Text mb='8px'>Radius</Text>

        <NumberInput
          size={"sm"}
          defaultValue={1}
          onChange={(val) =>
            setShape({
              ...shape,
              circleFormula: {
                ...shape.circleFormula,
                radius: parseInt(val),
              },
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
      <HStack width={"100%"} justifyContent={"space-between"} marginTop={2}>
        <Text mb='8px'>Center</Text>

        <CircleCenterInput vector='i' />
        <CircleCenterInput vector='j' />
        <CircleCenterInput vector='k' />
      </HStack>
      <Text>Rotation</Text>
      <RotationSlider text={"x-axis"} />
      <RotationSlider text={"y-axis"} />
      <RotationSlider text={"z-axis"} />
      <VStack alignSelf={"center"}>
        <Button
          bgColor={planeOnly ? selectedButtonColor : buttonColor}
          onClick={() => {
            setPlaneOnly(!planeOnly);
          }}
          marginTop={3}
          alignSelf={"center"}
        >
          Only show vectors on the plane
        </Button>
      </VStack>
      <Container height={5}>
        <Divider padding={1} borderColor={navBarColor} />
      </Container>

      <Text fontSize={"lg"} as='b'>
        Equation of Circle:
      </Text>

      <InlineMath>{`x(θ,r) = ${circleFormula.x}`}</InlineMath>
      <InlineMath>{`y(θ,r) = ${circleFormula.y}`}</InlineMath>
      <InlineMath>{`z(θ,r) = ${circleFormula.z}`}</InlineMath>
      <Text fontSize={"lg"} as='b'>
        Properties:
      </Text>
      <Text>
        Normal:{" "}
        <InlineMath>{`\\widehat{n}= ${normalVector.x.toFixed(
          2
        )}i + ${normalVector.y.toFixed(2)}j + ${normalVector.z.toFixed(
          2
        )}k`}</InlineMath>
      </Text>
      <Text>
        Flux:{" "}
        <InlineMath>{`\\iint_S f \\cdot\\widehat{n}\\cdot dA = ${getFluxThroughCircularSurface(
          vectorFormula,
          normalVector,
          radius,
          circleFormula
        )}`}</InlineMath>
      </Text>
    </VStack>
  );
};
