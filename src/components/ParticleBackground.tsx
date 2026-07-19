import { useRef, useMemo, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

/* -------------------------------------------------------------------------- */
/*  Particles – 15 000 point-cloud with mouse repulsion                       */
/* -------------------------------------------------------------------------- */
function Particles() {
  const count = 8_000
  const pointsRef = useRef<THREE.Points>(null)
  const pointer = useRef(new THREE.Vector3())
  const { viewport } = useThree()

  // Store original + current positions and colours
  const { positions, originals, colors, baseColor, accentColor } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const orig = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const base = new THREE.Color(0x001f3f)
    const accent = new THREE.Color(0xccff00)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80
      const y = (Math.random() - 0.5) * 80
      const z = (Math.random() - 0.5) * 80
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      orig[i * 3] = x
      orig[i * 3 + 1] = y
      orig[i * 3 + 2] = z
      col[i * 3] = base.r
      col[i * 3 + 1] = base.g
      col[i * 3 + 2] = base.b
    }
    return { positions: pos, originals: orig, colors: col, baseColor: base, accentColor: accent }
  }, [])

  // Track mouse in normalised device coords → 3-D
  const onPointerMove = useCallback((e: PointerEvent) => {
    const x = ((e.clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5
    const y = (-(e.clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5
    pointer.current.set(x, y, 0)
  }, [viewport])

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [onPointerMove])

  useFrame(() => {
    if (!pointsRef.current) return
    const geo = pointsRef.current.geometry
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute
    const colAttr = geo.getAttribute('color') as THREE.BufferAttribute
    const posArr = posAttr.array as Float32Array
    const colArr = colAttr.array as Float32Array

    const tmp = new THREE.Vector3()
    const ptrXY = pointer.current

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = ix + 1
      const iz = ix + 2

      // Distance from pointer (2-D projected)
      tmp.set(posArr[ix], posArr[iy], posArr[iz])
      const dx = tmp.x - ptrXY.x
      const dy = tmp.y - ptrXY.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 20) {
        // Repel
        const force = (1 - dist / 20) * 0.04
        posArr[ix] += dx * force
        posArr[iy] += dy * force

        // Colour → accent
        const mix = Math.min((1 - dist / 20) * 0.4, 1)
        colArr[ix] = THREE.MathUtils.lerp(baseColor.r, accentColor.r, mix)
        colArr[iy] = THREE.MathUtils.lerp(baseColor.g, accentColor.g, mix)
        colArr[iz] = THREE.MathUtils.lerp(baseColor.b, accentColor.b, mix)
      } else {
        // Colour → base
        colArr[ix] += (baseColor.r - colArr[ix]) * 0.02
        colArr[iy] += (baseColor.g - colArr[iy]) * 0.02
        colArr[iz] += (baseColor.b - colArr[iz]) * 0.02
      }

      // Spring back to original position
      posArr[ix] += (originals[ix] - posArr[ix]) * 0.01
      posArr[iy] += (originals[iy] - posArr[iy]) * 0.01
      posArr[iz] += (originals[iz] - posArr[iz]) * 0.01
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/* -------------------------------------------------------------------------- */
/*  Energy Lines – 530 dashed lines streaming forward in Z                     */
/* -------------------------------------------------------------------------- */
function EnergyLines() {
  const lineCount = 300
  const groupRef = useRef<THREE.Group>(null)

  const lines = useMemo(() => {
    const arr: { start: THREE.Vector3; end: THREE.Vector3; speed: number }[] = []
    for (let i = 0; i < lineCount; i++) {
      const x = (Math.random() - 0.5) * 120
      const y = (Math.random() - 0.5) * 120
      const z = Math.random() * -80
      const len = 2 + Math.random() * 6
      arr.push({
        start: new THREE.Vector3(x, y, z),
        end: new THREE.Vector3(x, y, z + len),
        speed: 0.02 + Math.random() * 0.05,
      })
    }
    return arr
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line
      const data = lines[i]
      data.start.z += data.speed
      data.end.z += data.speed
      if (data.start.z > 40) {
        data.start.z = -80
        data.end.z = data.start.z + (2 + Math.random() * 6)
      }
      const posArray = (line.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array
      posArray[2] = data.start.z
      posArray[5] = data.end.z
      ;(line.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
    })
  })

  return (
    <group ref={groupRef}>
      {lines.map((l, i) => {
        const posArr = new Float32Array([
          l.start.x, l.start.y, l.start.z,
          l.end.x, l.end.y, l.end.z,
        ])
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[posArr, 3]}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={0x88aaff}
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </line>
        )
      })}
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Scene – combines particles + lines + bloom post-processing                */
/* -------------------------------------------------------------------------- */
function Scene() {
  return (
    <>
      <Particles />
      <EnergyLines />
      <EffectComposer>
        <Bloom
          luminanceThreshold={1.0}
          luminanceSmoothing={0.1}
          intensity={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Exported wrapper – full-screen fixed canvas                               */
/* -------------------------------------------------------------------------- */
export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        dpr={[1, 1]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
