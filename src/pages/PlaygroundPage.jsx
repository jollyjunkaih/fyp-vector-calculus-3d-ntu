import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ThreeDVectorField from "../components/ThreeDVectorField";
import SideMenu from "../components/SideMenu";
import { Flex, HStack, VStack } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";

export const PlaygroundPage = () => {
  return (
    <VStack height={"100%"}>
      <NavBar />
      <HStack width={"100%"} height={"100%"}>
        <Flex width={"65%"} height={"100%"}>
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
              position: [11, 6, 15],
            }}
          >
            <ThreeDVectorField />
          </Canvas>
        </Flex>
        <Flex width={"35%"} height={"100%"} padding={0}>
          <SideMenu />
        </Flex>
      </HStack>
    </VStack>
  );
};
