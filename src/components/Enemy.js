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
const Enemy = () => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [3, 3, 0]
  }));
  const speed = 0.04;
  useFrame((state) => {
    api.position.set(ref.current.position.x - speed, 0, 0);
  });
  return (
    <mesh ref={ref} name="enemy">
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"green"} />
    </mesh>
  );
};
export default Enemy;
