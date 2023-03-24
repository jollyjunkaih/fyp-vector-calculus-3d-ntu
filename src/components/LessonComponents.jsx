import { useThree, extend, useFrame } from "@react-three/fiber";
import React, { useState, useContext, useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Html, Line, Circle } from "@react-three/drei";
import Arrow from "./smaller_components/Arrow-3D";
import { Shape } from "./smaller_components/Shapes";

extend({ OrbitControls });

export const ScalarField = () => {
  return (
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
        position: [11, 6, 15],
      }}
    >
      <ThreeDVectorField />
    </Canvas>
  );
};
