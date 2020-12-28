// App.js
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import CameraController from "./components/CameraController";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import styles from "./styles";
import { useGlobalState } from "./Global";

import Floor from "./components/Floor";
import Player from "./components/Player";

/*
 * 1. 表示される入り口
 */
const App = () => {
  const [, setJump] = useGlobalState("jump");
  return (
    <View style={styles.app}>
      <Canvas
        camera={{ position: [0, 2, 10], near: 0.1, far: 50 }}
        onClick={(e) => {
          setJump(true);
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <CameraController />
        <Physics
          gravity={[0, -10, 0]}
          defaultContactMaterial={{ restitution: 0 }}
        >
          <Player />
          <Floor />
        </Physics>
      </Canvas>
    </View>
  );
};
export default App;
