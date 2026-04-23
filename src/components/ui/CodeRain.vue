<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let ctx = null
let animationId = null

const snippets = [
  'void setup()', 'while(true)', 'if (err)', 'const data =', 'uint8_t buf[64]', 
  'analogRead(A0)', 'digitalWrite(13, HIGH)', 'Serial.begin(115200)', 
  'import { ref } from "vue"', 'git commit -m "fix"', 'npm install', 
  'struct Device {', '0x42A', '0xFF', '1010101', '0x1A2B', 'GPIO_PIN_4',
  '#include <iostream>', 'std::vector<int>', 'template <typename T>',
  'SPI.transfer(0xAA)', 'I2C_Write(0x23)', 'FreeRTOS::Task', 'ISR(TIMER1_COMPA_vect)',
  'JSON.stringify(payload)', 'axios.get("/api/status")',
  '10110100', '00101110', '11110001', '01010101'
]

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  
  const resize = () => {
    canvas.width = canvas.parentElement.offsetWidth
    canvas.height = canvas.parentElement.offsetHeight
  }
  
  window.addEventListener('resize', resize)
  resize()

  const fontSize = 14
  const columns = Math.floor(canvas.width / 200) // Double the spacing (fewer columns)
  const drops = []
  
  // Each drop will have: x, y, speed, snippet index, opacity
  for (let i = 0; i < columns; i++) {
    drops[i] = {
      x: i * 200 + Math.random() * 100,
      y: Math.random() * -canvas.height,
      speed: 0.5 + Math.random() * 1.5, // Slower speed
      snippet: Math.floor(Math.random() * snippets.length),
      opacity: 0.05 + Math.random() * 0.15 // Much lower opacity
    }
  }

  const draw = () => {
    // Semi-transparent black to create trailing effect
    ctx.fillStyle = 'rgba(2, 6, 23, 0.15)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`

    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i]
      const text = snippets[drop.snippet]
      
      // Color based on snippet (simulation of syntax highlighting)
      if (text.includes('(')) ctx.fillStyle = `rgba(251, 191, 36, ${drop.opacity})` // Amber (functions)
      else if (text.includes('const') || text.includes('void')) ctx.fillStyle = `rgba(99, 102, 241, ${drop.opacity})` // Indigo (keywords)
      else if (text.includes('0x')) ctx.fillStyle = `rgba(45, 212, 191, ${drop.opacity})` // Teal (hex)
      else ctx.fillStyle = `rgba(148, 163, 184, ${drop.opacity})` // Slate (generic)

      ctx.fillText(text, drop.x, drop.y)

      drop.y += drop.speed

      if (drop.y > canvas.height) {
        drop.y = -20
        drop.snippet = Math.floor(Math.random() * snippets.length)
        drop.x = i * 120 + Math.random() * 50
      }
    }

    animationId = requestAnimationFrame(draw)
  }

  draw()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', () => {})
})
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none opacity-40"></canvas>
</template>

<style scoped>
canvas {
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}
</style>
