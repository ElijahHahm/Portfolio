/// <reference types="three" />
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { SRGBColorSpace } from 'three';

type PlanetProps = {
  position: [number, number, number]
  texturePath: string
  size?: number
}

// Maps available textures for each planet
const PLANET_TEXTURES: Record<string, string[]> = {
  'Csilla': [
    'Bump 4k', 'Clouds 4k', 'Diffuse 4k', 'Elevation 4k',
    'Lights Metropolis 4k', 'Roughness 4k'
  ],
  'Exotic 01': [
    'Diffuse 4k', 'Bump 4k', 'Roughness 4k', 'Elevation 4k', 'Clouds 4k',
    'Lights Metropolis 4k', 'Lights Rural 4k', 'Lights Urban 4k', 'Land Mask 4k', 'Water Mask 4k'
  ],
  'Exotic 02': [
    'Bump 4k', 'Clouds 4k', 'Diffuse 2 4k', 'Diffuse 4k', 'Elevation 4k',
    'Lights Metropolis 2 4k', 'Lights Metropolis 4k', 'Roughness 4k'
  ],
  'Gaseous 03': [
    'Bump 4k', 'Diffuse 4k', 'Metallic 4k'
  ],
  'Ice 05': [
    'Bump 4k', 'Clouds 4k', 'Diffuse 4k', 'Elevation 4k', 'Lights Rural 4k', 'Lights Urban 4k', 'Roughness 4k'
  ],
  'Korriban': [
    'Bump 4k', 'Clouds 4k', 'Diffuse 4k', 'Elevation 4k', 'Roughness 4k'
  ],
  'Nar Shaddaa': [
    'Diffuse 4k', 'Bump 4k', 'Roughness 4k', 'Elevation 4k', 'Clouds 4k',
    'Clouds Colored 4k', 'Lights Metropolis 4k', 'Water 4k'
  ],
  'Oceanic 05': [
    'Bump 4k', 'Clouds 4k', 'Diffuse 4k', 'Elevation 4k', 'Islands & Reefs 4k',
    'Lights Rural 4k', 'Lights Urban 4k', 'Roughness 4k'
  ],
  'Terran 09': [
    'Bump 4k', 'Clouds 4k', 'Diffuse 4k', 'Elevation 4k', 'Lights Rural 4k',
    'Lights Urban 4k', 'Roughness 4k', 'Water 4k'
  ],
  'Terran 10': [
    'Bump 4k', 'Clouds 4k', 'Diffuse 2 4k', 'Elevation 4k', 'Lights Rural 4k', 'Lights Urban 4k',
    'Roughness 4k', 'Water 4k'
  ],
  'Volcanic 05': [
    'Bump 4k', 'Clouds 4k', 'Diffuse 4k', 'Elevation 4k', 'Lava 4k', 'Lights Rural 4k', 'Roughness 4k'
  ]
}

// Helper to try multiple keys in fallback order
function findTexture(keys: string[], textures: Record<string, THREE.Texture>) {
  for (const key of keys) {
    if (textures[key]) return textures[key]
  }
  return undefined
}

export default function Planet({ position, texturePath, size = 1 }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Load textures on mount
  const loadedTextures = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const keys = PLANET_TEXTURES[texturePath] || []
    const result: Record<string, THREE.Texture> = {}

    for (const key of keys) {
      try {
        const url = `/textures/${texturePath}/${texturePath} (${key}).png`
        console.log('Loading texture:', url)
        const texture = loader.load(url)
        if (key.includes('Diffuse')) {
          texture.colorSpace = SRGBColorSpace; // modern replacement for encoding
          texture.needsUpdate = true;
        }
        result[key] = texture
      } catch (e) {
        // console.warn(`Failed to load ${key} for ${texturePath}`)
      }
    }

    return result
  }, [texturePath])

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.002
  })

  return (
    <>
      {/* Core Planet */}
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 128, 128]} />
        <meshStandardMaterial
          map={findTexture(['Diffuse 4k', 'Diffuse', 'Diffuse 2 4k'], loadedTextures)}
          bumpMap={findTexture(['Bump 4k', 'Bump'], loadedTextures)}
          bumpScale={loadedTextures['Bump 4k'] || loadedTextures['Bump'] ? 0.05 : 0}
          roughnessMap={findTexture(['Roughness 4k', 'Roughness'], loadedTextures)}
          displacementMap={findTexture(['Elevation 4k', 'Elevation'], loadedTextures)}
          displacementScale={loadedTextures['Elevation 4k'] || loadedTextures['Elevation'] ? 0.05 : 0}
          metalnessMap={loadedTextures['Metallic 4k']}
          metalness={loadedTextures['Metallic 4k'] ? 0.8 : 0}
        />
      </mesh>

      {/* Clouds */}
      {['Clouds 4k', 'Clouds', 'Clouds Colored 4k'].map((name, i) => {
        const tex = loadedTextures[name]
        if (!tex) return null

        return (
          <mesh key={name} position={position}>
            <sphereGeometry args={[size * (1.01 + i * 0.005), 128, 128]} />
            <meshStandardMaterial
              map={tex}
              transparent
              opacity={0.3}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}

      {/* Lights */}
      {['Lights Metropolis 4k', 'Lights Metropolis', 'Lights Rural', 'Lights Rural 4k', 'Lights Urban', 'Lights Urban 4k'].map((name, i) => {
        const tex = loadedTextures[name]
        if (!tex) return null

        return (
          <mesh key={name} position={position}>
            <sphereGeometry args={[size * (1.03 + i * 0.005), 128, 128]} />
            <meshStandardMaterial
              map={tex}
              emissive={new THREE.Color('white')}
              emissiveIntensity={1.7}
              transparent
              opacity={0.8}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}

      {/* Overlay masks (water, land, lava, islands) */}
      {['Water 4k', 'Water Mask', 'Land Mask', 'Lava 4k', 'Islands & Reefs 4k'].map((name, i) => {
        const tex = loadedTextures[name]
        if (!tex) return null

        return (
          <mesh key={name} position={position}>
            <sphereGeometry args={[size * (1.05 + i * 0.003), 128, 128]} />
            <meshStandardMaterial
              map={tex}
              transparent
              opacity={0.6}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </>
  )
}
