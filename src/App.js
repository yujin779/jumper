// App.js
import React from "react";
import { View } from "react-native";
import { Canvas} from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "use-cannon";
import { useStore } from "./Global";
import styles from "./styles";

import Floor from "./components/Floor";
import Player from "./components/Player";
import Enemy from "./components/Enemy";

/*
 * 1. 表示される入り口
 */
const App = () => {
  const tapTrue = useStore((state) => state.tapTrue);
  return (
    <View style={styles.app}>
      <Canvas
        camera={{
          position: [0, 3, 70],
          near: 0.1,
          far: 500
        }}
        onClick={(e) => {
          tapTrue();
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls />
        <Physics
          gravity={[0, -30, 0]}
          defaultContactMaterial={{ restitution: 0 }}
        >
          <Player />
          <Enemy number={2} />
          <Floor position={[0, -1, 0]} args={[1500, 0.5, 3]} />
        </Physics>
      </Canvas>
    </View>
  );
};
export default App;
