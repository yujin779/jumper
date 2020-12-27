import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";

import { createGlobalState } from "react-hooks-global-state";

/*
 * 1. 表示される入り口
 */
const Floor = () => {
  return (
    <group>
      <mesh position={[0, -1, 0]}>
        <boxBufferGeometry attach="geometry" args={[10, 1, 10]} />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </group>
  );
};
export default Floor;
