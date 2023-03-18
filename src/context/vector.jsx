import React, { createContext, useState } from "react";

export const VectorContext = createContext();

export const VectorProvider = ({ children }) => {
  const [vectorFormula, setVectorFormula] = useState({ i: "", j: "", k: "" });
  const gridSize = 10;
  const [vectorData, setVectorData] = useState([]);

  return (
    <VectorContext.Provider
      value={{
        vectorData,
        setVectorData,
        vectorFormula,
        setVectorFormula,
        gridSize,
      }}
    >
      {children}
    </VectorContext.Provider>
  );
};
