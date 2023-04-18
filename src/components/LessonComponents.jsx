import { useThree, extend, useFrame } from "@react-three/fiber";
import React, { useState, useContext, useEffect, useRef } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { buttonColor } from "../styles/Colours";
import {
  VStack,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { InlineMath } from "react-katex";
import nerdamer from "nerdamer/all.min";
import { Html } from "@react-three/drei";
import { FormulaDisplay } from "../components/smaller_components/SideMenuComponents";
import { ArrowMesh } from "./smaller_components/Arrow-3D";
import { Axes } from "./smaller_components/VectorFieldComponents";
import { LessonStoreContext } from "../context/lessonStore";
import { useFormula } from "../utils/helperFunctions";
import * as THREE from "three";

export const ScalarFieldVisual = () => {
  const { scalarValues, gridSize } = useContext(LessonStoreContext);

  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Axes gridSize={gridSize} />

      {scalarValues.map((val) => {
        return (
          <ScalarFieldPoint
            key={JSON.stringify(val)}
            x={val.x}
            y={val.y}
            z={val.z}
          />
        );
      })}
    </>
  );
};

const ScalarFieldPoint = ({ x, y, z, key }) => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <mesh
        onPointerOver={() => {
          setHover(true);
        }}
        onPointerLeave={() => setHover(false)}
        key={key}
        position={[x, y, z]}
      >
        <sphereGeometry args={[0.2, 5, 5]} />
        <meshBasicMaterial color={"#652B19"} />
      </mesh>
      {hover ? (
        <Html>
          <div
            style={{
              backgroundColor: "white",
              minWidth: 250,
              padding: 10,
              boxShadow: "2px 2px #525252",
              borderRadius: 5,
            }}
          >
            <p>
              Coordinate: [{x.toFixed(1)},{z.toFixed(1)}]
              <br />
              Height: {y.toFixed(2)}
            </p>
          </div>
        </Html>
      ) : null}
    </>
  );
};

