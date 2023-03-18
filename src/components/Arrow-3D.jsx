import { Html, Line, Text } from "@react-three/drei";
import React, { useState } from "react";
import nerdamer from "nerdamer/all.min";
import { Euler, Quaternion, Vector3 } from "three";
export default function Arrow({ i, j, k, x, y, z, color, formula }) {
  const [hover, setHover] = useState(false);
  const quat = new Quaternion();
  const vectorMagnitude = Math.sqrt(
    Math.pow(i, 2) + Math.pow(j, 2) + Math.pow(k, 2)
  );
  quat.setFromUnitVectors(
    new Vector3(1, 0, 0),
    new Vector3(i / vectorMagnitude, j / vectorMagnitude, k / vectorMagnitude)
  );
  const euler = new Euler();
  euler.setFromQuaternion(quat, "XYZ");
  const { _x, _y, _z } = euler;

  const getGradient = () => {
    const gradientX = nerdamer.diff(formula.i, "x", 1);
    const X = nerdamer(gradientX.toString(), { x: x, y: y, z: z }).toString();
    const gradientY = nerdamer.diff(formula.j, "y", 1);
    const Y = nerdamer(gradientY.toString(), { x: x, y: y, z: z }).toString();
    const gradientZ = nerdamer.diff(formula.k, "z", 1);
    const Z = nerdamer(gradientZ.toString(), { x: x, y: y, z: z }).toString();
    console.log();
    return (
      <>
        {X} <Vector text='i' /> + {Y} <Vector text='j' />+ {Z}
        <Vector text='k' />
      </>
    );
  };
  const getDivergence = () => {
    const gradientX = nerdamer.diff(formula.i, "x", 1);
    const X = nerdamer(gradientX.toString(), { x: x, y: y, z: z }).toString();
    const gradientY = nerdamer.diff(formula.j, "y", 1);
    const Y = nerdamer(gradientY.toString(), { x: x, y: y, z: z }).toString();
    const gradientZ = nerdamer.diff(formula.k, "z", 1);
    const Z = nerdamer(gradientZ.toString(), { x: x, y: y, z: z }).toString();
    return parseFloat(X) + parseFloat(Y) + parseFloat(Z);
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
      rotation={[_x, _y, _z]}
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
              Coordinate: [{x}, {y}, {z}]
              <br />
              Vector: <Vector text='u' /> = {i} <Vector text='i' />
              {j > 0 ? "+" : null} {j} <Vector text='j' /> {k > 0 ? "+" : null}{" "}
              {k} <Vector text='k' />
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
        <coneGeometry args={[0.08, 0.5]} />
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
