import React, { useContext, useEffect } from "react";
import {
  VStack,
  HStack,
  Text,
  Box,
  Input,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { SideNavBar } from "../components/SideNavBar";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { LessonStoreContext } from "../context/lessonStore";
import {
  Heading,
  SubHeading1,
  Body,
  LatexFormula,
  Code,
} from "../styles/Styles";
import {
  ScalarFieldVisual,
  ScalarFieldFormulaDisplay,
  VectorFieldFormulaDisplay,
  VectorFieldVisual,
  DivergenceVisual,
  RotationSlider,
  CurlVisual,
  CurlFormulaDisplay,
} from "../components/LessonComponents";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import nerdamer from "nerdamer/all.min";
import {
  buttonColor,
  externalLink,
  navBarColor,
  selectedButtonColor,
} from "../styles/Colours";
import { FormulaDisplay } from "../components/smaller_components/SideMenuComponents";
import {
  CrossProductText,
  DotProductText,
  ScalarFieldText,
  VectorFieldText,
  VectorsAndCalculusText,
  PartialDerivativesText,
  CurlText,
  DivergenceText,
} from "../components/smaller_components/LessonTexts";

export const LessonPage = () => {
  const { setScrollPosition, setHeaderPosition, setHeaderScrollPosition } =
    useContext(LessonStoreContext);
  useEffect(() => {
    const children = document.getElementById("lesson").children;
    const array1 = [];
    const array2 = [];
    for (const child of children) {
      if (child.id) {
        array1.push(child.id);
        array2.push(parseInt(child.offsetTop));
      }
    }
    setHeaderPosition(array1);
    setHeaderScrollPosition(array2);
  }, []);
  return (
    <VStack height={"100%"} width='100%'>
      <NavBar />
      <HStack height={"100%"} width='100%'>
        <SideNavBar />
        <VStack
          alignItems={"start"}
          height={"100%"}
          width='80%'
          overflow={"scroll"}
          id={"lesson"}
          onScroll={(e) => setScrollPosition(parseInt(e.target.scrollTop))}
        >
          <VectorsAndCalculus />
          <ScalarField />
          <VectorField />
          <PartialDerivatives />
          <Heading>Gradient and Directional Derivatives</Heading>

          <Divergence />
          <Curl />
          <Heading>Laplacian</Heading>
          <Heading>Single, Double and Triple Integrals</Heading>
          <Heading>Line Integrals in Vector Fields</Heading>
          <Heading>Surface Integrals in Vector Fields</Heading>
          <Heading>Flux in Vector Fields</Heading>
          <Heading>Green's Theorem</Heading>
          <Heading>Divergence Theorem</Heading>
          <Heading>Stoke's Theorem</Heading>
        </VStack>
      </HStack>
    </VStack>
  );
};

const VectorsAndCalculus = () => {
  return (
    <>
      <VectorsAndCalculusText />
      <DotProductText />
      <CrossProductText />
    </>
  );
};

const ScalarField = () => {
  const { setScalarFormula, scalarFormula } = useContext(LessonStoreContext);
  return (
    <>
      <ScalarFieldText />
      <HStack
        alignSelf={"center"}
        width={"85%"}
        minHeight={600}
        borderWidth={2}
        borderRadius={10}
        borderColor={navBarColor}
      >
        <Box width={"65%"} height={"100%"}>
          <Canvas
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [9, 5, 12],
            }}
          >
            <ScalarFieldVisual />
          </Canvas>
        </Box>
        <Divider
          paddingRight={5}
          height={"90%"}
          orientation='vertical'
          borderColor={navBarColor}
        />
        <VStack width={"30%"} alignItems={"start"}>
          <Text a>Type the formula for y</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setScalarFormula(val.target.value);
            }}
          />
          <br />
          <ScalarFieldFormulaDisplay />
        </VStack>
      </HStack>
    </>
  );
};
const VectorField = () => {
  const { setVectorFieldFormula, vectorFieldFormula } =
    useContext(LessonStoreContext);
  return (
    <>
      <VectorFieldText />
      <HStack
        alignSelf={"center"}
        width={"85%"}
        minHeight={600}
        borderWidth={2}
        borderRadius={10}
        borderColor={navBarColor}
      >
        <Box width={"65%"} height={"100%"}>
          <Canvas
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [9, 5, 12],
            }}
          >
            <VectorFieldVisual />
          </Canvas>
        </Box>
        <Divider
          borderColor={navBarColor}
          paddingRight={5}
          height={"90%"}
          orientation='vertical'
        />
        <VStack width={"30%"} alignItems={"start"}>
          <Text a>Type the formula for i</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setVectorFieldFormula({
                ...vectorFieldFormula,
                i: val.target.value,
              });
            }}
          />
          <Text a>Type the formula for j</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setVectorFieldFormula({
                ...vectorFieldFormula,
                j: val.target.value,
              });
            }}
          />
          <Text a>Type the formula for k</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setVectorFieldFormula({
                ...vectorFieldFormula,
                k: val.target.value,
              });
            }}
          />
          <br />
          <VectorFieldFormulaDisplay />
        </VStack>
      </HStack>
    </>
  );
};
const PartialDerivatives = () => {
  return (
    <>
      <PartialDerivativesText />
    </>
  );
};

