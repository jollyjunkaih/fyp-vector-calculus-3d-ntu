import React, { createContext, useState } from "react";

export const LessonStoreContext = createContext();

export const LessonStoreProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState();
  const [headerPosition, setHeaderPosition] = useState([]);
  const [headerScrollPosition, setHeaderScrollPosition] = useState([]);

  return (
    <LessonStoreContext.Provider
      value={{
        scrollPosition,
        setScrollPosition,
        headerPosition,
        setHeaderPosition,
        headerScrollPosition,
        setHeaderScrollPosition,
      }}
    >
      {children}
    </LessonStoreContext.Provider>
  );
};
