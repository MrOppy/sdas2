import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[2, 0, -5]}>
            <torusGeometry args={[1, 0.3, 16, 100]} />
            <meshStandardMaterial color="#88c0d0" wireframe />
          </mesh>
        </Float>
        <Float speed={1.2} rotationIntensity={1.2} floatIntensity={1.8}>
          <mesh position={[-2, 1, -3]}>
            <octahedronGeometry args={[0.8]} />
            <meshStandardMaterial color="#5e81ac" wireframe />
          </mesh>
        </Float>
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}