import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Html } from "@react-three/drei";
import { XR, XROrigin, useXR, type XRStore } from "@react-three/xr";
import * as THREE from "three";
import type { Parada } from "@/content/recife-holandes";

/**
 * Cenário 3D REPRESENTATIVO (procedural). As formas indicam a disposição
 * geral do Recife neerlandês e estão preparadas para serem substituídas por
 * modelos 3D históricos validados (GLB) no futuro.
 */

export interface LookState { yaw: number; pitch: number }

const HEAD = 1.6;
const SPEED = 1.4; // velocidade de aproximação da câmera

function canvasTexture(draw: (c: CanvasRenderingContext2D) => void, repeat = 1) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 256;
  draw(cv.getContext("2d")!);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function noise(base: string, dots: string[], n = 2500) {
  return (c: CanvasRenderingContext2D) => {
    c.fillStyle = base; c.fillRect(0, 0, 256, 256);
    for (let i = 0; i < n; i++) {
      c.fillStyle = dots[i % dots.length]!;
      c.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
  };
}

function Ground() {
  const sand = useMemo(() => canvasTexture(noise("#cdb88c", ["#bfa676", "#d9c79f", "#b39a6a"]), 6), []);
  const grass = useMemo(() => canvasTexture(noise("#6f8a4c", ["#5d7a3e", "#7f9a58", "#4f6a35"]), 8), []);
  const water = useMemo(() => canvasTexture(noise("#2f6f86", ["#3a7f95", "#286276", "#4a8fa3"], 4000), 10), []);
  const waterRef = useRef<THREE.Mesh>(null);
  useEffect(() => () => {
    sand.dispose();
    grass.dispose();
    water.dispose();
  }, [grass, sand, water]);
  useFrame((_, d) => {
    if (waterRef.current) (waterRef.current.material as THREE.MeshStandardMaterial).map!.offset.x += d * 0.01;
  });
  return (
    <group>
      <mesh ref={waterRef} rotation-x={-Math.PI / 2} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial map={water} roughness={0.25} metalness={0.1} />
      </mesh>
      {/* Ilha de Antônio Vaz */}
      <mesh position={[-16, 0.1, -4]} receiveShadow><boxGeometry args={[15, 0.3, 20]} /><meshStandardMaterial map={sand} /></mesh>
      {/* Istmo / povoado do Recife */}
      <mesh position={[7, 0.1, -5]} receiveShadow><boxGeometry args={[14, 0.3, 20]} /><meshStandardMaterial map={sand} /></mesh>
      {/* Arrecifes */}
      <mesh position={[22, 0.05, 2]}><boxGeometry args={[1.5, 0.25, 40]} /><meshStandardMaterial color="#8a7b63" roughness={1} /></mesh>
      {/* Continente e Montes Guararapes */}
      <mesh position={[30, 0.1, -26]} receiveShadow><boxGeometry args={[30, 0.3, 20]} /><meshStandardMaterial map={grass} /></mesh>
      {([[24, -20, 4], [30, -24, 5.5], [35, -19, 3.5]] as [number, number, number][]).map(([x, z, h], i) => (
        <mesh key={i} position={[x, h / 2, z]} castShadow><coneGeometry args={[h * 1.4, h, 7]} /><meshStandardMaterial map={grass} flatShading /></mesh>
      ))}
    </group>
  );
}

function House({ position, h = 2.2, color = "#b5583a", rot = 0 }: { position: [number, number, number]; h?: number; color?: string; rot?: number }) {
  return (
    <group position={position} rotation-y={rot}>
      <mesh position={[0, h / 2 + 0.25, 0]} castShadow receiveShadow><boxGeometry args={[1.2, h, 1.8]} /><meshStandardMaterial color={color} roughness={0.9} /></mesh>
      {/* frontão em degraus (gable) */}
      <mesh position={[0, h + 0.55, 0]} rotation-z={Math.PI / 4} castShadow><boxGeometry args={[0.85, 0.85, 1.7]} /><meshStandardMaterial color="#7a3826" /></mesh>
      <mesh position={[0, h * 0.55, 0.91]}><planeGeometry args={[0.35, 0.5]} /><meshStandardMaterial color="#2b2a2f" /></mesh>
    </group>
  );
}

function Town() {
  const houses = useMemo(() => {
    const out: { p: [number, number, number]; h: number; c: string; r: number }[] = [];
    const cols = ["#b5583a", "#c9a46a", "#e3d6bf", "#9c4a32", "#d08b5b"];
    let k = 0;
    for (let x = 2; x <= 12; x += 1.4) for (const z of [-13, -8, -3]) {
      out.push({ p: [x, 0, z], h: 1.8 + ((k * 7) % 5) * 0.25, c: cols[k % 5]!, r: 0 }); k++;
    }
    for (let x = -21; x <= -12; x += 1.6) for (const z of [-11, 2]) {
      out.push({ p: [x, 0, z], h: 1.6 + ((k * 3) % 4) * 0.3, c: cols[k % 5]!, r: 0 }); k++;
    }
    return out;
  }, []);
  return <group>{houses.map((h, i) => <House key={i} position={h.p} h={h.h} color={h.c} rot={h.r} />)}</group>;
}

function Palace() {
  return (
    <group position={[-15, 0.25, -4]}>
      <mesh position={[0, 1.4, 0]} castShadow><boxGeometry args={[6, 2.8, 3]} /><meshStandardMaterial color="#e8dcc4" /></mesh>
      {[-2.6, 2.6].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 3, 0]} castShadow><boxGeometry args={[1.2, 6, 1.2]} /><meshStandardMaterial color="#d9c8a8" /></mesh>
          <mesh position={[0, 6.6, 0]}><coneGeometry args={[0.9, 1.4, 4]} /><meshStandardMaterial color="#5a3a2a" /></mesh>
        </group>
      ))}
      <Label y={8}>Palácio de Friburgo (representação)</Label>
    </group>
  );
}

