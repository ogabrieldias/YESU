"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particles positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const orange = new THREE.Color("#ff6b00");
    const ember = new THREE.Color("#ff8c00");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      // Position in a wide space
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // Color mix
      const rand = Math.random();
      let mixedColor = white;
      if (rand > 0.6) {
        mixedColor = orange;
      } else if (rand > 0.2) {
        mixedColor = ember;
      }

      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }

    return [pos, cols];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = time * 0.008;

    // Small wave effect using y-positions
    const posAttribute = pointsRef.current.geometry.attributes.position;
    if (posAttribute) {
      const array = posAttribute.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const x = array[i * 3];
        array[i * 3 + 1] += Math.sin(time + x * 0.2) * 0.003;
      }
      posAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={1500} />
      </Canvas>
    </div>
  );
}
