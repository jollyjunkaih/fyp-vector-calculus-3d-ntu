import React, { createContext, useState } from "react";

export const ShapesContext = createContext();

export const ShapesProvider = ({ children }) => {
  const [shape, setShape] = useState({ shape: "", formula: {} });

  return (
    <ShapesContext.Provider
      value={{
        shape,
        setShape,
      }}
    >
      {children}
    </ShapesContext.Provider>
  );
};
