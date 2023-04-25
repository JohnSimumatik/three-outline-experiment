import { useRef, useState } from 'react';
import { Button } from '@mantine/core';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { useStore } from './useStore';
import Outline from './Outline';

function App() {
  const mesh = useRef(null);

  const selected = useStore((state) => state.selected);
  const setSelected = useStore((state) => state.setSelected);

  return (
    <>
      <Canvas style={{ height: 800, width: '100vw' }}>
        <ambientLight />
        <directionalLight />
        <CameraControls />
        <Outline>
          <mesh ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </Outline>
      </Canvas>
      <Button.Group>
        <Button onClick={() => setSelected(mesh.current)}>Select</Button>
        <Button onClick={() => setSelected(null)}>Deselect</Button>
      </Button.Group>
    </>
  );
}

export default App;
