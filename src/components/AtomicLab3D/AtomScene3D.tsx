import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { calculateShellCounts, SHELL_NAMES } from '../../utils/nuclearPhysics';
import type { SceneVisualMode } from '../../types/atomic3d';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Minimize2, Eye, Play, Pause } from 'lucide-react';

interface AtomScene3DProps {
  protons: number;
  neutrons: number;
  electrons: number;
  visualMode: SceneVisualMode;
  speed: number;
  nucleusExpansion: number;
  isPaused: boolean;
  onTogglePause?: () => void;
  elementSymbol: string;
}

// Fixed 3D gyro tilt rotations for shells 1..7 (in radians)
const SHELL_TILTS: Array<[number, number, number]> = [
  [0.35, 0.2, 0.1],     // K (n=1)
  [-0.55, 0.65, -0.3],  // L (n=2)
  [0.85, -0.45, 0.6],   // M (n=3)
  [-0.7, -0.85, 0.4],   // N (n=4)
  [0.4, 0.95, -0.75],   // O (n=5)
  [-0.95, 0.35, 0.85],  // P (n=6)
  [0.65, -0.9, -0.5],   // Q (n=7)
];

const SHELL_COLORS = [
  '#38bdf8', // K - Cyan
  '#818cf8', // L - Indigo
  '#a855f7', // M - Purple
  '#ec4899', // N - Pink
  '#f59e0b', // O - Amber
  '#10b981', // P - Emerald
  '#06b6d4', // Q - Cyan-blue
];

