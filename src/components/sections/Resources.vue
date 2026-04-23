<script setup>
import CodeRain from '../ui/CodeRain.vue'

defineProps({
  visibleSections: Set,
  resources: Array
})
</script>

<template>
  <section id="resources" class="py-32 px-4 relative bg-slate-950 border-t border-slate-900 overflow-hidden z-10">
    <!-- Software Engineer Effect Background -->
    <CodeRain />
    
    <!-- Subtle schematic grid -->
    <div class="vault-schematic-grid opacity-[0.05]"></div>
    
    <!-- Minimal HUD Corners -->
    <div class="vault-hud-corner top-4 left-4 border-t border-l border-indigo-500/10"></div>
    <div class="vault-hud-corner top-4 right-4 border-t border-r border-indigo-500/10"></div>
    <div class="vault-hud-corner bottom-4 left-4 border-b border-l border-indigo-500/10"></div>
    <div class="vault-hud-corner bottom-4 right-4 border-b border-r border-indigo-500/10"></div>
    
    <!-- Code Editor Tab Decoration -->
    <div class="absolute top-0 left-10 flex gap-1">
      <div class="px-4 py-1 bg-slate-900 border-x border-b border-slate-800 rounded-b-md text-[8px] font-mono-tech text-indigo-400 uppercase tracking-widest">
        resource_vault.cpp
      </div>
      <div class="px-4 py-1 bg-slate-950/50 border-x border-b border-slate-800/50 rounded-b-md text-[8px] font-mono-tech text-slate-600 uppercase tracking-widest">
        config.json
      </div>
    </div>

    <div class="max-w-5xl mx-auto relative transition-all duration-1000"
         :class="visibleSections.has('resources') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
      
      <div class="flex flex-col items-center mb-20">
        <div class="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
          <span class="text-[10px] font-mono-tech text-indigo-400 uppercase tracking-[0.2em]">System_Status: Operational</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">Resource_Vault</h2>
        <div class="flex items-center gap-3 font-mono-tech text-xs text-slate-400 uppercase tracking-[0.3em]">
          <span class="text-indigo-500">$</span> cat ./available_assets.log
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(file, idx) in resources" :key="idx" 
             class="group relative p-8 bg-slate-900/40 border border-slate-800 rounded-lg hover:border-indigo-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm">
          
          <!-- Terminal Header for Card -->
          <div class="absolute top-0 left-0 w-full h-1.5 flex gap-1 px-3 items-center bg-slate-800/50">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
          </div>
          
          <!-- Animated Background Scan -->
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10 flex items-start justify-between mt-4">
            <div class="space-y-6 w-full">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:text-amber group-hover:border-amber/30 transition-all shadow-inner">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white tracking-tight font-mono-tech">
                    <span class="text-indigo-500">f_</span>{{ file.name }}
                  </h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="px-1.5 py-0.5 bg-slate-800 text-[9px] text-slate-400 font-mono-tech uppercase">{{ file.type.split('_')[0] }}</span>
                    <span class="text-[9px] text-slate-600 font-mono-tech uppercase tracking-widest">v1.0.4</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 p-4 bg-slate-950/50 border border-slate-800/50 rounded font-mono-tech">
                <div>
                  <span class="block text-[8px] text-indigo-400/60 uppercase tracking-widest mb-1">size_bytes</span>
                  <span class="text-xs text-slate-300">{{ file.size }}</span>
                </div>
                <div>
                  <span class="block text-[8px] text-amber/60 uppercase tracking-widest mb-1">chmod_auth</span>
                  <span class="text-xs text-amber">{{ file.clearance }}</span>
                </div>
              </div>

              <a :href="file.link" download class="w-full flex items-center justify-center gap-3 px-6 py-3 bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 font-mono-tech text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-lg hover:shadow-indigo-500/20">
                &gt; curl -O ./{{ file.name.toLowerCase() }}.bin
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tech Footer for section -->
      <div class="mt-16 pt-8 border-t border-slate-900 flex justify-between items-center font-mono-tech text-[8px] text-slate-600 uppercase tracking-[0.4em]">
        <span>Encryption_Standard: AES-256</span>
        <span>Storage_Node: CLOUD_V4</span>
      </div>
    </div>
  </section>
</template>
