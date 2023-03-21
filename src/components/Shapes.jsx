import React, { useContext, useRef, useEffect } from "react";
import * as THREE from "three";
import { RigidBody, CylinderCollider } from "@react-three/rapier";
import { StoreContext } from "../context/store";

export const Shape = () => {
  const { shape } = useContext(StoreContext);
  const { shapeType } = shape;

  if (shapeType === "Circle") {
    return <Circle />;
  }
};

const Circle = ({}) => {
  const { shape } = useContext(StoreContext);
  const colliderRef = useRef();
  const bodyRef = useRef();
  const { formula } = shape;
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
  }, [radius]);

  return (
    <RigidBody
      name='rigidBodyCircle'
      ref={bodyRef}
      type='dynamic'
      gravityScale={0}
      position={[center_x, center_y, center_z]}
      colliders={false}
    >
      <CylinderCollider ref={colliderRef} args={[0.05, radius]} />
      <mesh>
        <cylinderGeometry args={[radius, radius, 0.05]} />
        <meshStandardMaterial side={THREE.DoubleSide} color='greenyellow' />
      </mesh>
    </RigidBody>
  );
};
