import "./style.css";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./context/store";
import { ChakraProvider, Flex, HStack, VStack } from "@chakra-ui/react";
import { Routes } from "./routes/routes";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <ChakraProvider>
    <StoreProvider>
      <Routes />
    </StoreProvider>
  </ChakraProvider>
);
