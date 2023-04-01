import React, { useContext, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {
  RigidBody,
  CylinderCollider,
  CuboidCollider,
  euler,
  BallCollider,
} from "@react-three/rapier";
import { PlaygroundStoreContext } from "../../context/playgroundStore";

export const Shape = () => {
  const { shape } = useContext(PlaygroundStoreContext);
  const { shapeType } = shape;

  if (shapeType === "Circle") {
    return <Circle />;
  }
  if (shapeType === "Square") {
    return <Square />;
  }
  if (shapeType === "Sphere") {
    return <Sphere />;
  }
  if (shapeType === "Cube") {
    return <Cube />;
  }
};

const Circle = ({}) => {
  const { shape, vectorFormula } = useContext(PlaygroundStoreContext);
  const colliderRef = useRef();
  const bodyRef = useRef();
  const shapeRef = useRef();

  const { circleFormula: formula } = shape;
  const {
    radius = 1,
    center_x = 0,
    center_y = 0,
    center_z = 0,
    rotation_x = 0,
    rotation_y = 0,
    rotation_z = 0,
  } = formula;

  useEffect(() => {
    const eulerAngles = new THREE.Euler(
      (rotation_x / 180) * Math.PI,
      (rotation_y / 180) * Math.PI,
      (rotation_z / 180) * Math.PI
    );
    const { _w, _x, _y, _z } = new THREE.Quaternion().setFromEuler(eulerAngles);
    const quat = { w: _w, x: _x, y: _y, z: _z };
    bodyRef.current.setRotation(quat);
  }, [rotation_x, rotation_y, rotation_z]);

  useEffect(() => {
    colliderRef.current.setRadius(radius);
    // console.log(colliderRef.current);
  }, [radius]);

  return (
    <>
      <RigidBody
        name='rigidBodyCircle'
        ref={bodyRef}
        type='dynamic'
        gravityScale={0}
        position={[center_x, center_y, center_z]}
        colliders={false}
      >
        <CylinderCollider ref={colliderRef} args={[0.05, radius]} />
        <mesh ref={shapeRef}>
          <cylinderGeometry args={[radius, radius, 0.05]} />
          <meshStandardMaterial side={THREE.DoubleSide} color='greenyellow' />
        </mesh>
      </RigidBody>
    </>
  );
};
const Square = ({}) => {
  const { shape } = useContext(PlaygroundStoreContext);
  const colliderRef = useRef();
  const bodyRef = useRef();
  const shapeRef = useRef();

  const { squareFormula } = shape;
  const {
    length = 1,
    center_x = 0,
    center_y = 0,
    center_z = 0,
    rotation_x = 0,
    rotation_y = 0,
    rotation_z = 0,
  } = squareFormula;

  useEffect(() => {
    const eulerAngles = new THREE.Euler(
      (rotation_x / 180) * Math.PI,
      (rotation_y / 180) * Math.PI,
      (rotation_z / 180) * Math.PI
    );
    const { _w, _x, _y, _z } = new THREE.Quaternion().setFromEuler(eulerAngles);
    const quat = { w: _w, x: _x, y: _y, z: _z };
    bodyRef.current.setRotation(quat);
  }, [rotation_x, rotation_y, rotation_z]);

  useEffect(() => {
    colliderRef.current.setHalfExtents({
      x: length,
      y: 0.05,
      z: length,
    });
  }, [length]);

  return (
    <>
      <RigidBody
        name='rigidBodySquare'
        ref={bodyRef}
        type='dynamic'
        gravityScale={0}
        position={[center_x, center_y, center_z]}
        colliders={false}
      >
        <CuboidCollider
          ref={colliderRef}
          args={[length * 2, 0.05, length * 2]}
        />
        <mesh ref={shapeRef}>
          <boxGeometry args={[length * 2, 0.05, length * 2]} />
          <meshStandardMaterial side={THREE.DoubleSide} color='greenyellow' />
        </mesh>
      </RigidBody>
    </>
  );
};

const Sphere = ({}) => {
  const { shape } = useContext(PlaygroundStoreContext);
  const colliderRef = useRef();
  const bodyRef = useRef();
  const shapeRef = useRef();

  const { sphereFormula } = shape;
  const {
    radius = 1,
    center_x = 0,
    center_y = 0,
    center_z = 0,
  } = sphereFormula;

  useEffect(() => {
    colliderRef.current.setRadius(radius);
  }, [radius]);

  return (
    <>
      <RigidBody
        name='rigidBodySphere'
        ref={bodyRef}
        type='dynamic'
        gravityScale={0}
        position={[center_x, center_y, center_z]}
        colliders={false}
      >
        <BallCollider ref={colliderRef} args={[radius]} />
        <mesh ref={shapeRef}>
          <sphereGeometry args={[radius]} />
          <meshStandardMaterial
            side={THREE.DoubleSide}
            color='greenyellow'
            transparent={true}
            opacity={0.6}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

const Cube = ({}) => {
  const { shape } = useContext(PlaygroundStoreContext);
  const colliderRef = useRef();
  const bodyRef = useRef();
  const shapeRef = useRef();

  const { cubeFormula } = shape;
  const {
    length = 1,
    center_x = 0,
    center_y = 0,
    center_z = 0,
    rotation_x = 0,
    rotation_y = 0,
    rotation_z = 0,
  } = cubeFormula;

  useEffect(() => {
    const eulerAngles = new THREE.Euler(
      (rotation_x / 180) * Math.PI,
      (rotation_y / 180) * Math.PI,
      (rotation_z / 180) * Math.PI
    );
    const { _w, _x, _y, _z } = new THREE.Quaternion().setFromEuler(eulerAngles);
    const quat = { w: _w, x: _x, y: _y, z: _z };
    bodyRef.current.setRotation(quat);
  }, [rotation_x, rotation_y, rotation_z]);

  useEffect(() => {
    colliderRef.current.setHalfExtents({
      x: length,
      y: length,
      z: length,
    });
  }, [length]);

  return (
    <>
      <RigidBody
        name='rigidBodySquare'
        ref={bodyRef}
        type='dynamic'
        gravityScale={0}
        position={[center_x, center_y, center_z]}
        colliders={false}
      >
        <CuboidCollider
          ref={colliderRef}
          args={[length * 2, length * 2, length * 2]}
        />
        <mesh ref={shapeRef}>
          <boxGeometry args={[length * 2, length * 2, length * 2]} />
          <meshStandardMaterial
            side={THREE.DoubleSide}
            color='greenyellow'
            transparent
            opacity={0.55}
          />
        </mesh>
      </RigidBody>
    </>
  );
};
