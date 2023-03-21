import { useThree, extend, useFrame } from "@react-three/fiber";
import { useState, useContext, useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Html, Line, Circle } from "@react-three/drei";
import Arrow from "./Arrow-3D";
import * as THREE from "three";
import {
  Debug,
  RigidBody,
  Physics,
  CylinderCollider,
} from "@react-three/rapier";
import { StoreContext } from "../context/store";
extend({ OrbitControls });

export default function ThreeDVectorField() {
  const { camera, gl } = useThree();
  const axesColor = "red";
  const { vectorData, vectorFormula, gridSize, planeSelected, shape } =
    useContext(StoreContext);
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      {/* x,y,z axis */}
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
          color='red'
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
          color='red'
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
          color='red'
          lineWidth={5}
        />
      </group>
      <Physics>
        {/* <Debug /> */}
        {/* <RigidBody type='dynamic' gravityScale={0}>
          <mesh>
            <cylinderGeometry args={[5, 5, 5]} />
            <meshStandardMaterial side={THREE.DoubleSide} color='greenyellow' />
          </mesh>
        </RigidBody> */}
        <Shape shape={shape.shape} formula={shape.formula} />
        {/* arrows */}
        {[...vectorData].map(({ i, j, k, x, y, z }) => {
          if (planeSelected.plane == "Z") {
            if (z == planeSelected.value) {
              return (
                <mesh
                  position={[x, y, z]}
                  key={
                    x.toString() +
                    y.toString() +
                    z.toString() +
                    i.toString() +
                    j.toString() +
                    k.toString()
                  }
                >
                  <Arrow
                    i={i}
                    j={j}
                    k={k}
                    x={x}
                    y={y}
                    z={z}
                    formula={vectorFormula}
                    color='black'
                  />
                </mesh>
              );
            }
          } else if (planeSelected.plane == "Y") {
            if (y == planeSelected.value) {
              return (
                <mesh
                  position={[x, y, z]}
                  key={
                    x.toString() +
                    y.toString() +
                    z.toString() +
                    i.toString() +
                    j.toString() +
                    k.toString()
                  }
                >
                  <Arrow
                    i={i}
                    j={j}
                    k={k}
                    x={x}
                    y={y}
                    z={z}
                    formula={vectorFormula}
                    color='black'
                  />
                </mesh>
              );
            }
          } else if (planeSelected.plane == "X") {
            if (x == planeSelected.value && y == 0 && z == 0) {
              return (
                <mesh
                  position={[x, y, z]}
                  key={
                    x.toString() +
                    y.toString() +
                    z.toString() +
                    i.toString() +
                    j.toString() +
                    k.toString()
                  }
                >
                  <Arrow
                    i={i}
                    j={j}
                    k={k}
                    x={x}
                    y={y}
                    z={z}
                    formula={vectorFormula}
                    color='black'
                  />
                </mesh>
              );
            }
          } else {
            return (
              <mesh
                position={[x, y, z]}
                key={
                  x.toString() +
                  y.toString() +
                  z.toString() +
                  i.toString() +
                  j.toString() +
                  k.toString()
                }
              >
                <Arrow
                  i={i}
                  j={j}
                  k={k}
                  x={x}
                  y={y}
                  z={z}
                  formula={vectorFormula}
                  color='black'
                />
              </mesh>
            );
          }
        })}
      </Physics>
    </>
  );
}

const Shape = ({ shape, formula }) => {
  if (shape === "Circle") {
    try {
      const {
        radius = 1,
        center_x = 0,
        center_y = 0,
        center_z = 0,
        rotation_x = 0,
        rotation_y = 0,
        rotation_z = 0,
      } = formula;
      const shapeRef = useRef();
      const bodyRef = useRef();

      useEffect(() => {
        const eulerAngles = new THREE.Euler(
          (rotation_x / 180) * Math.PI,
          (rotation_y / 180) * Math.PI,
          (rotation_z / 180) * Math.PI
        );
        const { _w, _x, _y, _z } = new THREE.Quaternion().setFromEuler(
          eulerAngles
        );
        const quat = { w: _w, x: _x, y: _y, z: _z };
        bodyRef.current.setRotation(quat);
      }, [rotation_x, rotation_y, rotation_z]);
      useEffect(() => {
        shapeRef.current.setRadius(radius);
      }, [radius]);
      return (
        <RigidBody
          ref={bodyRef}
          type='dynamic'
          gravityScale={0}
          position={[center_x, center_y, center_z]}
          colliders={false}
        >
          <CylinderCollider ref={shapeRef} args={[0.05, radius]} />
          <mesh>
            <cylinderGeometry args={[radius, radius, 0.05]} />
            <meshStandardMaterial side={THREE.DoubleSide} color='greenyellow' />
          </mesh>
        </RigidBody>
      );
    } catch (e) {
      {
        console.log("error");
        console.log(e);
        return <></>;
      }
    }
  }
};
