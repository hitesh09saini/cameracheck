import React from "react";
import { Box, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Grass = ({position}) => {
    const { scene: grass } = useGLTF("/grass1.glb");
  return (
    <mesh position={position}>
      <primitive
        object={grass}
        
        rotation-x={Math.PI * 2}
        scale={1}

      />
    </mesh>
  );
};

export default Grass;
