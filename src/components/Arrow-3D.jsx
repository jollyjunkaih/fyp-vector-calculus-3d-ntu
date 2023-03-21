import { Html, Line, Text } from "@react-three/drei";
import React, { useContext, useState } from "react";
import nerdamer from "nerdamer/all.min";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Euler, Quaternion, Vector3 } from "three";
import { StoreContext } from "../context/store";
export default function Arrow({ i, j, k, x, y, z, color, formula }) {
  const [hover, setHover] = useState(false);
  const [collision, setCollision] = useState(false);
  const quat = new Quaternion();
  const { planeOnly } = useContext(StoreContext);
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
    return (
      <>
        {X} <Vector text='i' />
        {Y >= 0 ? " + " : " "} {Y}
        <Vector text='j' />
        {Z >= 0 ? " + " : " "}
        {Z}
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
  //X,Y,Z are the coeffecients of the unit vectos; x,y,z represent the partial derivatives
  // so curl = (Zy-Yz)i + (Xz-Zx)j + (Yx-Xy)k
  const getCurl = () => {
    let Zy = nerdamer(nerdamer.diff(formula.k, "y", 1).toString(), {
      x: x,
      y: y,
      z: z,
    }).toString();
    let Yz = nerdamer(nerdamer.diff(formula.j, "z", 1).toString(), {
      x: x,
      y: y,
      z: z,
    }).toString();
    let Xz = nerdamer(nerdamer.diff(formula.i, "z", 1).toString(), {
      x: x,
      y: y,
      z: z,
    }).toString();
    let Zx = nerdamer(nerdamer.diff(formula.k, "x", 1).toString(), {
      x: x,
      y: y,
      z: z,
    }).toString();
    let Yx = nerdamer(nerdamer.diff(formula.j, "x", 1).toString(), {
      x: x,
      y: y,
      z: z,
    }).toString();
    let Xy = nerdamer(nerdamer.diff(formula.i, "y", 1).toString(), {
      x: x,
      y: y,
      z: z,
    }).toString();
    return (
      <>
        {parseFloat(Zy) - parseFloat(Yz)} <Vector text='i' />
        {parseFloat(Xz) - parseFloat(Zx) >= 0 ? " + " : " "}
        {parseFloat(Xz) - parseFloat(Zx)} <Vector text='j' />
        {parseFloat(Yx) - parseFloat(Xy) >= 0 ? " + " : " "}
        {parseFloat(Yx) - parseFloat(Xy)} <Vector text='k' />
      </>
    );
  };
  return (
    <RigidBody
      type='fixed'
      // gravityScale={0}
      // mass={0}
      rotation={[_x, _y, _z]}
      colliders={false}
      sensor={true}
      onIntersectionEnter={() => {
        setCollision(true);
      }}
      onIntersectionExit={() => setCollision(false)}
    >
      <CuboidCollider args={[0.8, 0.1, 0.1]} />
      {arrow(
        setHover,
        getCurl,
        getGradient,
        getDivergence,
        collision,
        planeOnly,
        hover,
        x,
        y,
        z,
        i,
        j,
        k,
        color
      )}
    </RigidBody>
  );
}

const Vector = ({ text }) => {
  return (
    <b>
      <i>{text}</i>
    </b>
  );
};

const arrow = (
  setHover,
  getCurl,
  getGradient,
  getDivergence,
  collision,
  planeOnly,
  hover,
  x,
  y,
  z,
  i,
  j,
  k,
  color
) => {
  if (planeOnly) {
    if (collision)
      return (
        <group
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
                  {j >= 0 ? " +" : null} {j} <Vector text='j' />
                  {k >= 0 ? " +" : null} {k} <Vector text='k' />
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
              [0.5, 0, 0],
              [-0.6, 0, 0],
            ]}
            color={collision ? "green" : color}
            lineWidth={5}
          />
          <mesh rotation-z={Math.PI * 1.5} position={[0.5, 0, 0]}>
            <coneGeometry args={[0.08, 0.5]} />
            <meshStandardMaterial color={collision ? "green" : color} />
          </mesh>
        </group>
      );
    else return <></>;
  } else {
    return (
      <group
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
                {j >= 0 ? " +" : null} {j} <Vector text='j' />
                {k >= 0 ? " +" : null} {k} <Vector text='k' />
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
            [0.5, 0, 0],
            [-0.6, 0, 0],
          ]}
          color={collision ? "green" : color}
          lineWidth={5}
        />
        <mesh rotation-z={Math.PI * 1.5} position={[0.5, 0, 0]}>
          <coneGeometry args={[0.08, 0.5]} />
          <meshStandardMaterial color={collision ? "green" : color} />
        </mesh>
      </group>
    );
  }
};
