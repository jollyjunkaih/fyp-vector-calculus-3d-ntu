import { Html, Line, Text } from "@react-three/drei";
import React from "react";
export default function Arrow({ i, j, k, color }) {
  let degreeDeviation = Math.atan(j / i);
  //add pi rotation to mirror about y-axis if i vector is negative
  if (i < 0) {
    degreeDeviation = degreeDeviation + Math.PI;
  }
  return (
    <group rotation={[0, 0, degreeDeviation]}>
      <Line
        points={[
          [0.2, 0, 0],
          [-0.2, 0, 0],
        ]}
        color={color}
        lineWidth={5}
      />
      <mesh rotation-z={Math.PI * 1.5} position={[0.3, 0, 0]}>
        <coneGeometry args={[0.1, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
