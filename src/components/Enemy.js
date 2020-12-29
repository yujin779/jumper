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
const Enemy = ({ number }) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [Math.random() * 50, 3, 0]
  }));
  const speed = 0.04;

  useFrame(({ clock }) => {
    // api.position.set(
    //   ref.current.position.x - clock.getElapsedTime() * speed,
    //   ref.current.position.y,
    //   ref.current.position.z
    // );
    ref.current.position.set(
      ref.current.position.x - clock.getElapsedTime() * speed,
      ref.current.position.y,
      ref.current.position.z
    );
    // console.log(clock.getElapsedTime());
  });
  return (
    <instancedMesh ref={ref} name="enemy" args={[null, null, number]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"green"} />
    </instancedMesh>
  );
};
export default Enemy;
