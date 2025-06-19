// App.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Planet from './Planet'
import BlackHole from './BlackHole'
export default function App() {
  
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{ background: 'black' }}>
        <ambientLight intensity={3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <OrbitControls enableZoom={false} enablePan={false} target={[0, 0, 0]}/>

        <Planet position={[0, 0, 30]} texturePath="Exotic 01" size={7} /> {/*center north*/}
        <Planet position={[0, 0, -15]} texturePath="Nar Shaddaa" size={4} /> {/*center south*/}
        <Planet position={[-25, 0, 0]} texturePath="Csilla" size={6} /> {/*center west*/}
        <Planet position={[20, 0, 0]} texturePath="Exotic 02" size={5} /> {/*center east*/}
        <Planet position={[0, 25, 0]} texturePath="Gaseous 03" size={6} /> {/*center top*/}
        <Planet position={[0, -30, 0]} texturePath="Ice 05" size={7} /> {/*center bottom*/}
        <Planet position={[15, 19, -23]} texturePath="Korriban" size={5} /> {/* top diamond*/}
        <Planet position={[-17, 20, -22]} texturePath="Oceanic 05" size={6} /> {/*top diamond*/}
        <Planet position={[-12, 23, 26]} texturePath="Terran 09" size={8} /> {/*top diamond*/}
        <Planet position={[22, 22, 34]} texturePath="Terran 10" size={7} /> {/*top diamond*/}
        <Planet position={[12, -18, 24]} texturePath="Volcanic 05" size={7} /> {/*bottom diamond*/}
        <Planet position={[13, -13, -26]} texturePath="Exotic 03" size={4} />{/*bottom diamond*/}
        <Planet position={[-55, -28, 53]} texturePath="Gaseous 01" size={12} />{/*bottom diamond*/}
        <Planet position={[-28, -10, -22]} texturePath="Ice 06" size={4} />{/*bottom diamond*/}

        <BlackHole />

      </Canvas>
    </div>
  )
}
