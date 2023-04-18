import { useState, useContext, useEffect, useRef } from "react";
import { Html, Line, Circle, OrbitControls } from "@react-three/drei";
import Arrow from "./smaller_components/Arrow-3D";
import { Shape } from "./smaller_components/Shapes";
import { Physics, Debug } from "@react-three/rapier";
import { PlaygroundStoreContext } from "../context/playgroundStore";
import { Axes } from "./smaller_components/VectorFieldComponents";

export default function ThreeDVectorField() {
  const { vectorData, gridSize, planeSelected } = useContext(
    PlaygroundStoreContext
  );
  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Axes gridSize={gridSize} />
      <Physics>
        {/* <Debug /> */}
        <Shape />
        {/* arrows */}
        {[...vectorData].map((data) => {
          const { x, y, z } = data;
          if (planeSelected.plane == "Z") {
            if (z == planeSelected.value)
              return (
                <mesh position={[x, y, z]} key={JSON.stringify(data)}>
                  <Arrow data={data} />
                </mesh>
              );
          } else if (planeSelected.plane == "Y") {
            if (y == planeSelected.value)
              return (
                <mesh position={[x, y, z]} key={JSON.stringify(data)}>
                  <Arrow data={data} />
                </mesh>
              );
          } else if (planeSelected.plane == "X") {
            if (x == planeSelected.value)
              return (
                <mesh position={[x, y, z]} key={JSON.stringify(data)}>
                  <Arrow data={data} />
                </mesh>
              );
          } else {
            return (
              <mesh position={[x, y, z]} key={JSON.stringify(data)}>
                <Arrow data={data} />
              </mesh>
            );
          }
        })}
      </Physics>
    </>
  );
}
