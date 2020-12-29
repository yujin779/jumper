import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
// import * as CANNON from "cannon";
import { createGlobalState } from "react-hooks-global-state";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import { useGlobalState } from "../Global";

/*
 * タップするとジャンプするプレイヤー
 */
const Player = () => {
  const [tap, setTap] = useGlobalState("tap");
  const [landing, setLanding] = useState(false);
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [-3, 3, 0],
    onCollide: (obj) => {
      if (obj.body.name === "floor") setLanding(true);
      if (obj.body.name === "enemy") {
        console.log("gameover");
      }
    }
  }));
  useFrame((state) => {
    if (tap && landing) {
      // console.log(state);
      // console.log(state.camera);
      // console.log(state.camera.position);
      api.applyImpulse([0, 9, 0], [0, 0, 0]);
      setTap(false);
      setLanding(false);
    }
    // 回転させない
    ref.current.rotation.set(0, 0, 0);
    // 位置を移動しない
    api.position.set(-3, ref.current.position.y, 0);
  });
  return (
    <mesh ref={ref} name="player">
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"orange"} />
    </mesh>
  );
};
export default Player;
