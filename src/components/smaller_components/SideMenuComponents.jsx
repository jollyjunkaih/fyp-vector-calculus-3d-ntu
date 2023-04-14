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
  getCurlThroughCircularSurface,
  getLineIntegralCircle,
  getFluxThroughSquareSurface,
  getCurlThroughSquareSurface,
  getLineIntegralSquare,
  getSquareEquation,
  getSphereEquation,
  getCubeEquation,
  getFluxThroughSphericalSurface,
  getCurlThroughSphericalSurface,
  getFlux,
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
          if (!val) {
            return;
          }
          try {
            nerdamer.convertToLaTeX(val);
            if (vector === "i") {
              setVectorFormula({ ...vectorFormula, i: val.target.value });
            } else if (vector === "j") {
              setVectorFormula({ ...vectorFormula, j: val.target.value });
            } else if (vector === "k") {
              setVectorFormula({ ...vectorFormula, k: val.target.value });
            }
          } catch (e) {
            console.log(e);
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
const CenterInput = ({ vector, value }) => {
  const { shape, setShape } = useContext(PlaygroundStoreContext);
  return (
    <HStack width={"25%"} position={"relative"}>
      <NumberInput
        size={"sm"}
        width={"100%"}
        value={value || 0}
        onChange={(val) => {
          if (val != "" && val !== "-") {
            if (vector === "i") {
              if (shape.shapeType === "Circle") {
                setShape({
                  ...shape,
                  circleFormula: {
                    ...shape.circleFormula,
                    center_x: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Square") {
                setShape({
                  ...shape,
                  squareFormula: {
                    ...shape.squareFormula,
                    center_x: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Sphere") {
                setShape({
                  ...shape,
                  sphereFormula: {
                    ...shape.sphereFormula,
                    center_x: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Cube") {
                setShape({
                  ...shape,
                  cubeFormula: {
                    ...shape.cubeFormula,
                    center_x: parseInt(val),
                  },
                });
              }
            } else if (vector === "j") {
              if (shape.shapeType === "Circle") {
                setShape({
                  ...shape,
                  circleFormula: {
                    ...shape.circleFormula,
                    center_y: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Square") {
                setShape({
                  ...shape,
                  squareFormula: {
                    ...shape.squareFormula,
                    center_y: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Sphere") {
                setShape({
                  ...shape,
                  sphereFormula: {
                    ...shape.sphereFormula,
                    center_y: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Cube") {
                setShape({
                  ...shape,
                  cubeFormula: {
                    ...shape.cubeFormula,
                    center_y: parseInt(val),
                  },
                });
              }
            } else if (vector === "k") {
              if (shape.shapeType === "Circle") {
                setShape({
                  ...shape,
                  circleFormula: {
                    ...shape.circleFormula,
                    center_z: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Square") {
                setShape({
                  ...shape,
                  squareFormula: {
                    ...shape.squareFormula,
                    center_z: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Sphere") {
                setShape({
                  ...shape,
                  sphereFormula: {
                    ...shape.sphereFormula,
                    center_z: parseInt(val),
                  },
                });
              } else if (shape.shapeType === "Cube") {
                setShape({
                  ...shape,
                  cubeFormula: {
                    ...shape.cubeFormula,
                    center_z: parseInt(val),
                  },
                });
              }
            }
          }
        }}
        min={-5}
        max={5}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Container
        position={"absolute"}
        width={0}
        bottom={"3px"}
        right={"25px"}
        display={"inline"}
      >
        <Vector text={vector} />
      </Container>
    </HStack>
    //   <Input
    //     type='number'
    //     value={value || 0}

    //   />
    //
  );
};

const RotationSlider = ({ text, value }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const { shape, setShape } = useContext(PlaygroundStoreContext);

  return (
    <HStack width={"100%"} height={8}>
      <Text minWidth={"fit-content"} marginRight={5}>
        {text}
      </Text>
      <Slider
        min={-90}
        max={90}
        value={value}
        aria-label='slider-ex-1'
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={(val) => {
          setSliderValue(val);
          if (text === "x-axis") {
            if (shape.shapeType === "Circle") {
              setShape({
                ...shape,
                circleFormula: {
                  ...shape.circleFormula,
                  rotation_x: parseInt(val),
                },
              });
            } else if (shape.shapeType === "Square") {
              setShape({
                ...shape,
                squareFormula: {
                  ...shape.squareFormula,
                  rotation_x: parseInt(val),
                },
              });
            } else if (shape.shapeType === "Cube") {
              setShape({
                ...shape,
                cubeFormula: {
                  ...shape.cubeFormula,
                  rotation_x: parseInt(val),
                },
              });
            }
          } else if (text === "y-axis") {
            if (shape.shapeType === "Circle") {
              setShape({
                ...shape,
                circleFormula: {
                  ...shape.circleFormula,
                  rotation_y: parseInt(val),
                },
              });
            } else if (shape.shapeType === "Square") {
              setShape({
                ...shape,
                squareFormula: {
                  ...shape.squareFormula,
                  rotation_y: parseInt(val),
                },
              });
            } else if (shape.shapeType === "Cube") {
              setShape({
                ...shape,
                cubeFormula: {
                  ...shape.cubeFormula,
                  rotation_y: parseInt(val),
                },
              });
            }
          } else if (text === "z-axis") {
            if (shape.shapeType === "Circle") {
              setShape({
                ...shape,
                circleFormula: {
                  ...shape.circleFormula,
                  rotation_z: parseInt(val),
                },
              });
            } else if (shape.shapeType === "Square") {
              setShape({
                ...shape,
                squareFormula: {
                  ...shape.squareFormula,
                  rotation_z: parseInt(val),
                },
              });
            } else if (shape.shapeType === "Cube") {
              setShape({
                ...shape,
                cubeFormula: {
                  ...shape.cubeFormula,
                  rotation_z: parseInt(val),
                },
              });
            }
          }
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
  else if (shape.shapeType === "Square") return <SquareOptions />;
  else if (shape.shapeType === "Sphere") return <SphereOptions />;
  else if (shape.shapeType === "Cube") return <CubeOptions />;
};

const CircleOptions = () => {
  const { shape, setShape, planeOnly, setPlaneOnly, vectorFormula } =
    useContext(PlaygroundStoreContext);
  const [planeVector1, setPlaneVector1] = useState(new THREE.Vector3(0, 0, 1));
  const [planeVector2, setPlaneVector2] = useState(new THREE.Vector3(1, 0, 0));
  const [normalVector, setNormalVector] = useState(new THREE.Vector3(0, 1, 0));
  const [circleEquation, setCircleEquation] = useState({});
  const { circleFormula } = shape;
  const radius = circleFormula.radius || 1;
  const center_x = circleFormula.center_x || 0;
  const center_y = circleFormula.center_y || 0;
  const center_z = circleFormula.center_z || 0;
  const rotation_x = circleFormula.rotation_x || 0;
  const rotation_y = circleFormula.rotation_y || 0;
  const rotation_z = circleFormula.rotation_z || 0;
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
    setCircleEquation({
      x: getCircleEquation(planeVector1.x, planeVector2.x, center_x),
      y: getCircleEquation(planeVector1.y, planeVector2.y, center_y),
      z: getCircleEquation(planeVector1.z, planeVector2.z, center_z),
    });
  }, [
    planeVector1.x,
    planeVector1.y,
    planeVector1.z,
    planeVector2.x,
    planeVector2.y,
    planeVector2.z,
    center_x,
    center_y,
    center_z,
  ]);
  return (
    <VStack alignItems={"start"} minHeight={"fit-content"}>
      <HStack width={"100%"} justifyContent={"space-between"} marginTop={2}>
        <Text mb='8px'>Radius</Text>

        <NumberInput
          size={"sm"}
          value={radius}
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

        <CenterInput vector='i' value={center_x} />
        <CenterInput vector='j' value={center_y} />
        <CenterInput vector='k' value={center_z} />
      </HStack>
      <Text>Rotation</Text>
      <RotationSlider text={"x-axis"} value={rotation_x} />
      <RotationSlider text={"y-axis"} value={rotation_y} />
      <RotationSlider text={"z-axis"} value={rotation_z} />
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

      <InlineMath>{`x(θ,r) = ${circleEquation.x}`}</InlineMath>
      <InlineMath>{`y(θ,r) = ${circleEquation.y}`}</InlineMath>
      <InlineMath>{`z(θ,r) = ${circleEquation.z}`}</InlineMath>
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
          circleEquation
        )}`}</InlineMath>
      </Text>
      <Text>
        Curl:{" "}
        <InlineMath>{`\\iint_S \\nabla \\times f \\cdot\\widehat{n}\\cdot dA = ${getCurlThroughCircularSurface(
          vectorFormula,
          normalVector,
          radius,
          circleEquation
        )}`}</InlineMath>
        {"  "}
        <InlineMath>{"\\widehat{n}"}</InlineMath>
      </Text>
      <Text>
        Line Integral:{" "}
        <InlineMath>{`\\oint f \\cdot d \\widehat{r}= ${getLineIntegralCircle(
          vectorFormula,
          normalVector,
          radius,
          circleEquation
        )}`}</InlineMath>
      </Text>
    </VStack>
  );
};
const SquareOptions = () => {
  const { shape, setShape, planeOnly, setPlaneOnly, vectorFormula } =
    useContext(PlaygroundStoreContext);
  const [normalVector, setNormalVector] = useState(new THREE.Vector3(0, 1, 0));
  const [squareEquation, setSquareEquation] = useState({});
  const { squareFormula } = shape;
  const length = squareFormula.length || 1;
  const center_x = squareFormula.center_x || 0;
  const center_y = squareFormula.center_y || 0;
  const center_z = squareFormula.center_z || 0;
  const rotation_x = squareFormula.rotation_x || 0;
  const rotation_y = squareFormula.rotation_y || 0;
  const rotation_z = squareFormula.rotation_z || 0;
  useEffect(() => {
    const eulerAngles = new THREE.Euler(
      (rotation_x / 180) * Math.PI,
      (rotation_y / 180) * Math.PI,
      (rotation_z / 180) * Math.PI
    );
    const v3 = new THREE.Vector3(0, 1, 0);
    v3.applyEuler(eulerAngles);
    setNormalVector(v3);
    //getting boundary of square
    const vec1 = new THREE.Vector3(1, 0, 1);
    const vec2 = new THREE.Vector3(1, 0, -1);
    const vec3 = new THREE.Vector3(-1, 0, -1);
    const vec4 = new THREE.Vector3(-1, 0, 1);
    vec1.applyEuler(eulerAngles);
    vec2.applyEuler(eulerAngles);
    vec3.applyEuler(eulerAngles);
    vec4.applyEuler(eulerAngles);
    const vertices_x = [0, 0, 0, 0];
    const vertices_y = [0, 0, 0, 0];
    const vertices_z = [0, 0, 0, 0];
    for (let i = 1; i <= 4; i++) {
      vertices_x.push(vec1.x);
      vertices_x.push(vec2.x);
      vertices_x.push(vec3.x);
      vertices_x.push(vec4.x);
      vertices_y.push(vec1.y);
      vertices_y.push(vec2.y);
      vertices_y.push(vec3.y);
      vertices_y.push(vec4.y);
      vertices_z.push(vec1.z);
      vertices_z.push(vec2.z);
      vertices_z.push(vec3.z);
      vertices_z.push(vec4.z);
    }
    setShape({
      ...shape,
      squareFormula: {
        ...squareFormula,
        max_X: parseFloat(Math.max(...vertices_x).toFixed(2)),
        max_Y: parseFloat(Math.max(...vertices_y).toFixed(2)),
        max_Z: parseFloat(Math.max(...vertices_z).toFixed(2)),
        min_X: parseFloat(Math.min(...vertices_x).toFixed(2)),
        min_Y: parseFloat(Math.min(...vertices_y).toFixed(2)),
        min_Z: parseFloat(Math.min(...vertices_z).toFixed(2)),
      },
    });
  }, [rotation_x, rotation_y, rotation_z]);
  useEffect(() => {
    setSquareEquation(
      getSquareEquation(normalVector, center_x, center_y, center_z)
    );
  }, [
    normalVector.x,
    normalVector.y,
    normalVector.z,
    center_x,
    center_y,
    center_z,
  ]);
  return (
    <VStack alignItems={"start"} minHeight={"fit-content"}>
      <HStack width={"100%"} justifyContent={"space-between"} marginTop={2}>
        <Text mb='8px'>Half-Length</Text>
        <NumberInput
          size={"sm"}
          value={length}
          onChange={(val) =>
            setShape({
              ...shape,
              squareFormula: {
                ...shape.squareFormula,
                length: parseInt(val),
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
        <CenterInput vector='i' value={center_x} />
        <CenterInput vector='j' value={center_y} />
        <CenterInput vector='k' value={center_z} />
      </HStack>
      <Text>Rotation</Text>
      <RotationSlider text={"x-axis"} value={rotation_x} />
      <RotationSlider text={"y-axis"} value={rotation_y} />
      <RotationSlider text={"z-axis"} value={rotation_z} />
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
        Equation of Square:
      </Text>
      <InlineMath>{`${squareEquation} = 0`}</InlineMath>
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
        <InlineMath>{`\\iint_S f \\cdot\\widehat{n}\\cdot dA = ${getFluxThroughSquareSurface(
          vectorFormula,
          normalVector,
          length,
          squareFormula
        )}`}</InlineMath>
      </Text>
      <Text>
        Curl:{" "}
        <InlineMath>{`\\iint_S \\nabla \\times f \\cdot\\widehat{n}\\cdot dA = ${getCurlThroughSquareSurface(
          vectorFormula,
          normalVector,
          length,
          squareFormula
        )}`}</InlineMath>
      </Text>
      <Text>
        Line Integral:{" "}
        <InlineMath>{`\\oint f \\cdot d \\widehat{r} = ${getLineIntegralSquare(
          vectorFormula,
          squareFormula
        )}`}</InlineMath>
      </Text>
    </VStack>
  );
};

const SphereOptions = () => {
  const { shape, setShape, planeOnly, setPlaneOnly, vectorFormula } =
    useContext(PlaygroundStoreContext);

  const [sphereEquation, setSphereEquation] = useState({});
  const { sphereFormula } = shape;
  const radius = sphereFormula.radius || 1;
  const center_x = sphereFormula.center_x || 0;
  const center_y = sphereFormula.center_y || 0;
  const center_z = sphereFormula.center_z || 0;

  useEffect(() => {
    setSphereEquation(getSphereEquation(center_x, center_y, center_z, radius));
  }, [center_x, center_y, center_z, radius]);
  return (
    <VStack alignItems={"start"} minHeight={"fit-content"}>
      <HStack width={"100%"} justifyContent={"space-between"} marginTop={2}>
        <Text mb='8px'>Radius</Text>
        <NumberInput
          size={"sm"}
          value={radius}
          onChange={(val) =>
            setShape({
              ...shape,
              sphereFormula: {
                ...shape.sphereFormula,
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
        <CenterInput vector='i' value={center_x} />
        <CenterInput vector='j' value={center_y} />
        <CenterInput vector='k' value={center_z} />
      </HStack>
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
        Equation of Sphere:
      </Text>
      <InlineMath>{sphereEquation}</InlineMath>
      <Text fontSize={"lg"} as='b'>
        Properties:
      </Text>
      <Text>
        Flux:{" "}
        <InlineMath>{`\\iint_S f \\cdot\\widehat{n}\\cdot dA = ${getFluxThroughSphericalSurface(
          vectorFormula,
          radius,
          sphereFormula
        )}`}</InlineMath>
      </Text>
      <Text>
        Curl:{" "}
        <InlineMath>{`\\iint_S \\nabla \\times f \\cdot\\widehat{n}\\cdot dA = ${getCurlThroughSphericalSurface(
          vectorFormula,
          radius,
          sphereFormula
        )}`}</InlineMath>
      </Text>
    </VStack>
  );
};

const CubeOptions = () => {
  const { shape, setShape, planeOnly, setPlaneOnly, vectorFormula } =
    useContext(PlaygroundStoreContext);
  // const [planeVector1, setPlaneVector1] = useState(new THREE.Vector3(0, 0, 1));
  // const [planeVector2, setPlaneVector2] = useState(new THREE.Vector3(1, 0, 0));
  const [normalVector, setNormalVector] = useState(new THREE.Vector3(0, 1, 0));
  const [cubeEquation, setCubeEquation] = useState({});
  const { cubeFormula } = shape;
  const length = cubeFormula.length || 1;
  const center_x = cubeFormula.center_x || 0;
  const center_y = cubeFormula.center_y || 0;
  const center_z = cubeFormula.center_z || 0;
  const rotation_x = cubeFormula.rotation_x || 0;
  const rotation_y = cubeFormula.rotation_y || 0;
  const rotation_z = cubeFormula.rotation_z || 0;
  useEffect(() => {
    const eulerAngles = new THREE.Euler(
      (rotation_x / 180) * Math.PI,
      (rotation_y / 180) * Math.PI,
      (rotation_z / 180) * Math.PI
    );

    const v3 = new THREE.Vector3(0, 1, 0);

    v3.applyEuler(eulerAngles);

    setNormalVector(v3);
  }, [rotation_x, rotation_y, rotation_z]);
  useEffect(() => {
    setCubeEquation(
      getCubeEquation(normalVector, center_x, center_y, center_z)
    );
  }, [
    normalVector.x,
    normalVector.y,
    normalVector.z,
    center_x,
    center_y,
    center_z,
  ]);
  return (
    <VStack alignItems={"start"} minHeight={"fit-content"}>
      <HStack width={"100%"} justifyContent={"space-between"} marginTop={2}>
        <Text mb='8px'>Half-Length</Text>

        <NumberInput
          size={"sm"}
          value={length}
          onChange={(val) =>
            setShape({
              ...shape,
              cubeFormula: {
                ...shape.cubeFormula,
                length: parseInt(val),
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

        <CenterInput vector='i' value={center_x} />
        <CenterInput vector='j' value={center_y} />
        <CenterInput vector='k' value={center_z} />
      </HStack>
      <Text>Rotation</Text>
      <RotationSlider text={"x-axis"} value={rotation_x} />
      <RotationSlider text={"y-axis"} value={rotation_y} />
      <RotationSlider text={"z-axis"} value={rotation_z} />
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
        Equation of Cube:
      </Text>

      <InlineMath>{`${cubeEquation} = 0`}</InlineMath>

      <Text fontSize={"lg"} as='b'>
        Properties:
      </Text>
      {/* <Text>
        Normal:{" "}
        <InlineMath>{`\\widehat{n}= ${normalVector.x.toFixed(
          2
        )}i + ${normalVector.y.toFixed(2)}j + ${normalVector.z.toFixed(
          2
        )}k`}</InlineMath>
      </Text> */}
      <Text>
        {/* Flux:{" "}
        <InlineMath>{`\\iint_S f \\cdot\\widehat{n}\\cdot dA = ${getFluxThroughCircularSurface(
          vectorFormula,
          normalVector,
          radius,
          circleFormula
        )}`}</InlineMath>
      </Text>
      <Text>
        Curl:{" "}
        <InlineMath>{`\\iint_S \\nabla \\times f \\cdot\\widehat{n}\\cdot dA = ${getCurlThroughCircularSurface(
          vectorFormula,
          normalVector,
          radius,
          circleFormula
        )}`}</InlineMath>
      </Text>
      <Text>
        Line Integral:{" "}
        <InlineMath>{`\\iint_S \\nabla \\times f \\cdot\\widehat{n}\\cdot dA = ${getLineIntegralCircle(
          vectorFormula,
          radius,
          circleFormula
        )}`}</InlineMath> */}
      </Text>
    </VStack>
  );
};
