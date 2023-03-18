import { Html, Line, Text } from "@react-three/drei";
import React, { useState } from "react";
import nerdamer from "nerdamer/all.min";

export default function Arrow({ i, j, k, x, y, color, formula }) {
  const [hover, setHover] = useState(false);
  let degreeDeviation = Math.atan(j / i);
  //add pi rotation to mirror about y-axis if i vector is negative
  if (i < 0) {
    degreeDeviation = degreeDeviation + Math.PI;
  }

  const getGradient = () => {
    const gradientX = nerdamer.diff(formula.i, "x", 1);
    const X = nerdamer(gradientX.toString(), { x: x, y: y }).toString();
    const gradientY = nerdamer.diff(formula.j, "y", 1);
    const Y = nerdamer(gradientY.toString(), { y: y, x: x }).toString();
    return (
      <>
        {X} <Vector text='i' /> + {Y} <Vector text='j' />
      </>
    );
  };
  const getDivergence = () => {
    const gradientX = nerdamer.diff(formula.i, "x", 1);
    const X = nerdamer(gradientX.toString(), { x: x, y: y }).toString();
    const gradientY = nerdamer.diff(formula.j, "y", 1);
    const Y = nerdamer(gradientY.toString(), { y: y, x: x }).toString();
    return parseFloat(X) + parseFloat(Y);
  };
  const getCurl = () => {
    let pdiffJwrtX = nerdamer.diff(formula.j, "x", 1);
    pdiffJwrtX = nerdamer(pdiffJwrtX.toString(), { x: x, y: y }).toString();
    let pdiffIwrtY = nerdamer.diff(formula.i, "y", 1);
    pdiffIwrtY = nerdamer(pdiffIwrtY.toString(), { y: y, x: x }).toString();
    return (
      <>
        {parseFloat(pdiffJwrtX) - parseFloat(pdiffIwrtY)} <Vector text='k' />
      </>
    );
  };
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
              minWidth: 250,
              padding: 10,
              boxShadow: "2px 2px #525252",
              borderRadius: 5,
            }}
          >
            <p>
              Coordinate: [{x}, {y}]
              <br />
              Vector: <Vector text='u' /> = {i} <Vector text='i' />
              {j > 0 ? "+" : null} {j} <Vector text='j' />
              <br />
              Gradient: <span>&#8711;</span>
              <Vector text='u' /> = {getGradient()}
              <br />
              Divergence: <span>&#8711;</span>.<Vector text='u' /> ={" "}
              {getDivergence()}
              <br />
              Curl: <span>&#8711;</span>x<Vector text='u' /> = {getCurl()}
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
