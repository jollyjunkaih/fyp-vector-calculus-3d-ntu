import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ThreeDVectorField from "./components/ThreeDVectorField";
import { VectorProvider } from "./context/vector";
import SideMenu from "./components/SideMenu";
import { ChakraProvider, Flex, HStack, VStack } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <ChakraProvider>
    <VectorProvider>
      <HStack height={"100%"}>
        <Flex width={"70%"} height={"100%"}>
          <Canvas
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [10, 6, 14],
            }}
          >
            <ThreeDVectorField />
          </Canvas>
        </Flex>
        <Flex width={"30%"} height={"100%"}>
          <SideMenu />
        </Flex>
      </HStack>
    </VectorProvider>
  </ChakraProvider>
);
