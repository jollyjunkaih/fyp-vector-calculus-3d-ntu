import { Html, Line } from "@react-three/drei";
import React from "react";

export const Axes = ({ gridSize }) => {
  const axesColor = "red";
  return (
    <group>
      <mesh position={[gridSize / 2 + 2, 0, 0]} rotation-z={Math.PI * 1.5}>
        <coneGeometry args={[0.1, 0.5]} />
        <meshStandardMaterial color={axesColor} />
        <Html style={{ color: axesColor }} position={[0, 0.5, 0]}>
          X
        </Html>
      </mesh>
      <Line
        points={[
          [-gridSize / 2 - 2, 0, 0],
          [gridSize / 2 + 2, 0, 0],
        ]}
        color={axesColor}
        lineWidth={5}
      />
      <mesh position={[0, gridSize / 2 + 2, 0]}>
        <coneGeometry args={[0.1, 0.5]} />
        <meshStandardMaterial color={axesColor} />
        <Html style={{ color: axesColor }} position={[0, 0.5, 0]}>
          Y
        </Html>
      </mesh>

      <Line
        points={[
          [0, -gridSize / 2 - 2, 0],
          [0, gridSize / 2 + 2, 0],
        ]}
        color={axesColor}
        lineWidth={5}
      />
      <mesh position={[0, 0, gridSize / 2 + 2]} rotation-x={Math.PI * 0.5}>
        <coneGeometry args={[0.1, 0.5]} />
        <meshStandardMaterial color={axesColor} />
        <Html style={{ color: axesColor }} position={[0, 0, 0.5]}>
          Z
        </Html>
      </mesh>

      <Line
        points={[
          [0, 0, -gridSize / 2 - 2],
          [0, 0, gridSize / 2 + 2],
        ]}
        color={axesColor}
        lineWidth={5}
      />
    </group>
  );
};
