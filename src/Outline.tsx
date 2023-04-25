/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtendedColors, NodeProps, Overwrite, extend, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector2 } from 'three';
import { useStore } from './useStore';

extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass });

// Need to declare types for OutlinePass because something is broken in R3F
declare global {
  namespace JSX {
    interface IntrinsicElements {
      outlinePass: ExtendedColors<Overwrite<Partial<OutlinePass>, NodeProps<OutlinePass, typeof OutlinePass>>>;
    }
  }
}

type Props = {
  children: any;
};

function Outline({ children }: Props) {
  const { gl, camera, scene, size } = useThree();
  const composer = useRef<any>(null);
  const selected = useStore((state) => state.selected);
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
  useEffect(() => composer.current?.setSize(size.width, size.height), [size]);
  useFrame(() => composer.current?.render(), 1);
  return (
    <>
      {children}
      <effectComposer ref={composer} args={[gl]}>
        <renderPass args={[scene, camera]} />
        <outlinePass
          args={[aspect, scene, camera]}
          visibleEdgeColor="white"
          edgeStrength={50}
          edgeThickness={1}
          selectedObjects={selected ? [selected] : []}
        />
      </effectComposer>
    </>
  );
}

export default Outline;
