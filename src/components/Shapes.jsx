import React, { useContext, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { RigidBody, CylinderCollider, euler } from "@react-three/rapier";
import { StoreContext } from "../context/store";
import { Html } from "@react-three/drei";
import nerdamer from "nerdamer/all.min";
export const Shape = () => {
  const { shape } = useContext(StoreContext);
  const { shapeType } = shape;

  if (shapeType === "Circle") {
    return <Circle />;
  }
};

const Circle = ({}) => {
  const { shape, vectorFormula } = useContext(StoreContext);
  const colliderRef = useRef();
  const bodyRef = useRef();
  const shapeRef = useRef();
  const [hover, setHover] = useState(false);
  const [planeVector1, setPlaneVector1] = useState(new THREE.Vector3(0, 0, 1));
  const [planeVector2, setPlaneVector2] = useState(new THREE.Vector3(1, 0, 0));
  const [normalVector, setNormalVector] = useState(new THREE.Vector3(0, 1, 0));
  const [circleFormula, setCircleFormula] = useState({});
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

    const v1 = new THREE.Vector3(0, 0, 1);
    const v2 = new THREE.Vector3(1, 0, 0);
    const v3 = new THREE.Vector3(0, 1, 0);
    v1.applyEuler(eulerAngles);
    v2.applyEuler(eulerAngles);
    v3.applyEuler(eulerAngles);
    setPlaneVector1(v1);
    setPlaneVector2(v2);
    setNormalVector(v3);
  }, [rotation_x, rotation_y, rotation_z]);

  useEffect(() => {
    setCircleFormula({
      x: getCircleEquation(planeVector1.x, planeVector2.x, center_x),
      y: getCircleEquation(planeVector1.y, planeVector2.y, center_y),
      z: getCircleEquation(planeVector1.z, planeVector2.z, center_z),
    });
  }, [planeVector1, planeVector2, center_x, center_y, center_z]);
  useEffect(() => {
    colliderRef.current.setRadius(radius);
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
        <mesh
          ref={shapeRef}
          onPointerOver={() => {
            setHover(true);
          }}
          onPointerLeave={() => setHover(false)}
        >
          <cylinderGeometry args={[radius, radius, 0.05]} />
          <meshStandardMaterial side={THREE.DoubleSide} color='greenyellow' />
        </mesh>
      </RigidBody>
      {hover ? (
        <Html>
          <div
            style={{
              backgroundColor: "white",
              minWidth: 350,
              padding: 10,
              boxShadow: "2px 2px #525252",
              borderRadius: 5,
            }}
          >
            <p>
              Equation of Circle:
              <br />
              {`x(θ,r) = ${circleFormula.x}`}
              <br />
              {`y(θ,r) = ${circleFormula.y}`}
              <br />
              {`z(θ,r) = ${circleFormula.z}`}
              <br />
              {`Normal Vector: ${normalVector.x.toFixed(
                2
              )}i + ${normalVector.y.toFixed(2)}j + ${normalVector.z.toFixed(
                2
              )}k`}
              <br />
              {`Flux: ${getFluxThroughCircularSurface(
                vectorFormula,
                normalVector,
                radius,
                circleFormula
              )}`}
              {/* Vector: <Vector text='u' /> = {i} <Vector text='i' />
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
                  {getCurl(vectorFormula, x, y, z)} */}
            </p>
          </div>
        </Html>
      ) : null}
    </>
  );
};

const getCircleEquation = (vector1, vector2, center) => {
  const circleEquation = `${
    center ||
    (parseFloat(vector2).toFixed(1) == 0 && parseFloat(vector1).toFixed(1) == 0)
      ? center
      : ""
  } ${center && parseFloat(vector1.toFixed(1)) > 0 ? " + " : ""} ${
    parseFloat(vector1.toFixed(1)) != 0 ? vector1.toFixed(3) + "*r*cos(θ)" : ""
  } ${
    parseFloat(vector2.toFixed(1)) > 0 &&
    (parseFloat(vector1.toFixed(1)) != 0 || center)
      ? " + "
      : ""
  } ${
    parseFloat(vector2.toFixed(1)) != 0 ? vector2.toFixed(3) + "*r*sin(θ)" : ""
  } 
  `;
  return circleEquation;
};

const getFluxThroughCircularSurface = (
  vectorFormula,
  normal,
  radius,
  circleFormula
) => {
  const { x, y, z } = circleFormula;
  const finalValues = [];
  for (let formula in vectorFormula) {
    const formulaWRTθandR = nerdamer(vectorFormula[formula])
      .sub("x", x)
      .sub("y", y)
      .sub("z", z)
      .toString();
    let firstIntegral = nerdamer(
      `integrate(${formulaWRTθandR.toString()},θ)`
    ).toString();
    const firstIntegral_0 = nerdamer(firstIntegral).sub("θ", "0").toString();
    const firstIntegral_2pi = nerdamer(firstIntegral).sub("θ", "2π").toString();
    firstIntegral = firstIntegral_2pi + "-" + firstIntegral_0;
    let secondIntegral = nerdamer(
      `defint(${nerdamer(firstIntegral)
        .evaluate()
        .toString()},0,${radius.toString()},r)`
    )
      .evaluate()
      .text("decimals", 3);
    finalValues.push(parseFloat(secondIntegral));
  }
  const flux =
    finalValues[0] * normal.x +
    finalValues[1] * normal.y +
    finalValues[2] * normal.z;
  return flux;
};
