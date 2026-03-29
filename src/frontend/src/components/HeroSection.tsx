import { Button } from "@/components/ui/button";
import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type * as THREE from "three";
import type { Page } from "../App";

function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  geometry: "torus" | "sphere" | "box" | "octahedron" | "torusKnot";
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
    meshRef.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "torus" && <torusGeometry args={[1, 0.35, 16, 100]} />}
      {geometry === "sphere" && <sphereGeometry args={[0.8, 32, 32]} />}
      {geometry === "box" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1]} />}
      {geometry === "torusKnot" && (
        <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
      )}
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#D6A24A" intensity={2} />
      <pointLight position={[-10, -5, -5]} color="#A32020" intensity={1} />
      <spotLight
        position={[0, 15, 5]}
        angle={0.3}
        penumbra={1}
        intensity={3}
        color="#F2C46D"
        castShadow
      />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <FloatingShape
          position={[-4, 1, -3]}
          geometry="torusKnot"
          color="#D6A24A"
          speed={0.6}
        />
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <FloatingShape
          position={[4, -1, -4]}
          geometry="octahedron"
          color="#F2C46D"
          speed={0.8}
        />
      </Float>
      <Float speed={2} rotationIntensity={0.7} floatIntensity={1}>
        <FloatingShape
          position={[-2.5, -2, -2]}
          geometry="sphere"
          color="#C8923B"
          speed={1}
        />
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <FloatingShape
          position={[3, 2, -5]}
          geometry="torus"
          color="#D6A24A"
          speed={0.5}
        />
      </Float>
      <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.9}>
        <FloatingShape
          position={[0, 3, -6]}
          geometry="box"
          color="#7A1414"
          speed={0.7}
        />
      </Float>
    </>
  );
}

interface HeroSectionProps {
  navigate: (page: Page) => void;
}

export default function HeroSection({ navigate }: HeroSectionProps) {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      data-ocid="hero.section"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: "transparent" }}
          className="bg-background"
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="mb-4 text-xs tracking-[0.5em] text-gold uppercase opacity-80 animate-float flex items-center justify-center gap-2">
          <img
            src="/assets/generated/knight-logo-transparent.dim_80x80.png"
            alt="knight"
            className="inline w-6 h-6 object-contain mx-1"
          />
          EST. 2020
          <img
            src="/assets/generated/knight-logo-transparent.dim_80x80.png"
            alt="knight"
            className="inline w-6 h-6 object-contain mx-1"
          />
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-foreground uppercase leading-none mb-4">
          <span className="text-gold block">SPARTAN</span>
          <span className="block text-foreground">CAFETERIA</span>
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base tracking-[0.3em] uppercase mb-2">
          We Are Proud to Be Spartans
        </p>
        <p className="text-muted-foreground text-xs tracking-widest mb-10">
          Goula Road, Haripur Bhandeo, Uttarakhand · Open 10:00 AM – 9:30 PM
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("menu")}
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-background transition-all duration-300 px-8 py-3 text-sm tracking-[0.2em] uppercase font-semibold"
            data-ocid="hero.explore_menu.button"
          >
            EXPLORE MENU
          </Button>
          <a href="tel:+9108445605336">
            <Button
              className="gold-gradient text-background font-bold px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-opacity w-full sm:w-auto"
              data-ocid="hero.reserve_table.button"
            >
              RESERVE TABLE
            </Button>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
