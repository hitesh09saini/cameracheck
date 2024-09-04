import React, { useRef } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Sky,
  ShadowAlpha,
  PerspectiveCamera,
} from "@react-three/drei";
import Hitesh from "./modal/Hitesh";
import * as THREE from "three";
import GrassPlane from "./modal/GrassPlane";

function RestrictedOrbitControls(props) {
  const controlsRef = useRef();

  useFrame(() => {
    const controls = controlsRef.current;
    if (controls) {
      const { position } = controls.object;
      if (position.y < 0.1) {
        position.y = 0.1;
      }
    }
  });

  return <OrbitControls ref={controlsRef} {...props} />;
}

const App = () => {
  return (
    <div className="h-screen">
      <Canvas camera={{ fov: 35, position: [-0.068, 1.608, 6.885] }}>
        <RestrictedOrbitControls maxDistance={10} minDistance={2} />
        <Sky />

        <ambientLight intensity={2} />

        <group>
          <group position-y={1}>
            <Hitesh />
          </group>
          {/* <group scale={[0.8, 0.5, 0.8]}>
            <mesh>
              <boxGeometry />
              <meshStandardMaterial color="gray" />
            </mesh>
          </group> */}
          <GrassPlane />
        </group>
      </Canvas>
    </div>
  );
};

export default App;
