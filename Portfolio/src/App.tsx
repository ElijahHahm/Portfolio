// App.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Planet from './Planet'
export default function App() {
  //const planet_folder = ['Csilla', 'Exotic 01', 'Exotic 02', 'Gaseous 03', 'Ice 05', 'Korriban', 'Nar Shaddaa', 'Oceanic 05', 'Terran 09', 'Terran 10', 'Volcanic 05']
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <OrbitControls enableZoom={false} enablePan={false} />

        <Planet position={[-10, 10, 20]} texturePath="Exotic 01" size={1} />
        <Planet position={[-10, -10, 20]} texturePath="Nar Shaddaa" size={1} />
        <Planet position={[-5, 10, 20]} texturePath="Csilla" size={1} />
        <Planet position={[-5, -10, 20]} texturePath="Exotic 02" size={1} />
        <Planet position={[0, 10, 20]} texturePath="Gaseous 03" size={1} />
        <Planet position={[0, -10, 20]} texturePath="Ice 05" size={1} />
        <Planet position={[5, 10, 20]} texturePath="Korriban" size={1} />
        <Planet position={[5, -10, 20]} texturePath="Oceanic 05" size={1} />
        <Planet position={[10, 10, 20]} texturePath="Terran 09" size={1} />
        <Planet position={[10, -10, 20]} texturePath="Terran 10" size={1} />
        <Planet position={[0, 20, 20]} texturePath="Volcanic 05" size={1} />

      </Canvas>
    </div>
  )
}