function Bridge() {
  return (
    <group position={[-4, 0, -2]}>
      <mesh position={[0, 0.6, 0]} castShadow><boxGeometry args={[9, 0.25, 1.6]} /><meshStandardMaterial color="#6b4a30" /></mesh>
      {[-4, -2, 0, 2, 4].map((x) => <mesh key={x} position={[x, 0.25, 0]}><cylinderGeometry args={[0.15, 0.15, 0.8]} /><meshStandardMaterial color="#4a3220" /></mesh>)}
      <Label y={1.8}>Ponte (1643)</Label>
    </group>
  );
}

function Ship({ position, rot = 0 }: { position: [number, number, number]; rot?: number }) {
  const ref = useRef<THREE.Group>(null);
  const seed = position[0];
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime + seed) * 0.08;
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.8 + seed) * 0.03;
    }
  });
  return (
    <group position={position} rotation-y={rot}>
      <group ref={ref}>
        <mesh position={[0, 0.4, 0]} castShadow><boxGeometry args={[1.4, 0.8, 4]} /><meshStandardMaterial color="#5a3a24" /></mesh>
        <mesh position={[0, 2.4, 0]}><cylinderGeometry args={[0.07, 0.07, 3.6]} /><meshStandardMaterial color="#3a2616" /></mesh>
        <mesh position={[0, 2.6, 0.05]}><planeGeometry args={[1.8, 2]} /><meshStandardMaterial color="#efe6d2" side={THREE.DoubleSide} /></mesh>
      </group>
    </group>
  );
}

function Synagogue() {
  return (
    <group position={[3, 0.25, -11]}>
      <mesh position={[0, 1.6, 0]} castShadow><boxGeometry args={[2.4, 3.2, 2]} /><meshStandardMaterial color="#f0e6d0" /></mesh>
      <Label y={4}>Kahal Zur Israel</Label>
    </group>
  );
}

