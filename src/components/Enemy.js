import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
// import * as CANNON from "cannon";
// import { createGlobalState } from "react-hooks-global-state";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import { useGlobalState } from "../Global";
import { useStore } from "../Global";

const createEnemysList = (number, startX) => {
  const enemysList = [];
  // const startX = 15;
  // const number = 10;
  for (let i = 0; i < number; i++) {
    let p = startX;
    if (i !== 0) p = enemysList[i - 1].position[0] + Math.random() * 10 + 15;

    enemysList.push({ position: [p, 1, 0] });
  }
  return enemysList;
};

const Enemys = ({ numbera }) => {
  const number = 10;
  const startX = 15;
  const [enemys, setEnemys] = useState(
    createEnemysList({ number: number, startX: startX })
  );
  const speed = useStore((state) => state.speed);
  const [ee, setEE] = useState(enemys[number - 1].position[0]);
  useFrame(({ clock }) => {
    // api.position.set(
    //   ref.current.position.x - speed,
    //   ref.current.position.y,
    //   ref.current.position.z
    // );
    // if (ref.current.position.x < -10 || ref.current.position.y < -10) {
    //   api.position.set(Math.random() * distance + 8, 1, Math.random() - 0.5);
    // }
    // console.log(ref.current.position.x);
    // console.log("c");
    return <Enemy />;
  });
  // const [obj, setObj] = useState([]);
  // useFrame((state) => {
  //   setEE(ee - speed);
  //   if (ee < -startX) {
  //     console.log("reset");
  //     setEnemys(createEnemysList({ number: number, startX: startX }));
  //     setEE(enemys[number - 1].position[0]);
  //     return setObj(enemys.map((props, index) => <Enemy key={index} {...props} />));
  //   }
  // });
  // setObj(enemys.map((props, index) => <Enemy key={index} {...props} />));
  // console.log(enemys);
  return <Enemy />;
};

// const Enemys2 = ({ enemys }) => {
//   return enemys.map((props, index) => <Enemy key={index} {...props} />);
// };

/*
 * 接触するとgameover
 */
const Enemy = ({ number }) => {
  const args = [1, 1, 1];
  const [ref, api] = useBox(() => ({
    type: "Static",
    mass: 1,
    args: args,
    position: [Math.random() - 0.5, -5, Math.random() - 0.5]
  }));
  // const positionCreate =
  const [obj, setObj] = useState(createEnemysList(number, 15));
  // const? obj = createEnemysList(3, 1);
  const colors = useMemo(() => {
    const array = new Float32Array(number * 3);
    const color = new THREE.Color();
    for (let i = 0; i < number; i++)
      color
        .set("green")
        .convertSRGBToLinear()
        .toArray(array, i * 3);
    return array;
  }, [number]);
  useFrame(() => {
    for (let i = 0; i < number; i++) {
      api.at(i).position.set(...obj[i].position);
      obj[i].position[0] -= 0.08;
      // if(i==0) console.log(obj[i].position.x);
      // api.at(i).position.set(0, 1, 0);
    }
    const p = obj[obj.length - 1].position[0];
    if (p < -14) setObj(createEnemysList(number, 15));
    // console.log(p);
  });

  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={ref}
      args={[null, null, number]}
      name={"enemy"}
    >
      <boxBufferGeometry attach="geometry" args={args}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colors, 3]}
        />
      </boxBufferGeometry>
      <meshLambertMaterial
        attach="material"
        vertexColors={THREE.VertexColors}
      />
    </instancedMesh>
  );
};
export default Enemy;
