import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";

import { createGlobalState } from "react-hooks-global-state";

/*
 * 1. 表示される入り口
 */
const Player = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
    </group>
  );
};
export default Player;
