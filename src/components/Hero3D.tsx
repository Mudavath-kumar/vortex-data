import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import * as THREE from "three";

function AnimatedSphere({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color={isDark ? "#00D9FF" : "#0099CC"}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive={isDark ? "#00D9FF" : "#0099CC"}
        emissiveIntensity={isDark ? 0.3 : 0.5}
      />
    </Sphere>
  );
}

export const Hero3D = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={isDark ? 0.5 : 0.8} />
          <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 1.5} color={isDark ? "#00D9FF" : "#0099CC"} />
          <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 0.8} color={isDark ? "#9D4EDD" : "#8B5CF6"} />
          <spotLight position={[0, 10, 0]} intensity={isDark ? 0.5 : 1} angle={0.3} penumbra={1} color={isDark ? "#00D9FF" : "#0099CC"} />
          <AnimatedSphere isDark={isDark} />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset={isDark ? "night" : "city"} />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
            Vortex Analytics
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Futuristic Sales Intelligence Platform
          </p>
          <motion.div
            className="inline-block px-8 py-4 glass-strong rounded-2xl neon-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-lg font-semibold">
              Scroll down to explore the data
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark 
          ? "bg-gradient-to-b from-transparent via-background/50 to-background" 
          : "bg-gradient-to-b from-transparent via-background/30 to-background"
      }`} />
    </motion.section>
  );
};
