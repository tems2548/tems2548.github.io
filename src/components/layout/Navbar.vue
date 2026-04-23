<script setup>
import { ref } from 'vue'

defineProps({
  activeSection: String,
  scrollProgress: Number,
  isMenuOpen: Boolean
})

const emit = defineEmits(['toggle-menu', 'close-menu'])
</script>

<template>
  <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>

  <nav class="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-indigo-500/10">
    <div class="nav-scan-line"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center gap-3 font-mono-tech">
          <div class="flex-shrink-0 font-black text-xl text-white tracking-tighter cursor-pointer logo-glitch" @click="emit('close-menu')">
            SYS::<span class="text-indigo-400">TEMZ</span>
          </div>
          <div class="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-slate-900/50 border border-emerald-500/20">
            <div class="led-green !w-1.5 !h-1.5 shadow-[0_0_5px_#22c55e]"></div>
            <span class="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Signal_Stable</span>
          </div>
        </div>
        
        <div class="hidden md:flex items-center space-x-1 font-mono-tech uppercase">
          <a v-for="(label, id, idx) in { home: 'Home', about: 'About', working: 'Dev', certificates: 'Cert', contact: 'Link' }" 
             :key="id" 
             :href="'#' + id" 
             class="relative px-4 py-2 text-[10px] tracking-widest transition-all duration-300 group flex items-center gap-1.5"
             :class="activeSection === id ? 'nav-link-active' : 'text-slate-400 hover:text-white'">
            
            <div class="w-1.5 h-1.5 rounded-full border border-indigo-500/30 group-hover:border-amber-500 group-hover:bg-amber-500 transition-all shadow-[0_0_5px_rgba(251,191,36,0)] group-hover:shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
            <span class="relative z-10">0{{ idx }}_{{ label }}</span>
            <div class="absolute inset-0 bg-indigo-500/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded"></div>
            <div v-if="activeSection === id" class="absolute bottom-0 left-4 right-4 h-[2px] bg-amber-400 shadow-[0_0_10px_#fbbf24]"></div>
          </a>
          <div class="ml-4 px-2 py-1 border border-white/5 rounded bg-slate-900/40">
            <span class="text-[7px] text-slate-500 font-bold tracking-widest">REV_2.4.0</span>
          </div>
        </div>

        <div class="flex items-center gap-2 md:hidden">
          <button @click="emit('toggle-menu')" class="text-slate-300 hover:text-white p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" class="md:hidden bg-slate-950 border-t border-indigo-500/20 font-mono-tech uppercase">
        <div class="px-4 pt-2 pb-6 space-y-4">
          <a v-for="(label, id, idx) in { home: 'Home', about: 'About', working: 'Dev', certificates: 'Cert', resources: 'Vault', contact: 'Link' }" 
             :key="id"
             :href="'#' + id" 
             @click="emit('close-menu')" 
             class="block text-xs tracking-widest text-slate-300 hover:text-amber py-2 border-b border-slate-900">
            [ 0{{ idx }}_{{ label }} ]
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
