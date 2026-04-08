<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Data
import { projects, skills, education, profile } from './data/portfolio'

// Layout Components
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

// Section Components
import Hero from './components/sections/Hero.vue'
import About from './components/sections/About.vue'
import Working from './components/sections/Working.vue'
import Contact from './components/sections/Contact.vue'

const isLoading = ref(true)
const activeTab = ref('personal')
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

  <div class="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden relative">
    <!-- Global Technical Overlays -->
    <div class="technical-overlay"></div>
    <div v-if="isGlitching" class="fixed inset-0 z-[200] pointer-events-none glitch-overlay"></div>
    
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
