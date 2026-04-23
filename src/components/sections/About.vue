<script setup>
defineProps({
  visibleSections: Set,
  activeTab: String,
  showBars: Boolean,
  profile: Object,
  skills: Object,
  education: Array
})

const emit = defineEmits(['set-tab'])
</script>

<template>
  <section id="about" class="py-20 sm:py-32 px-4 relative border-y border-slate-800 bg-matrix-about overflow-hidden z-10">
    <div class="oscilloscope-about-wave"></div>
    <div class="hud-bracket hud-tl"></div>
    <div class="hud-bracket hud-tr"></div>
    <div class="hud-bracket hud-bl"></div>
    <div class="hud-bracket hud-br"></div>

    <div class="max-w-4xl mx-auto relative terminal-flicker transition-all duration-1000"
         :class="visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
      <div class="absolute -top-10 -left-10 solder-pad"></div>
      <div class="absolute -top-10 -right-10 solder-pad"></div>

      <div class="flex flex-col items-center mb-16">
        <h2 class="text-3xl sm:text-5xl font-black text-white mb-2 uppercase tracking-tighter italic text-center">About_System</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 via-amber-500 to-rose-500 rounded-full"></div>
      </div>
      
      <div class="flex overflow-x-auto no-scrollbar mb-12 p-1 bg-slate-950 border border-slate-800 rounded-lg w-full sm:w-fit mx-auto font-mono-tech gap-1">
        <button v-for="tab in ['personal', 'skills', 'education']" :key="tab"
                @click="emit('set-tab', tab)" 
                :class="activeTab === tab ? (tab === 'skills' ? 'bg-amber-500 text-slate-950 font-black' : (tab === 'education' ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]')) : 'text-slate-400 hover:text-amber'" 
                class="flex-1 sm:flex-none whitespace-nowrap px-4 sm:px-8 py-3 rounded-md text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all">
          {{ tab === 'personal' ? 'Profile.cfg' : (tab === 'skills' ? 'Engine.lib' : 'History.log') }}
        </button>
      </div>
      
      <div class="pcb-card p-8 md:p-12 rounded-2xl min-h-[400px] border-indigo-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <!-- Internal PCB Traces -->
        <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div class="absolute top-1/4 left-0 w-full h-[1px] bg-indigo-500"></div>
          <div class="absolute top-2/4 left-0 w-full h-[1px] bg-indigo-500"></div>
          <div class="absolute top-0 left-1/3 w-[1px] h-full bg-indigo-500"></div>
          <div class="absolute top-0 left-2/3 w-[1px] h-full bg-indigo-500"></div>
        </div>

        <Transition name="tab-slide" mode="out-in">
          <!-- Bio -->
          <div v-if="activeTab === 'personal'" key="personal" class="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 font-mono-tech relative z-10">
            <div class="md:col-span-5">
              <div class="aspect-[4/5] rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-slate-400 group hover:border-amber-500/50 transition-all relative overflow-hidden chip-decoration shadow-2xl">
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:10px_10px]"></div>
                <div class="bio-scan-line"></div>
                <img :src="profile.image" :alt="profile.name" class="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 relative z-10">
                <div class="absolute top-4 left-4 text-[10px] text-indigo-500 z-20 font-black px-2 py-1 bg-slate-950/80 rounded border border-indigo-500/20">PART::{{ profile.nickname.toUpperCase() }}_V1</div>
                <div class="absolute bottom-4 right-4 text-[10px] text-emerald-500 z-20 font-black px-2 py-1 bg-slate-950/80 rounded border border-emerald-500/20">SIG::STABLE</div>
              </div>
              <div class="mt-6 p-4 border border-slate-800 rounded-lg bg-slate-950/50 space-y-3">
                <div class="flex justify-between text-[8px] uppercase tracking-widest border-b border-white/5 pb-2">
                  <span class="text-slate-500">Device_Status:</span>
                  <span class="text-emerald-500 font-black flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    READY
                  </span>
                </div>
                <div class="flex justify-between text-[8px] uppercase tracking-widest">
                  <span class="text-slate-500">I/O_Channels:</span>
                  <span class="text-amber font-black">UART / I2C / SPI</span>
                </div>
              </div>
            </div>
            <div class="md:col-span-7 space-y-8">
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-sm font-black text-amber uppercase tracking-[0.5em]">>> component_spec.json</span>
                  <div class="h-[1px] flex-1 bg-slate-800"></div>
                </div>
                <div class="p-6 bg-slate-950/30 border border-slate-800 rounded-lg relative group">
                  <div class="absolute top-0 right-0 p-2 text-[8px] text-slate-700 uppercase tracking-widest font-black">ROM_BLOCK_0x00</div>
                  <p class="text-base md:text-lg text-slate-200 leading-relaxed font-sans tech-typing">
                    I am <strong>{{ profile.name }}</strong>, a hardware-focused <strong>IoT Engineer</strong> specializing in embedded systems and real-time distributed networks. I transform circuit schematics into intelligent, interconnected ecosystems, bridging the physical layer with high-level cloud infrastructure.
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-4 p-4 border border-indigo-500/10 rounded-lg bg-indigo-500/5">
                  <h4 class="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <span class="w-2 h-[1px] bg-indigo-500"></span>
                    Control_Unit
                  </h4>
                  <div class="space-y-2 font-mono-tech">
                    <div class="flex flex-col">
                      <span class="text-[7px] text-slate-500 uppercase">Architecture</span>
                      <span class="text-xs text-white">IOT_SYSTEMS_KMITL</span>
                    </div>
                    <div class="flex flex-col">
                      <span class="text-[7px] text-slate-500 uppercase">Comm_Protocol</span>
                      <span class="text-xs text-amber">{{ profile.email }}</span>
                    </div>
                  </div>
                </div>
                <div class="space-y-4 p-4 border border-rose-500/10 rounded-lg bg-rose-500/5">
                  <h4 class="text-xs font-bold text-rose-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <span class="w-2 h-[1px] bg-rose-500"></span>
                    External_Bus
                  </h4>
                  <div class="space-y-2 font-mono-tech">
                    <div class="flex flex-col">
                      <span class="text-[7px] text-slate-500 uppercase">Coordinates</span>
                      <span class="text-xs text-white">{{ profile.location }}</span>
                    </div>
                    <div class="flex flex-col">
                      <span class="text-[7px] text-slate-500 uppercase">Cycles</span>
                      <span class="text-xs text-rose-400">{{ profile.age }}_YEARS_NOMINAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Grid -->
          <div v-else-if="activeTab === 'skills'" key="skills" class="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 font-mono-tech">
            <div v-for="(category, title) in {Hardware_Proficiency: 'hardware', Software_Proficiency: 'software'}" :key="title" class="relative">
              <div class="flex items-center gap-4 mb-10">
                <div class="w-10 h-10 rounded bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center relative overflow-hidden">
                  <div v-if="category === 'hardware'" class="w-6 h-6 border-2 border-indigo-400 rounded-sm relative">
                    <div class="absolute -top-1 -left-1 w-1 h-1 bg-indigo-400"></div>
                    <div class="absolute -bottom-1 -right-1 w-1 h-1 bg-indigo-400"></div>
                  </div>
                  <div v-else class="text-amber font-black text-xs">&lt;/&gt;</div>
                  <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-[scan_2s_linear_infinite]"></div>
                </div>
                <div>
                  <h4 class="text-amber font-black text-[10px] uppercase tracking-[0.4em]">{{ title.replace('_', ' ') }}</h4>
                  <span class="text-[8px] text-slate-500 uppercase tracking-widest">Type: SYSTEM_LIBRARY_{{ category.toUpperCase() }}</span>
                </div>
              </div>

              <div class="space-y-8">
                <div v-for="(s, idx) in skills[category]" :key="s.name" class="group relative pl-4 border-l border-slate-800">
                  <div class="flex justify-between mb-3">
                    <div class="flex flex-col">
                      <span class="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-amber transition-colors">{{ s.name }}</span>
                      <span class="text-[7px] text-slate-600 font-mono">ADDR: 0x{{ (idx * 16 + 256).toString(16).toUpperCase() }}_REF</span>
                    </div>
                    <span class="text-[8px] font-bold text-emerald-500/60 group-hover:text-emerald-400 transition-colors">[ {{ s.level }}% ]</span>
                  </div>
                  <div class="h-4 w-full bg-slate-950 rounded-sm overflow-hidden border border-slate-800/50 flex items-center gap-0.5 px-1 relative">
                    <div class="h-2 transition-all duration-[1500ms] ease-out shadow-lg relative" 
                         :class="{
                           'bg-emerald-500 shadow-emerald-500/20': s.level >= 90,
                           'bg-amber-500 shadow-amber-500/20': s.level >= 60 && s.level < 90,
                           'bg-rose-500 shadow-rose-500/20': s.level < 60
                         }"
                         :style="{ width: showBars ? s.level + '%' : '0%' }">
                      <div class="absolute right-0 top-0 bottom-0 w-1 bg-white/40 blur-[2px]"></div>
                    </div>
                    <div class="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
                      <div v-for="i in 10" :key="i" class="w-[1px] h-full bg-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div v-else-if="activeTab === 'education'" key="education" class="w-full space-y-0 font-mono-tech">
            <div v-for="(edu, index) in education" :key="edu.degree" class="relative pl-8 sm:pl-16 pb-16 last:pb-0 group" :style="{ animationDelay: (index * 150) + 'ms' }">
              <div class="absolute left-[11px] top-0 bottom-0 w-[1px] bg-slate-800">
                <div class="absolute inset-0 bg-gradient-to-b from-rose-500/50 via-rose-500 to-rose-500/50 timeline-line-draw shadow-[0_0_15px_rgba(251,113,133,0.5)]" :style="{ animationDelay: (index * 200 + 100) + 'ms' }"></div>
              </div>
              <div class="absolute left-0 top-0 w-[24px] h-[24px] rounded-sm bg-slate-950 border border-slate-800 z-10 flex items-center justify-center group-hover:border-rose-500 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                <div class="w-1.5 h-1.5 bg-rose-500 led-green !animate-none group-hover:!animate-pulse"></div>
                <div class="absolute -left-12 top-1 hidden sm:block text-[8px] text-slate-600 font-black">NODE_0{{ index }}</div>
              </div>
              <div class="bg-slate-950/50 p-1 rounded-xl border border-slate-800 group-hover:border-rose-500/30 transition-all hover:bg-slate-950/80 chip-decoration overflow-hidden shadow-2xl relative">
                <div class="absolute top-4 right-4 flex gap-2">
                  <span class="text-[8px] px-1 border border-rose-500/30 text-rose-400 uppercase">Archive_Ready</span>
                  <span class="text-[8px] px-1 border border-emerald-500/30 text-emerald-400 uppercase hidden sm:inline">Verified</span>
                </div>
                <div class="flex flex-col md:flex-row gap-6 sm:gap-8 p-4 sm:p-6 items-center md:items-start">
                  <div class="w-24 h-24 sm:w-40 sm:h-40 flex-shrink-0 rounded bg-slate-950 border border-slate-800 relative flex items-center justify-center p-2 sm:p-3 shadow-inner group-hover:border-rose-500/40 transition-colors">
                    <img :src="edu.image" :alt="edu.degree" class="max-w-full max-h-full object-contain">
                    <div class="absolute -bottom-2 -right-2 px-1 bg-slate-900 border border-slate-800 text-[6px] text-slate-500 font-mono">IMG_0{{ index }}</div>
                  </div>
                  <div class="flex-1 space-y-4 text-center md:text-left">
                    <div>
                      <span class="text-rose text-[8px] font-black tracking-[0.4em] mb-2 block">> TIMESTAMP_{{ edu.year.replace(' ', '_') }}</span>
                      <h4 class="text-lg font-black text-white uppercase tracking-tight mb-1 flex items-baseline gap-3">
                        {{ edu.degree }}
                        <span class="h-[1px] flex-1 bg-slate-800"></span>
                      </h4>
                      <p class="text-rose-400 text-xs font-bold mb-4 flex items-center gap-2">
                        <span class="w-1 h-1 bg-rose-500 rotate-45"></span>
                        {{ edu.school }}
                      </p>
                    </div>
                    <div class="relative">
                      <div class="absolute -left-4 top-0 bottom-0 w-[1px] bg-rose-500/10"></div>
                      <p class="text-xs text-slate-300 leading-relaxed font-sans pl-4">
                        {{ edu.details }}
                      </p>
                    </div>
                    <div class="flex flex-wrap gap-2 pt-2">
                      <div v-for="tag in ['MODULE_SUCCESS', 'SYS_STABLE']" :key="tag" class="text-[8px] text-slate-500 flex items-center gap-1">
                        <div class="w-1 h-1 rounded-full bg-slate-700"></div>
                        {{ tag }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