export const ScalarFieldFormulaDisplay = () => {
  const { scalarFormula, setScalarValues, gridSize } =
    useContext(LessonStoreContext);
  try {
    return (
      <VStack>
        <InlineMath>{`y(x,z) = ${nerdamer.convertToLaTeX(
          scalarFormula
        )}`}</InlineMath>
        <Button
          onClick={() => {
            try {
              const newValueList = [];
              for (let x = -gridSize / 2; x < gridSize / 2 + 1; x = x + 0.3) {
                for (let z = -gridSize / 2; z < gridSize / 2 + 1; z = z + 0.3) {
                  newValueList.push({
                    x: x,
                    y: parseFloat(
                      nerdamer(scalarFormula, { x: x, z: z }).text("decimals")
                    ),
                    z: z,
                  });
                }
              }
              setScalarValues(newValueList);
            } catch (e) {
              console.log(e);
            }
          }}
          color={buttonColor}
          alignSelf={"start"}
        >
          Generate
        </Button>
      </VStack>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const VectorFieldFormulaDisplay = () => {
  const { vectorFieldFormula, gridSize, setVectorFieldData } =
    useContext(LessonStoreContext);
  const onUpdate = () => {
    try {
      if (
        vectorFieldFormula.i &&
        vectorFieldFormula.j &&
        vectorFieldFormula.k
      ) {
        const newValueList = [];
        for (let x = -gridSize / 2; x < gridSize / 2 + 1; x++) {
          for (let y = -gridSize / 2; y < gridSize / 2 + 1; y++) {
            for (let z = -gridSize / 2; z < gridSize / 2 + 1; z++) {
              newValueList.push({
                i: useFormula(x, y, z, vectorFieldFormula.i),
                j: useFormula(x, y, z, vectorFieldFormula.j),
                k: useFormula(x, y, z, vectorFieldFormula.k),
                x: x,
                y: y,
                z: z,
              });
            }
          }
        }
        setVectorFieldData(newValueList);
      }
    } catch (e) {
      console.log(e);
      setVectorFieldData([]);
    }
  };
  try {
    return (
      <>
        <FormulaDisplay vectorFormula={vectorFieldFormula} />
        <Button
          marginTop={2}
          width={"fit-content"}
          onClick={onUpdate}
          color={buttonColor}
        >
          Generate
        </Button>
      </>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const VectorFieldVisual = () => {
  const { vectorFieldData, gridSize, vectorFieldFormula } =
    useContext(LessonStoreContext);
  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Axes gridSize={gridSize} />

      {vectorFieldData.map((data) => {
        const { x, y, z, i, j, k } = data;
        return (
          <mesh position={[x, y, z]} key={JSON.stringify(data)}>
            <ArrowMesh
              vectorFormula={vectorFieldFormula}
              x={x}
              y={y}
              z={z}
              i={i}
              j={j}
              k={k}
              playground={false}
            />
          </mesh>
        );
      })}
    </>
  );
};

export const DivergenceVisual = () => {
  const { divergenceData, setDivergenceData, gridSize } =
    useContext(LessonStoreContext);
  const [grid, setGrid] = useState([]);
  const shapeRef = useRef();
  useEffect(() => {
    const array1 = [];
    for (let i = -(gridSize - 4) / 2; i <= (gridSize - 4) / 2; i++) {
      for (let j = -(gridSize - 4) / 2; j <= (gridSize - 4) / 2; j++) {
        for (let k = -(gridSize - 4) / 2; k <= (gridSize - 4) / 2; k++) {
          array1.push({ x: i, y: j, z: k });
        }
      }
    }
    setGrid(array1);
  }, []);
  useEffect(() => {
    const eulerAngles = new THREE.Euler(
      (divergenceData.rotation_x / 180) * Math.PI,
      0,
      (divergenceData.rotation_z / 180) * Math.PI
    );
    const nVector = new THREE.Vector3(0, 1, 0);
    nVector.applyEuler(eulerAngles);
    setDivergenceData({
      ...divergenceData,
      normal: `${nVector.x.toFixed(2)}i+(${nVector.y.toFixed(
        2
      )})j+(${nVector.z.toFixed(2)})k`,
    });
    const { _w, _x, _y, _z } = new THREE.Quaternion().setFromEuler(eulerAngles);
    const quat = { w: _w, x: _x, y: _y, z: _z };
    shapeRef.current.rotation.x = quat.x;
    shapeRef.current.rotation.y = quat.y;
    shapeRef.current.rotation.z = quat.z;
  }, [divergenceData.rotation_x, divergenceData.rotation_z]);
  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Axes gridSize={gridSize} />
      <mesh ref={shapeRef}>
        <cylinderGeometry args={[1, 1, 0.05]} />
        <meshStandardMaterial side={THREE.DoubleSide} color='greenyellow' />
      </mesh>
      {grid.map((data) => {
        const { x, y, z } = data;

        if (divergenceData.direction == "X")
          return (
            <mesh position={[x, y, z]} key={JSON.stringify(data)}>
              <ArrowMesh
                vectorFormula={""}
                x={x}
                y={y}
                z={z}
                i={5}
                j={0}
                k={0}
                playground={false}
              />
            </mesh>
          );
        else if (divergenceData.direction == "Y")
          return (
            <mesh position={[x, y, z]} key={JSON.stringify(data)}>
              <ArrowMesh
                vectorFormula={""}
                x={x}
                y={y}
                z={z}
                i={0}
                j={5}
                k={0}
                playground={false}
              />
            </mesh>
          );
        else if (divergenceData.direction == "Z")
          return (
            <mesh position={[x, y, z]} key={JSON.stringify(data)}>
              <ArrowMesh
                vectorFormula={""}
                x={x}
                y={y}
                z={z}
                i={0}
                j={0}
                k={5}
                playground={false}
              />
            </mesh>
          );
      })}
    </>
  );
};

export const CurlVisual = () => {
  const { curlVectorFieldData, gridSize, curlVectorFieldFormula, texture } =
    useContext(LessonStoreContext);
  const sphere = useRef();
  const { camera, gl } = useThree();
  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Axes gridSize={gridSize} />

      {/* {curlVectorFieldData.length ? (
        <>
          <TransformControls object={sphere} />
          <mesh ref={sphere}>
            <sphereGeometry />
            <meshStandardMaterial />
          </mesh>
        </>
      ) : null} */}
      {curlVectorFieldData.map((data) => {
        const { x, y, z, i, j, k } = data;
        return (
          <mesh position={[x, y, z]} key={JSON.stringify(data)}>
            <ArrowMesh
              vectorFormula={curlVectorFieldFormula}
              x={x}
              y={y}
              z={z}
              i={i}
              j={j}
              k={k}
              playground={false}
              curl={true}
              texture={texture}
            />
          </mesh>
        );
      })}
    </>
  );
};
export const CurlFormulaDisplay = () => {
  const { curlVectorFieldFormula, gridSize, setCurlVectorFieldData } =
    useContext(LessonStoreContext);
  const onUpdate = () => {
    try {
      if (
        curlVectorFieldFormula.i &&
        curlVectorFieldFormula.j &&
        curlVectorFieldFormula.k
      ) {
        const newValueList = [];
        for (let x = -gridSize / 2; x < gridSize / 2 + 1; x++) {
          for (let y = -gridSize / 2; y < gridSize / 2 + 1; y++) {
            for (let z = -gridSize / 2; z < gridSize / 2 + 1; z++) {
              newValueList.push({
                i: useFormula(x, y, z, curlVectorFieldFormula.i),
                j: useFormula(x, y, z, curlVectorFieldFormula.j),
                k: useFormula(x, y, z, curlVectorFieldFormula.k),
                x: x,
                y: y,
                z: z,
              });
            }
          }
        }
        setCurlVectorFieldData(newValueList);
      }
    } catch (e) {
      console.log(e);
      setCurlVectorFieldData([]);
    }
  };
  try {
    return (
      <>
        <FormulaDisplay vectorFormula={curlVectorFieldFormula} />
        <Button
          marginTop={2}
          width={"fit-content"}
          onClick={onUpdate}
          color={buttonColor}
        >
          Generate
        </Button>
      </>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const RotationSlider = ({ text, value, state, setState }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <VStack width={"90%"} height={16}>
      <Text alignSelf={"start"} minWidth={"fit-content"} marginRight={5}>
        {text}
      </Text>
      <Slider
        min={-90}
        max={90}
        value={value}
        aria-label='slider-ex-1'
        val={sliderValue}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={(val) => {
          setSliderValue(val);
          if (text === "x-axis") {
            setState({
              ...state,
              rotation_x: parseInt(val),
            });
          } else if (text === "y-axis") {
            setState({
              ...state,
              rotation_y: parseInt(val),
            });
          } else if (text === "z-axis") {
            setState({ ...state, rotation_z: parseInt(val) });
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
    </VStack>
  );
};
