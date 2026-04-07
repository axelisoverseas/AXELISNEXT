import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleField = ({ className = '', particleCount = 80, color = '#fbbf24', connectionDistance = 120 }) => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 300;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Particles
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 600;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
            velocities.push({
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3,
                z: (Math.random() - 0.5) * 0.15,
            });
            sizes[i] = Math.random() * 3 + 1;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Custom shader material for glowing particles
        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(color) },
                uTime: { value: 0 },
            },
            vertexShader: `
        attribute float size;
        varying float vAlpha;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = size / 4.0;
        }
      `,
            fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(uColor, glow * vAlpha * 0.8);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Connection lines
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending,
        });
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // Mouse interaction
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        container.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);

            const posArray = particleGeometry.attributes.position.array;

            // Update particle positions
            for (let i = 0; i < particleCount; i++) {
                posArray[i * 3] += velocities[i].x;
                posArray[i * 3 + 1] += velocities[i].y;
                posArray[i * 3 + 2] += velocities[i].z;

                // Bounce at boundaries
                if (Math.abs(posArray[i * 3]) > 300) velocities[i].x *= -1;
                if (Math.abs(posArray[i * 3 + 1]) > 200) velocities[i].y *= -1;
                if (Math.abs(posArray[i * 3 + 2]) > 100) velocities[i].z *= -1;

                // Subtle mouse attraction
                posArray[i * 3] += mouse.x * 0.2;
                posArray[i * 3 + 1] += mouse.y * 0.2;
            }
            particleGeometry.attributes.position.needsUpdate = true;

            // Draw connection lines
            const linePositions = [];
            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = posArray[i * 3] - posArray[j * 3];
                    const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
                    const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (dist < connectionDistance) {
                        linePositions.push(
                            posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
                            posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
                        );
                    }
                }
            }
            lineGeometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(linePositions, 3)
            );

            // Slow rotation
            particles.rotation.y += 0.0003;
            lines.rotation.y += 0.0003;

            particleMaterial.uniforms.uTime.value += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current);
            container.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            particleGeometry.dispose();
            particleMaterial.dispose();
            lineMaterial.dispose();
            lineGeometry.dispose();
        };
    }, [particleCount, color, connectionDistance]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 pointer-events-auto ${className}`}
            style={{ zIndex: 0 }}
        />
    );
};

export default ParticleField;
