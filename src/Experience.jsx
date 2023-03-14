import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Html, Line } from "@react-three/drei";
import Arrow from "./Arrow";
import Formula from "fparser";
extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();

  const [formula, setFormula] = useState({ i: "", j: "", k: "" });
  const [values, setValues] = useState([]);
  const gridSize = 20;

  const useFormulaI = (x, y) => {
    if (formula.i) {
      const formulaObj = new Formula(formula.i);
      return formulaObj.evaluate({ x: x, y: y });
    }
  };
  const useFormulaJ = (x, y) => {
    if (formula.j) {
      const formulaObj = new Formula(formula.j);
      return formulaObj.evaluate({ x: x, y: y });
    }
  };
  const onUpdate = () => {
    if (formula.i && formula.j) {
      console.log("running here");
      let newValueList = [];
      for (let x = -gridSize / 2; x < gridSize / 2; x++) {
        for (let y = -gridSize / 2; y < gridSize / 2; y++) {
          newValueList.push({
            i: useFormulaI(x, y),
            j: useFormulaJ(x, y),
            x: x,
            y: y,
          });
        }
      }
      setValues(newValueList);
    }
  };

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Html position={[15, 0, 0]}>
        <text>Type the formula for i</text>
        <input
          value={formula.i}
          onChange={(val) => setFormula({ ...formula, i: val.target.value })}
        ></input>
        <text>Type the formula for j</text>
        <input
          value={formula.j}
          onChange={(val) => setFormula({ ...formula, j: val.target.value })}
        ></input>
        <button onClick={onUpdate}>Update</button>
      </Html>
      <group>
        <mesh position={[gridSize / 2, 0, 0]} rotation-z={Math.PI * 1.5}>
          <coneGeometry args={[0.1, 0.5]} />
          <meshStandardMaterial color={"red"} />
          <Html position={[0, 0.5, 0]}>X</Html>
        </mesh>
        <Line
          points={[
            [-gridSize / 2, 0, 0],
            [gridSize / 2, 0, 0],
          ]}
          color="red"
          lineWidth={5}
        />
        <mesh position={[0, gridSize / 2, 0]}>
          <coneGeometry args={[0.1, 0.5]} />
          <meshStandardMaterial color={"red"} />
          <Html position={[0, 0.5, 0]}>Y</Html>
        </mesh>

        <Line
          points={[
            [0, -gridSize / 2, 0],
            [0, gridSize / 2, 0],
          ]}
          color="red"
          lineWidth={5}
        />
        <mesh>
          <planeGeometry args={[gridSize, gridSize]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </group>
      {[...values].map(({ i, j, x, y }) => {
        return (
          <mesh
            position={[x, y, 0]}
            key={x.toString() + y.toString() + i.toString() + j.toString()}
          >
            <Arrow i={i} j={j} color="black" />
          </mesh>
        );
      })}
    </>
  );
}
