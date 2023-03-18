import React, { createContext, useState } from "react";

export const VectorContext = createContext();

export const VectorProvider = ({ children }) => {
  const [vectorFormula, setVectorFormula] = useState({ i: "", j: "", k: "" });
  const [gridSize, setGridSize] = useState(10);
  const [planeSelected, setPlaneSelected] = useState({ plane: "", value: 0 });
  const [vectorData, setVectorData] = useState([]);

  return (
    <VectorContext.Provider
      value={{
        vectorData,
        setVectorData,
        vectorFormula,
        setVectorFormula,
        gridSize,
        setGridSize,
        planeSelected,
        setPlaneSelected,
      }}
    >
      {children}
    </VectorContext.Provider>
  );
};
