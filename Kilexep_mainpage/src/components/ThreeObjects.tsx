'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeObjects() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const mountElement = mountRef.current
    if (!mountElement) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup - positioned to only show hero area
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 20)

    // Renderer setup with enhanced blur and anti-aliasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    mountElement.appendChild(renderer.domElement)

    // Very subtle, blurred materials - matching Pitch's minimal style
    const purpleMaterial = new THREE.MeshPhongMaterial({
      color: 0x8B5BF7,
      shininess: 10,
      transparent: true,
      opacity: 0.15, // Much more transparent
      side: THREE.DoubleSide
    })

    const lightPurpleMaterial = new THREE.MeshPhongMaterial({
      color: 0xA78BFA,
      shininess: 8,
      transparent: true,
      opacity: 0.12, // Very subtle
      side: THREE.DoubleSide
    })

    const objects: THREE.Mesh[] = []

    // 1. Torus (ring-shaped) - bottom left position
    const torusGeometry = new THREE.TorusGeometry(2.5, 0.8, 16, 100)
    const torus = new THREE.Mesh(torusGeometry, purpleMaterial)
    torus.position.set(-12, -8, -10)
    torus.rotation.x = Math.PI / 3
    torus.rotation.z = Math.PI / 6
    objects.push(torus)
    scene.add(torus)

    // 2. Cone - behind the torus in back
    const coneGeometry = new THREE.ConeGeometry(2, 4, 32)
    const cone = new THREE.Mesh(coneGeometry, lightPurpleMaterial)
    cone.position.set(-10, -6, -15) // Further back than torus
    cone.rotation.x = Math.PI / 8
    cone.rotation.z = -Math.PI / 12
    objects.push(cone)
    scene.add(cone)

    // 3. First hemisphere - top right
    const hemisphereGeometry1 = new THREE.SphereGeometry(2.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const hemisphere1 = new THREE.Mesh(hemisphereGeometry1, purpleMaterial)
    hemisphere1.position.set(10, 5, -8)
    hemisphere1.rotation.x = Math.PI
    objects.push(hemisphere1)
    scene.add(hemisphere1)

    // 4. Second hemisphere - overlapping with first, top right
    const hemisphereGeometry2 = new THREE.SphereGeometry(1.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const hemisphere2 = new THREE.Mesh(hemisphereGeometry2, lightPurpleMaterial)
    hemisphere2.position.set(12, 6, -6) // Slightly offset and closer
    hemisphere2.rotation.x = Math.PI
    hemisphere2.rotation.y = Math.PI / 4
    objects.push(hemisphere2)
    scene.add(hemisphere2)

    // Very soft, ambient lighting - minimal shadows
    const ambientLight = new THREE.AmbientLight(0x9CA3AF, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xE5E7EB, 0.3)
    directionalLight.position.set(8, 8, 15)
    directionalLight.castShadow = false // No harsh shadows
    scene.add(directionalLight)

    // Very gentle, slow animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      const time = Date.now() * 0.0001 // Even slower

      objects.forEach((obj, index) => {
        // Extremely slow rotation
        obj.rotation.y += 0.0005 + index * 0.0001

        // Store original position for reference
        if (!obj.userData.originalPosition) {
          obj.userData.originalPosition = {
            x: obj.position.x,
            y: obj.position.y,
            z: obj.position.z
          }
        }

        // Extremely subtle floating motion
        const original = obj.userData.originalPosition
        obj.position.y = original.y + Math.sin(time + index * 3) * 0.1
        obj.position.x = original.x + Math.cos(time + index * 2) * 0.05
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current) return

      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }

      if (mountElement && rendererRef.current) {
        mountElement.removeChild(rendererRef.current.domElement)
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
      }

      // Clean up geometries and materials
      objects.forEach(obj => {
        obj.geometry.dispose()
        if (obj.material instanceof THREE.Material) {
          obj.material.dispose()
        }
      })
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{
        height: '100vh',
        zIndex: 5,
        clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 85%)',
        filter: 'blur(1.5px)', // Add CSS blur effect for extra softness
        mixBlendMode: 'screen' // Blend mode for more natural integration
      }}
    />
  )
}
