import profileImg from '../assets/img/profile.png'
import debsirinLogo from '../assets/img/Debsirin_LOGO.png'
import kmitlLogo from '../assets/img/KMITL_logo.png'

// Project Images
import proj1 from '../assets/img/proj_img/proj_1.png'
import proj2 from '../assets/img/proj_img/proj_2.jpg'
import proj3 from '../assets/img/proj_img/proj_3.jpg'
import proj4 from '../assets/img/proj_img/proj_4.jpg'
import proj5 from '../assets/img/proj_img/proj_5.jpg'
import proj6 from '../assets/img/proj_img/proj_6.png'

export const projects = [
  {
    id: 1,
    title: 'Wifi analyzer [IEECON 2026]',
    description: 'A high-performance spectrum analysis tool for 2.4GHz bands, designed for the IEECON 2026 conference.',
    longDescription: 'Developed for IEEE conference standards, this analyzer utilizes ESP32-S3 hardware to perform real-time packet sniffing and signal strength mapping. It features interference detection and channel occupancy visualization to optimize industrial wireless deployments.',
    image: proj1,
    tags: ['ESP32', 'C++', 'RF_Analysis', 'IEEE']
  },
  {
    id: 2,
    title: 'Mixed Signal PID Controller Design[in progress]',
    description: 'Implementation of a hybrid PID control system combining analog precision with digital flexibility.',
    longDescription: 'A custom-designed control system for high-speed actuator positioning. It integrates high-resolution ADC/DAC modules with a tuned PID algorithm to achieve sub-millisecond response times and minimal overshoot in critical hardware applications.',
    image: proj2,
    tags: ['Analog', 'Control_Systems', 'STM32', 'PID']
  },
  {
    id: 3,
    title: 'Automatic Audio Gain Adjustment System [Receiver]',
    description: 'Receiver module of an intelligent acoustics system that adjusts audio output based on crowd density.',
    longDescription: 'This project focuses on the receiver architecture of a distributed audio system. It uses ultrasonic and PIR sensors to estimate real-time crowd density, automatically adjusting gain levels to compensate for ambient noise while maintaining signal clarity.',
    image: proj3,
    tags: ['Audio_DSP', 'Sensors', 'Real-Time', 'Distributed_Sys']
  },
  {
    id: 4,
    title: 'Smart Home Automation with Grafana',
    description: 'A multi-node ESP-Mesh home automation system integrated with a professional telemetry dashboard.',
    longDescription: 'Combining embedded control with modern cloud analytics, this system manages home modules while pushing telemetry data via MQTT to a Grafana dashboard. It allows for detailed monitoring of energy consumption, device status, and environmental trends.',
    image: proj4,
    tags: ['IoT', 'Grafana', 'MQTT', 'Node-RED']
  },
  {
    id: 5,
    title: 'Real-Time FFT Signal Visualizer',
    description: 'A specialized signal processing application for high-speed frequency domain analysis.',
    longDescription: 'Utilizes optimized Fast Fourier Transform (FFT) algorithms to process incoming analog signals. The system provides low-latency visual feedback on a high-refresh rate display, essential for hardware diagnostics and vibration monitoring.',
    image: proj5,
    tags: ['Python', 'FFT', 'DSP', 'Visualization']
  },
  {
    id: 6,
    title: 'Solar-Powered IoT Smart Farm',
    description: 'An automated end-to-end agricultural monitoring solution powered by renewable energy.',
    longDescription: 'This project integrates LoRaWAN for long-range sensor telemetry and features a high-efficiency MPPT solar charger. It autonomously manages irrigation and soil health based on live data from distributed environmental sensors.',
    image: proj6,
    tags: ['Solar', 'LoRaWAN', 'Agriculture', 'Sustainability']
  }
]

export const skills = {
  hardware: [
    { name: 'ESP32/ESP8266', level: 80 },
    { name: 'STM32', level: 50 },
    { name: 'FreeRTOS', level: 40 },
    { name: 'PSpice', level: 70 },
    { name: 'Circuit', level: 70 },
    { name: 'Communication', level: 70 },
    { name: 'Raspberry Pi', level: 70 }
  ],
  software: [
    { name: 'C++', level: 80 },
    { name: 'C', level: 100 },
    { name: 'Python', level: 60 },
    { name: 'Git', level: 90 },
    { name: 'Node-RED', level: 70 },
    { name: 'HTML', level: 100 },
    { name: 'CSS', level: 100 },
    { name: 'Tailwind CSS', level: 90 }
  ]
}

export const education = [
  {
    degree: 'Debsirin school',
    school: 'Junior High School',
    year: '2012 - 2018',
    details: 'Comprehensive curriculum with a focus on foundational electronics, programming, and hands-on projects in embedded systems.',
    image: debsirinLogo
  },
  {
    degree: 'Debsirin school',
    school: 'High School [PLAN: Mathematics with an emphasis on engineering]',
    year: '2018 - 2021',
    details: 'Advanced coursework in mathematics, physics, and computer science, with extracurricular projects in robotics and IoT development.',
    image: debsirinLogo
  },
  {
    degree: "King Mongkut's Institute of Technology Ladkrabang",
    school: 'University [Bachelor of Engineering in IoT Engineering]',
    year: '2021 - present',
    details: 'Pursuing a Bachelor of Engineering in IoT Engineering with a focus on embedded systems, IoT, and hardware-software integration. Engaged in research projects and internships related to IoT applications and real-time systems.',
    image: kmitlLogo
  }
]

export const profile = {
  name: 'Ungsuchaval Samitchart',
  nickname: 'TEMZ',
  email: 'tems2548@gmail.com',
  location: 'Bangkok, Thailand',
  age: '22',
  image: profileImg
}

export const resources = [
  {
    name: 'Curriculum_Vitae',
    type: 'PDF_DOCUMENT',
    size: '1.2MB',
    clearance: 'LEVEL_01',
    link: 'cv.pdf'
  },
  {
    name: 'Technical_Portfolio',
    type: 'PDF_ARCHIVE',
    size: '8.4MB',
    clearance: 'LEVEL_02',
    link: '#'
  }
]
