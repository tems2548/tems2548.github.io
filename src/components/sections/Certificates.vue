<script setup>
defineProps({
  visibleSections: Set,
  certificates: Array
})

const emit = defineEmits(['view-certificate'])
</script>

<template>
  <section id="certificates" class="py-32 px-4 relative bg-iot-hardware border-t border-slate-800 overflow-hidden z-10">
    <!-- PCB Hardware Background -->
    <div class="pcb-substrate"></div>
    
    <!-- Glowing Traces (Signal Flow) -->
    <div class="pcb-trace-glowing trace-v left-[10%] [animation-delay:0s]"></div>
    <div class="pcb-trace-glowing trace-v left-[40%] [animation-delay:2s]"></div>
    <div class="pcb-trace-glowing trace-v left-[70%] [animation-delay:4s]"></div>
    <div class="pcb-trace-glowing trace-h top-[20%] [animation-delay:1s]"></div>
    <div class="pcb-trace-glowing trace-h top-[50%] [animation-delay:3s]"></div>
    <div class="pcb-trace-glowing trace-h top-[80%] [animation-delay:5s]"></div>
    
    <div class="max-w-6xl mx-auto relative transition-all duration-1000"
         :class="visibleSections.has('certificates') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
      
      <div class="flex flex-col items-center mb-20">
        <h2 class="text-3xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">Auth_Credentials</h2>
        <div class="flex items-center gap-3 font-mono-tech text-xs text-indigo-400/60 uppercase tracking-[0.3em]">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Hardware_Verify_Layer // Core_Auth
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div v-for="cert in certificates" :key="cert.id" 
             @click="emit('view-certificate', cert)"
             class="group relative p-8 hardware-module rounded-xl transition-all duration-500 flex flex-col cursor-pointer">
          
          <!-- Hardware IC Pins -->
          <div class="absolute left-0 top-1/4 flex flex-col gap-2">
            <div class="chip-pin pin-l"></div>
            <div class="chip-pin pin-l"></div>
            <div class="chip-pin pin-l"></div>
          </div>
          <div class="absolute right-0 top-1/4 flex flex-col gap-2">
            <div class="chip-pin pin-r"></div>
            <div class="chip-pin pin-r"></div>
            <div class="chip-pin pin-r"></div>
          </div>

          <div class="relative z-10 space-y-6 flex-1 flex flex-col">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:verified-pulse transition-all duration-500 shadow-inner">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div class="flex flex-col items-end gap-2">
                <span class="text-[10px] text-slate-500 font-mono-tech uppercase tracking-widest">{{ cert.date }}</span>
                <div class="flex gap-1.5">
                  <div class="status-led led-vcc" title="VCC_ON"></div>
                  <div class="status-led led-data" title="DATA_TRANSFER"></div>
                </div>
              </div>
            </div>

            <div>
              <div class="text-[8px] font-mono-tech text-indigo-400/50 uppercase tracking-[0.2em] mb-1">MODULE_TYPE::CERT_AUTH</div>
              <h3 class="text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">{{ cert.title }}</h3>
              <p class="text-xs text-indigo-400/80 font-mono-tech uppercase tracking-widest mb-4">Issuer: {{ cert.issuer }}</p>
              <p class="text-sm text-slate-400 leading-relaxed font-sans line-clamp-3 bg-slate-950/30 p-3 rounded border border-white/5">
                {{ cert.description }}
              </p>
            </div>

            <div class="pt-6 border-t border-slate-800 mt-auto flex justify-between items-center">
              <button class="inline-flex items-center gap-3 text-indigo-400 font-mono-tech text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors">
                Read_Module
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
              <span class="text-[8px] text-slate-700 font-mono-tech">ADDR: 0x{{ cert.id }}F</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tech Footer for section -->
      <div class="mt-16 pt-8 border-t border-slate-900 flex justify-between items-center font-mono-tech text-[8px] text-slate-600 uppercase tracking-[0.4em]">
        <span>Hardware_Revision: V2.4</span>
        <span>Bus_Status: ACTIVE_STABLE</span>
      </div>
    </div>
  </section>
</template>
