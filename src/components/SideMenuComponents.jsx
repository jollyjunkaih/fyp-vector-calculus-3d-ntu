import React, { useContext, useState } from "react";
import { StoreContext } from "../context/store";
import {
  Container,
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
} from "@chakra-ui/react";
import { Vector } from "../styles/Styles.jsx";
import nerdamer from "nerdamer/all.min";
import katex from "katex";
import { buttonColor, selectedButtonColor } from "../styles/Colours";
import { InlineMath } from "react-katex";

export const FormulaInput = ({ vector }) => {
  const { vectorFormula, setVectorFormula } = useContext(StoreContext);
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

export const PlaneButton = ({ plane }) => {
  const { planeSelected, setPlaneSelected } = useContext(StoreContext);

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
  const { shape, setShape } = useContext(StoreContext);

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
  const { shape, setShape } = useContext(StoreContext);
  return (
    <InputGroup width={"20%"}>
      <Input
        type='number'
        defaultValue={0}
        onChange={(event) => {
          console.log(event.target.value);
          if (event.target.value != "" && event.target.value !== "-") {
            if (vector === "i") {
              setShape({
                ...shape,
                formula: {
                  ...shape.formula,
                  center_x: parseInt(event.target.value),
                },
              });
            } else if (vector === "j")
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
  const { shape, setShape } = useContext(StoreContext);

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

export const FormulaDisplay = () => {
  const { vectorFormula } = useContext(StoreContext);
  try {
    if (
      nerdamer.convertToLaTeX(vectorFormula.i) &&
      nerdamer.convertToLaTeX(vectorFormula.j) &&
      nerdamer.convertToLaTeX(vectorFormula.k)
    ) {
      return (
        <InlineMath>{`f(x,y,z) = ${nerdamer.convertToLaTeX(
          vectorFormula.i
        )} i + ${nerdamer.convertToLaTeX(
          vectorFormula.j
        )} j + ${nerdamer.convertToLaTeX(vectorFormula.k)} k`}</InlineMath>
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
            <br />
            <Text>{`f(x,y) = ${nerdamer.convertToLaTeX(
              vectorFormula.i
            )} i + ${nerdamer.convertToLaTeX(
              vectorFormula.j
            )} j + ${nerdamer.convertToLaTeX(vectorFormula.k)} k`}</Text>
          </>
        );
      } catch (e) {
        return (
          <Text color='red'>
            There is something wrong with your formula. <br /> Please try again
          </Text>
        );
      }
    }
  }
};
