import { Html, Line, Text } from "@react-three/drei";
import React, { useState } from "react";
export default function Arrow({ i, j, k, x, y, color }) {
  const [hover, setHover] = useState(false);
  let degreeDeviation = Math.atan(j / i);
  //add pi rotation to mirror about y-axis if i vector is negative
  if (i < 0) {
    degreeDeviation = degreeDeviation + Math.PI;
  }

  return (
    <group
      rotation={[0, 0, degreeDeviation]}
      onPointerOver={() => {
        setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
    >
      {hover ? (
        <Html>
          <div
            style={{
              backgroundColor: "white",
              minWidth: 200,
              padding: 10,
              boxShadow: "2px 2px #525252",
              borderRadius: 5,
            }}
          >
            <p>
              Coordinate: [{x}, {y}]
              <br />
              Vector: <Vector text="u" /> = {i} <Vector text="i" />
              {j > 0 ? "+" : null} {j} <Vector text="j" />
              <br />
              Gradient: <span>&#8711;</span>
              <Vector text="u" />
            </p>
          </div>
        </Html>
      ) : null}
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

const Vector = ({ text }) => {
  return (
    <b>
      <i>{text}</i>
    </b>
  );
};
