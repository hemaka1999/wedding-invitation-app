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
      sampleUv.y = clamp(1.0 - sampleUv.y, 0.0, 1.0);
    }

    vec4 texColor = texture2D(uTexture, sampleUv);
    
    // Calculate darkness of the sketch line (1.0 = pencil stroke, 0.0 = paper background)
    float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    float sketchDarkness = 1.0 - luma;
    sketchDarkness = smoothstep(0.04, 0.65, sketchDarkness);

    // Dynamic light tracking
    vec2 lightPos = uMouse;

    // 1. Radial spot light following cursor
    float dist = length(vUv - lightPos);
    float spotLight = smoothstep(0.7, 0.0, dist);

    // 2. Linear diagonal gold foil reflection beam tracking cursor
    float cursorGleamPos = lightPos.x * 0.7 + lightPos.y * 0.3;
    float uvGleamPos = vUv.x * 0.7 + vUv.y * 0.3;
    float linearGleam = smoothstep(0.25, 0.0, abs(uvGleamPos - cursorGleamPos));

    // 3. Continuous gentle ambient shine sweep over time
    float timeSweep = sin(uTime * 1.2 + vUv.x * 3.0 + vUv.y * 2.0) * 0.5 + 0.5;
    timeSweep = pow(timeSweep, 3.0) * 0.4;

    // Total gold specular intensity
    float goldFactor = (spotLight * 1.1 + linearGleam * 0.9 + timeSweep) * uGoldIntensity;

    // Luxury Metallic Gold Foil Gradient (Bright 24k Gold -> Rich Warm Amber Gold)
    vec3 goldHighlight = vec3(1.0, 0.96, 0.85); // Brilliant bright gold #FFF5D9
    vec3 goldMid = vec3(0.95, 0.78, 0.36);       // Warm 24K gold #F2C75C
    vec3 goldDeep = vec3(0.76, 0.54, 0.18);      // Deep amber gold #C28A2E
    
    vec3 goldColor = mix(goldDeep, goldMid, clamp(goldFactor * 1.2, 0.0, 1.0));
    goldColor = mix(goldColor, goldHighlight, clamp((goldFactor - 0.6) * 1.8, 0.0, 1.0));

    // Base charcoal pencil color
    vec3 pencilColor = vec3(0.22, 0.19, 0.17);

    // Apply metallic gold to the pencil strokes
    vec3 finalColor = mix(pencilColor, goldColor, clamp(goldFactor * 1.3, 0.0, 1.0));

    // Soft radial vignette to feather the canvas edges into the card
    vec2 centerOffset = vUv - vec2(0.5);
    float vignette = 1.0 - smoothstep(0.40, 0.50, length(centerOffset));

    float finalAlpha = sketchDarkness * uOpacity * vignette;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export default function ThreeSketchShimmer({
  imageSrc,
  className = "",
  opacity = 0.28,
  goldIntensity = 1.4,
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

    // Uniforms
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

    // Smooth global pointer tracking relative to this specific card container
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      // Calculate normalized position (0.0 to 1.0)
      let normX = (clientX - rect.left) / rect.width;
      let normY = 1.0 - (clientY - rect.top) / rect.height;

      // Clamp with soft margin so sweeping from nearby card still illuminates this card
      normX = Math.max(-0.2, Math.min(1.2, normX));
      normY = Math.max(-0.2, Math.min(1.2, normY));

      targetMouseRef.current.set(normX, normY);
    };

    // Device orientation (phone tilt)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = (e.gamma + 30) / 60;
        const y = (e.beta - 10) / 60;
        targetMouseRef.current.set(
          Math.max(0.0, Math.min(1.0, x)),
          Math.max(0.0, Math.min(1.0, 1.0 - y))
        );
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });
    }

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    // Intersection Observer
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

      // Smooth interpolation
      mouseRef.current.lerp(targetMouseRef.current, 0.08);
      uniforms.uMouse.value.copy(mouseRef.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
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
