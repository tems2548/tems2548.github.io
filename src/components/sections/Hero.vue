<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThreeCircuit from '../ThreeCircuit.vue'

defineProps({
  visibleSections: Set,
  showLight: Boolean,
  mouseX: Number,
  mouseY: Number
})

const emit = defineEmits(['mouse-move', 'mouse-leave', 'trigger-glitch'])

// --- Live Random Waveform Logic ---
const wavePath = ref('')
const points = 40
const values = ref(Array(points).fill(20))
let animationFrame

// --- Real-time Telemetry Values ---
const telemetry = ref({
  cpu: 12,
  ram: 4.2,
  temp: 38,
  volt: 3.31,
  uptime: '00:00:00'
})

const startTime = Date.now()

const updateWave = () => {
  // 1. Update Waveform
  for (let i = 0; i < points - 1; i++) {
    values.value[i] = values.value[i + 1]
  }
  const lastVal = values.value[points - 2]
  const noise = (Math.random() - 0.5) * 8
  let newVal = lastVal + noise
  if (newVal < 5) newVal = 5 + Math.random() * 5
  if (newVal > 35) newVal = 35 - Math.random() * 5
  values.value[points - 1] = newVal

  let d = `M 0 ${values.value[0]}`
  const step = 100 / (points - 1)
  for (let i = 1; i < points; i++) {
    d += ` L ${i * step} ${values.value[i]}`
  }
  wavePath.value = d

  // 2. Update Live Telemetry Numbers
  if (Math.random() > 0.9) {
    telemetry.value.cpu = Math.floor(10 + Math.random() * 15)
    telemetry.value.ram = (4.1 + Math.random() * 0.2).toFixed(2)
    telemetry.value.temp = Math.floor(37 + Math.random() * 4)
    telemetry.value.volt = (3.28 + Math.random() * 0.05).toFixed(3)
  }

  // 3. Update Uptime
  const seconds = Math.floor((Date.now() - startTime) / 1000)
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0')
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  telemetry.value.uptime = `${h}:${m}:${s}`
  
  animationFrame = requestAnimationFrame(updateWave)
}

