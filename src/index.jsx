import "./style.css";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Flex, HStack, VStack } from "@chakra-ui/react";
import { LessonStoreProvider } from "./context/lessonStore";
import { PlaygroundStoreProvider } from "./context/playgroundStore";
import { Router, Route } from "wouter";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <LessonStoreProvider>
    <PlaygroundStoreProvider>
      <ChakraProvider>
        <Router>
          <Route path='/' component={HomePage} />
          <Route path='/lesson' component={LessonPage} />
          <Route path='/playground' component={PlaygroundPage} />
        </Router>
      </ChakraProvider>
    </PlaygroundStoreProvider>
  </LessonStoreProvider>
);
