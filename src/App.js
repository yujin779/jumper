// App.js
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import CameraController from "./components/CameraController";

import styles from "./styles";
import { createGlobalState } from "react-hooks-global-state";

import Floor from "./components/Floor";

/*
 * 1. 表示される入り口
 */
const App = () => {
  return (
    <View style={styles.app}>
      <Canvas camera={{ position: [0, 2, 4], near: 0.1, far: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <CameraController />

        <Floor />
      </Canvas>
    </View>
  );
};
export default App;
