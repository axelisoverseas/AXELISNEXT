"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const RealisticGlobe = ({ className = '' }) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    let scene, camera, renderer, earth, clouds, atmosphere, innerGlow;
    const globeContainer = containerRef.current;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fallback function for when WebGL is not available
    function showFallback() {
      globeContainer.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gradient-to-br from-blue-900 to-blue-900 rounded-2xl">
          <div class="text-center text-white p-8">
            <div class="w-24 h-24 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Global Reach</h3>
            <p class="text-blue-200">Connecting students worldwide</p>
          </div>
        </div>
      `;
    }

    function init() {
      try {
        // Check WebGL support before creating renderer
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
          console.warn('⚠️ WebGL not supported, showing fallback');
          showFallback();
          return;
        }

        // Scene & Camera
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          60,
          globeContainer.clientWidth / globeContainer.clientHeight,
          0.1,
          1000
        );
        camera.position.z = 2.5;

        // Renderer with alpha for transparency and error handling
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        });
      } catch (error) {
        console.warn('⚠️ WebGL context creation failed:', error.message);
        showFallback();
        return;
      }
      renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      globeContainer.appendChild(renderer.domElement);

      // Lighting setup for realistic day/night effect
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(5, 3, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // Add subtle rim lighting
      const rimLight = new THREE.DirectionalLight(0x4f46e5, 0.3);
      rimLight.position.set(-5, 0, -5);
      scene.add(rimLight);

      // Texture Loader
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin('Anonymous');

      // NASA 4K Earth textures with fallbacks
      const earthTexture = textureLoader.load(
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        undefined,
        undefined,
        () => {
          // Fallback
          textureLoader.load('https://unpkg.com/three-globe/example/img/earth-dark.jpg');
        }
      );

      const bumpMap = textureLoader.load(
        'https://unpkg.com/three-globe/example/img/earth-topology.png'
      );

      const specMap = textureLoader.load(
        'https://unpkg.com/three-globe/example/img/earth-water.png'
      );

      const cloudTexture = textureLoader.load(
        'https://unpkg.com/three-globe/example/img/earth-clouds10k.png'
      );

      // Earth Sphere with realistic materials
      const earthGeometry = new THREE.SphereGeometry(1, 128, 128);
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpMap,
        bumpScale: 0.05,
        specularMap: specMap,
        specular: new THREE.Color(0x333333),
        shininess: 100
      });
      earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

      // Clouds Layer with transparency
      const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.8,
        depthWrite: false
      });
      clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
      scene.add(clouds);

      // Atmosphere Glow Layer
      const atmosphereGeometry = new THREE.SphereGeometry(1.08, 64, 64);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x0ea5e9, // Cyan/Blue glow
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);

      // Inner Edge Glow
      const innerGlowGeometry = new THREE.SphereGeometry(1.02, 64, 64);
      const innerGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
      scene.add(innerGlow);


      // Store references
      sceneRef.current = { scene, camera, renderer, earth, clouds, atmosphere, innerGlow };
      rendererRef.current = renderer;

      // Start animation
      animate();
    }

    function animate() {
      if (!sceneRef.current) return;

      animationRef.current = requestAnimationFrame(animate);

      const { earth, clouds, atmosphere, innerGlow } = sceneRef.current;

      // Only animate if motion is not reduced
      if (!prefersReducedMotion) {
        if (earth) earth.rotation.y += 0.0008; // Earth rotation
        if (clouds) clouds.rotation.y += 0.0009; // Slightly faster cloud rotation
        // Optional: you could rotate the atmosphere/glow slightly if they had textures, but they don't, so we skip adjusting them.
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }

    function onWindowResize() {
      if (!sceneRef.current || !globeContainer) return;

      const { camera, renderer } = sceneRef.current;

      camera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
    }

    // Initialize with error handling
    try {
      init();
      // Add resize listener only if init was successful
      window.addEventListener('resize', onWindowResize, false);
    } catch (error) {
      console.error('❌ RealisticGlobe initialization failed:', error);
      showFallback();
    }

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        const { scene, earth, clouds, atmosphere, innerGlow } = sceneRef.current;

        // Dispose geometries and materials
        if (earth) {
          earth.geometry.dispose();
          earth.material.dispose();
          if (earth.material.map) earth.material.map.dispose();
          if (earth.material.bumpMap) earth.material.bumpMap.dispose();
          if (earth.material.specularMap) earth.material.specularMap.dispose();
        }

        if (clouds) {
          clouds.geometry.dispose();
          clouds.material.dispose();
          if (clouds.material.map) clouds.material.map.dispose();
        }

        if (atmosphere) {
          atmosphere.geometry.dispose();
          atmosphere.material.dispose();
        }

        if (innerGlow) {
          innerGlow.geometry.dispose();
          innerGlow.material.dispose();
        }

        // Clear scene
        while (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{
        background: 'transparent',
        overflow: 'hidden'
      }}
    />
  );
};

export default RealisticGlobe;
