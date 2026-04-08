<script setup>
defineProps({
  visibleSections: Set,
  formStatus: String,
  formData: Object
})

const emit = defineEmits(['submit-form'])
</script>

<template>
  <section id="contact" class="py-32 px-4 bg-signal-contact border-t border-slate-800 relative z-10">
    <div class="oscilloscope-wave"></div>
    
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 transition-all duration-1000"
         :class="visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
      <!-- Left: Connectivity Status & Links -->
      <div class="lg:col-span-5 space-y-12">
        <div>
          <h2 class="text-3xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">Contact_Node</h2>
          <div class="flex items-center gap-3 font-mono-tech text-xs">
            <span class="text-rose-500 animate-pulse">● SIGNAL_DETECTED</span>
            <span class="text-slate-600">// 5.8GHz_LINK</span>
          </div>
        </div>

        <div class="p-6 bg-slate-900/60 border border-slate-800 rounded-xl font-mono-tech space-y-6 backdrop-blur-md relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent animate-[scan_2s_linear_infinite]"></div>
          <h3 class="text-[9px] font-black text-rose-400 uppercase tracking-[0.4em] mb-4">Connectivity_Status</h3>
          
          <div class="space-y-4">
            <div v-for="(val, label) in { TRANSMISSION: '98%', LATENCY: '14ms', UPLINK: 'STABLE' }" :key="label" class="flex justify-between items-center border-b border-slate-800/50 pb-2">
              <span class="text-[8px] text-slate-500 uppercase tracking-widest">{{ label }}</span>
              <span class="text-[10px] text-white font-black">{{ val }}</span>
            </div>
          </div>

          <div class="flex items-end gap-1 h-8 mt-6">
            <div v-for="i in 12" :key="i" 
                 class="flex-1 bg-rose-500/20 rounded-t-sm animate-pulse"
                 :style="{ height: Math.random() * 100 + '%', animationDelay: (i * 100) + 'ms' }">
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <a v-for="(port, idx) in [
            { name: 'Direct_Mail', val: 'tems2548@gmail.com', link: 'mailto:tems2548@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            { name: 'X_Network', val: 'LinkedIn_Secure_Link', link: '#', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
            { name: 'Git_Node', val: 'github.com/tems2548', link: 'https://github.com/tems2548', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
          ]" :key="idx" :href="port.link" target="_blank" class="flex items-center gap-4 p-4 rounded bg-slate-950 border border-slate-800 hover:border-rose-500/50 transition-all group font-mono-tech">
            <div class="w-10 h-10 rounded-sm bg-rose-500/5 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="port.icon"></path></svg>
            </div>
            <div class="flex-1">
              <span class="block text-slate-600 text-[8px] font-black uppercase tracking-widest">COM_PORT_0{{ idx + 1 }} // {{ port.name }}</span>
              <span class="text-white text-sm tracking-tight group-hover:text-rose-400 transition-colors">{{ port.val }}</span>
            </div>
            <div class="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-black">>> OPEN</div>
          </a>
        </div>
      </div>

      <!-- Right: Data Packet Form -->
      <div class="lg:col-span-7">
        <div class="bg-slate-950 p-6 h-full sm:p-10 rounded-2xl border border-slate-800 relative overflow-hidden chip-decoration shadow-2xl">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent"></div>
          
          <div class="flex justify-between items-center mb-10 pt-12 font-mono-tech">
            <div class="space-y-1">
              <span class="text-[10px] font-black text-white uppercase tracking-[0.3em]">Construct_Data_Packet</span>
              <div class="text-[7px] text-slate-600 uppercase tracking-widest">Protocol: SMTP_OVER_TLS_V1.3</div>
            </div>
            <div class="px-2 py-1 border border-rose-500/20 rounded text-[8px] text-rose-400 animate-pulse font-black uppercase">Encrypted</div>
          </div>

          <form @submit.prevent="emit('submit-form')" class="space-y-8 font-mono-tech">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="space-y-3">
                <label class="text-[8px] font-black text-rose-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <span class="w-1 h-1 bg-rose-500 rounded-full"></span> Origin_User
                </label>
                <input v-model="formData.name" type="text" placeholder="GUEST_USER_ID" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 text-white text-xs placeholder-slate-700 outline-none focus:border-rose-500 focus:bg-slate-800 transition-all shadow-inner">
              </div>
              <div class="space-y-3">
                <label class="text-[8px] font-black text-rose-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <span class="w-1 h-1 bg-rose-500 rounded-full"></span> Callback_Address
                </label>
                <input v-model="formData.email" type="email" placeholder="USER@NODE.CORE" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 text-white text-xs placeholder-slate-700 outline-none focus:border-rose-500 focus:bg-slate-800 transition-all shadow-inner">
              </div>
            </div>
            <div class="space-y-3">
              <label class="text-[8px] font-black text-rose-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span class="w-1 h-1 bg-rose-500 rounded-full"></span> Data_Payload_Content
              </label>
              <textarea v-model="formData.message" rows="5" placeholder="INITIALIZING MESSAGE BUFFER..." required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-4 text-white text-xs placeholder-slate-700 outline-none focus:border-rose-500 focus:bg-slate-800 transition-all shadow-inner resize-none"></textarea>
            </div>
            
            <div class="pt-4">
              <button type="submit" 
                      :disabled="formStatus === 'sending'"
                      class="w-full group relative py-5 bg-rose-600 overflow-hidden rounded-xl shadow-[0_0_20px_rgba(251,113,133,0.3)] hover:shadow-[0_0_30px_rgba(251,113,133,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <div class="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span class="relative z-10 text-xs font-black text-white uppercase tracking-[0.5em]">
                  {{ formStatus === 'sending' ? 'Transmitting_Packet...' : 'Transmit_Data_Packet' }}
                </span>
              </button>
            </div>

            <Transition name="fade">
              <div v-if="formStatus === 'success'" class="text-center font-mono-tech">
                <p class="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  PACKET_SENT_SUCCESSFULLY // COM_STABLE
                </p>
              </div>
              <div v-else-if="formStatus === 'error'" class="text-center font-mono-tech">
                <p class="text-[10px] text-rose-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  ERROR_IN_TRANSMISSION // RETRY_LINK
                </p>
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