const Divergence = () => {
  const { divergenceData, setDivergenceData } = useContext(LessonStoreContext);
  return (
    <>
      <Heading>Divergence</Heading>
      <Body>
        A vector field is a concept from physics that describes a quantity that
        varies in space and has both magnitude and direction. In other words, it
        is a function that assigns a vector (which has both magnitude and
        direction) to every point in space.
        <br />
        <br />
        Vector fields are used in a variety of areas of physics, including
        classical mechanics, electromagnetism, and fluid dynamics. In classical
        mechanics, examples of vector fields include the gravitational field and
        the velocity field of a fluid. In electromagnetism, the electric and
        magnetic fields are examples of vector fields.
        <br />
        <br />
        Vector fields can be visualized by drawing arrows at each point in
        space, with the direction and length of the arrows indicating the
        direction and magnitude of the vector at that point.
      </Body>
      <SubHeading1>Divergence Intuition</SubHeading1>
      <Body>
        Feel free to play with the vector field visualiser. Based on your
        formula for the vector at each coordinate <InlineMath>x, y </InlineMath>{" "}
        and <InlineMath>z</InlineMath>. Hover over the vectors to see
        information at each point. Try putting this
        <Code>(i) z^2*x || (j) x*4+y^3 || (k) y*x*z </Code>
      </Body>
      <HStack
        alignSelf={"center"}
        width={"85%"}
        minHeight={600}
        borderWidth={2}
        borderRadius={10}
        borderColor={navBarColor}
      >
        <Box width={"65%"} height={"100%"}>
          <Canvas
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [9, 5, 12],
            }}
          >
            <DivergenceVisual />
          </Canvas>
        </Box>
        <Divider
          borderColor={navBarColor}
          paddingRight={5}
          height={"90%"}
          orientation='vertical'
        />
        <VStack width={"30%"} alignItems={"start"}>
          <Text>Choose Vector Field Direction</Text>
          <Text>Vector Field Equation</Text>
          <InlineMath>{`F = 5${
            divergenceData.direction === "X"
              ? "i"
              : divergenceData.direction === "Y"
              ? "j"
              : "k"
          }`}</InlineMath>
          <HStack width={"70%"} justifyContent={"space-between"}>
            <Button
              bgColor={
                divergenceData.direction == "X"
                  ? selectedButtonColor
                  : buttonColor
              }
              onClick={() =>
                setDivergenceData({ ...divergenceData, direction: "X" })
              }
            >
              X
            </Button>
            <Button
              bgColor={
                divergenceData.direction == "Y"
                  ? selectedButtonColor
                  : buttonColor
              }
              onClick={() =>
                setDivergenceData({ ...divergenceData, direction: "Y" })
              }
            >
              Y
            </Button>
            <Button
              bgColor={
                divergenceData.direction == "Z"
                  ? selectedButtonColor
                  : buttonColor
              }
              onClick={() =>
                setDivergenceData({ ...divergenceData, direction: "Z" })
              }
            >
              Z
            </Button>
          </HStack>
          <RotationSlider
            text={"x-axis"}
            value={divergenceData.rotation_x}
            state={divergenceData}
            setState={setDivergenceData}
          />
          <RotationSlider
            text={"z-axis"}
            value={divergenceData.rotation_z}
            state={divergenceData}
            setState={setDivergenceData}
          />
          <Text>Normal Vector of Plane</Text>
          <InlineMath>{`\\widehat{n} = ${divergenceData.normal}`}</InlineMath>
          <Text>Divergence</Text>
          <InlineMath>{`\\nabla \\cdot F \\cdot \\widehat{n} = HARD CODE`}</InlineMath>
        </VStack>
      </HStack>
    </>
  );
};

const Curl = () => {
  const { setCurlVectorFieldFormula, curlVectorFieldFormula } =
    useContext(LessonStoreContext);
  return (
    <>
      <CurlText />
      <HStack
        alignSelf={"center"}
        width={"85%"}
        minHeight={600}
        borderWidth={2}
        borderRadius={10}
        borderColor={navBarColor}
      >
        <Box width={"65%"} height={"100%"}>
          <Canvas
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [9, 5, 12],
            }}
          >
            <CurlVisual />
          </Canvas>
        </Box>
        <Divider
          borderColor={navBarColor}
          paddingRight={5}
          height={"90%"}
          orientation='vertical'
        />
        <VStack width={"30%"} alignItems={"start"}>
          <Text a>Type the formula for i</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setCurlVectorFieldFormula({
                ...curlVectorFieldFormula,
                i: val.target.value,
              });
            }}
          />
          <Text a>Type the formula for j</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setCurlVectorFieldFormula({
                ...curlVectorFieldFormula,
                j: val.target.value,
              });
            }}
          />
          <Text a>Type the formula for k</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setCurlVectorFieldFormula({
                ...curlVectorFieldFormula,
                k: val.target.value,
              });
            }}
          />
          <br />
          <CurlFormulaDisplay />
        </VStack>
      </HStack>
    </>
  );
};
