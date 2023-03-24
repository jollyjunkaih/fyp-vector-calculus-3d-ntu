import React, { createContext, useState } from "react";

export const PlaygroundStoreContext = createContext();

export const PlaygroundStoreProvider = ({ children }) => {
  const [vectorFormula, setVectorFormula] = useState({ i: "", j: "", k: "" });
  const [gridSize, setGridSize] = useState(10);
  const [planeSelected, setPlaneSelected] = useState({ plane: "", value: 0 });
  const [vectorData, setVectorData] = useState([]);
  const [shape, setShape] = useState({ shapeType: "", formula: "" });
  const [planeOnly, setPlaneOnly] = useState(false);

  return (
    <PlaygroundStoreContext.Provider
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
    </PlaygroundStoreContext.Provider>
  );
};
