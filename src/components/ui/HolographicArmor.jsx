import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

// ============================================================================
// HOLOGRAPHIC ARMOR PART COMPONENT (3-LAYER VFX COMPOSITING)
// Layer 1: Semi-translucent dark blue-black physical shell (no raw wireframe!)
// Layer 2: Clean CAD panel and contour line edges (EdgesGeometry, no triangles)
// Layer 3: Dynamic Fresnel rim glow with animated holographic scan line
// ============================================================================
function HoloArmorPart({
 geometry,
 edgesGeometry,
 groupRef,
 baseMaterial,
 edgeMaterial,
 fresnelMaterial,
 position = [0, 0, 0],
 rotation = [0, 0, 0],
 scale = [1, 1, 1],
}) {
 if (!geometry) return null;

 return (
 <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
 {/* Layer 1: Base Physical Glass Shell */}
 <mesh geometry={geometry} material={baseMaterial} />

 {/* Layer 2: Clean Contour Seams & Panel Lines */}
 {edgesGeometry && (
 <lineSegments geometry={edgesGeometry} material={edgeMaterial} />
 )}

 {/* Layer 3: Outer Silhouette Fresnel Rim Glow */}
 <mesh
 geometry={geometry}
 material={fresnelMaterial}
 scale={[1.008, 1.008, 1.008]}
 />
 </group>
 );
}

// ============================================================================
// FLOATING HUD READOUT COMPONENT
// Renders small mono-font tech annotations with thin connector lines
// ============================================================================
function HudReadout({ position, label, subLabel, lineOffset = [-0.4, -0.3, 0] }) {
 const linePoints = useMemo(() => {
 return [
 new THREE.Vector3(0, 0, 0),
 new THREE.Vector3(lineOffset[0] * 0.5, lineOffset[1] * 0.2, lineOffset[2]),
 new THREE.Vector3(lineOffset[0], lineOffset[1], lineOffset[2]),
 ];
 }, [lineOffset]);

 const lineGeo = useMemo(() => {
 return new THREE.BufferGeometry().setFromPoints(linePoints);
 }, [linePoints]);

 return (
 <group position={position}>
 {/* Line Segment */}
 <line geometry={lineGeo}>
 <lineBasicMaterial
 color="#00f0ff"
 transparent
 opacity={0.35}
 blending={THREE.AdditiveBlending}
 />
 </line>

 {/* End Dot */}
 <mesh position={lineOffset}>
 <sphereGeometry args={[0.02, 8, 8]} />
 <meshBasicMaterial
 color="#00f0ff"
 transparent
 opacity={0.8}
 blending={THREE.AdditiveBlending}
 />
 </mesh>
 </group>
 );
}

// ============================================================================
// BACKGROUND PERSPECTIVE GRID
// ============================================================================
function PerspectiveGrid() {
 const gridMat = useMemo(() => {
 return new THREE.ShaderMaterial({
 vertexShader: `
 varying vec2 vUv;
 void main() {
 vUv = uv;
 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 }
 `,
 fragmentShader: `
 varying vec2 vUv;
 void main() {
 vec2 grid = abs(fract(vUv * 16.0 - 0.5) - 0.5) / fwidth(vUv * 16.0);
 float line = min(grid.x, grid.y);
 float gridPattern = 1.0 - min(line, 1.0);
 
 float dist = distance(vUv, vec2(0.5));
 float fade = smoothstep(0.5, 0.05, dist);
 
 gl_FragColor = vec4(vec3(0.0, 0.94, 1.0) * gridPattern * 0.18 * fade, gridPattern * fade * 0.22);
 }
 `,
 transparent: true,
 blending: THREE.AdditiveBlending,
 depthWrite: false,
 });
 }, []);

 return (
 <mesh position={[0, -0.6, -1.6]} rotation={[-Math.PI / 2.5, 0, 0]}>
 <planeGeometry args={[7, 7, 1, 1]} />
 <primitive object={gridMat} attach="material" />
 </mesh>
 );
}

