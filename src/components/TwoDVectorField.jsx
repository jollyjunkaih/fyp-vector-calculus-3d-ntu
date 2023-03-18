import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Html, Line, Text } from "@react-three/drei";
import Arrow from "./Arrow";
import nerdamer from "nerdamer/all.min";
import katex from "katex";
extend({ OrbitControls });

export default function TwoDVectorField() {
  const { camera, gl } = useThree();

  const [formula, setFormula] = useState({ i: "", j: "", k: "" });
  const [values, setValues] = useState([]);
  const gridSize = 20;

  const useFormulaI = (x, y) => {
    if (formula.i) {
      return nerdamer(formula.i, { x: x, y: y }).toString();
    }
  };
  const useFormulaJ = (x, y) => {
    if (formula.j) {
      return nerdamer(formula.j, { x: x, y: y }).toString();
    }
  };
  const onUpdate = () => {
    if (formula.i && formula.j) {
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
  const displayFormula = () => {
    try {
      if (
        nerdamer.convertToLaTeX(formula.i) &&
        nerdamer.convertToLaTeX(formula.j)
      ) {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(
                `f(x,y) = ${nerdamer.convertToLaTeX(
                  formula.i
                )} i + ${nerdamer.convertToLaTeX(formula.j)} j`
              ),
            }}
          />
        );
      }
    } catch (e) {
      {
        try {
          return (
            <>
              <text>{`f(x,y) = ${nerdamer.convertToLaTeX(
                formula.i
              )} i + ${nerdamer.convertToLaTeX(formula.j)} j`}</text>
              <text>
                There is an error while parsing your formula. Please try again
              </text>
            </>
          );
        } catch (e) {
          return (
            <>
              <text>
                There is an error while parsing your formula. Please try again
              </text>
            </>
          );
        }
      }
    }
  };
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Html position={[12, 5, 0]}>
        <div
          style={{
            minWidth: 250,
            padding: 20,
            boxShadow: "2px 2px #525252",
            borderRadius: 5,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <text>Type the formula for i</text>
          <input
            value={formula.i}
            onChange={(val) => setFormula({ ...formula, i: val.target.value })}
          />
          <br />
          <text>Type the formula for j</text>
          <input
            value={formula.j}
            onChange={(val) => setFormula({ ...formula, j: val.target.value })}
          />

          <br />
          {displayFormula()}

          <br />
          <button
            style={{
              padding: 8,
              boxShadow: "2px 2px #525252",
              borderRadius: 5,
              backgroundColor: "white",
            }}
            onClick={onUpdate}
          >
            <text>Update</text>
          </button>
        </div>
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
          color='red'
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
          color='red'
          lineWidth={5}
        />
        <mesh>
          <planeGeometry args={[gridSize, gridSize]} />
          <meshStandardMaterial color='greenyellow' />
        </mesh>
      </group>
      {[...values].map(({ i, j, x, y }) => {
        return (
          <mesh
            position={[x, y, 0]}
            key={x.toString() + y.toString() + i.toString() + j.toString()}
          >
            <Arrow i={i} j={j} x={x} y={y} formula={formula} color='black' />
          </mesh>
        );
      })}
    </>
  );
}
