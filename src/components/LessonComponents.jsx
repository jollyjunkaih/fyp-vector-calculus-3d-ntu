import { useThree, extend, useFrame } from "@react-three/fiber";
import React, { useState, useContext } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buttonColor } from "../styles/Colours";
import { VStack, Button, Text } from "@chakra-ui/react";
import { InlineMath } from "react-katex";
import nerdamer from "nerdamer/all.min";
import { Html } from "@react-three/drei";
import { FormulaDisplay } from "../components/smaller_components/SideMenuComponents";
import { ArrowMesh } from "./smaller_components/Arrow-3D";
import { Axes } from "./smaller_components/VectorFieldComponents";
import { LessonStoreContext } from "../context/lessonStore";
import { useFormula } from "../utils/helperFunctions";
extend({ OrbitControls });

export const ScalarFieldVisual = () => {
  const { scalarValues, gridSize } = useContext(LessonStoreContext);
  const { camera, gl } = useThree();

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
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
  const { camera, gl } = useThree();
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
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
