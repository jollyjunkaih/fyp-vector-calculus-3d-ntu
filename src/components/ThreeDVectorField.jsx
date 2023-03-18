import { useThree, extend, useFrame } from "@react-three/fiber";
import { useState, useContext } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Html, Line, Text } from "@react-three/drei";
import Arrow from "./Arrow-3D";
import { VectorContext } from "../context/vector";
extend({ OrbitControls });

export default function ThreeDVectorField() {
  const { camera, gl } = useThree();
  const axesColor = "red";
  const [formula, setFormula] = useState({ i: "", j: "", k: "" });
  const [values, setValues] = useState([]);
  const { vectorData, vectorFormula, gridSize } = useContext(VectorContext);

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      {/* x,y,z axis */}
      <group>
        <mesh position={[gridSize / 2, 0, 0]} rotation-z={Math.PI * 1.5}>
          <coneGeometry args={[0.1, 0.5]} />
          <meshStandardMaterial color={axesColor} />
          <Html style={{ color: axesColor }} position={[0, 0.5, 0]}>
            X
          </Html>
        </mesh>
        <Line
          points={[
            [-gridSize / 2, 0, 0],
            [gridSize / 2, 0, 0],
          ]}
          color='red'
          lineWidth={5}
        />
        <mesh position={[0, gridSize / 2, 0]}>
          <coneGeometry args={[0.1, 0.5]} />
          <meshStandardMaterial color={axesColor} />
          <Html style={{ color: axesColor }} position={[0, 0.5, 0]}>
            Y
          </Html>
        </mesh>

        <Line
          points={[
            [0, -gridSize / 2, 0],
            [0, gridSize / 2, 0],
          ]}
          color='red'
          lineWidth={5}
        />
        <mesh position={[0, 0, gridSize / 2]} rotation-x={Math.PI * 0.5}>
          <coneGeometry args={[0.1, 0.5]} />
          <meshStandardMaterial color={axesColor} />
          <Html style={{ color: axesColor }} position={[0, 0, 0.5]}>
            Z
          </Html>
        </mesh>

        <Line
          points={[
            [0, 0, -gridSize / 2],
            [0, 0, gridSize / 2],
          ]}
          color='red'
          lineWidth={5}
        />
      </group>
      {[...vectorData].map(({ i, j, k, x, y, z }) => {
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
      })}
    </>
  );
}
