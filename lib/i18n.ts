export type Lang = "en" | "fr" | "ko";

const s: Record<string, Record<Lang, string>> = {
  /* ── UI chrome ── */
  portfolioTitle:   { en: "Lakhdar's Portfolio",   fr: "Portfolio de Lakhdar",   ko: "Lakhdar의 포트폴리오" },
  clickToExplore:   { en: "Click an icon to explore", fr: "Cliquez sur une icône pour explorer", ko: "아이콘을 클릭하여 탐색하세요" },
  openToWork:       { en: "Open to Work — Freelance", fr: "Disponible — Freelance", ko: "구직 중 — 프리랜서" },
  getInTouch:       { en: "Get in touch",           fr: "Me contacter",           ko: "연락하기" },
  contactDesc:      { en: "Feel free to contact me for any freelance demand or job opportunity!", fr: "N'hésitez pas à me contacter pour toute demande freelance ou opportunité professionnelle !", ko: "프리랜서 의뢰나 채용 기회에 대해 편하게 연락주세요!" },
  comingSoonFor:    { en: "Content coming soon for", fr: "Contenu à venir pour", ko: "곧 공개될 콘텐츠:" },
  scrollDown:       { en: "Scroll to explore ↓",     fr: "Scrollez pour explorer ↓", ko: "스크롤하여 탐색하세요 ↓" },

  /* ── Icon labels ── */
  label_cubes:        { en: "Projects",               fr: "Projets",                ko: "프로젝트" },
  label_phone:        { en: "Experience",              fr: "Expérience",             ko: "경력" },
  label_textCard:     { en: "Education",               fr: "Formation",              ko: "교육" },
  label_polyhedron:   { en: "About",                   fr: "À propos",               ko: "소개" },
  label_toggleStack:  { en: "Tech Stack & Skills",     fr: "Tech & Compétences",     ko: "기술 & 역량" },
  label_palette:      { en: "Passions",                fr: "Passions",               ko: "열정" },
  label_ai:           { en: "AI & Innovation",         fr: "IA & Innovation",        ko: "AI & 혁신" },
  label_dots:         { en: "Certifications",          fr: "Certifications",         ko: "자격증" },

  /* ── About ── */
  about_hello:        { en: "Hello! I'm",              fr: "Bonjour ! Je suis",      ko: "안녕하세요! 저는" },
  about_desc:         { en: ", an engineering student passionate about technological innovation. I develop projects combining", fr: ", étudiant ingénieur passionné par l'innovation technologique. Je développe des projets combinant", ko: "입니다. 기술 혁신에 열정을 가진 공학도로서" },
  about_skills:       { en: "AI, data science, and web development", fr: "IA, data science et développement web", ko: "AI, 데이터 사이언스, 웹 개발" },
  about_sub:          { en: "Curious and adaptable, I aim to apply my skills in a stimulating and collaborative environment.", fr: "Curieux et adaptable, je souhaite mettre mes compétences au service d'un environnement stimulant et collaboratif.", ko: "호기심이 많고 적응력이 뛰어나며, 자극적이고 협력적인 환경에서 역량을 발휘하고자 합니다." },
  about_langTitle:    { en: "Languages",               fr: "Langues",                ko: "언어" },
  lang_french:        { en: "French",                  fr: "Français",               ko: "프랑스어" },
  lang_arabic:        { en: "Arabic",                  fr: "Arabe",                  ko: "아랍어" },
  lang_english:       { en: "English",                 fr: "Anglais",                ko: "영어" },
  lang_korean:        { en: "Korean",                  fr: "Coréen",                 ko: "한국어" },
  about_projects_combine: { en: " to create impactful solutions.", fr: " pour créer des solutions à impact.", ko: "을 결합한 프로젝트를 개발합니다." },

  /* ── Experience ── */
  exp_renault_role:   { en: "Software & AI Engineer Intern", fr: "Stagiaire Ingénieur Logiciel & IA", ko: "소프트웨어 & AI 엔지니어 인턴" },
  exp_renault_period: { en: "Sep 2025 – Feb 2026 · South Korea", fr: "Sep 2025 – Fév 2026 · Corée du Sud", ko: "2025년 9월 – 2026년 2월 · 한국" },
  exp_renault_b1:     { en: "Connected health & fitness app with real-time 3D avatar and AI-driven recommendations (IoT data).", fr: "Application santé & fitness connectée avec avatar 3D en temps réel et recommandations IA (données IoT).", ko: "실시간 3D 아바타와 AI 기반 추천 기능을 갖춘 건강 & 피트니스 커넥티드 앱 (IoT 데이터)." },
  exp_renault_b2:     { en: "AI-powered podcast generation platform with NLP & TTS models.", fr: "Plateforme de génération de podcasts IA avec modèles NLP & TTS.", ko: "NLP & TTS 모델을 활용한 AI 기반 팟캐스트 생성 플랫폼." },
  exp_renault_b3:     { en: "In-car Theme Store app for dashboard personalization.", fr: "Application Theme Store embarquée pour la personnalisation du tableau de bord.", ko: "대시보드 개인화를 위한 차량 내 테마 스토어 앱." },
  exp_renault_b4:     { en: "Personalized in-car AI assistant with LLM, RAG, multi-channel APIs (Spotify, calendar, email, calls).", fr: "Assistant IA embarqué personnalisé avec LLM, RAG, APIs multi-canaux (Spotify, agenda, email, appels).", ko: "LLM, RAG, 멀티채널 API(Spotify, 캘린더, 이메일, 통화)를 활용한 맞춤형 차량 내 AI 어시스턴트." },
  exp_fabulous_role:  { en: "Web Developer",           fr: "Développeur Web",        ko: "웹 개발자" },
  exp_fabulous_period:{ en: "Jan 2025 – Ongoing · Paris", fr: "Jan 2025 – En cours · Paris", ko: "2025년 1월 – 진행 중 · 파리" },
  exp_fabulous_b1:    { en: "One-page website for an interior designer with portfolio & booking system.", fr: "Site one-page pour une architecte d'intérieur avec portfolio & système de réservation.", ko: "포트폴리오 및 예약 시스템을 갖춘 인테리어 디자이너용 원페이지 웹사이트." },
  exp_columbus_role:  { en: "Internship",              fr: "Stage",                  ko: "인턴십" },
  exp_columbus_period:{ en: "Jul 2024 – Aug 2024 · Paris", fr: "Juil 2024 – Août 2024 · Paris", ko: "2024년 7월 – 2024년 8월 · 파리" },
  exp_columbus_b1:    { en: "Team supervision, cost management, online promotion, website creation.", fr: "Supervision d'équipe, gestion des coûts, promotion en ligne, création de site web.", ko: "팀 관리, 비용 관리, 온라인 홍보, 웹사이트 제작." },

  /* ── Education ── */
  edu_kaist_title:    { en: "Specialization in AI — KAIST", fr: "Spécialisation en IA — KAIST", ko: "AI 전공 — KAIST" },
  edu_kaist_period:   { en: "Feb 2025 – Jul 2025 · Daejeon, South Korea", fr: "Fév 2025 – Juil 2025 · Daejeon, Corée du Sud", ko: "2025년 2월 – 2025년 7월 · 대전, 한국" },
  edu_kaist_desc:     { en: "Exchange semester focused on Data Science, AI/ML, and Start-Up Management at Korea's top science & technology university.", fr: "Semestre d'échange axé sur le Data Science, l'IA/ML et le Management de Start-Up dans la meilleure université scientifique de Corée.", ko: "한국 최고의 과학기술대학교에서 데이터 사이언스, AI/ML, 스타트업 경영에 집중한 교환 학기." },
  edu_utt_title:      { en: "Engineering in Informatics & Systems — UTT", fr: "Ingénieur en Informatique & Systèmes — UTT", ko: "정보공학 & 시스템 — UTT" },
  edu_utt_period:     { en: "2024 – 2027 · Troyes, France", fr: "2024 – 2027 · Troyes, France", ko: "2024년 – 2027년 · 트루아, 프랑스" },
  edu_utt_desc:       { en: "Integrated preparatory program (2022–2024). Database management, Software Engineering, Systems Architecture.", fr: "Cycle préparatoire intégré (2022–2024). Gestion de bases de données, Génie Logiciel, Architecture des Systèmes.", ko: "통합 예비 과정 (2022–2024). 데이터베이스 관리, 소프트웨어 공학, 시스템 아키텍처." },

  /* ── Projects ── */
  proj_hera_desc:     { en: "AI-powered platform that generates personalized coloring books for children. Users choose themes, characters and styles, then the AI creates unique illustrations ready to print or color digitally.", fr: "Plateforme IA qui génère des cahiers de coloriage personnalisés pour enfants. Les utilisateurs choisissent thèmes, personnages et styles, puis l'IA crée des illustrations uniques prêtes à imprimer.", ko: "아이들을 위한 맞춤형 색칠 공부책을 생성하는 AI 플랫폼. 사용자가 테마, 캐릭터, 스타일을 선택하면 AI가 고유한 일러스트를 제작합니다." },
  proj_carchat_desc:  { en: "Multilingual AI assistant for vehicle owner manuals. Users choose a pre-indexed vehicle and ask maintenance, warning-light, specs, and usage questions in real time.", fr: "Assistant IA multilingue basé sur des manuels de véhicules. L'utilisateur choisit un véhicule pré-indexé puis pose en temps réel des questions sur l'entretien, les voyants, les spécifications et l'usage.", ko: "차량 매뉴얼 기반의 다국어 AI 어시스턴트. 사전 인덱싱된 차량을 선택하고 정비, 경고등, 제원, 사용법 관련 질문을 실시간으로 할 수 있습니다." },
  proj_fabulous_desc: { en: "Elegant one-page portfolio for an interior designer, featuring a curated project gallery, smooth scroll animations, and an integrated booking & contact system.", fr: "Portfolio one-page élégant pour une architecte d'intérieur, avec galerie de projets, animations fluides et système de réservation & contact intégré.", ko: "큐레이팅된 프로젝트 갤러리, 부드러운 스크롤 애니메이션, 통합 예약 및 연락 시스템을 갖춘 인테리어 디자이너용 원페이지 포트폴리오." },
  proj_reply_desc:    { en: "Connected wearable device that monitors heart rate using machine learning algorithms. Processes real-time IoT sensor data for health insights and anomaly detection.", fr: "Dispositif connecté portable qui surveille le rythme cardiaque par algorithmes de machine learning. Traitement en temps réel de données IoT pour insights santé et détection d'anomalies.", ko: "머신러닝 알고리즘을 활용한 심박수 모니터링 커넥티드 웨어러블 디바이스. 실시간 IoT 센서 데이터 처리로 건강 인사이트 및 이상 탐지." },
  proj_aiadventure_desc: { en: "Gamified learning platform built at KAIST to teach AI concepts interactively. Tested by 30+ students with quizzes, challenges, and progressive difficulty levels.", fr: "Plateforme d'apprentissage gamifiée développée au KAIST pour enseigner l'IA de manière interactive. Testée par 30+ étudiants avec quiz, défis et niveaux de difficulté progressifs.", ko: "KAIST에서 개발한 AI 개념 인터랙티브 교육용 게이미피케이션 학습 플랫폼. 30명 이상의 학생이 퀴즈, 챌린지, 단계별 난이도로 테스트." },
  proj_greatteachers_desc: { en: "Educational platform connecting students with an AI-powered teaching assistant. Provides instant answers, personalized study plans, and resource recommendations.", fr: "Plateforme éducative connectant les étudiants à un assistant pédagogique IA. Réponses instantanées, plans d'études personnalisés et recommandations de ressources.", ko: "AI 기반 교육 어시스턴트와 학생을 연결하는 교육 플랫폼. 즉각적인 답변, 맞춤형 학습 계획, 리소스 추천 제공." },
  proj_visit:         { en: "Visit ↗",                fr: "Voir ↗",                 ko: "방문 ↗" },

  /* ── Tech Stack ── */
  tech_intro:         { en: "Technologies, frameworks & competencies I work with.", fr: "Technologies, frameworks & compétences avec lesquels je travaille.", ko: "제가 사용하는 기술, 프레임워크 및 역량입니다." },
  tech_frontend:      { en: "Frontend",                fr: "Frontend",               ko: "프론트엔드" },
  tech_backend:       { en: "Backend",                 fr: "Backend",                ko: "백엔드" },
  tech_aidata:        { en: "AI & Data",               fr: "IA & Data",              ko: "AI & 데이터" },
  tech_tools:         { en: "Tools & DevOps",          fr: "Outils & DevOps",        ko: "도구 & DevOps" },
  tech_profSkills:    { en: "Professional Skills",     fr: "Compétences Professionnelles", ko: "전문 역량" },
  tech_webMobile:     { en: "Web & Mobile",            fr: "Web & Mobile",           ko: "웹 & 모바일" },
  tech_dataAnalytics: { en: "Data & Analytics",        fr: "Data & Analytique",      ko: "데이터 & 분석" },
  tech_softSkills:    { en: "Soft Skills",             fr: "Savoir-être",            ko: "소프트 스킬" },
  skill_fullstack:    { en: "Full-Stack Development",  fr: "Développement Full-Stack", ko: "풀스택 개발" },
  skill_restapi:      { en: "REST APIs",               fr: "APIs REST",              ko: "REST API" },
  skill_realtime:     { en: "Real-time Systems",       fr: "Systèmes Temps Réel",    ko: "실시간 시스템" },
  skill_datapipe:     { en: "Data Pipelines",          fr: "Pipelines de Données",   ko: "데이터 파이프라인" },
  skill_statanalysis: { en: "Statistical Analysis",    fr: "Analyse Statistique",    ko: "통계 분석" },
  skill_visualization:{ en: "Visualization",           fr: "Visualisation",          ko: "시각화" },
  skill_leadership:   { en: "Team Leadership",         fr: "Leadership d'Équipe",    ko: "팀 리더십" },
  skill_speaking:     { en: "Public Speaking",          fr: "Prise de Parole",        ko: "프레젠테이션" },
  skill_crosscultural:{ en: "Cross-cultural Collaboration", fr: "Collaboration Interculturelle", ko: "다문화 협업" },

  /* ── Passions (now in palette icon) ── */
  passions_intro:     { en: "Interests & passions that shape who I am beyond code.", fr: "Intérêts & passions qui me définissent au-delà du code.", ko: "코드를 넘어 저를 만들어가는 관심사와 열정." },
  passion_football:   { en: "Football",                fr: "Football",               ko: "축구" },
  passion_football_d: { en: "Regional Champion Grand Est 2024. 11 years of competitive play at national level.", fr: "Champion Régional Grand Est 2024. 11 ans de compétition au niveau national.", ko: "2024 그랑에스트 지역 챔피언. 11년간의 전국 수준 경쟁 활동." },
  passion_volleyball: { en: "Volleyball",              fr: "Volleyball",             ko: "배구" },
  passion_volleyball_d: { en: "French National Championship participant. PRVB Plessis Robinson.", fr: "Participant au Championnat de France. PRVB Plessis Robinson.", ko: "프랑스 전국 대회 참가. PRVB 플레시 로빈슨." },
  passion_art:        { en: "Art & Design",            fr: "Art & Design",           ko: "아트 & 디자인" },
  passion_art_d:      { en: "Drawing and creative visual expression — a lifelong pursuit.", fr: "Dessin et expression visuelle créative — une passion de toujours.", ko: "그림과 창의적 시각 표현 — 평생의 추구." },
  passion_entrepreneurship: { en: "Entrepreneurship",  fr: "Entrepreneuriat",        ko: "창업" },
  passion_entrepreneurship_d: { en: "Building innovative solutions and exploring startup opportunities.", fr: "Création de solutions innovantes et exploration d'opportunités startup.", ko: "혁신적인 솔루션 구축과 스타트업 기회 탐색." },
  passion_humanlaw:   { en: "HumanLaw",                fr: "HumanLaw",               ko: "HumanLaw" },
  passion_humanlaw_d: { en: "Food distribution to homeless and students in need since 2023.", fr: "Distribution alimentaire aux sans-abris et étudiants dans le besoin depuis 2023.", ko: "2023년부터 노숙자와 도움이 필요한 학생들에게 식량 배분." },

  /* ── AI & Innovation ── */
  ai_intro:           { en: "Passionate about",        fr: "Passionné par l'",       ko: "" },
  ai_keyword:         { en: "Artificial Intelligence", fr: "Intelligence Artificielle", ko: "인공지능" },
  ai_intro2:          { en: ", Machine Learning, and emerging technologies.", fr: ", le Machine Learning et les technologies émergentes.", ko: ", 머신러닝, 그리고 신기술에 대한 열정." },
  ai_renault_title:   { en: "AI at Renault",           fr: "IA chez Renault",        ko: "르노에서의 AI" },
  ai_renault_desc:    { en: "Built an in-car AI assistant with LLM & RAG, and an AI podcast platform with NLP & TTS.", fr: "Développement d'un assistant IA embarqué avec LLM & RAG, et d'une plateforme de podcasts IA avec NLP & TTS.", ko: "LLM & RAG 기반 차량 내 AI 어시스턴트와 NLP & TTS 기반 AI 팟캐스트 플랫폼 구축." },
  ai_hera_title:      { en: "Hera Studio",             fr: "Hera Studio",            ko: "Hera Studio" },
  ai_hera_desc:       { en: "Created an AI-powered coloring book generator using OpenAI for children's education.", fr: "Création d'un générateur de cahiers de coloriage IA avec OpenAI pour l'éducation des enfants.", ko: "OpenAI를 활용한 아동 교육용 AI 색칠 공부책 생성기 개발." },
  ai_comingSoon:      { en: "More AI projects coming soon…", fr: "D'autres projets IA à venir…", ko: "더 많은 AI 프로젝트가 곧 공개됩니다…" },

  /* ── Certifications ── */
  cert_title:         { en: "Certifications",          fr: "Certifications",         ko: "자격증" },
};

export function t(key: string, lang: Lang): string {
  return s[key]?.[lang] ?? s[key]?.en ?? key;
}

/* Label map keyed by icon id */
const labelKeys: Record<string, string> = {
  cubes: "label_cubes",
  phone: "label_phone",
  "text-card": "label_textCard",
  polyhedron: "label_polyhedron",
  "toggle-stack": "label_toggleStack",
  palette: "label_palette",
  ai: "label_ai",
  dots: "label_dots",
};

export function getIconLabel(id: string, lang: Lang): string {
  const key = labelKeys[id];
  return key ? t(key, lang) : id;
}
