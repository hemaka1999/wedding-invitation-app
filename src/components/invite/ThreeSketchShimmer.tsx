"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface ThreeSketchShimmerProps {
  imageSrc: string;
  className?: string;
  opacity?: number;
  goldIntensity?: number;
  sliceOffset?: number; // 0.0 to 1.0 for timeline slices
  sliceHeight?: number; // slice window size (e.g. 0.2 for 1/5)
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uGoldIntensity;
  uniform float uSliceOffset;
  uniform float uSliceHeight;
  uniform int uUseSlice;
  varying vec2 vUv;

  void main() {
    vec2 sampleUv = vUv;
    if (uUseSlice == 1) {
      // Map vUv.y (0 to 1) to the slice range in the full image
      sampleUv.y = uSliceOffset + (1.0 - vUv.y) * uSliceHeight;
      // Invert Y for standard texture loading
      sampleUv.y = clamp(1.0 - sampleUv.y, 0.0, 1.0);
    }

    vec4 texColor = texture2D(uTexture, sampleUv);
    
    // Calculate darkness of the sketch line (1.0 = dark pencil stroke, 0.0 = white paper)
    float sketchDarkness = 1.0 - ((texColor.r + texColor.g + texColor.b) / 3.0);
    sketchDarkness = smoothstep(0.08, 0.75, sketchDarkness);

    // Distance to interactive light point (mouse or sweeping ambient beam)
    vec2 lightPos = uMouse;
    
    // Add a slow ambient golden sweep over time
    float sweep = sin(uTime * 0.8 + vUv.x * 2.5 + vUv.y * 3.0) * 0.5 + 0.5;
    
    float dist = length(vUv - lightPos);
    float interactiveSpot = smoothstep(0.65, 0.0, dist);
    
    // Combine spot and subtle ambient sweep
    float goldFactor = max(interactiveSpot * 1.2, sweep * 0.35) * uGoldIntensity;

    // Metallic Gold Color Gradient Palette
    vec3 goldHighlight = vec3(0.98, 0.93, 0.82); // #FCEFD2
    vec3 goldMid = vec3(0.89, 0.78, 0.48);       // #E5C77A
    vec3 goldDeep = vec3(0.77, 0.62, 0.28);      // #C59E47
    
    vec3 goldShimmer = mix(goldDeep, goldMid, clamp(goldFactor * 1.5, 0.0, 1.0));
    goldShimmer = mix(goldShimmer, goldHighlight, clamp((goldFactor - 0.7) * 2.0, 0.0, 1.0));

    // Base pencil charcoal color
    vec3 pencilColor = vec3(0.25, 0.22, 0.20);

    // Blend charcoal pencil lines with metallic gold shimmer
    vec3 finalColor = mix(pencilColor, goldShimmer, goldFactor * sketchDarkness);

    // Soft radial vignette to blend edges naturally into the card
    vec2 centerOffset = vUv - vec2(0.5);
    float vignette = 1.0 - smoothstep(0.38, 0.50, length(centerOffset));

    float finalAlpha = sketchDarkness * uOpacity * vignette;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export default function ThreeSketchShimmer({
  imageSrc,
  className = "",
  opacity = 0.18,
  goldIntensity = 1.0,
  sliceOffset,
  sliceHeight,
}: ThreeSketchShimmerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageSrc, () => {
      renderer.render(scene, camera);
    });
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Custom Shader Material
    const uniforms = {
      uTexture: { value: texture },
      uMouse: { value: mouseRef.current },
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uGoldIntensity: { value: goldIntensity },
      uSliceOffset: { value: sliceOffset ?? 0.0 },
      uSliceHeight: { value: sliceHeight ?? 1.0 },
      uUseSlice: { value: sliceOffset !== undefined ? 1 : 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse & Touch Interaction
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetMouseRef.current.set(x, 1.0 - y);
    };

    // Gyroscope tilt on mobile devices
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = (e.gamma + 45) / 90;
        const y = (e.beta + 45) / 90;
        targetMouseRef.current.set(Math.min(Math.max(x, 0), 1), Math.min(Math.max(1.0 - y, 0), 1));
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    // Intersection Observer to pause rendering when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      // Smooth mouse interpolation (lerp)
      mouseRef.current.lerp(targetMouseRef.current, 0.06);
      uniforms.uMouse.value.copy(mouseRef.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [imageSrc, opacity, goldIntensity, sliceOffset, sliceHeight]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