onMounted(() => {
  updateWave()
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>


<template>
  <section id="home" 
           class="relative min-h-screen flex items-center pt-24 px-4 bg-circuit-home overflow-hidden group"
           @mousemove="emit('mouse-move', $event)" @mouseleave="emit('mouse-leave')">
    
    <div class="absolute top-28 left-4 sm:left-8 z-20 flex items-center gap-6">
      <div class="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md bg-indigo-500/5 border border-indigo-500/20 text-indigo-300 text-[8px] sm:text-[10px] font-mono-tech uppercase tracking-[0.3em] backdrop-blur-sm shadow-xl">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
        Electronic Specialist // IoT Eng.
      </div>
      
      <!-- Hardware Status LEDs -->
      <div class="hidden sm:flex items-center gap-4 px-4 py-2 border border-white/5 bg-slate-900/40 rounded-lg backdrop-blur-sm">
        <div class="flex flex-col items-center gap-1">
          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
          <span class="text-[6px] text-slate-500 font-bold font-mono-tech">PWR</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]"></div>
          <span class="text-[6px] text-slate-500 font-bold font-mono-tech">LINK</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-flicker shadow-[0_0_8px_#f59e0b]"></div>
          <span class="text-[6px] text-slate-500 font-bold font-mono-tech">DATA</span>
        </div>
      </div>
    </div>

    <!-- System Telemetry (Repositioned to Top Right) -->
    <div class="absolute top-28 right-4 sm:right-8 z-20 hidden lg:flex flex-col p-4 bg-slate-900/60 border border-slate-800 rounded-lg font-mono-tech text-[10px] text-slate-400 space-y-1 backdrop-blur-md shadow-2xl overflow-hidden group/telemetry">
      <div class="absolute inset-0 bg-indigo-500/5 translate-x-[-100%] group-hover/telemetry:translate-x-[100%] transition-transform duration-[2000ms]"></div>
      <p class="text-amber border-b border-slate-800 pb-1 mb-2 font-black uppercase tracking-widest flex justify-between items-center gap-4">
        <span>>> System_Telemetry</span>
        <span class="text-[8px] text-slate-600 animate-pulse">LIVE_FEED</span>
      </p>
      <div class="grid grid-cols-2 gap-x-8 gap-y-1 relative z-10">
        <p>CPU_LOAD: <span class="text-emerald-500 tabular-nums">{{ telemetry.cpu }}%</span></p>
        <p>RAM_ALLOC: <span class="text-emerald-500 tabular-nums">{{ telemetry.ram }}GB</span></p>
        <p>TEMP: <span class="text-amber tabular-nums">{{ telemetry.temp }}°C</span></p>
        <p>VOLT: <span class="text-rose tabular-nums">{{ telemetry.volt }}V</span></p>
        <p class="col-span-2 pt-1 border-t border-slate-800 mt-1">SYS_UPTIME: <span class="text-indigo-400 tabular-nums">{{ telemetry.uptime }}</span></p>
      </div>

      <!-- Mini Oscilloscope Waveform (Live Reactive) -->
      <div class="h-8 mt-2 w-full bg-slate-950/50 rounded border border-slate-800/50 overflow-hidden relative">
        <svg class="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0 20 L 100 20" stroke="rgba(99, 102, 241, 0.1)" stroke-width="0.5" />
          <path :d="wavePath" 
                fill="none" 
                stroke="#fb7185" 
                stroke-width="1.5" 
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transition-all duration-75" />
        </svg>
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 opacity-80"></div>
      </div>

      <!-- Live Data Activity Bars -->
      <div class="flex items-end gap-0.5 h-4 mt-2 opacity-40">
        <div v-for="i in 30" :key="i" 
             class="flex-1 bg-indigo-500 transition-all duration-300"
             :style="{ height: (Math.random() * 100) + '%' }">
        </div>
      </div>
    </div>

    <div class="circuit-signal-layer"></div>
    <div v-show="showLight" class="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500" :style="{ background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.1), transparent 80%)` }"></div>
    <div class="absolute inset-0 hero-gradient"></div>
    
    <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10 transition-all duration-1000"
         :class="visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
      <div class="lg:col-span-7 text-left pt-12 lg:pt-0">
        <h1 class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 sm:mb-8 leading-none tracking-tighter">
          HI, I'M <span class="text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-200 to-amber-500 text-neon cursor-pointer hover:scale-110 inline-block transition-transform duration-300 active:scale-95 group/name relative" @click="emit('trigger-glitch')">
            TEMZ
            <!-- Secret Hover Detail -->
            <span class="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-amber opacity-0 group-hover/name:opacity-100 transition-opacity tracking-[0.5em] font-mono-tech whitespace-nowrap"></span>
          </span>
        </h1>

        <p class="text-lg sm:text-xl md:text-2xl text-slate-200 mb-8 sm:mb-12 max-w-2xl font-mono-tech leading-relaxed relative">
          <span class="absolute -left-4 top-0 bottom-0 w-[1px] bg-indigo-500/30"></span>
          <span class="text-amber">>></span> Executing: <span class="text-white">Hardware_Firmware_Integration.exe</span><br>
          <span class="text-rose">>></span> Optimization: <span class="text-indigo-400">ESP32 / ESP8266</span>
        </p>

        <div class="flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6">
          <a href="#working" class="w-full sm:w-auto text-center group relative px-8 py-4 bg-indigo-600 text-white font-mono-tech font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <span class="relative z-10">Access_Vault</span>
            <div class="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </a>
          
          <a href="/cv.pdf" download class="w-full sm:w-auto text-center group relative px-8 py-4 border border-rose-500 text-rose-400 font-mono-tech font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 hover:text-white">
            <span class="relative z-10 flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3"></path></svg>
              Download_CV
            </span>
            <div class="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform -z-10"></div>
          </a>

          <a href="#contact" class="font-mono-tech text-xs text-indigo-400 hover:text-rose transition uppercase tracking-[0.2em] border-b border-indigo-500/30 pb-1">
            Establish_Connection
          </a>
        </div>
      </div>

      <div class="lg:col-span-5 relative group/three flex justify-center lg:justify-end py-8 lg:py-12">
        <div class="hud-ring w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-20"></div>
        <div class="hud-ring w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-10 [animation-direction:reverse] [animation-duration:30s]"></div>
        <div class="hud-ring w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-30 [animation-duration:15s] border-indigo-500/40"></div>
        <div class="absolute -inset-10 bg-indigo-500/5 rounded-full blur-[100px] group-hover/three:bg-indigo-500/10 transition-colors duration-1000"></div>
        <div class="w-full max-w-[500px] relative z-10">
          <ThreeCircuit />
        </div>
      </div>
    </div>

    <!-- Enhanced Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-tech flex flex-col items-center gap-4 group/scroll pointer-events-none">
      <div class="flex items-center gap-8">
        <span class="text-[8px] text-slate-600 uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">Data_Stream</span>
        
        <div class="flex flex-col items-center gap-3">
          <div class="mouse-scroll">
            <div class="mouse-wheel"></div>
          </div>
          <span class="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] animate-pulse">Scroll_to_Explore</span>
        </div>

        <span class="text-[8px] text-slate-600 uppercase tracking-[0.4em] [writing-mode:vertical-lr]">Sys_Dive</span>
      </div>

      <div class="relative w-[1px] h-20 bg-slate-800 overflow-hidden">
        <div class="scan-line-vertical"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent"></div>
      </div>
    </div>
  </section>
</template>
