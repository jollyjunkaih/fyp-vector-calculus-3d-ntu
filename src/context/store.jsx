import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [vectorFormula, setVectorFormula] = useState({ i: "", j: "", k: "" });
  const [gridSize, setGridSize] = useState(10);
  const [planeSelected, setPlaneSelected] = useState({ plane: "", value: 0 });
  const [vectorData, setVectorData] = useState([]);
  const [shape, setShape] = useState({ shapeType: "", formula: "" });
  const [planeOnly, setPlaneOnly] = useState(false);
  return (
    <StoreContext.Provider
      value={{
        vectorData,
        setVectorData,
        vectorFormula,
        setVectorFormula,
        gridSize,
        setGridSize,
        planeSelected,
        setPlaneSelected,
        shape,
        setShape,
        planeOnly,
        setPlaneOnly,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
