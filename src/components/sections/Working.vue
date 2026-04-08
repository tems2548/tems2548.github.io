<script setup>
defineProps({
  visibleSections: Set,
  projects: Array
})

const emit = defineEmits(['open-project'])
</script>

<template>
  <section id="working" class="py-32 px-4 z-10 relative bg-blueprint-working overflow-hidden">
    <div class="absolute top-10 right-10 font-mono-tech text-[8px] text-white/10 space-y-1 select-none">
      <p>GRID_REF: 0x44.22</p>
      <p>STRUCT_INTEGRITY: 100%</p>
      <p>RENDER_ENGINE: VECTOR_BLUEPRINT</p>
    </div>

    <div class="max-w-7xl mx-auto transition-all duration-1000"
         :class="visibleSections.has('working') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
      <div class="text-center mb-16 sm:mb-24 relative">
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <h2 class="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tighter italic uppercase relative z-10">Vault_Access</h2>
        <div class="flex items-center justify-center gap-3 font-mono-tech text-xs text-slate-400 uppercase tracking-[0.3em]">
          <span class="text-indigo-400">[ READY ]</span>
          <span class="w-1 h-1 rounded-full bg-slate-800"></span>
          <span>Module_Iterator_Active</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div v-for="project in projects" :key="project.id" class="group relative rounded-3xl overflow-hidden transition-all duration-700 bg-slate-950 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] flex flex-col">
          <div class="aspect-[16/10] relative overflow-hidden cursor-pointer border-b border-white/5" @click="emit('open-project', project)">
            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
            <div class="absolute top-6 left-6 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-full font-mono-tech text-[10px] text-white font-black uppercase tracking-widest shadow-xl">
              ID_{{ project.id.toString().padStart(2, '0') }}
            </div>
          </div>

          <div class="p-6 sm:p-10 space-y-6 sm:space-y-8 flex-1 flex flex-col cursor-pointer" @click="emit('open-project', project)">
            <div class="space-y-4 flex-1" >
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag" class="text-[8px] font-black uppercase tracking-[0.2em] text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 tag-glow-amber">
                  {{ tag }}
                </span>
              </div>
              <h3 class="text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-amber-400 transition-colors duration-500">{{ project.title }}</h3>
              <p class="text-sm text-slate-200 leading-relaxed font-sans line-clamp-3">
                {{ project.description }}
              </p>
            </div>

            <div class="mt-auto space-y-6 sm:space-y-8">
              <div class="flex items-center justify-between py-5 border-y border-white/10 font-mono-tech bg-white/[0.02] px-4 -mx-4 rounded-lg">
                <div class="flex flex-col gap-4 flex-1 pr-6">
                  <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center mb-0.5">
                      <span class="text-[7px] text-slate-400 uppercase tracking-widest font-black">Progression_Index</span>
                      <span class="text-[8px] text-emerald-400 font-black tracking-tighter">{{ project.progression }}%</span>
                    </div>
                    <div class="w-full h-2 bg-slate-900/80 rounded-full overflow-hidden border border-white/5 p-[1px]">
                      <div class="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-all duration-1000 rounded-full" :style="{ width: project.progression + '%' }"></div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center mb-0.5">
                      <span class="text-[7px] text-slate-400 uppercase tracking-widest font-black">Complexity_Index</span>
                      <span class="text-[8px] text-amber-400 font-black tracking-tighter">{{ project.complexity }}%</span>
                    </div>
                    <div class="w-full h-2 bg-slate-900/80 rounded-full overflow-hidden border border-white/5 p-[1px]">
                      <div class="h-full bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-1000 rounded-full" :style="{ width: project.complexity + '%' }"></div>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-[8px] text-slate-400 uppercase tracking-widest block font-black mb-1">Status</span>
                  <span v-if="project.progression === 100" class="text-xs text-emerald-400 font-black tracking-widest uppercase flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Stable
                  </span>
                  <span v-else class="text-xs text-amber-400 font-black tracking-widest uppercase flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    In_Progress
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-2">
                <button @click="emit('open-project', project)" class="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-3 group/link group-hover:text-amber-400 transition-all border-b border-transparent group-hover:border-amber-500 pb-1">
                  Access_Log
                  <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
                <div class="flex gap-2">
                  <div v-for="i in 3" :key="i" class="w-1 h-1 rounded-full bg-amber-500/40 group-hover:bg-amber-500 transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
