import { Html, Line, Text } from "@react-three/drei";
import React, { useContext, useState } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { PlaygroundStoreContext } from "../../context/playgroundStore";
import { Vector } from "../../styles/Styles.jsx";
import {
  getGradient,
  getDivergence,
  getCurl,
  getEulerRotation,
} from "../../utils/helperFunctions";
export default function Arrow({ i, j, k, x, y, z }) {
  const [collision, setCollision] = useState(false);

  const { _x, _y, _z } = getEulerRotation(i, j, k);

  return (
    <RigidBody
      type='fixed'
      rotation={[_x, _y, _z]}
      colliders={false}
      sensor={true}
      onIntersectionEnter={() => {
        setCollision(true);
      }}
      onIntersectionExit={() => setCollision(false)}
    >
      <CuboidCollider args={[0.8, 0.1, 0.1]} />
      <ArrowMesh collision={collision} x={x} y={y} z={z} i={i} j={j} k={k} />
    </RigidBody>
  );
}

const ArrowMesh = ({ collision, x, y, z, i, j, k }) => {
  const color = "black";
  const [hover, setHover] = useState(false);
  const { planeOnly, vectorFormula } = useContext(PlaygroundStoreContext);
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
                  <Vector text='u' /> = {getGradient(vectorFormula, x, y, z)}
                  <br />
                  Divergence: <span>&#8711;</span>.<Vector text='u' /> ={" "}
                  {getDivergence(vectorFormula, x, y, z)}
                  <br />
                  Curl: <span>&#8711;</span>x<Vector text='u' /> ={" "}
                  {getCurl(vectorFormula, x, y, z)}
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
                <Vector text='u' /> = {getGradient(vectorFormula, x, y, z)}
                <br />
                Divergence: <span>&#8711;</span>.<Vector text='u' /> ={" "}
                {getDivergence(vectorFormula, x, y, z)}
                <br />
                Curl: <span>&#8711;</span>x<Vector text='u' /> ={" "}
                {getCurl(vectorFormula, x, y, z)}
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