// ============================================================================
// FLOATING DUST PARTICLES
// ============================================================================
function HolographicParticles({ count = 120 }) {
 const pointsRef = useRef();

 const { positions, speeds } = useMemo(() => {
 const pos = new Float32Array(count * 3);
 const spd = new Float32Array(count);
 for (let i = 0; i < count; i++) {
 pos[i * 3] = (Math.random() - 0.5) * 6;
 pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
 pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
 spd[i] = 0.05 + Math.random() * 0.12;
 }
 return { positions: pos, speeds: spd };
 }, [count]);

 const geo = useMemo(() => {
 const bg = new THREE.BufferGeometry();
 bg.setAttribute('position', new THREE.BufferAttribute(positions, 3));
 return bg;
 }, [positions]);

 useFrame((_, delta) => {
 if (!pointsRef.current) return;
 const attr = pointsRef.current.geometry.attributes.position;
 const arr = attr.array;
 for (let i = 0; i < count; i++) {
 arr[i * 3 + 1] += speeds[i] * delta;
 if (arr[i * 3 + 1] > 2.5) {
 arr[i * 3 + 1] = -2.5;
 }
 }
 attr.needsUpdate = true;
 });

 return (
 <points ref={pointsRef} geometry={geo}>
 <pointsMaterial
 size={0.035}
 color="#38bdf8"
 transparent
 opacity={0.4}
 blending={THREE.AdditiveBlending}
 depthWrite={false}
 />
 </points>
 );
}

