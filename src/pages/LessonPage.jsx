import React, { useContext, useEffect, useState } from "react";
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
  YouTubeVideo,
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
  GradientAndDirectionalDerivativesText,
  LaplacianText,
  SingleDoubleTripleIntegralsText,
  LineIntegralsInVectorFieldsText,
  SurfaceIntegralsInVectorFieldsText,
  FluxInVectorFieldsText,
  GreensTheoremText,
  DivergenceTheoremText,
  StokesTheoremText,
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
          <GradientAndDirectionalDerivatives />
          <Divergence />
          <Curl />
          <Laplacian />
          <SingleDoubleTripleIntegrals />
          <LineIntegralsInVectorFields />
          <SurfaceIntegralsInVectorFields />
          <FluxInVectorFields />
          <GreensTheorem />
          <DivergenceTheorem />
          <StokesTheorem />
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
      <YouTubeVideo
        videos={[
          {
            embedId: "KDHuWxy53uM",
            caption: "Watch an explainer video by Khan Academy here",
          },
        ]}
      />
      <CrossProductText />
      <YouTubeVideo
        videos={[
          {
            embedId: "eu6i7WJeinw",
            caption: "Visualising Cross Product with 3Blue1Brown",
          },
          {
            embedId: "E34CftP455k",
            caption:
              "Khan Academy explains the difference between Dot and Cross Product",
          },
        ]}
      />
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
      <YouTubeVideo
        videos={[
          {
            embedId: "5FWAVmwMXWg",
            caption: "Introduction to Vector Fields by Khan Academy",
          },
        ]}
      />
    </>
  );
};
const PartialDerivatives = () => {
  return (
    <>
      <PartialDerivativesText />
      <YouTubeVideo
        videos={[
          {
            embedId: "5FWAVmwMXWg",
            caption: "Khan Academy explains Partial Derivatives",
          },
          {
            embedId: "dfvnCHqzK54",
            caption: "Visualising Partial Derivatives with Khan Academy",
          },
        ]}
      />
    </>
  );
};
const GradientAndDirectionalDerivatives = () => {
  return (
    <>
      <GradientAndDirectionalDerivativesText />
      <YouTubeVideo
        videos={[
          {
            embedId: "5FWAVmwMXWg",
            caption: "Khan Academy explains Partial Derivatives",
          },
          {
            embedId: "dfvnCHqzK54",
            caption: "Visualising Partial Derivatives with Khan Academy",
          },
        ]}
      />
    </>
  );
};
const Divergence = () => {
  return (
    <>
      <DivergenceText />
      <YouTubeVideo
        videos={[
          {
            embedId: "c0MR-vWiUPU",
            caption: "Khan Academy explains Divergence part 1",
          },
          {
            embedId: "Yeie-aJT2eU",
            caption: "Khan Academy explains Divergence part 1",
          },
        ]}
      />
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
      <YouTubeVideo
        videos={[
          {
            embedId: "aDNyyTtaJdY",
            caption: "Dr Trefor Bazett explains Curl",
          },
          {
            embedId: "rB83DpBJQsE",
            caption: "Divergence and Curl by 3Blue1Brown",
          },
        ]}
      />
    </>
  );
};
const Laplacian = () => {
  return (
    <>
      <LaplacianText />
      <YouTubeVideo
        videos={[
          {
            embedId: "EW08rD-GFh0",
            caption: "Khan Academy explains the Laplacian",
          },
          {
            embedId: "XbCvGRjjzgg",
            caption: "Example of Laplacian Computation",
          },
        ]}
      />
    </>
  );
};
const SingleDoubleTripleIntegrals = () => {
  return (
    <>
      <SingleDoubleTripleIntegralsText />
      <YouTubeVideo
        videos={[
          {
            embedId: "85zGYB-34jQ",
            caption: "Khan Academy explains the Double Integral",
          },
          {
            embedId: "TdLD2Zh-nUQ",
            caption: "Visualising the Double Integral",
          },
          {
            embedId: "vr0sTKbV7lI",
            caption: "Khan Academy explains the Triple Integral",
          },
          {
            embedId: "vxQvL_WhBGU",
            caption: "Visualising the Triple Integral",
          },
        ]}
      />
    </>
  );
};
const LineIntegralsInVectorFields = () => {
  return (
    <>
      <LineIntegralsInVectorFieldsText />
      <YouTubeVideo
        videos={[
          {
            embedId: "WA5_a3C2iqY",
            caption: "Line Integral Intuition with Dr Trefor",
          },
        ]}
      />
    </>
  );
};
const SurfaceIntegralsInVectorFields = () => {
  return (
    <>
      <SurfaceIntegralsInVectorFieldsText />
      <YouTubeVideo
        videos={[
          {
            embedId: "9k97m8oWnaY",
            caption: "Introduction to Surface Integrals",
          },
          {
            embedId: "owKAHXf1y1A",
            caption: "Parametrizing Surfaces",
          },
        ]}
      />
    </>
  );
};
const FluxInVectorFields = () => {
  const { divergenceData, setDivergenceData } = useContext(LessonStoreContext);
  const [flux, setFlux] = useState(0);
  useEffect(() => {
    const eulerAngles = new THREE.Euler(
      (divergenceData.rotation_x / 180) * Math.PI,
      0,
      (divergenceData.rotation_z / 180) * Math.PI
    );
    const nVector = new THREE.Vector3(0, 1, 0);
    nVector.applyEuler(eulerAngles);
    if (divergenceData.direction == "X") {
      setFlux(5 * Math.PI * nVector.x);
    } else if (divergenceData.direction == "Y") {
      setFlux(5 * Math.PI * nVector.y);
    } else if (divergenceData.direction == "Z") {
      setFlux(5 * Math.PI * nVector.z);
    }
    console.log(divergenceData.normal);
  }, [divergenceData.normal, divergenceData.direction]);
  return (
    <>
      <FluxInVectorFieldsText />
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
          <Text>Vector Field Equation</Text>
          <InlineMath>{`F = 5${
            divergenceData.direction === "X"
              ? "i"
              : divergenceData.direction === "Y"
              ? "j"
              : "k"
          }`}</InlineMath>
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
          <Text>Flux through the Surface</Text>
          <InlineMath>{`\\nabla \\cdot F \\cdot \\widehat{n} = ${flux.toFixed(
            2
          )}`}</InlineMath>
        </VStack>
      </HStack>
      <YouTubeVideo
        videos={[
          {
            embedId: "ivg3dLTarbs",
            caption: "The Concept Flux",
          },
          {
            embedId: "sX9s0JiWATM",
            caption: "Flux Integrals",
          },
        ]}
      />
    </>
  );
};
const GreensTheorem = () => {
  return (
    <>
      <GreensTheoremText />
      <YouTubeVideo
        videos={[
          {
            embedId: "JB99RbQAilI",
            caption: "Green's Theorem, Curl and Circulation",
          },
        ]}
      />
    </>
  );
};
const DivergenceTheorem = () => {
  return (
    <>
      <DivergenceTheoremText />
      <YouTubeVideo
        videos={[
          {
            embedId: "pY4t-ikhzhU",
            caption: "Intuition behind Divergence Theorem",
          },
        ]}
      />
    </>
  );
};
const StokesTheorem = () => {
  return (
    <>
      <StokesTheoremText />
      <YouTubeVideo
        videos={[
          {
            embedId: "0UvNF_cfBJ4",
            caption: "Stoke's Theorem Intuition",
          },
        ]}
      />
      <br /> <br /> <br /> <br />
    </>
  );
};
