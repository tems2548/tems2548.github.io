<script setup>
defineProps({
  visibleSections: Set,
  resources: Array
})
</script>

<template>
  <section id="resources" class="py-32 px-4 relative bg-slate-950 border-t border-slate-800 overflow-hidden">
    <!-- Background grid decoration -->
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px]"></div>
    
    <div class="max-w-5xl mx-auto relative transition-all duration-1000"
         :class="visibleSections.has('resources') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
      
      <div class="flex flex-col items-center mb-20">
        <h2 class="text-3xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">Resource_Vault</h2>
        <div class="flex items-center gap-3 font-mono-tech text-xs text-indigo-400/60 uppercase tracking-[0.3em]">
          <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Secure_File_Server // Access_Granted
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(file, idx) in resources" :key="idx" 
             class="group relative p-8 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all duration-500 overflow-hidden">
          
          <!-- Animated Background Scan -->
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10 flex items-start justify-between">
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:text-amber transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-black text-white uppercase tracking-tight">{{ file.name }}</h3>
                  <span class="text-[10px] text-slate-500 font-mono-tech uppercase tracking-widest">{{ file.type }}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-8 font-mono-tech">
                <div>
                  <span class="block text-[8px] text-slate-600 uppercase tracking-widest mb-1">File_Size</span>
                  <span class="text-xs text-slate-300 font-bold">{{ file.size }}</span>
                </div>
                <div>
                  <span class="block text-[8px] text-slate-600 uppercase tracking-widest mb-1">Clearance</span>
                  <span class="text-xs text-amber font-bold">{{ file.clearance }}</span>
                </div>
              </div>

              <a :href="file.link" download class="inline-flex items-center gap-3 px-6 py-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono-tech text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-xl">
                Request_Access
                <svg class="w-3 h-3 translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            <!-- Side Decoration -->
            <div class="h-32 w-[1px] bg-slate-800 relative hidden sm:block">
              <div class="absolute top-0 left-0 w-2 h-2 bg-indigo-500/20 -translate-x-1/2"></div>
              <div class="absolute bottom-0 left-0 w-2 h-2 bg-indigo-500/20 -translate-x-1/2"></div>
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