// ============================================================================
// HOLOGRAPHIC ARMOR 3D SCENE
// Loads bust.glb (or geometries), applies 3-layer materials, runs GSAP assembly,
// Arc Reactor rotation, and responsive mouse parallax sway
// ============================================================================
function ArmorBustScene({
 onGreetingChange,
 isAudioEnabled,
 triggerReplay,
}) {
 const { mouse } = useThree();
 const { scene } = useGLTF('/models/bust.glb');

 // Hierarchy References
 const rootGroupRef = useRef();
 const helmetRef = useRef();
 const chestRef = useRef();
 const shoulderLRef = useRef();
 const shoulderRRef = useRef();
 const coreRef = useRef();

 // Reactor Core References
 const reactorGroupRef = useRef();
 const ring1Ref = useRef();
 const ring2Ref = useRef();
 const ring3Ref = useRef();
 const reactorLightRef = useRef();

 // Animation States
 const isAssembledRef = useRef(false);
 const isSwagDoneRef = useRef(false);
 const reactorPowerRef = useRef(0);
 const eyeIntensityRef = useRef(0);

 // --------------------------------------------------------------------------
 // EXTRACT GEOMETRIES FROM GLB (5 Segmented Parts)
 // --------------------------------------------------------------------------
 const geometries = useMemo(() => {
 const geoms = {};
 scene.traverse((child) => {
 if (child.isMesh) {
 geoms[child.name] = child.geometry;
 }
 });
 return geoms;
 }, [scene]);

 // --------------------------------------------------------------------------
 // LAYER 2: CLEAN CONTOUR EDGES (28 deg threshold - NO raw wireframe!)
 // --------------------------------------------------------------------------
 const edgesGeometries = useMemo(() => {
 const edges = {};
 const threshold = (28 * Math.PI) / 180;
 for (const [name, geom] of Object.entries(geometries)) {
 if (geom) {
 edges[name] = new THREE.EdgesGeometry(geom, threshold);
 }
 }
 return edges;
 }, [geometries]);

 // --------------------------------------------------------------------------
 // LAYER 1: BASE SHELL MATERIAL (Very dark blue-black, transparent physical glass)
 // --------------------------------------------------------------------------
 const baseMaterial = useMemo(
 () =>
 new THREE.MeshPhysicalMaterial({
 color: new THREE.Color('#020b14'),
 emissive: new THREE.Color('#011827'),
 emissiveIntensity: 0.12,
 roughness: 0.22,
 metalness: 0.88,
 transparent: true,
 opacity: 0.22,
 depthWrite: false,
 side: THREE.DoubleSide,
 }),
 []
 );

 // --------------------------------------------------------------------------
 // LAYER 2: EDGE LINES MATERIAL (Ice-blue / silver-white clean lines)
 // --------------------------------------------------------------------------
 const edgeMaterial = useMemo(
 () =>
 new THREE.LineBasicMaterial({
 color: new THREE.Color('#dbeafe'),
 transparent: true,
 opacity: 0.65,
 blending: THREE.AdditiveBlending,
 depthWrite: false,
 }),
 []
 );

 // --------------------------------------------------------------------------
 // LAYER 3: FRESNEL RIM GLOW MATERIAL (Custom Shader with sweeping scan line)
 // --------------------------------------------------------------------------
 const fresnelMaterial = useMemo(() => {
 return new THREE.ShaderMaterial({
 uniforms: {
 uColor: { value: new THREE.Color('#00f0ff') },
 uPower: { value: 2.2 },
 uIntensity: { value: 1.85 },
 uScanY: { value: -10.0 },
 uScanWidth: { value: 0.22 },
 },
 vertexShader: `
 varying vec3 vNormal;
 varying vec3 vViewPosition;
 varying vec3 vWorldPosition;
 void main() {
 vNormal = normalize(normalMatrix * normal);
 vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
 vViewPosition = -mvPosition.xyz;
 vec4 worldPos = modelMatrix * vec4(position, 1.0);
 vWorldPosition = worldPos.xyz;
 gl_Position = projectionMatrix * mvPosition;
 }
 `,
 fragmentShader: `
 varying vec3 vNormal;
 varying vec3 vViewPosition;
 varying vec3 vWorldPosition;
 uniform vec3 uColor;
 uniform float uPower;
 uniform float uIntensity;
 uniform float uScanY;
 uniform float uScanWidth;
 void main() {
 vec3 normal = normalize(vNormal);
 vec3 viewDir = normalize(vViewPosition);
 float dotNV = dot(normal, viewDir);
 float fresnel = pow(1.0 - clamp(abs(dotNV), 0.0, 1.0), uPower);
 
 // Horizontal scanline pulse
 float distToScan = abs(vWorldPosition.y - uScanY);
 float scanGlow = smoothstep(uScanWidth, 0.0, distToScan) * 0.75;

 float alpha = clamp(fresnel * uIntensity + scanGlow, 0.0, 1.0);
 vec3 finalColor = uColor * (fresnel * uIntensity + scanGlow * 1.6);
 gl_FragColor = vec4(finalColor, alpha);
 }
 `,
 transparent: true,
 blending: THREE.AdditiveBlending,
 depthWrite: false,
 side: THREE.FrontSide,
 });
 }, []);

 // --------------------------------------------------------------------------
 // ARC REACTOR & EYE MATERIALS
 // --------------------------------------------------------------------------
 const reactorRingsGeom = useMemo(() => {
 return {
 ring1: new THREE.TorusGeometry(0.32, 0.024, 16, 44),
 ring2: new THREE.TorusGeometry(0.22, 0.018, 16, 36),
 ring3: new THREE.TorusGeometry(0.13, 0.014, 16, 32),
 coreDisc: new THREE.CylinderGeometry(0.08, 0.08, 0.02, 32),
 eyeL: new THREE.BoxGeometry(0.18, 0.04, 0.05),
 eyeR: new THREE.BoxGeometry(0.18, 0.04, 0.05),
 };
 }, []);

 const reactorGlowMat = useMemo(
 () =>
 new THREE.MeshBasicMaterial({
 color: new THREE.Color('#00f0ff'),
 transparent: true,
 opacity: 0,
 blending: THREE.AdditiveBlending,
 }),
 []
 );

 const reactorCoreMat = useMemo(
 () =>
 new THREE.MeshBasicMaterial({
 color: new THREE.Color('#ffffff'),
 transparent: true,
 opacity: 0,
 }),
 []
 );

 const eyeVisorMat = useMemo(
 () =>
 new THREE.MeshBasicMaterial({
 color: new THREE.Color('#38bdf8'),
 transparent: true,
 opacity: 0,
 blending: THREE.AdditiveBlending,
 }),
 []
 );

 // --------------------------------------------------------------------------
 // ROBOTIC VOICE SYNTHESIS
 // --------------------------------------------------------------------------
 const playRoboticVoice = () => {
 if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
 try {
 window.speechSynthesis.cancel();
 const utterance = new SpeechSynthesisUtterance(
 "Hey! Welcome aboard. I'm ready. Let's get started!"
 );
 utterance.pitch = 0.82;
 utterance.rate = 1.02;
 utterance.volume = 0.95;

 const voices = window.speechSynthesis.getVoices();
 const techVoice = voices.find(
 (v) =>
 v.name.toLowerCase().includes('google') ||
 v.name.toLowerCase().includes('daniel') ||
 v.name.toLowerCase().includes('en-us')
 );
 if (techVoice) utterance.voice = techVoice;

 window.speechSynthesis.speak(utterance);
 } catch {
 // Audio fallback
 }
 };

 // --------------------------------------------------------------------------
 // CINEMATIC ASSEMBLY TIMELINE
 // --------------------------------------------------------------------------
 useEffect(() => {
 if (!rootGroupRef.current) return;

 const prefersReducedMotion =
 typeof window !== 'undefined' &&
 window.matchMedia &&
 window.matchMedia('(prefers-reduced-motion: reduce)').matches;

 if (prefersReducedMotion) {
 // Static placement for accessibility
 isAssembledRef.current = true;
 isSwagDoneRef.current = true;
 reactorGlowMat.opacity = 0.9;
 reactorCoreMat.opacity = 1.0;
 eyeVisorMat.opacity = 0.95;
 if (reactorLightRef.current) reactorLightRef.current.intensity = 3.5;
 onGreetingChange?.({
 visible: true,
 text: "Hey! Welcome aboard. I'm ready. Let's get started!",
 });
 return;
 }

 isAssembledRef.current = false;
 isSwagDoneRef.current = false;
 reactorPowerRef.current = 0;
 eyeIntensityRef.current = 0;

 // Reset components to scattered fly-in coordinates
 if (helmetRef.current) {
 gsap.set(helmetRef.current.position, { y: 3.5, z: -1.2 });
 gsap.set(helmetRef.current.rotation, { x: -0.65, y: 0.25, z: -0.15 });
 gsap.set(helmetRef.current.scale, { x: 0.3, y: 0.3, z: 0.3 });
 }

 if (chestRef.current) {
 gsap.set(chestRef.current.position, { y: 0.3, z: -3.0 });
 gsap.set(chestRef.current.scale, { x: 0.25, y: 0.25, z: 0.25 });
 }

 if (shoulderLRef.current) {
 gsap.set(shoulderLRef.current.position, { x: 3.2, y: 1.8, z: -1.8 });
 gsap.set(shoulderLRef.current.rotation, { z: -0.5 });
 }

 if (shoulderRRef.current) {
 gsap.set(shoulderRRef.current.position, { x: -3.2, y: 1.8, z: -1.8 });
 gsap.set(shoulderRRef.current.rotation, { z: 0.5 });
 }

 if (coreRef.current) {
 gsap.set(coreRef.current.position, { y: -3.0, z: -1.2 });
 }

 if (reactorGroupRef.current) {
 gsap.set(reactorGroupRef.current.scale, { x: 0, y: 0, z: 0 });
 }

 if (reactorLightRef.current) reactorLightRef.current.intensity = 0;
 eyeVisorMat.opacity = 0;
 reactorCoreMat.opacity = 0;
 reactorGlowMat.opacity = 0;

 onGreetingChange?.({ visible: false, text: '' });

 const tl = gsap.timeline({
 delay: 0.25,
 onComplete: () => {
 isSwagDoneRef.current = true;
 },
 });

 // 1. Abdominal core ascends
 if (coreRef.current) {
 tl.to(
 coreRef.current.position,
 { y: 0, z: 0, duration: 1.1, ease: 'power3.out' },
 0.1
 );
 }

 // 2. Main chest chassis flies in and expands
 if (chestRef.current) {
 tl.to(
 chestRef.current.position,
 { y: 0, z: 0, duration: 1.2, ease: 'back.out(1.15)' },
 0.3
 );
 tl.to(
 chestRef.current.scale,
 { x: 1, y: 1, z: 1, duration: 1.2, ease: 'back.out(1.15)' },
 0.3
 );
 }

 // 3. Deltoids and shoulders fly in and lock into sockets
 if (shoulderLRef.current) {
 tl.to(
 shoulderLRef.current.position,
 { x: 0, y: 0, z: 0, duration: 1.2, ease: 'back.out(1.1)' },
 0.55
 );
 tl.to(
 shoulderLRef.current.rotation,
 { z: 0, duration: 1.1, ease: 'power2.out' },
 0.55
 );
 }

 if (shoulderRRef.current) {
 tl.to(
 shoulderRRef.current.position,
 { x: 0, y: 0, z: 0, duration: 1.2, ease: 'back.out(1.1)' },
 0.6
 );
 tl.to(
 shoulderRRef.current.rotation,
 { z: 0, duration: 1.1, ease: 'power2.out' },
 0.6
 );
 }

 // 4. Helmet descends with mechanical tilt and locks smoothly
 if (helmetRef.current) {
 tl.to(
 helmetRef.current.position,
 { y: 0, z: 0, duration: 1.3, ease: 'back.out(1.2)' },
 0.85
 );
 tl.to(
 helmetRef.current.rotation,
 { x: 0, y: 0, z: 0, duration: 1.2, ease: 'power3.out' },
 0.85
 );
 tl.to(
 helmetRef.current.scale,
 { x: 1, y: 1, z: 1, duration: 1.1, ease: 'power2.out' },
 0.85
 );
 }

 // 5. Arc Reactor power ignition
 if (reactorGroupRef.current) {
 tl.to(
 reactorGroupRef.current.scale,
 {
 x: 1.2,
 y: 1.2,
 z: 1.2,
 duration: 0.45,
 ease: 'elastic.out(1, 0.4)',
 onStart: () => {
 isAssembledRef.current = true;
 },
 },
 1.9
 );
 tl.to(
 reactorGroupRef.current.scale,
 { x: 1, y: 1, z: 1, duration: 0.3, ease: 'power2.out' },
 2.35
 );
 }

 // Reactor light and glowing rings flare
 tl.to(
 reactorPowerRef,
 {
 current: 1.0,
 duration: 0.6,
 onUpdate: () => {
 if (reactorLightRef.current) {
 reactorLightRef.current.intensity = reactorPowerRef.current * 4.0;
 }
 reactorCoreMat.opacity = reactorPowerRef.current * 0.98;
 reactorGlowMat.opacity = reactorPowerRef.current * 0.9;
 },
 },
 1.9
 );

 // Visor eyes subtle illumination
 tl.to(
 eyeIntensityRef,
 {
 current: 1.0,
 duration: 0.5,
 onUpdate: () => {
 eyeVisorMat.opacity = eyeIntensityRef.current * 0.95;
 },
 },
 2.2
 );

 // 6. Greeting Sequence: Helmet acknowledges visitor with subtle nod
 if (helmetRef.current) {
 tl.to(
 helmetRef.current.rotation,
 { x: 0.1, y: 0.08, duration: 0.7, ease: 'power2.out' },
 2.6
 );
 tl.to(
 helmetRef.current.rotation,
 { z: -0.06, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' },
 3.1
 );
 }

 // Display greeting and voice
 tl.call(() => {
 onGreetingChange?.({
 visible: true,
 text: "Hey! Welcome aboard. I'm ready. Let's get started!",
 });
 if (isAudioEnabled) {
 playRoboticVoice();
 }
 }, null, 3.1);

 // 7. Full Swag Movement: Confident turns left and right
 if (rootGroupRef.current && helmetRef.current) {
 // Turn Left (-24 degrees)
 tl.to(
 rootGroupRef.current.rotation,
 { y: -0.42, x: 0.04, duration: 1.4, ease: 'power2.inOut' },
 4.3
 );
 tl.to(
 helmetRef.current.rotation,
 { y: 0.16, z: 0.07, duration: 1.2, ease: 'power2.inOut' },
 4.4
 );

 // Sweep Right (+24 degrees)
 tl.to(
 rootGroupRef.current.rotation,
 { y: 0.42, x: -0.03, duration: 1.8, ease: 'power2.inOut' },
 5.8
 );
 tl.to(
 helmetRef.current.rotation,
 { y: -0.15, z: -0.05, duration: 1.4, ease: 'power2.inOut' },
 6.0
 );

 // Return to Front-Facing Center
 tl.to(
 rootGroupRef.current.rotation,
 { y: 0, x: 0, duration: 1.3, ease: 'power3.out' },
 7.7
 );
 tl.to(
 helmetRef.current.rotation,
 { x: 0, y: 0, z: 0, duration: 1.2, ease: 'power3.out' },
 7.8
 );
 }

 return () => {
 tl.kill();
 };
 }, [triggerReplay]);

 // Handle voice toggle
 useEffect(() => {
 if (isAudioEnabled && isAssembledRef.current) {
 playRoboticVoice();
 }
 }, [isAudioEnabled]);

 // --------------------------------------------------------------------------
 // CONTINUOUS IDLE LOOP & MOUSE PARALLAX TRACKING
 // --------------------------------------------------------------------------
 useFrame((state, delta) => {
 const time = state.clock.getElapsedTime();

 // 1. Counter-Rotating Arc Reactor Rings
 if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.45;
 if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.75;
 if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 1.15;

 // 2. Sweeping Holographic Scan Line (Sweeps Y from +2.2 to -2.8 every 4.2s)
 if (fresnelMaterial) {
 const scanCycle = (time % 4.2) / 4.2;
 fresnelMaterial.uniforms.uScanY.value = 2.2 - scanCycle * 5.0;
 }

 // 3. Reactor Pulsing Breath
 if (reactorLightRef.current && isAssembledRef.current) {
 reactorLightRef.current.intensity =
 2.8 + Math.sin(time * 3.2) * 0.45 + Math.cos(time * 6.5) * 0.2;
 }

 // 4. Smooth Floating Levitation & Mouse Parallax
 if (isSwagDoneRef.current && rootGroupRef.current) {
 const targetFloatY = Math.sin(time * 1.5) * 0.045;
 rootGroupRef.current.position.y = THREE.MathUtils.lerp(
 rootGroupRef.current.position.y,
 -0.15 + targetFloatY,
 0.05
 );

 const targetScale = 1 + Math.sin(time * 1.5) * 0.01;
 rootGroupRef.current.scale.set(targetScale, targetScale, targetScale);

 const targetYaw = mouse.x * 0.26;
 const targetPitch = -mouse.y * 0.15;

 rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
 rootGroupRef.current.rotation.y,
 targetYaw * 0.45,
 0.04
 );
 rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
 rootGroupRef.current.rotation.x,
 targetPitch * 0.32,
 0.04
 );

 if (helmetRef.current) {
 helmetRef.current.rotation.y = THREE.MathUtils.lerp(
 helmetRef.current.rotation.y,
 targetYaw * 0.7,
 0.06
 );
 helmetRef.current.rotation.x = THREE.MathUtils.lerp(
 helmetRef.current.rotation.x,
 targetPitch * 0.6,
 0.06
 );
 }
 }
 });

 return (
 <group ref={rootGroupRef} position={[0, -0.15, 0]}>
 {/* 1. Authentic Iron Man Helmet */}
 <HoloArmorPart
 geometry={geometries.Helmet}
 edgesGeometry={edgesGeometries.Helmet}
 groupRef={helmetRef}
 baseMaterial={baseMaterial}
 edgeMaterial={edgeMaterial}
 fresnelMaterial={fresnelMaterial}
 />

 {/* Visor Eye Slits positioned in the helmet */}
 {helmetRef.current && (
 <group position={[0, 1.12, 0.58]}>
 <mesh
 geometry={reactorRingsGeom.eyeL}
 material={eyeVisorMat}
 position={[0.22, 0, 0]}
 rotation={[0, 0, -0.08]}
 />
 <mesh
 geometry={reactorRingsGeom.eyeR}
 material={eyeVisorMat}
 position={[-0.22, 0, 0]}
 rotation={[0, 0, 0.08]}
 />
 </group>
 )}

 {/* 2. Authentic Iron Man Chest Plate */}
 <HoloArmorPart
 geometry={geometries.Chest}
 edgesGeometry={edgesGeometries.Chest}
 groupRef={chestRef}
 baseMaterial={baseMaterial}
 edgeMaterial={edgeMaterial}
 fresnelMaterial={fresnelMaterial}
 />

 {/* 3. Authentic Left Shoulder */}
 <HoloArmorPart
 geometry={geometries.ShoulderL}
 edgesGeometry={edgesGeometries.ShoulderL}
 groupRef={shoulderLRef}
 baseMaterial={baseMaterial}
 edgeMaterial={edgeMaterial}
 fresnelMaterial={fresnelMaterial}
 />

 {/* 4. Authentic Right Shoulder */}
 <HoloArmorPart
 geometry={geometries.ShoulderR}
 edgesGeometry={edgesGeometries.ShoulderR}
 groupRef={shoulderRRef}
 baseMaterial={baseMaterial}
 edgeMaterial={edgeMaterial}
 fresnelMaterial={fresnelMaterial}
 />

 {/* 5. Authentic Abdominal / Spine Core */}
 <HoloArmorPart
 geometry={geometries.Core}
 edgesGeometry={edgesGeometries.Core}
 groupRef={coreRef}
 baseMaterial={baseMaterial}
 edgeMaterial={edgeMaterial}
 fresnelMaterial={fresnelMaterial}
 />

 {/* 6. Glowing Chest Arc Reactor (3 Concentric Rings + Center Disc + PointLight) */}
 <group ref={reactorGroupRef} position={[0, -0.42, 0.74]}>
 {/* Outer Ring */}
 <mesh ref={ring1Ref} geometry={reactorRingsGeom.ring1}>
 <meshBasicMaterial
 color="#00f0ff"
 transparent
 opacity={0.88}
 blending={THREE.AdditiveBlending}
 />
 </mesh>

 {/* Counter-Rotating Middle Ring */}
 <mesh ref={ring2Ref} geometry={reactorRingsGeom.ring2}>
 <meshBasicMaterial
 color="#e0f2fe"
 transparent
 opacity={0.92}
 blending={THREE.AdditiveBlending}
 />
 </mesh>

 {/* Fast Inner Ring */}
 <mesh ref={ring3Ref} geometry={reactorRingsGeom.ring3} material={reactorGlowMat} />

 {/* Center Glowing Energy Disc */}
 <mesh
 geometry={reactorRingsGeom.coreDisc}
 material={reactorCoreMat}
 rotation={[Math.PI / 2, 0, 0]}
 />

 {/* Soft Point Light */}
 <pointLight
 ref={reactorLightRef}
 color="#00f0ff"
 distance={4.0}
 decay={2}
 position={[0, 0, 0.3]}
 />
 </group>
 </group>
 );
}

