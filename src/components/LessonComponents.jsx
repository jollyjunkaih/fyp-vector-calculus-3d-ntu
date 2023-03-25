import { useThree, extend, useFrame } from "@react-three/fiber";
import React, { useState, useContext, useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buttonColor } from "../styles/Colours";
import { VStack, Button } from "@chakra-ui/react";
import { InlineMath } from "react-katex";
import nerdamer from "nerdamer/all.min";

import { Axes } from "./smaller_components/VectorFieldComponents";
import { LessonStoreContext } from "../context/lessonStore";

extend({ OrbitControls });

export const ScalarFieldVisual = () => {
  const { scalarValues } = useContext(LessonStoreContext);
  const { camera, gl } = useThree();

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Axes gridSize={6} />

      {scalarValues.map((val) => {
        return (
          <mesh key={JSON.stringify(val)} position={[val.x, val.y, val.z]}>
            <sphereGeometry args={[0.3, 2, 2]} />
            <meshBasicMaterial color={"#652B19"} />
          </mesh>
        );
      })}
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
              for (let x = -gridSize / 2; x < gridSize / 2 + 1; x = x + 0.2) {
                for (let z = -gridSize / 2; z < gridSize / 2 + 1; z = z + 0.2) {
                  newValueList.push({
                    x: x,
                    y: parseFloat(
                      nerdamer(scalarFormula, { x: x, z: z }).text("decimals")
                    ),
                    z: z,
                  });
                }
              }
              console.log(newValueList);
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

// export const VectorFieldVisual = () => {
//   const { scalarValues } = useContext(LessonStoreContext);
//   const { camera, gl } = useThree();

//   return (
//     <>
//       <orbitControls args={[camera, gl.domElement]} />
//       <directionalLight position={[1, 2, 3]} intensity={1.5} />
//       <ambientLight intensity={0.5} />
//       <Axes gridSize={6} />

//       {scalarValues.map((val) => {
//         return (
//           <mesh key={JSON.stringify(val)} position={[val.x, val.y, val.z]}>
//             <sphereGeometry args={[0.3, 2, 2]} />
//             <meshBasicMaterial color={"#652B19"} />
//           </mesh>
//         );
//       })}
//     </>
//   );
// };