function Fort() {
  return (
    <group position={[8, 0.25, 7]}>
      <mesh position={[0, 0.6, 0]} castShadow><cylinderGeometry args={[2.4, 2.8, 1.2, 5]} /><meshStandardMaterial color="#9b8b70" flatShading /></mesh>
      <Label y={2}>Fortificação</Label>
    </group>
  );
}

function Palms() {
  const pts: [number, number][] = [[-20, -12], [-10, 4], [-22, 3], [12, -14], [1, 3], [14, -2], [26, -16], [33, -27]];
  return (
    <group>
      {pts.map(([x, z], i) => (
        <group key={i} position={[x, 0.25, z]}>
          <mesh position={[0, 1.5, 0]}><cylinderGeometry args={[0.08, 0.13, 3]} /><meshStandardMaterial color="#6b5235" /></mesh>
          {[0, 1, 2, 3, 4].map((k) => (
            <mesh key={k} position={[0, 3, 0]} rotation={[0.9, (k / 5) * Math.PI * 2, 0]}>
              <coneGeometry args={[0.25, 1.6, 3]} /><meshStandardMaterial color="#3f6b35" flatShading />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Label({ children, y }: { children: string; y: number }) {
  return (
    <Html position={[0, y, 0]} center distanceFactor={18} zIndexRange={[10, 0]}>
      <span className="whitespace-nowrap rounded bg-ink/80 px-2 py-1 text-xs text-ink-foreground">{children}</span>
    </Html>
  );
}

function Rig({ stop, look, onReady }: { stop: Parada; look: MutableRefObject<LookState>; onReady: () => void }) {
  const { camera } = useThree();
  const session = useXR((s) => s.session);
  const origin = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3(...stop.alvo));
  const goal = useMemo(() => new THREE.Vector3(...stop.alvo), [stop]);
  const ready = useRef(false);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const k = 1 - Math.exp(-SPEED * dt);
    tmp.set(...stop.camera);
    target.current.lerp(goal, k);
    if (session && origin.current) {
      // Em VR o visitante controla a rotação com a cabeça; o percurso move a origem.
      origin.current.position.lerp(tmp.setY(stop.camera[1] - HEAD), k);
    } else {
      camera.position.lerp(tmp, k);
      camera.lookAt(target.current);
      camera.rotateY(look.current.yaw);
      camera.rotateX(look.current.pitch);
    }
    if (!ready.current) { ready.current = true; onReady(); }
  });
  return <XROrigin ref={origin} position={[stop.camera[0], stop.camera[1] - HEAD, stop.camera[2]]} />;
}

export function RecifeScene({ stop, look, store, onReady }: { stop: Parada; look: MutableRefObject<LookState>; store: XRStore; onReady: () => void }) {
  return (
    <Canvas shadows camera={{ position: stop.camera, fov: 60 }} gl={{ antialias: true }}>
      <XR store={store}>
        <color attach="background" args={["#cfe0e6"]} />
        <fog attach="fog" args={["#cfe0e6", 40, 120]} />
        <hemisphereLight args={["#fff4dc", "#5a6a4a", 0.6]} />
        <directionalLight position={[20, 30, 10]} intensity={2.2} color="#ffe2b0" castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-40} shadow-camera-right={40} shadow-camera-top={40} shadow-camera-bottom={-40} />
        <Environment>
          <Lightformer intensity={2} position={[0, 10, 0]} scale={[20, 20, 1]} rotation-x={Math.PI / 2} />
          <Lightformer intensity={1} color="#ffd9a8" position={[-10, 3, 0]} rotation-y={Math.PI / 2} scale={[30, 3, 1]} />
        </Environment>
        <Ground />
        <Town />
        <Palace />
        <Bridge />
        <Synagogue />
        <Fort />
        <Palms />
        <Ship position={[13, 0, 5]} rot={0.3} />
        <Ship position={[16, 0, 9]} rot={-0.2} />
        <Ship position={[11, 0, 11]} rot={1.2} />
        <Rig stop={stop} look={look} onReady={onReady} />
      </XR>
    </Canvas>
  );
}
