import React from "react";
import * as THREE from "three";
import Grass from "./Grass";

const GrassPlane = () => {
  const texture = new THREE.TextureLoader().load("/grass.jpeg", (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(150, 150); // Adjust repeat values as needed
  });

  return (
    <group>
      {/* Plane with grass texture */}
      <mesh rotation-x={-Math.PI * 0.5} scale={150}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Grass position={[-1, 0, 0]} />
    </group>
  );
};

export default GrassPlane;
