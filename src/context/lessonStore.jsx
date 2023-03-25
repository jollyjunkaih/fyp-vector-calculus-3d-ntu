import React, { createContext, useState } from "react";

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
  const [vectorFieldData, setVectorFieldData] = useState([]);
  const gridSize = 6;

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
      }}
    >
      {children}
    </LessonStoreContext.Provider>
  );
};
