import React, { createContext, useState } from "react";
import * as THREE from "three";
export const LessonStoreContext = createContext();

export const LessonStoreProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState();
  const [headerPosition, setHeaderPosition] = useState([]);
  const [headerScrollPosition, setHeaderScrollPosition] = useState([]);
  const [scalarFormula, setScalarFormula] = useState("");
  const [scalarValues, setScalarValues] = useState([]);
  const [vectorFieldFormula, setVectorFieldFormula] = useState({
    i: "",
    j: "",
    k: "",
  });
  const [curlVectorFieldFormula, setCurlVectorFieldFormula] = useState({
    i: "",
    j: "",
    k: "",
  });
  const [divergenceData, setDivergenceData] = useState({
    direction: "X",
    rotation_x: 0,
    rotation_z: 0,
    normal: "",
  });
  const [vectorFieldData, setVectorFieldData] = useState([]);
  const [curlVectorFieldData, setCurlVectorFieldData] = useState([]);
  const gridSize = 6;
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    "../assets/fabric_pattern_07_col_1_1k.png"
  );

  return (
    <LessonStoreContext.Provider
      value={{
        scrollPosition,
        setScrollPosition,
        headerPosition,
        setHeaderPosition,
        headerScrollPosition,
        setHeaderScrollPosition,
        scalarFormula,
        setScalarFormula,
        scalarValues,
        setScalarValues,
        gridSize,
        vectorFieldFormula,
        setVectorFieldFormula,
        vectorFieldData,
        setVectorFieldData,
        divergenceData,
        setDivergenceData,
        curlVectorFieldFormula,
        setCurlVectorFieldFormula,
        curlVectorFieldData,
        setCurlVectorFieldData,
        texture,
      }}
    >
      {children}
    </LessonStoreContext.Provider>
  );
};