// Preload the authentic bust model
useGLTF.preload('/models/bust.glb');

// ============================================================================
// MAIN EXPORTED HOLOGRAPHIC ARMOR HERO COMPONENT
// ============================================================================
export default function HolographicArmor() {
 const containerRef = useRef(null);
 const [greetingState, setGreetingState] = useState({
 visible: false,
 text: '',
 });
 const [isAudioEnabled, setIsAudioEnabled] = useState(false);
 const [replayKey, setReplayKey] = useState(0);

 useEffect(() => {
 if (!containerRef.current) return;
 const observer = new ResizeObserver(() => {
 window.dispatchEvent(new Event('resize'));
 });
 observer.observe(containerRef.current);
 return () => observer.disconnect();
 }, []);

 const handleToggleAudio = () => {
 setIsAudioEnabled((prev) => !prev);
 };

 const handleReplay = () => {
 setReplayKey((k) => k + 1);
 };

 return (
 <div
 ref={containerRef}
 className="holo-card-container relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#05080a] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex items-center justify-center select-none group"
 aria-label="Interactive 3D Holographic Armored Bust hero visual"
 >
 {/* Pure Pitch-Black Void Environment */}
 <div className="absolute inset-0 bg-[#05080a] pointer-events-none" />

 {/* Subtle Cyan Holographic Horizon Glow */}
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.07)_0%,_transparent_72%)] pointer-events-none" />

 {/* Subtle Background CAD Calibration Dots */}
 <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-40" />

 {/* 3D Canvas with Real Holographic Armor Model & VFX Post-Processing */}
 <Canvas
 camera={{ position: [0.95, 0.25, 4.2], fov: 35 }}
 dpr={[1, 1.5]}
 gl={{
 antialias: true,
 alpha: true,
 powerPreference: 'high-performance',
 toneMapping: THREE.ACESFilmicToneMapping,
 toneMappingExposure: 1.1,
 }}
 className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
 >
 {/* Cinematic Studio Lighting */}
 <ambientLight intensity={0.65} color="#052e2b" />
 <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
 <directionalLight position={[-4, 3, -2]} intensity={3.0} color="#00f0ff" />
 <pointLight position={[0, -2.5, -2]} intensity={1.5} color="#0284c7" />

 {/* Perspective Background Grid */}
 <PerspectiveGrid />

 {/* Ambient Hologram Dust Particles */}
 <HolographicParticles count={130} />

 {/* Floating Minimal HUD Readout Coordinates */}
 <HudReadout position={[-1.7, 1.3, -0.5]} label="SYS.STAT" lineOffset={[0.4, -0.3, 0]} />
 <HudReadout position={[1.8, 1.2, -0.5]} label="HOLOSCAN" lineOffset={[-0.4, -0.3, 0]} />
 <HudReadout position={[-1.8, -1.0, -0.5]} label="ARMOR" lineOffset={[0.4, 0.25, 0]} />
 <HudReadout position={[1.7, -1.1, -0.5]} label="REACTOR" lineOffset={[-0.4, 0.25, 0]} />

 {/* Armor Model Assembly & Interaction */}
 <Suspense fallback={null}>
 <ArmorBustScene
 key={replayKey}
 onGreetingChange={setGreetingState}
 isAudioEnabled={isAudioEnabled}
 triggerReplay={replayKey}
 />
 </Suspense>

 {/* VFX Post-Processing: Bloom, Vignette, Chromatic Aberration */}
 <EffectComposer disableNormalPass multisampling={0}>
 <Bloom
 luminanceThreshold={0.2}
 luminanceSmoothing={0.8}
 intensity={0.8}
 radius={0.6}
 />
 <Vignette eskil={false} offset={0.15} darkness={0.75} />
 <ChromaticAberration
 offset={[0.0006, 0.0006]}
 radialModulation={false}
 modulationOffset={0.15}
 />
 </EffectComposer>
 </Canvas>

 {/* =====================================================================
 GREETING BANNER OVERLAY
 "Hey! Welcome aboard. I'm ready. Let's get started!"
 ===================================================================== */}
 {greetingState.visible && (
 <div className="absolute bottom-11 sm:bottom-12 left-4 right-4 z-20 flex justify-center pointer-events-none animate-fadeIn">
 <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-[#00f0ff]/40 text-center shadow-[0_10px_35px_rgba(0,240,255,0.25)] flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping shrink-0" />
 <p className="text-[11px] sm:text-xs md:text-sm font-bold text-white tracking-wide">
 {greetingState.text}
 </p>
 </div>
 </div>
 )}

 {/* =====================================================================
 BOTTOM HUD CAPTION BAR
 ===================================================================== */}
 <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between text-[9px] sm:text-[10px] font-semibold text-[#00f0ff]/70 pointer-events-none px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-black/50 backdrop-blur-sm border border-white/5">
 <div className="flex items-center gap-1.5 sm:gap-2">
 <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
 <span className="tracking-wider">HOLO.SYS // 01</span>
 </div>
 <span className="hidden sm:inline text-stone-400 tracking-wider">ARMORED BUST · REAL-TIME 3D</span>
 <span className="text-stone-400 tracking-wider">3/4 ANGLE</span>
 </div>

 {/* =====================================================================
 MINIMAL INTERACTIVE CONTROLS (Sound Toggle & Replay)
 ===================================================================== */}
 <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
 {/* Replay Assembly Button */}
 <button
 type="button"
 onClick={handleReplay}
 className="p-2 rounded-xl bg-black/60 hover:bg-black/90 text-stone-300 hover:text-[#00f0ff] border border-white/10 hover:border-[#00f0ff]/40 transition-colors backdrop-blur-sm"
 title="Replay Assembly Sequence"
 aria-label="Replay Assembly Sequence"
 >
 <RotateCcw className="w-3.5 h-3.5" />
 </button>

 {/* Robotic Voice Sound Toggle */}
 <button
 type="button"
 onClick={handleToggleAudio}
 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border backdrop-blur-sm transition-all ${
 isAudioEnabled
 ? 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
 : 'bg-black/60 text-stone-300 border-white/10 hover:text-white hover:border-white/20'
 }`}
 aria-label={isAudioEnabled ? 'Mute Robotic Voice' : 'Enable Robotic Voice'}
 >
 {isAudioEnabled ? (
 <>
 <Volume2 className="w-3.5 h-3.5 text-[#00f0ff]" />
 <span>Voice ON</span>
 </>
 ) : (
 <>
 <VolumeX className="w-3.5 h-3.5 text-stone-400" />
 <span>Enable Voice</span>
 </>
 )}
 </button>
 </div>
 </div>
 );
}
