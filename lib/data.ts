export interface ExperienceProject {
  title: string
  bullets: string[]
  tech: string[]
}

export interface ExperienceItem {
  id: string
  period: string
  role: string
  company: string
  project?: string
  bullets?: string[]
  tech?: string[]
  subProjects?: ExperienceProject[]
  icon: string
  logo?: string
}

export interface ResearchItem {
  id: string
  institution: string
  title: string
  period: string
  description: string
  links: { label: string; icon: string; url: string }[]
  tech: string[]
}

export interface ProjectItem {
  id: string
  title: string
  categories: string[]
  categoryTag: string
  image: string
  images?: string[]
  imageCaptions?: string[]
  thumbnailBg?: string
  brightThumbnail?: boolean
  displayType?: 'web' | 'mobile'
  description: string
  highlights: string[]
  tech: string[]
  githubUrl: string
  demoUrl: string
  links?: { label: string; icon: string; url: string }[]
  updatedAt: string
  isHidden?: boolean
}

export interface SkillCategory {
  title: string
  skills: { name: string; icon: string }[]
}

export interface EducationInfo {
  university: string
  degree: string
  specialization: string
  period: string
  gpa: string
  courses: { id: string; name: string }[]
  logo: string
}

export interface LeadershipItem {
  title: string
  role: string
  description: string
  period: string
  url?: string
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp1',
    period: 'Jan 2026 - Present',
    role: 'Machine Learning Engineer Intern',
    company: 'Brunswick Corporation',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-b8bR_TrNipmVDiRdNfrHxw-DPwUcS2BaQw&s',
    icon: 'factory',
    subProjects: [
      {
        title: 'Propeller Selection Tool',
        bullets: [
          'Engineered physics-informed recommendation tool to serve **400+** boat users and save **$25,000** in dealer test costs.',
          'Trained **ridge regression** models on Savitsky hydrodynamics to predict top speed & fuel economy on **ONNX** runtime.',
          'Deployed **GPT-4o** agent to web-search and enrich **3,000+** boat records missing beam, weight & length for training.',
        ],
        tech: ['Python', 'OpenAI', 'scikit-learn', 'FastAPI', 'ONNX', 'Cloudflare']
      },
      {
        title: 'Boat House Bulletin Data Assistant',
        bullets: [
          'Developed **progressive web app** to centralize Mercury Marine\'s raw CAN test data and eliminate manual file sharing.',
          'Built **Workbox & IndexedDB** offline cache for on-water trials that auto-syncs records to **Blob & PostgreSQL** on **Azure**.',
          'Ported Python\'s cantools library to **TypeScript** to replace vSignalyzer and cut analysis from **~30s** to **<5s** in-browser.',
        ],
        tech: ['TypeScript', 'React', 'PostgreSQL', 'Azure', 'Cloudflare', 'Hono', 'Workbox', 'IndexedDB']
      },
      {
        title: 'Automotive CAN Bus Security Research',
        bullets: [
          'Designed **AI cryptanalysis pipeline** with **Claude Code** to assess Mercury\'s new CAN-encrypted helm vulnerability.',
          'Orchestrated test harness to decode **19 CAN bit patterns** and hijack **steering, throttle & gear** with natural language.',
        ],
        tech: ['Python', 'C++', 'SocketCAN', 'Linux', 'SavvyCAN', 'Claude Code']
      }
    ]
  },
  {
    id: 'exp3',
    period: 'Feb 2026 - Present',
    role: 'Founding Engineer',
    company: 'Promo Pigeon · iVenture Cohort 12',
    logo: '/promo-pigeon.jpeg',
    icon: 'send',
    project: 'Proofing & Fulfillment AI Agent',
    bullets: [
      'Launched **agentic workflow** to generate promo mockups from emails and reduce turnaround from **2 days** to minutes.',
      'Architected node-based PDF engine as a **Dockerized** plugin with **AWS ECR** to compose layered artwork for AI agents.',
      'Built **IMAP IDLE** ingestor with exponential backoff and **PostgreSQL** state machine to reliably process **2,500+** orders.',
    ],
    tech: ['Python', 'Gemini', 'AWS', 'Docker', 'FastAPI', 'React', 'spaCy', 'PyMuPDF']
  },
  {
    id: 'exp2',
    period: 'May 2025 - Feb 2026',
    role: 'Software Engineer Intern',
    company: 'Tekweld Manufacturing',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPXVncmp0D5JMXeZMJEju0H1QZDsl3adNMJA&s',
    icon: 'inventory_2',
    subProjects: [
      {
        title: 'Personalized Outreach Tool',
        bullets: [
          'Designed **Python + AWS** outreach tool to ship personalized samples to **700+** businesses with a **14%** conversion rate.',
          'Shipped **React + FastAPI** platform with **PostgreSQL** for order fulfillment and brand assets for **90,000+** client leads.',
        ],
        tech: ['AWS', 'React', 'FastAPI', 'Python', 'PostgreSQL', 'Playwright']
      },
      {
        title: 'LLM Product Design Platform',
        bullets: [
          'Accelerated label creation from **1 week** to **15 minutes** using an LLM-driven pipeline with automated quality control.',
          'Parallelized **Gemini** background theme generation, **OpenAI** QA, and **AWS Lambda** logo upscaling across **6** workers.',
        ],
        tech: ['Gemini', 'OpenAI', 'AWS', 'Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker']
      }
    ]
  }
]

