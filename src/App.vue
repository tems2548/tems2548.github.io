<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Data
import { projects, skills, education, profile, resources, certificates } from './data/portfolio'

// Layout Components
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

// Section Components
import Hero from './components/sections/Hero.vue'
import About from './components/sections/About.vue'
import Working from './components/sections/Working.vue'
import Certificates from './components/sections/Certificates.vue'
import Resources from './components/sections/Resources.vue'
import Contact from './components/sections/Contact.vue'

const isLoading = ref(true)
const isDark = ref(true)
const activeTab = ref('personal')

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.remove('light-mode')
  } else {
    document.documentElement.classList.add('light-mode')
  }
}
const showBars = ref(false)
const isMenuOpen = ref(false)

const formStatus = ref('idle') // idle, sending, success, error
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const mouseX = ref(0)
const mouseY = ref(0)
const showLight = ref(false)
const activeSection = ref('home')
const visibleSections = ref(new Set(['home']))
const selectedProject = ref(null)
const scrollProgress = ref(0)
const isGlitching = ref(false)

// --- Advanced Binary Background System ---
const particles = ref(Array.from({ length: 40 }, () => ({
  left: Math.random() * 100,
  delay: Math.random() * 20,
  duration: 15 + Math.random() * 20,
  size: 10 + Math.random() * 14,
  opacity: 0.2 + Math.random() * 0.4, // Increased from ~0.05 to ~0.4
  blur: Math.random() > 0.8 ? '1px' : '0px',
  val: Math.random() > 0.5 ? '1' : '0'
})))

let particleTimer

const triggerGlitch = () => {
  if (isGlitching.value) return
  isGlitching.value = true
  setTimeout(() => {
    isGlitching.value = false
  }, 1000)
}

const observer = ref(null)

const handleScroll = () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
  showLight.value = true
}

const hideLight = () => {
  showLight.value = false
}

