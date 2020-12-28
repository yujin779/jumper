import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
// import * as CANNON from "cannon";
import { createGlobalState } from "react-hooks-global-state";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import { useGlobalState } from "../Global";

/*
 * 1. 表示される入り口
 */
const Player = () => {
  const [jump] = useGlobalState("jump");
  useFrame((state) => {
    if (jump) {
      // console.log("jump");
    }
  });
  const [ref] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [0, 3, 0],
    onCollide: (obj) => {
      console.log(obj);
      if (jump) {
        // console.log("coliderJump");
      }
    }
  }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"orange"} />
    </mesh>
  );
};
export default Player;
