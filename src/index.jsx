import "./style.css";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Flex, HStack, VStack } from "@chakra-ui/react";
import { Routes } from "./routes/routes";
import { LessonStoreProvider } from "./context/lessonStore";
import { PlaygroundStoreProvider } from "./context/playgroundStore";
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <LessonStoreProvider>
    <PlaygroundStoreProvider>
      <ChakraProvider>
        <Routes />
      </ChakraProvider>
    </PlaygroundStoreProvider>
  </LessonStoreProvider>
);