const setTab = (tab) => {
  activeTab.value = tab
  if (tab === 'skills') {
    showBars.value = false
    setTimeout(() => {
      showBars.value = true
    }, 600)
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const openProjectDetails = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProjectDetails = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}

const openCertificate = (cert) => {
  selectedCertificate.value = cert
  document.body.style.overflow = 'hidden'
}

const closeCertificate = () => {
  selectedCertificate.value = null
  document.body.style.overflow = 'auto'
}

const submitForm = async () => {
  formStatus.value = 'sending'
  try {
    const response = await fetch(`https://formspree.io/f/${profile.email}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
        _subject: `Portfolio Message from ${formData.value.name}`
      })
    })

    if (response.ok) {
      formStatus.value = 'success'
      formData.value = { name: '', email: '', message: '' }
      setTimeout(() => { formStatus.value = 'idle' }, 5000)
    } else {
      formStatus.value = 'error'
    }
  } catch (err) {
    formStatus.value = 'error'
    console.error(err)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Particle Flicker Logic
  particleTimer = setInterval(() => {
    particles.value.forEach(p => {
      if (Math.random() > 0.95) p.val = p.val === '1' ? '0' : '1'
    })
  }, 300)

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSections.value.add(entry.target.id)
        visibleSections.value = new Set(visibleSections.value)
        activeSection.value = entry.target.id
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('section').forEach(section => {
    observer.value.observe(section)
  })

  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <!-- Loading Screen -->
  <Transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center font-mono-tech">
      <div class="relative w-32 h-32 mb-12">
        <div class="absolute inset-0 border border-indigo-500/10 rounded-full scale-150 animate-pulse"></div>
        <div class="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin [animation-duration:3s]"></div>
        <div class="absolute inset-2 border-b-2 border-rose-500 rounded-full animate-spin [animation-duration:2s] [animation-direction:reverse]"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-1.5 h-1.5 bg-indigo-500 rounded-full led-green shadow-[0_0_10px_#6366f1]"></div>
        </div>
      </div>
      <div class="flex flex-col items-center space-y-4">
        <span class="text-indigo-400 font-black text-xl tracking-[0.3em] uppercase">Booting_SYS::TEMZ</span>
        <div class="w-48 h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div class="h-full bg-indigo-500 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
        <div class="text-[10px] text-slate-300 uppercase tracking-widest flex gap-4 font-mono-tech">
          <span class="text-emerald-500">MEM_CHECK... OK</span>
          <span class="text-amber">FIRMWARE... LOADED</span>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Project Detail Modal -->
  <Transition name="modal-tech">
    <div v-if="selectedProject" class="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-md" @click="closeProjectDetails"></div>
      <div class="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-indigo-500/30 rounded-2xl overflow-y-auto shadow-2xl pcb-card no-scrollbar">
        <!-- Technical Scan Line on Entrance -->
        <div class="modal-scan-line"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 min-h-full">
          <div class="aspect-video md:aspect-auto md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
            <img :src="selectedProject.image" :alt="selectedProject.title" class="w-full h-full object-cover">
          </div>
          <div class="p-6 sm:p-8 font-mono-tech flex flex-col">
            <div class="flex justify-between items-start mb-6">
              <span class="text-rose text-[10px] font-black uppercase tracking-[0.4em]">Project_Details</span>
              <button @click="closeProjectDetails" class="text-slate-500 hover:text-white transition uppercase text-[10px] tracking-widest">[CLOSE_X]</button>
            </div>
            <h2 class="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4">{{ selectedProject.title }}</h2>
            <div class="flex flex-wrap gap-2 mb-8">
              <span v-for="tag in selectedProject.tags" :key="tag" class="text-[9px] font-bold uppercase tracking-widest border border-indigo-500/20 text-indigo-300 px-3 py-1 rounded bg-indigo-500/5">
                {{ tag }}
              </span>
            </div>
            <div class="space-y-6 flex-1">
              <div>
                <h3 class="text-[10px] font-black text-amber uppercase tracking-[0.3em] mb-3">>> overview</h3>
                <p class="text-sm text-slate-300 leading-relaxed font-sans">{{ selectedProject.description }}</p>
              </div>
              <div>
                <h3 class="text-[10px] font-black text-amber uppercase tracking-[0.3em] mb-3">>> technical_deep_dive</h3>
                <p class="text-sm text-slate-300 leading-relaxed font-sans">{{ selectedProject.longDescription }}</p>
              </div>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-800">
              <a href="#" class="inline-flex items-center gap-3 w-full sm:w-auto justify-center px-10 py-4 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors">
                Open_Repository
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Certificate Detail Modal -->
  <Transition name="modal-tech">
    <div v-if="selectedCertificate" class="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-md" @click="closeCertificate"></div>
      <div class="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-2xl overflow-y-auto shadow-2xl pcb-card no-scrollbar">
        <div class="modal-scan-line !bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]"></div>
        
        <div class="p-6 sm:p-10 font-mono-tech flex flex-col">
          <div class="flex justify-between items-start mb-8">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span class="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em]">Auth_Credential_Verified</span>
            </div>
            <button @click="closeCertificate" class="text-slate-500 hover:text-white transition uppercase text-[10px] tracking-widest">[CLOSE_X]</button>
          </div>

          <div v-if="selectedCertificate.image" class="aspect-[1.414/1] w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden mb-8 group">
            <img :src="selectedCertificate.image" :alt="selectedCertificate.title" class="w-full h-full object-contain">
          </div>
          <div v-else class="aspect-[1.414/1] w-full bg-slate-950 rounded-lg border border-slate-800 flex flex-col items-center justify-center mb-8">
             <svg class="w-16 h-16 text-slate-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
             </svg>
             <span class="text-[8px] text-slate-700 uppercase tracking-[0.4em]">Preview_Not_Available</span>
          </div>

          <div class="space-y-6">
            <div>
              <h2 class="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-2">{{ selectedCertificate.title }}</h2>
              <p class="text-indigo-400 text-sm font-bold uppercase tracking-widest">{{ selectedCertificate.issuer }}</p>
            </div>

            <div class="grid grid-cols-2 gap-8 border-y border-slate-800 py-6">
              <div>
                <span class="block text-[8px] text-slate-500 uppercase tracking-widest mb-1">Issue_Date</span>
                <span class="text-xs text-white font-bold">{{ selectedCertificate.date }}</span>
              </div>
              <div>
                <span class="block text-[8px] text-slate-500 uppercase tracking-widest mb-1">Status</span>
                <span class="text-xs text-emerald-500 font-bold uppercase">Verified_Valid</span>
              </div>
            </div>

            <div>
              <h3 class="text-[10px] font-black text-amber uppercase tracking-[0.3em] mb-3">>> credential_summary</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-sans">{{ selectedCertificate.description }}</p>
            </div>
          </div>

          <div class="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
            <a :href="selectedCertificate.link" target="_blank" class="flex-1 inline-flex items-center gap-3 justify-center px-8 py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-colors">
              Verify_External_Link
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <div class="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden relative">
    <!-- Global Technical Overlays -->
    <div class="technical-overlay"></div>
    <div v-if="isGlitching" class="fixed inset-0 z-[200] pointer-events-none glitch-overlay"></div>
    
    <!-- System Bus Lines -->
    <div class="system-bus-line bus-l-1"></div>
    <div class="system-bus-line bus-l-2"></div>
    <div class="system-bus-line bus-r-1"></div>
    <div class="system-bus-line bus-r-2"></div>
    
    <!-- Floating Binary Background Particles (Enhanced) -->
    <div class="binary-particles">
      <div v-for="(p, i) in particles" :key="i" 
           class="particle transition-all duration-500"
           :style="{ 
             left: p.left + '%', 
             fontSize: p.size + 'px',
             opacity: p.opacity,
             filter: `blur(${p.blur})`,
             animationDelay: p.delay + 's',
             animationDuration: p.duration + 's'
           }">
        {{ p.val }}
      </div>
    </div>

    <Navbar 
      :activeSection="activeSection" 
      :scrollProgress="scrollProgress" 
      :isMenuOpen="isMenuOpen"
      @toggle-menu="toggleMenu"
      @close-menu="closeMenu"
    />

    <Hero 
      :visibleSections="visibleSections"
      :showLight="showLight"
      :mouseX="mouseX"
      :mouseY="mouseY"
      @mouse-move="handleMouseMove"
      @mouse-leave="hideLight"
    />

    <About 
      :visibleSections="visibleSections"
      :activeTab="activeTab"
      :showBars="showBars"
      :profile="profile"
      :skills="skills"
      :education="education"
      @set-tab="setTab"
    />

    <Working 
      :visibleSections="visibleSections"
      :projects="projects"
      @open-project="openProjectDetails"
    />

    <Certificates 
      :visibleSections="visibleSections"
      :certificates="certificates"
      @view-certificate="openCertificate"
    />

    <Resources 
      :visibleSections="visibleSections"
      :resources="resources"
    />

    <Contact 
      :visibleSections="visibleSections"
      :formStatus="formStatus"
      :formData="formData"
      @submit-form="submitForm"
    />

    <Footer />
  </div>
</template>

<style>
@keyframes loading {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}
</style>
