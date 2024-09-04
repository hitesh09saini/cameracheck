import React, { useEffect, useRef } from "react";
import { useAnimations, useCamera, useFBX, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";


export default function Hitesh(props) {
  const { headFollow, curosrFollow, RotateFollow } = useControls({
    headFollow: false,
    curosrFollow: false,
    RotateFollow: false,
  });

  const { camera } = useThree();

  const { nodes, materials } = useGLTF("/hitesh.glb");

  const modal = useRef();

  useFrame((state, delta) => {
    if (headFollow) {
      modal.current.getObjectByName("Head").lookAt(state.camera.position);
    }

    if (curosrFollow) {
      const t = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      const t2 = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      modal.current.getObjectByName("Spine1").lookAt(t);
      modal.current.getObjectByName("Head").lookAt(t2);
    }
   
  });


  const center = new THREE.Vector3(0, 0, 0); // Center of rotation
  const radius = 10; // Distance from the center
  const speed = 0.01; // Rotation speed
  const angle = useRef(0);

  useFrame(() => {
   
    if(RotateFollow ){
      angle.current += speed/3;
      const x = radius * Math.cos(angle.current);
      const z = radius * Math.sin(angle.current);
      camera.position.set(x, camera.position.y+0.001, z); 
      camera.lookAt(center);
  
    }
  });


  return (
    <group ref={modal} {...props} dispose={null} position={[0, -1, 0]}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/hitesh.glb");