export const RESEARCH_PROJECTS: ResearchItem[] = [
  {
    id: 'res1',
    institution: 'Undergraduate Researcher @ UIUC',
    title: 'Josephson Junction Optimization',
    period: 'Oct 2024 - Dec 2025',
    description: '**C++ gradient descent** engine to fit Josephson Junction geometries to experimental Ic vs. B-field curves. **Q-learning** to select optimal topologies across **5–10 junction** arrays from **1,000+** initial conditions. ~**4x cost reduction** per junction added to optimize superconducting parameters.',
    links: [
      { label: 'Code', icon: 'code', url: 'https://github.com/CNDumpl1ng/JJ-Model-Fitting.git' }
    ],
    tech: ['Python', 'C++', 'NumPy', 'SciPy', 'Matplotlib', 'Pandas']
  },
  {
    id: 'res2',
    institution: 'Machine Learning Researcher @ UCSB',
    title: 'Battery Degradation Prediction',
    period: 'Jun 2023 - Aug 2023',
    description: 'Trained cross-battery **feedforward DNN** on NASA\'s **10,000+ charging cycles** to predict lithium-ion battery State of Health and Remaining Useful Life. Achieved **1.49% average RMSE**, outperforming LSTM and BLS-RVM baselines by **18%**. Presented findings to UCSB & MIT ML researchers.',
    links: [
      { label: 'Paper', icon: 'article', url: 'https://www.linkedin.com/in/aneesh-ganti/overlay/Project/640923783/treasury/?profileId=ACoAAEIJsO4BxHMhN-7Uywc04BYEW9hzEWRpAFQ' },
      { label: 'Code', icon: 'code', url: 'https://github.com/aneeshg5/battery-rul-predictor' }
    ],
    tech: ['Python', 'PyTorch', 'Scikit-learn', 'MLflow', 'Optuna', 'FastAPI']
  }
]

