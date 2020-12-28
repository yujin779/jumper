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
    position: [1, 3, 0],
    onCollide: (obj) => {
      if (obj.body.name === "floor") setLanding(true);
    }
  }));
  useFrame((state) => {
    if (tap && landing) {
      console.log("jump");
      api.applyImpulse([0, 9, 0], [0, 0, 0]);
      setTap(false);
      setLanding(false);
    }
    ref.current.rotation.set(0, 0, 0);
    api.position.set(0, ref.current.position.y, 0);
  });
  return (
    <mesh ref={ref} name="player">
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"orange"} />
    </mesh>
  );
};
export default Player;
