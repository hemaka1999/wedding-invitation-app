"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeFloatingDust() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create golden stardust particles
    const particleCount = 45;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      scales[i] = Math.random() * 0.8 + 0.4;

      speeds[i * 3] = (Math.random() - 0.5) * 0.015;
      speeds[i * 3 + 1] = Math.random() * 0.02 + 0.008; // drift upwards
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Texture
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, "rgba(255, 243, 214, 0.95)");
      gradient.addColorStop(0.3, "rgba(229, 199, 122, 0.75)");
      gradient.addColorStop(0.7, "rgba(197, 158, 71, 0.3)");
      gradient.addColorStop(1, "rgba(197, 158, 71, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: particleTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse / Touch interaction
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 4;
    };
    window.addEventListener("pointermove", handlePointerMove);

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Move upward with gentle oscillation
        posArray[i * 3 + 1] += speeds[i * 3 + 1];
        posArray[i * 3] += speeds[i * 3] + Math.sin(Date.now() * 0.001 + i) * 0.005;

        // Reset if drifted above top
        if (posArray[i * 3 + 1] > 30) {
          posArray[i * 3 + 1] = -30;
          posArray[i * 3] = (Math.random() - 0.5) * 40;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Gentle camera parallax tracking
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
    />
  );
}
