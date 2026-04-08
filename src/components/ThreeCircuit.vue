<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js'

const container = ref(null)
let scene, camera, renderer, ic, pins, animationId

onMounted(() => {
  if (!container.value) return
// Scene setup
scene = new THREE.Scene()

// Adjusted FOV and Aspect Ratio for better centering
const aspect = container.value.clientWidth / container.value.clientHeight
camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
camera.position.set(0, 0, 8) // Pull camera back for more stable view
camera.lookAt(0, 0, 0)

renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(container.value.clientWidth, container.value.clientHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for performance
container.value.appendChild(renderer.domElement)


  // 1. Create Laser Etched Label Texture
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#111827' // Match chip body
  ctx.fillRect(0, 0, 512, 512)
  
  // Laser Etched Text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
  ctx.font = 'bold 60px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('CORE::TEMZ', 256, 200)
  
  ctx.font = '30px monospace'
  ctx.fillText('SN: 0x42A_VER_4.2', 256, 280)
  ctx.fillText('EMBEDDED_SYS_CORE', 256, 330)
  
  // Decorative lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.lineWidth = 4
  ctx.strokeRect(50, 50, 412, 412)

  const labelTexture = new THREE.CanvasTexture(canvas)

  // 2. IC Body
  const bodyGeo = new THREE.BoxGeometry(3.5, 0.6, 2)
  const bodyMat = [
    new THREE.MeshPhongMaterial({ color: 0x111827 }), // side
    new THREE.MeshPhongMaterial({ color: 0x111827 }), // side
    new THREE.MeshPhongMaterial({ map: labelTexture, shininess: 50 }), // top
    new THREE.MeshPhongMaterial({ color: 0x030712 }), // bottom
    new THREE.MeshPhongMaterial({ color: 0x111827 }), // side
    new THREE.MeshPhongMaterial({ color: 0x111827 }), // side
  ]
  ic = new THREE.Mesh(bodyGeo, bodyMat)
  scene.add(ic)

  // 3. Detailed Pins
  const pinGeo = new THREE.BoxGeometry(0.15, 0.8, 0.1)
  const pinMat = new THREE.MeshStandardMaterial({ 
    color: 0xe2e8f0, 
    metalness: 1, 
    roughness: 0.1 
  })
  
  pins = new THREE.Group()
  for (let i = -1.4; i <= 1.4; i += 0.4) {
    // Left side pins with "shoulder" detail
    const p1 = new THREE.Mesh(pinGeo, pinMat)
    p1.position.set(i, -0.3, -1.05)
    p1.rotation.x = 0.3
    pins.add(p1)
    
    // Right side pins
    const p2 = new THREE.Mesh(pinGeo, pinMat)
    p2.position.set(i, -0.3, 1.05)
    p2.rotation.x = -0.3
    pins.add(p2)
  }
  ic.add(pins)

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  
  const topLight = new THREE.DirectionalLight(0x6366f1, 2)
  topLight.position.set(0, 5, 0)
  scene.add(topLight)

  const sideLight = new THREE.PointLight(0xfbbf24, 10, 10)
  sideLight.position.set(4, 2, 2)
  scene.add(sideLight)

  // Interaction
  let mouseX = 0, mouseY = 0
  let targetRotationX = 0.5, targetRotationY = 0.5

  const onMouseMove = (event) => {
    const rect = container.value.getBoundingClientRect()
    mouseX = (event.clientX - rect.left) / container.value.clientWidth * 2 - 1
    mouseY = -(event.clientY - rect.top) / container.value.clientHeight * 2 + 1
    targetRotationY = mouseX * 1.8
    targetRotationX = -mouseY * 1.2
  }

  container.value.addEventListener('mousemove', onMouseMove)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    // 1. Constant Auto-Rotation (The model always spins on its own)
    ic.rotation.y += 0.008
    
    // 2. Subtle Mouse Tilt (The mouse adds a slight 'sway' rather than direct facing)
    // We use targetRotation as a 'bias' rather than a direct destination
    ic.rotation.x += (targetRotationX * 0.3 - ic.rotation.x) * 0.03
    ic.rotation.z += (targetRotationY * 0.3 - ic.rotation.z) * 0.03
    
    // 3. Life-like floating oscillation
    ic.position.y = Math.sin(Date.now() * 0.001) * 0.15
    
    renderer.render(scene, camera)
  }


  animate()

  const handleResize = () => {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    if (container.value) container.value.removeEventListener('mousemove', onMouseMove)
  })
})
</script>

<template>
  <div ref="container" class="w-full h-[300px] sm:h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing"></div>
</template>