export const PROJECTS: ProjectItem[] = [
  {
    id: 'leafscan',
    title: 'LeafScan AI',
    categories: ['Mobile', 'ML/AI'],
    categoryTag: 'Mobile / ML',
    displayType: 'mobile',
    image: 'https://opengraph.githubassets.com/1/aneeshg5/LeafScan-AI',
    thumbnailBg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=60',
    images: [
      '/screenshots/leafscan-2.png',
      '/screenshots/leafscan-1.png',
      '/screenshots/leafscan-3.png',
    ],
    imageCaptions: [
      'Field Map for Crop Management',
      'Dashboard Overview for Field Analytics',
      'AI Agronomist & Observant',
    ],
    description: 'Full-stack mobile app for real-time plant disease detection, treatment plans, and GPS monitoring.',
    highlights: [
      'Achieves **97+% accuracy** across 38 plant disease types.',
      '**AI agronomist** w/ per-plant memory and remedy lookup.',
      '**GPS map** and **drone API** for autonomous field scanning.',
    ],
    tech: ['React Native', 'FastAPI', 'PyTorch', 'PostgreSQL', 'Docker', 'Python', 'GitHub Actions'],
    githubUrl: 'https://github.com/aneeshg5/LeafScan-AI',
    demoUrl: 'https://appetize.io/app/b_bcuxan5s6shhj6stu2osaj3kj4',
    links: [
      { label: 'GitHub', icon: 'code', url: 'https://github.com/aneeshg5/LeafScan-AI' },
      { label: 'Live Demo', icon: 'open_in_new', url: 'https://appetize.io/app/b_bcuxan5s6shhj6stu2osaj3kj4' },
    ],
    updatedAt: 'June 2026',
  },
  {
    id: 'p1',
    title: 'Cryogenic Flow Classifier',
    categories: ['ML/AI', 'Simulation'],
    categoryTag: 'Aerospace / ML',
    displayType: 'web',
    image: '/screenshots/hulc-poster.png',
    thumbnailBg: '/eclipse-bg.jpg',
    brightThumbnail: true,
    description: 'Machine learning pipeline classifying cryogenic flow regimes in real time for NASA Artemis HLS program.',
    highlights: [
      'Real-time **flow classifier** on raw capacitance signals.',
      '**GPR augmentation** on sparse ANSYS CFD data points.',
      '**FCM clustering** model achieving 3-regime separation.',
    ],
    tech: ['Python', 'NumPy', 'SciPy', 'ANSYS', 'scikit-learn', 'pandas', 'matplotlib', 'pytest'],
    githubUrl: 'https://github.com/aneeshg5/Cryogenic-Flow-Classifier',
    demoUrl: '#',
    links: [
      { label: 'GitHub', icon: 'code', url: 'https://github.com/aneeshg5/Cryogenic-Flow-Classifier' },
      { label: 'Paper', icon: 'description', url: 'https://github.com/aneeshg5/Cryogenic-Flow-Classifier/blob/main/paper/HuLC_Tech_Paper.pdf' },
      { label: 'Video', icon: 'smart_display', url: 'https://www.youtube.com/watch?v=Gxhk1hIIWIo' },
    ],
    updatedAt: 'May 2026'
  },
  {
    id: 'bgm',
    title: 'ZenGM Sports',
    categories: ['Full-Stack', 'Simulation'],
    categoryTag: 'Full-Stack / Sim',
    displayType: 'web',
    image: '/screenshots/basketball-gm.png',
    images: [
      '/screenshots/bgm-ss-home.png',
      '/screenshots/bgm-ss-dashboard.png',
      '/screenshots/bgm-ss-game.png',
      '/screenshots/bgm-ss-settings.png',
    ],
    imageCaptions: [
      'Home lobby to start leagues with real players, cross-era legends, and custom rosters',
      'Team dashboard, live standings, stat leaders, finances, and league headlines',
      'Full play-by-play simulations and box scores with customizable rosters',
      'Tune difficulty, schedule length, God Mode, and hundreds of options.',
    ],
    thumbnailBg: '/screenshots/basketball-bg.jpg',
    description: 'Open-sourced browser-based franchise manager sim across 4 sports with 50,000+ user community.',
    highlights: [
      '**Franchise sim** with cap, draft, trades, and free agency.',
      '**70+ achievements**, challenges, and custom controls.',
      'Tracks **all-time records**, award races, and career stats.',
    ],
    tech: ['TypeScript', 'React', 'IndexedDB', 'Web Workers', 'Node.js', 'Zod', 'Vitest', 'Playwright'],
    githubUrl: 'https://github.com/zengm-games/zengm',
    demoUrl: 'https://play.basketball-gm.com',
    links: [
      { label: 'GitHub', icon: 'code', url: 'https://github.com/zengm-games/zengm' },
      { label: 'Live Site', icon: 'open_in_new', url: 'https://play.basketball-gm.com' },
    ],
    updatedAt: 'June 2026'
  },
  {
    id: 'orbitforge',
    title: 'OrbitForge',
    categories: ['Simulation', 'Graphics', 'Full-Stack'],
    categoryTag: 'Aerospace / Sim',
    displayType: 'web',
    image: '/screenshots/orbitforge-main.png',
    thumbnailBg: '/screenshots/orbitforge-bg.png',
    brightThumbnail: true,
    description: 'Browser-based orbit simulator with 150+ users that compares 3 Kalman filters on real satellite data.',
    highlights: [
      '**12-state MEKF** fusing gyro and mag for joint attitude.',
      'Vectorized **Monte Carlo** hits 1M+ filter updates in 461ms.',
      '**Lock-free ring buffer** links 100Hz physics, 60fps render.',
    ],
    tech: ['C++', 'WebAssembly', 'TypeScript', 'WebGL2', 'Eigen', 'Chart.js', 'Playwright', 'Cloudflare'],
    githubUrl: 'https://github.com/aneeshg5/OrbitForge',
    demoUrl: 'https://orbitforge.pages.dev',
    links: [
      { label: 'GitHub', icon: 'code', url: 'https://github.com/aneeshg5/OrbitForge' },
      { label: 'Live Site', icon: 'open_in_new', url: 'https://orbitforge.pages.dev' },
    ],
    updatedAt: 'June 2026'
  },
  {
    id: 'p5',
    title: 'PlantMD',
    categories: ['Mobile', 'ML/AI'],
    categoryTag: 'Computer Vision',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtWyQ_gNEcxaqy9EvaypL8etN0DeNGxrWN-qSLjNizw414F6zdhDf7XLd5GLDhNDVEMJMTvul1ZTBeVcKVMetUB2q0dqiKklTdy1cmKJAEFlKOlSvToHBNVVvnvtODpPYMHn465P-0ZXG8Onr7qC26rZdI3opu1QNxxv1jagmpnZAd7Js0DJH7BRnu2rPXbjKVtzkkIZWGZ4Bt3Uo2kgLXC59nG3casP1AVYiyYn7jchzTbCbQR8Ajl9MBwNbfeTYVZK2JxksuVg',
    description: 'Mobile application for real-time plant disease diagnosis using on-device inference.',
    highlights: [
      '**97% accuracy** on 14 crop types.',
      'Offline-first **Edge AI** architecture.'
    ],
    tech: ['PyTorch Mobile', 'React Native'],
    githubUrl: '#',
    demoUrl: '#',
    updatedAt: 'Aug 2024',
    isHidden: true
  },
  {
    id: 'p7',
    title: 'PixelForge',
    categories: ['Graphics'],
    categoryTag: 'Graphics Tool',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpriKwYwf_ys4UZfVlh7G98hUGw5E8-Bpv6Qi-QnxNlTtV48OjDxqW8oesDdaqIKcOGP1uzaD3ncXpWTw7QuYTFkld2LhrsB8pfm4g5pxeMkHIpXaYSmXL0Bewkb3MmaNe70rxzdYr687M4Kwwep3vIK7szRhYCygE0qLdaozmvix7du6qYwzKgEe3YE_Z01zoL8FXZrK72MZVxInyHHCFUdNTpFMuVi-vnkNPYOdQX8tPq705rRLkiOte0qp_0mfbFPrwAIpQzQ',
    description: 'Professional-grade pixel art editor with layer management and animation support.',
    highlights: [
      '**Zero-latency** drawing engine.',
      'Export to GIF/Sprite **instantly**.'
    ],
    tech: ['HTML5 Canvas', 'TypeScript'],
    githubUrl: '#',
    demoUrl: '#',
    updatedAt: 'Jul 2024',
    isHidden: true
  }
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python',      icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'TypeScript',  icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'C++',         icon: 'https://cdn.simpleicons.org/cplusplus/00599C' },
      { name: 'JavaScript',  icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'Java',        icon: 'https://cdn.simpleicons.org/openjdk/ED8B00' },
      { name: 'SQL',         icon: 'https://api.iconify.design/vscode-icons:file-type-sql.svg' },
      { name: 'R',           icon: 'https://cdn.simpleicons.org/r/276DC3' },
      { name: 'Swift',       icon: 'https://cdn.simpleicons.org/swift/F05138' },
      { name: 'HTML',        icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      { name: 'CSS',         icon: 'https://cdn.simpleicons.org/css/1572B6' },
      { name: 'Verilog',     icon: 'https://api.iconify.design/vscode-icons:file-type-verilog.svg' },
      { name: 'MIPS',        icon: 'https://api.iconify.design/mdi:chip.svg?color=%239CA3AF' },
    ]
  },
  {
    title: 'Full-Stack & Backend',
    skills: [
      { name: 'React',       icon: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'FastAPI',     icon: 'https://cdn.simpleicons.org/fastapi/009688' },
      { name: 'PostgreSQL',  icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'Node.js',     icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'REST APIs',   icon: 'https://api.iconify.design/mdi:api.svg?color=%236EE7B7' },
      { name: 'Flask',       icon: 'https://cdn.simpleicons.org/flask/ffffff' },
      { name: 'Express',     icon: 'https://cdn.simpleicons.org/express/ffffff' },
      { name: 'MongoDB',     icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Redis',       icon: 'https://cdn.simpleicons.org/redis/FF4438' },
      { name: 'WebSockets',  icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
    ]
  },
  {
    title: 'ML, AI & Data Science',
    skills: [
      { name: 'PyTorch',     icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C' },
      { name: 'NumPy',       icon: 'https://cdn.simpleicons.org/numpy/4DABCF' },
      { name: 'Pandas',      icon: 'https://cdn.simpleicons.org/pandas/E70488' },
      { name: 'OpenCV',      icon: 'https://cdn.simpleicons.org/opencv/5C3EE8' },
      { name: 'Scikit-learn',icon: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
      { name: 'Gemini',      icon: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
      { name: 'spaCy',       icon: 'https://cdn.simpleicons.org/spacy/09A3D5' },
      { name: 'Matplotlib',  icon: 'https://api.iconify.design/devicon:matplotlib.svg' },
      { name: 'SciPy',       icon: 'https://api.iconify.design/simple-icons:scipy.svg?color=%238CAAE6' },
      { name: 'TensorFlow',  icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
      { name: 'Keras',       icon: 'https://cdn.simpleicons.org/keras/D00000' },
      { name: 'Hugging Face',icon: 'https://cdn.simpleicons.org/huggingface/FFD21E' },
      { name: 'LangChain',   icon: 'https://avatars.githubusercontent.com/u/126733545?s=48&v=4' },
      { name: 'Claude Code', icon: 'https://cdn.simpleicons.org/anthropic/D97757' },
      { name: 'RAG',         icon: 'https://api.iconify.design/mdi:database-search.svg?color=%2360A5FA' },
      { name: 'LlamaIndex',  icon: 'https://avatars.githubusercontent.com/u/130722866?s=48&v=4' },
      { name: 'MLflow',      icon: 'https://cdn.simpleicons.org/mlflow/0194E2' },
      { name: 'CUDA',        icon: 'https://cdn.simpleicons.org/nvidia/76B900' },
      { name: 'ONNX',        icon: 'https://cdn.simpleicons.org/onnx/005CED' },
      { name: 'Pinecone',    icon: 'https://avatars.githubusercontent.com/u/54333248?s=48&v=4' },
      { name: 'vLLM',        icon: 'https://api.iconify.design/mdi:lightning-bolt.svg?color=%23A78BFA' },
      { name: 'PEFT',        icon: 'https://api.iconify.design/mdi:tune.svg?color=%23818CF8' },
      { name: 'LoRA',        icon: 'https://api.iconify.design/mdi:layers-triple.svg?color=%23F472B6' },
    ]
  },
  {
    title: 'Cloud & Infrastructure',
    skills: [
      { name: 'Docker',         icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'AWS',            icon: 'https://api.iconify.design/logos:aws.svg' },
      { name: 'Azure',          icon: 'https://api.iconify.design/devicon:azure.svg' },
      { name: 'Git',            icon: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'GitHub',         icon: 'https://cdn.simpleicons.org/github/ffffff' },
      { name: 'CI/CD',          icon: 'https://api.iconify.design/mdi:infinity.svg?color=%2360A5FA' },
      { name: 'Google Cloud',   icon: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
      { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF' },
      { name: 'Kubernetes',     icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
      { name: 'Linux',          icon: 'https://cdn.simpleicons.org/linux/FCC624' },
      { name: 'SLURM',          icon: 'https://api.iconify.design/mdi:server-network.svg?color=%2394A3B8' },
      { name: 'Jest',           icon: 'https://cdn.simpleicons.org/jest/C21325' },
      { name: 'Agile',          icon: 'https://api.iconify.design/mdi:chart-timeline-variant.svg?color=%2334D399' },
    ]
  },
]

export const EDUCATION: EducationInfo = {
  university: 'University of Illinois Urbana-Champaign',
  degree: 'B.S. Mathematics & Computer Science',
  specialization: 'Specializing in Agentic AI Engineering, Autonomy, Perception, & Distributed Systems',
  period: 'Expected: May 2027',
  gpa: '3.70 / 4.00',
  courses: [
    { id: 'CS 225', name: 'Data Structures' },
    { id: 'CS 374', name: 'Algorithms' },
    { id: 'CS 425', name: 'Distributed Systems' },
    { id: 'CS 498', name: 'Cloud Computing' },
    { id: 'CS 341', name: 'System Programming'},
    { id: 'CS 411', name: 'Database Systems' },
    { id: 'CS 441', name: 'Machine Learning' },
    { id: 'CS 447', name: 'Natural Language Processing' },
    { id: 'CS 444', name: 'Deep Learning for Computer Vision' },
  ],
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7iClDs1G6d4rEth_g33G0-rbL9f05PvlMw&s'
}

export const LEADERSHIP: LeadershipItem[] = [
  {
    title: 'PhinD Experts',
    role: 'Data Engineer · iVenture Cohort 10',
    description: 'Normalized **4,000+ PhD profiles** scraped from Google Scholar into a recruiter-candidate platform. Overhauled ETL pipeline to cut matching time from **1 minute to 25 seconds**.',
    period: 'May 2025 - Aug 2025',
    url: 'https://phindexperts.com/'
  },
  {
    title: 'NASA Human Lander Challenge',
    role: 'Software & Simulations Lead',
    description: 'Led software and simulations team to produce a cryogen transfer protocol reviewed by NASA\'s Artemis program. Won **Best Presentation** and **$1,200** among 30+ universities at MSFC.',
    period: 'Aug 2024 - Jul 2025',
    url: 'https://mechse.illinois.edu/news/stories/NASAchallenge'
  },
  {
    title: 'Course Assistant',
    role: 'CS 173: Discrete Structures',
    description: 'Mentored **500+ students** in algorithms, graph theory, and logic. Developed weekly exam review sessions for **250+** students, boosting their exam scores by **15%**.',
    period: 'Jan 2025 - Present',
    url: 'https://courses.grainger.illinois.edu/cs173/sp2026/AB/staff.html'
  }
]
