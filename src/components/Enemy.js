import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
// import * as CANNON from "cannon";
// import { createGlobalState } from "react-hooks-global-state";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import { useGlobalState } from "../Global";

const Enemys = ({ number }) => {
  const enemysList = [];
  const startX = 0;
  // enemysList.push({ position: [0, 1, 0] });
  // enemysList.push({ position: [1, 1, 0] });
  // enemysList.push({ position: [30, 1, 0] });
  for (let i = 0; i < 10; i++) {
    let p = 0;
    if (i !== 0) p = enemysList[i - 1].position[0] + 2;
    enemysList.push({ position: [p, 1, 0] });
    console.log(enemysList[i]);
  }
  const [enemys] = useState(enemysList);
  // console.log(enemys);
  return enemys.map((props, index) => <Enemy key={index} {...props} />);
};

/*
 * 接触するとgameover
 */
const Enemy = (props) => {
  // console.log(props);
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: props.position
  }));
  const speed = 0.08;

  useFrame(({ clock }) => {
    api.position.set(
      ref.current.position.x - speed,
      ref.current.position.y,
      ref.current.position.z
    );

    // if (ref.current.position.x < -10 || ref.current.position.y < -10) {
    //   api.position.set(Math.random() * distance + 8, 1, Math.random() - 0.5);
    // }
    // console.log(ref.current.position.x);
  });
  return (
    <mesh ref={ref} name="enemy">
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"green"} />
    </mesh>
  );
};
export default Enemys;