export const AtomScene3D: React.FC<AtomScene3DProps> = ({
  protons,
  neutrons,
  electrons,
  visualMode,
  speed,
  nucleusExpansion,
  isPaused,
  onTogglePause,
  elementSymbol,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Group references
  const nucleusGroupRef = useRef<THREE.Group | null>(null);
  const electronsGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const orbitalsGroupRef = useRef<THREE.Group | null>(null);

  // State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  // Store simulation clock time
  const simTimeRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Nucleon positions cache
  const nucleonDataRef = useRef<Array<{
    type: 'proton' | 'neutron';
    basePos: THREE.Vector3;
    phase: number;
  }>>([]);

  // Compute 3D Fibonacci sphere points for nucleus
  useEffect(() => {
    const totalNucleons = protons + neutrons;
    const items: Array<{
      type: 'proton' | 'neutron';
      basePos: THREE.Vector3;
      phase: number;
    }> = [];

    if (totalNucleons > 0) {
      // Determine types array (interleaved)
      const types: Array<'proton' | 'neutron'> = [];
      let pLeft = protons;
      let nLeft = neutrons;
      while (pLeft > 0 || nLeft > 0) {
        if (pLeft > 0 && (nLeft === 0 || types.length % 2 === 0)) {
          types.push('proton');
          pLeft--;
        } else if (nLeft > 0) {
          types.push('neutron');
          nLeft--;
        }
      }

      // Pack spheres into a compact nucleus
      const coreRadius = Math.max(0.9, 0.82 * Math.pow(totalNucleons, 0.38));
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < totalNucleons; i++) {
        const type = types[i] || 'proton';
        if (totalNucleons === 1) {
          items.push({
            type,
            basePos: new THREE.Vector3(0, 0, 0),
            phase: 0,
          });
        } else {
          // Layered concentric packing
          const normIndex = (i + 0.5) / totalNucleons;
          const r = coreRadius * Math.pow(normIndex, 0.45);
          const y = (1 - (i / (totalNucleons - 1)) * 2) * r;
          const radiusAtY = Math.sqrt(Math.max(0, r * r - y * y));
          const theta = i * goldenAngle;
          const x = Math.cos(theta) * radiusAtY;
          const z = Math.sin(theta) * radiusAtY;

          items.push({
            type,
            basePos: new THREE.Vector3(x, y, z),
            phase: i * 0.7,
          });
        }
      }
    }

    nucleonDataRef.current = items;
  }, [protons, neutrons]);

  // Initialize Three.js scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#030712');

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 14, 38);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 5;
    controls.maxDistance = 140;
    controls.maxPolarAngle = Math.PI - 0.05;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight('#94a3b8', 1.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight('#ffffff', 1.8);
    dirLight1.position.set(20, 30, 25);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight('#38bdf8', 1.2);
    dirLight2.position.set(-20, -15, -20);
    scene.add(dirLight2);

    const coreLight = new THREE.PointLight('#f43f5e', 2.0, 30);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 6. Background Star Dust
    const starsCount = 450;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 160;
      starPositions[i + 1] = (Math.random() - 0.5) * 160;
      starPositions[i + 2] = (Math.random() - 0.5) * 160;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: '#475569',
      size: 0.6,
      transparent: true,
      opacity: 0.5,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 7. Groups
    const nucleusGroup = new THREE.Group();
    scene.add(nucleusGroup);
    nucleusGroupRef.current = nucleusGroup;

    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);
    ringsGroupRef.current = ringsGroup;

    const electronsGroup = new THREE.Group();
    scene.add(electronsGroup);
    electronsGroupRef.current = electronsGroup;

    const orbitalsGroup = new THREE.Group();
    scene.add(orbitalsGroup);
    orbitalsGroupRef.current = orbitalsGroup;

    // 8. Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Nucleus Meshes
  useEffect(() => {
    const group = nucleusGroupRef.current;
    if (!group) return;

    // Clear old children
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.InstancedMesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    }

    const items = nucleonDataRef.current;
    if (items.length === 0) return;

    const protonIndices: number[] = [];
    const neutronIndices: number[] = [];

    items.forEach((item, idx) => {
      if (item.type === 'proton') protonIndices.push(idx);
      else neutronIndices.push(idx);
    });

    const sphereRadius = Math.max(0.35, Math.min(0.55, 3.8 / Math.pow(items.length, 0.4)));
    const geom = new THREE.SphereGeometry(sphereRadius, 20, 20);

    // Protons InstancedMesh (Coral / Red)
    if (protonIndices.length > 0) {
      const protonMat = new THREE.MeshStandardMaterial({
        color: '#f43f5e',
        emissive: '#881337',
        emissiveIntensity: 0.5,
        roughness: 0.25,
        metalness: 0.15,
      });
      const protonMesh = new THREE.InstancedMesh(geom, protonMat, protonIndices.length);
      protonMesh.name = 'protons';
      protonMesh.userData = { indices: protonIndices };
      group.add(protonMesh);
    }

    // Neutrons InstancedMesh (Cool Slate / Silver)
    if (neutronIndices.length > 0) {
      const neutronMat = new THREE.MeshStandardMaterial({
        color: '#94a3b8',
        emissive: '#1e293b',
        emissiveIntensity: 0.3,
        roughness: 0.35,
        metalness: 0.25,
      });
      const neutronMesh = new THREE.InstancedMesh(geom, neutronMat, neutronIndices.length);
      neutronMesh.name = 'neutrons';
      neutronMesh.userData = { indices: neutronIndices };
      group.add(neutronMesh);
    }
  }, [protons, neutrons]);

  // Update Electron Shells & Orbit Rings
  useEffect(() => {
    const ringsGroup = ringsGroupRef.current;
    const electronsGroup = electronsGroupRef.current;
    if (!ringsGroup || !electronsGroup) return;

    // Clear old rings & electrons
    while (ringsGroup.children.length > 0) {
      const child = ringsGroup.children[0];
      ringsGroup.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    }
    while (electronsGroup.children.length > 0) {
      const child = electronsGroup.children[0];
      electronsGroup.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.InstancedMesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    }

    if (visualMode !== 'shells') return;

    const shellCounts = calculateShellCounts(electrons);
    if (shellCounts.length === 0) return;

    const electronGeom = new THREE.SphereGeometry(0.32, 16, 16);
    const electronMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      emissive: '#0284c7',
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.1,
    });

    let totalElectrons = 0;
    shellCounts.forEach(c => (totalElectrons += c));
    if (totalElectrons === 0) return;

    const electronMesh = new THREE.InstancedMesh(electronGeom, electronMat, totalElectrons);
    electronMesh.name = 'all_electrons';
    electronsGroup.add(electronMesh);

    // Build rings for each shell
    shellCounts.forEach((_, shellIdx) => {
      const r = 4.2 + (shellIdx + 1) * 3.4;
      const tilt = SHELL_TILTS[shellIdx] || [0, 0, 0];
      const color = SHELL_COLORS[shellIdx % SHELL_COLORS.length];

      // Circular orbit line
      const curve = new THREE.EllipseCurve(0, 0, r, r, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(96);
      const ringGeom = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
      });
      const line = new THREE.LineLoop(ringGeom, ringMat);
      line.rotation.set(tilt[0], tilt[1], tilt[2]);
      ringsGroup.add(line);
    });
  }, [electrons, visualMode]);

  // Update Quantum Orbital Clouds (s, p, d)
  useEffect(() => {
    const orbitalsGroup = orbitalsGroupRef.current;
    if (!orbitalsGroup) return;

    // Clear old
    while (orbitalsGroup.children.length > 0) {
      const child = orbitalsGroup.children[0];
      orbitalsGroup.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    }

    if (visualMode !== 'orbitals') return;

    // Helper for transparent glowing material
    const createOrbitalMat = (hex: string, opacity: number) => {
      return new THREE.MeshStandardMaterial({
        color: hex,
        transparent: true,
        opacity,
        roughness: 0.4,
        metalness: 0.1,
        emissive: hex,
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    };

    // 1s orbital sphere
    if (electrons >= 1) {
      const s1Geom = new THREE.SphereGeometry(3.6, 24, 24);
      const s1Mat = createOrbitalMat('#38bdf8', 0.22);
      const s1Mesh = new THREE.Mesh(s1Geom, s1Mat);
      orbitalsGroup.add(s1Mesh);
    }

    // 2s orbital sphere
    if (electrons >= 3) {
      const s2Geom = new THREE.SphereGeometry(6.8, 24, 24);
      const s2Mat = createOrbitalMat('#818cf8', 0.16);
      const s2Mesh = new THREE.Mesh(s2Geom, s2Mat);
      orbitalsGroup.add(s2Mesh);
    }

    // Helper for p-orbital dumbbell lobes
    const addDumbbell = (axis: 'x' | 'y' | 'z', dist: number, scale: number) => {
      const lobeGeom = new THREE.SphereGeometry(scale, 20, 20);
      const posMat = createOrbitalMat('#06b6d4', 0.3); // positive phase
      const negMat = createOrbitalMat('#f43f5e', 0.3); // negative phase

      const lobePos = new THREE.Mesh(lobeGeom, posMat);
      const lobeNeg = new THREE.Mesh(lobeGeom, negMat);

      if (axis === 'x') {
        lobePos.position.set(dist, 0, 0);
        lobeNeg.position.set(-dist, 0, 0);
        lobePos.scale.set(1.4, 0.9, 0.9);
        lobeNeg.scale.set(1.4, 0.9, 0.9);
      } else if (axis === 'y') {
        lobePos.position.set(0, dist, 0);
        lobeNeg.position.set(0, -dist, 0);
        lobePos.scale.set(0.9, 1.4, 0.9);
        lobeNeg.scale.set(0.9, 1.4, 0.9);
      } else {
        lobePos.position.set(0, 0, dist);
        lobeNeg.position.set(0, 0, -dist);
        lobePos.scale.set(0.9, 0.9, 1.4);
        lobeNeg.scale.set(0.9, 0.9, 1.4);
      }
      orbitalsGroup.add(lobePos);
      orbitalsGroup.add(lobeNeg);
    };

    // 2p_x (electrons >= 5)
    if (electrons >= 5) addDumbbell('x', 4.5, 2.2);
    // 2p_y (electrons >= 7)
    if (electrons >= 7) addDumbbell('y', 4.5, 2.2);
    // 2p_z (electrons >= 9)
    if (electrons >= 9) addDumbbell('z', 4.5, 2.2);

    // 3s orbital
    if (electrons >= 11) {
      const s3Geom = new THREE.SphereGeometry(10.5, 24, 24);
      const s3Mat = createOrbitalMat('#a855f7', 0.12);
      const s3Mesh = new THREE.Mesh(s3Geom, s3Mat);
      orbitalsGroup.add(s3Mesh);
    }

    // 3p orbitals
    if (electrons >= 13) addDumbbell('x', 8.2, 3.2);
    if (electrons >= 15) addDumbbell('y', 8.2, 3.2);
    if (electrons >= 17) addDumbbell('z', 8.2, 3.2);
  }, [electrons, visualMode]);

  // Main Animation Loop
  useEffect(() => {
    const dummyMat4 = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);
    const quat = new THREE.Quaternion();

    const animate = (time: number) => {
      reqIdRef.current = requestAnimationFrame(animate);

      const delta = lastTimeRef.current === 0 ? 0 : (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!isPaused) {
        simTimeRef.current += delta * speed;
      }
      const t = simTimeRef.current;

      // 1. Controls damping
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 1.0;
        controlsRef.current.update();
      }

      // 2. Animate Nucleus Nucleons (vibration + expansion)
      const nucleusGroup = nucleusGroupRef.current;
      const nucleonData = nucleonDataRef.current;
      if (nucleusGroup && nucleonData.length > 0) {
        nucleusGroup.children.forEach(child => {
          if (child instanceof THREE.InstancedMesh && child.userData.indices) {
            const indices: number[] = child.userData.indices;
            indices.forEach((dataIdx, instIdx) => {
              const item = nucleonData[dataIdx];
              if (!item) return;

              // Nucleus thermal/quantum vibration
              const vibFreq = 3.5;
              const vibAmp = isPaused ? 0 : 0.04;
              const vx = Math.sin(t * vibFreq + item.phase) * vibAmp;
              const vy = Math.cos(t * vibFreq + item.phase * 1.3) * vibAmp;
              const vz = Math.sin(t * vibFreq * 0.9 + item.phase * 0.7) * vibAmp;

              position
                .copy(item.basePos)
                .multiplyScalar(nucleusExpansion)
                .add(new THREE.Vector3(vx, vy, vz));

              dummyMat4.compose(position, quat.identity(), scale);
              child.setMatrixAt(instIdx, dummyMat4);
            });
            child.instanceMatrix.needsUpdate = true;
          }
        });
      }

      // 3. Animate Electrons along their 3D Shell Orbits
      const electronsGroup = electronsGroupRef.current;
      if (electronsGroup && visualMode === 'shells') {
        const electronMesh = electronsGroup.getObjectByName('all_electrons') as THREE.InstancedMesh | null;
        if (electronMesh) {
          const shellCounts = calculateShellCounts(electrons);
          let globalElectronIdx = 0;

          shellCounts.forEach((count, shellIdx) => {
            const r = 4.2 + (shellIdx + 1) * 3.4;
            const tilt = SHELL_TILTS[shellIdx] || [0, 0, 0];
            const orbitEuler = new THREE.Euler(tilt[0], tilt[1], tilt[2], 'XYZ');
            const orbitQuat = new THREE.Quaternion().setFromEuler(orbitEuler);

            // Shell angular speed: inner shells orbit faster
            const omega = (1.4 / Math.pow(shellIdx + 1, 0.75)) * 1.5;

            for (let i = 0; i < count; i++) {
              // Distribute electrons evenly around the circle + rotate over time
              const angle = (2 * Math.PI * i) / count + t * omega;
              // Coordinates on orbit plane
              const lx = Math.cos(angle) * r;
              const ly = Math.sin(angle) * r;
              const lz = 0;

              // Rotate by shell tilt
              position.set(lx, ly, lz).applyQuaternion(orbitQuat);

              dummyMat4.compose(position, quat.identity(), scale);
              electronMesh.setMatrixAt(globalElectronIdx, dummyMat4);
              globalElectronIdx++;
            }
          });
          electronMesh.instanceMatrix.needsUpdate = true;
        }
      }

      // 4. Subtle rotation for quantum orbitals cloud
      const orbitalsGroup = orbitalsGroupRef.current;
      if (orbitalsGroup && visualMode === 'orbitals') {
        orbitalsGroup.rotation.y = t * 0.15;
      }

      // 5. Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [electrons, visualMode, speed, isPaused, nucleusExpansion, autoRotate]);

  // Viewport action handlers
  const handleResetCamera = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 14, 38);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);

  const handleZoom = (factor: number) => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(factor);
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleToggleFullscreen = () => {
    const el = mountRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const shellCounts = calculateShellCounts(electrons);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl select-none group"
    >
      {/* On-Canvas Overlay Header: Identity & Mode */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 shadow-lg flex items-center gap-2 pointer-events-auto">
          <span className="text-xl font-black font-sans text-sky-400 leading-none">
            {elementSymbol || 'X'}
          </span>
          <div className="flex flex-col text-[10px] leading-tight font-mono text-slate-300">
            <span>
              Z={protons} • N={neutrons} • e⁻={electrons}
            </span>
            <span className="text-slate-400">
              {visualMode === 'shells' ? 'ბორის 3D შრეები' : 'კვანტური ორბიტალები'}
            </span>
          </div>
        </div>

        {/* Legend pills */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/75 backdrop-blur-md border border-slate-800 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 inline-block" />
            პროტონი ({protons})
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-sm shadow-slate-400/50 inline-block" />
            ნეიტრონი ({neutrons})
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50 inline-block" />
            ელექტრონი ({electrons})
          </span>
        </div>
      </div>

      {/* On-Canvas Controls (Top Right) */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        {onTogglePause && (
          <button
            type="button"
            onClick={onTogglePause}
            className={`p-2 rounded-xl backdrop-blur-md border text-xs font-bold transition-all cursor-pointer shadow-md ${
              isPaused
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
            title={isPaused ? 'ანიმაციის გაგრძელება' : 'ანიმაციის შეჩერება'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        )}

        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-xl backdrop-blur-md border text-xs transition-all cursor-pointer shadow-md ${
            autoRotate
              ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
          title="3D ავტო-ბრუნვა"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleZoom(0.85)}
          className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
          title="მოახლოება"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleZoom(1.15)}
          className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
          title="დაშორება"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleResetCamera}
          className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:bg-slate-800 text-[11px] font-semibold transition-all cursor-pointer shadow-md flex items-center gap-1"
          title="კამერის საწყის პოზიციაზე დაბრუნება"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ცენტრი</span>
        </button>

        <button
          type="button"
          onClick={handleToggleFullscreen}
          className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
          title={isFullscreen ? 'სრული ეკრანიდან გამოსვლა' : 'სრულ ეკრანზე გაშლა'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Hint & Shell Badges */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Active Shell Badges */}
        <div className="flex flex-wrap items-center gap-1 pointer-events-auto">
          {visualMode === 'shells' &&
            shellCounts.map((count, idx) => (
              <span
                key={`shell-badge-${idx}`}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 shadow-md flex items-center gap-1"
                style={{ borderLeftColor: SHELL_COLORS[idx % SHELL_COLORS.length], borderLeftWidth: 3 }}
                title={`${SHELL_NAMES[idx]}-შრე (${idx + 1}): ${count} ელექტრონი`}
              >
                <span className="text-sky-300">{SHELL_NAMES[idx]}:</span>
                <span>{count}e⁻</span>
              </span>
            ))}
        </div>

        {/* Interaction Hint */}
        <div className="text-[10px] font-mono text-slate-400 bg-slate-950/80 backdrop-blur-md border border-slate-850 px-2.5 py-1 rounded-lg flex items-center gap-2">
          <RotateCw className="w-3 h-3 text-cyan-400" />
          <span>დაატრიალეთ მაუსით</span>
          <span className="text-slate-600">•</span>
          <ZoomIn className="w-3 h-3 text-cyan-400" />
          <span>გაადიდეთ სქროლით</span>
        </div>
      </div>
    </div>
  );
};
