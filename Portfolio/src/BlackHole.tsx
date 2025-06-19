import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function BlackHole() {
  const { scene } = useGLTF('/models/blackhole2.glb')
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.001
  })

  return (
    <primitive
      object={scene}
      ref={ref}
      position={[-100, -200, 300]}
      scale={0.1}
      rotation={[-Math.PI / 6, 0, 0]}
    />
  )
}