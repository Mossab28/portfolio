export type Lang = "en" | "fr" | "ar";

const s: Record<string, Record<Lang, string>> = {
  /* ── UI chrome ── */
  portfolioTitle:   { en: "Moss'Ab's Portfolio",   fr: "Portfolio de Moss'Ab",   ar: "بورتفوليو مصعب" },
  clickToExplore:   { en: "Click an icon to explore", fr: "Cliquez sur une icône pour explorer", ar: "انقر على أيقونة للاستكشاف" },
  openToWork:       { en: "Open to Work — Internship", fr: "Disponible — Stage", ar: "متاح — تدريب" },
  getInTouch:       { en: "Get in touch",           fr: "Me contacter",           ar: "تواصل معي" },
  contactDesc:      { en: "Feel free to contact me for any internship opportunity or collaboration!", fr: "N'hésitez pas à me contacter pour toute opportunité de stage ou collaboration !", ar: "لا تتردد في التواصل معي لأي فرصة تدريب أو تعاون!" },
  comingSoonFor:    { en: "Content coming soon for", fr: "Contenu à venir pour", ar: "محتوى قادم قريباً لـ" },
  scrollDown:       { en: "Scroll to explore ↓",     fr: "Scrollez pour explorer ↓", ar: "مرر للاستكشاف ↓" },

  /* ── Icon labels ── */
  label_cubes:        { en: "Projects",               fr: "Projets",                ar: "مشاريع" },
  label_phone:        { en: "Experience",              fr: "Expérience",             ar: "خبرة" },
  label_textCard:     { en: "Education",               fr: "Formation",              ar: "تعليم" },
  label_polyhedron:   { en: "About",                   fr: "À propos",               ar: "نبذة" },
  label_toggleStack:  { en: "Tech Stack & Skills",     fr: "Tech & Compétences",     ar: "التقنيات والمهارات" },
  label_palette:      { en: "Passions",                fr: "Passions",               ar: "اهتمامات" },
  label_ai:           { en: "AI & Innovation",         fr: "IA & Innovation",        ar: "الذكاء الاصطناعي والابتكار" },
  label_dots:         { en: "Certifications",          fr: "Certifications",         ar: "شهادات" },

  /* ── About ── */
  about_hello:        { en: "Hello! I'm",              fr: "Bonjour ! Je suis",      ar: "مرحباً! أنا" },
  about_desc:         { en: ", an engineering student at UTT specializing in Networks and Telecommunications. I develop projects combining", fr: ", étudiant ingénieur à l'UTT spécialisé en Réseaux et Télécommunications. Je développe des projets combinant", ar: "، طالب هندسة في UTT متخصص في الشبكات والاتصالات. أطور مشاريع تجمع بين" },
  about_skills:       { en: "AI, networking, and full-stack development", fr: "IA, réseaux et développement full-stack", ar: "الذكاء الاصطناعي والشبكات والتطوير الشامل" },
  about_sub:          { en: "Passionate about artificial intelligence, networking, and computer science since a young age. With solid experience gained through academic, personal, and freelance projects.", fr: "Passionné par l'intelligence artificielle, les réseaux et l'informatique depuis mon plus jeune âge. Fort d'une solide expérience acquise via des projets académiques, personnels et freelance.", ar: "شغوف بالذكاء الاصطناعي والشبكات وعلوم الحاسوب منذ صغري. مع خبرة قوية اكتسبتها من خلال المشاريع الأكاديمية والشخصية والحرة." },
  about_langTitle:    { en: "Languages",               fr: "Langues",                ar: "اللغات" },
  lang_french:        { en: "French",                  fr: "Français",               ar: "الفرنسية" },
  lang_arabic:        { en: "Arabic",                  fr: "Arabe",                  ar: "العربية" },
  lang_english:       { en: "English",                 fr: "Anglais",                ar: "الإنجليزية" },
  lang_chinese:       { en: "Chinese",                 fr: "Chinois",                ar: "الصينية" },
  about_projects_combine: { en: " to create impactful solutions.", fr: " pour créer des solutions à impact.", ar: " لإنشاء حلول مؤثرة." },

  /* ── Experience ── */
  exp_renault_role:   { en: "Full Stack Developer", fr: "Développeur Full Stack", ar: "مطور ويب شامل" },
  exp_renault_period: { en: "Sep 2025 – Ongoing · Dreux, France", fr: "Sep 2025 – En cours · Dreux, France", ar: "سبتمبر 2025 – مستمر · دروو، فرنسا" },
  exp_renault_b1:     { en: "Built a full-stack ride-hailing application (Flutter iOS + Node.js/MongoDB). Beta release planned for September 2026.", fr: "Développement d'une application VTC complète (Flutter iOS + Node.js/MongoDB). Version bêta prévue pour septembre 2026.", ar: "بناء تطبيق نقل شامل (Flutter iOS + Node.js/MongoDB). إصدار تجريبي مخطط لسبتمبر 2026." },
  exp_renault_b2:     { en: "Backend: JWT auth with 7 user roles, automated pricing engine, nearest-driver dispatch, real-time GPS tracking and in-app chat (Socket.IO).", fr: "Backend : Auth JWT avec 7 rôles utilisateur, moteur de tarification automatique, dispatch chauffeur le plus proche, suivi GPS temps réel et chat in-app (Socket.IO).", ar: "الخلفية: مصادقة JWT مع 7 أدوار مستخدم، محرك تسعير آلي، إرسال أقرب سائق، تتبع GPS في الوقت الفعلي ودردشة داخل التطبيق." },
  exp_renault_b3:     { en: "Frontend: 23-screen mobile app with Google Maps, Places autocomplete, OSRM routing, real-time driver tracking, dark/light mode.", fr: "Frontend : Application mobile 23 écrans avec Google Maps, autocomplétion Places, routage OSRM, suivi chauffeur temps réel, mode sombre/clair.", ar: "الواجهة: تطبيق موبايل من 23 شاشة مع خرائط Google وتوجيه OSRM وتتبع السائق في الوقت الفعلي." },
  exp_renault_b4:     { en: "Key features: TPMR/luggage/pet booking, scheduled rides, B2B hotel flow, corporate invoicing, automatic PDF invoicing.", fr: "Fonctionnalités clés : réservation TPMR/bagages/animaux, courses programmées, flux hôtel B2B, facturation entreprise, facturation PDF automatique.", ar: "ميزات رئيسية: حجز TPMR/أمتعة/حيوانات، رحلات مجدولة، فوترة تلقائية PDF." },
  exp_renault_b5:     { en: "Monthly data export (rides, revenue, driver hours, invoices) in CSV/Excel/PDF.", fr: "Export mensuel des données (courses, revenus, heures chauffeurs, factures) en CSV/Excel/PDF.", ar: "تصدير شهري للبيانات (الرحلات، الإيرادات، ساعات السائقين) بصيغة CSV/Excel/PDF." },
  exp_fabulous_role:  { en: "Freelance Web Developer",           fr: "Développeur Web Freelance",        ar: "مطور ويب مستقل" },
  exp_fabulous_period:{ en: "2025 · Troyes, France", fr: "2025 · Troyes, France", ar: "2025 · تروا، فرنسا" },
  exp_fabulous_b1:    { en: "Built a showcase website for a car garage specializing in window tinting, with an interactive price simulator for customers.", fr: "Site vitrine pour un garage auto spécialisé en vitres teintées, avec un simulateur de prix interactif pour les clients.", ar: "موقع عرض لكراج سيارات متخصص في تظليل النوافذ، مع محاكي أسعار تفاعلي." },
  exp_columbus_role:  { en: "Founder & Manager",              fr: "Fondateur & Manager",                  ar: "مؤسس ومدير" },
  exp_columbus_period:{ en: "2023 – 2026 · France", fr: "2023 – 2026 · France", ar: "2023 – 2026 · فرنسا" },
  exp_columbus_b1:    { en: "Founded and managed a sneaker reselling business, generating over 50k€ in revenue over 3 years. Handled sourcing, inventory, pricing, and multi-platform sales.", fr: "Fondation et gestion d'une entreprise de revente de sneakers, générant plus de 50k€ de CA sur 3 ans. Gestion sourcing, stocks, pricing et ventes multi-plateformes.", ar: "تأسيس وإدارة شركة إعادة بيع أحذية رياضية، بإيرادات تتجاوز 50 ألف يورو على 3 سنوات." },

  /* ── Education ── */
  edu_kaist_title:    { en: "Data Engineering & ML Bootcamp — HI! Paris", fr: "Bootcamp Data Engineering & ML — HI! Paris", ar: "بوتكامب هندسة البيانات و ML — HI! Paris" },
  edu_kaist_period:   { en: "École Polytechnique & Télécom Paris", fr: "École Polytechnique & Télécom Paris", ar: "École Polytechnique & Télécom Paris" },
  edu_kaist_desc:     { en: "Intensive bootcamp in Data Engineering and Machine Learning, in collaboration with France's top engineering schools.", fr: "Bootcamp intensif en Data Engineering et Machine Learning, en collaboration avec les meilleures écoles d'ingénieurs de France.", ar: "بوتكامب مكثف في هندسة البيانات والتعلم الآلي، بالتعاون مع أفضل مدارس الهندسة في فرنسا." },
  edu_utt_title:      { en: "Engineering — Networks & Telecommunications — UTT", fr: "Ingénieur — Réseaux & Télécommunications — UTT", ar: "هندسة — الشبكات والاتصالات — UTT" },
  edu_utt_period:     { en: "2022 – 2027 · Troyes, France", fr: "2022 – 2027 · Troyes, France", ar: "2022 – 2027 · تروا، فرنسا" },
  edu_utt_desc:       { en: "Integrated Preparatory Program (2022–2024). Specialization in Networks and Telecommunications. Academic projects in networking, telecom, and systems administration.", fr: "Cycle préparatoire intégré (2022–2024). Spécialisation Réseaux et Télécommunications. Projets académiques en réseaux, télécoms et administration systèmes.", ar: "برنامج تحضيري متكامل (2022–2024). تخصص الشبكات والاتصالات. مشاريع أكاديمية في الشبكات والاتصالات وإدارة الأنظمة." },

  /* ── Projects ── */
  proj_hera_desc:     { en: "AI-powered Forex trading bot built with Python and ML models. Scans global market signals in real time, detects high-probability patterns using NLP and time-series analysis, and executes trades autonomously.", fr: "Bot de trading Forex alimenté par l'IA, construit avec Python et des modèles ML. Scanne les signaux de marché en temps réel, détecte des patterns à haute probabilité via NLP et analyse de séries temporelles.", ar: "روبوت تداول فوركس مدعوم بالذكاء الاصطناعي مبني بـ Python ونماذج ML. يمسح إشارات السوق في الوقت الفعلي ويكتشف الأنماط عالية الاحتمال." },
  proj_carchat_desc:  { en: "LinkedIn automation SaaS to streamline job search. Auto-identifies and sends personalized connection requests to recruiters based on target criteria. Automates job applications at scale.", fr: "SaaS d'automatisation LinkedIn pour faciliter la recherche d'emploi. Identifie et envoie automatiquement des demandes de connexion personnalisées aux recruteurs. Automatise les candidatures à grande échelle.", ar: "SaaS لأتمتة LinkedIn لتسهيل البحث عن عمل. يحدد ويرسل تلقائياً طلبات اتصال مخصصة للمسؤولين عن التوظيف." },
  proj_ecu_desc:      { en: "Developing a training simulator for nuclear power plant operators. Replicates the control interface for heavy-lift equipment with real-time 3D visualization and physics-based constraints.", fr: "Développement d'un simulateur d'entraînement pour opérateurs de centrales nucléaires. Réplique l'interface de contrôle d'équipements lourds avec visualisation 3D temps réel et contraintes physiques.", ar: "تطوير محاكي تدريب لمشغلي محطات الطاقة النووية. يحاكي واجهة التحكم بمعدات الرفع الثقيل مع تصور ثلاثي الأبعاد." },
  proj_reply_desc:    { en: "Member of Néréides, a 30+ student engineering association at UTT designing a hybrid hydrogen boat (40% H2 + 60% battery) for the Monaco Energy Boat Challenge. Telemetry lead and head of Embedded Systems.", fr: "Membre de Néréides, association de 30+ étudiants ingénieurs à l'UTT concevant un bateau hybride hydrogène (40% H2 + 60% batterie) pour le Monaco Energy Boat Challenge. Responsable télémétrie et chef Systèmes Embarqués.", ar: "عضو في Néréides، جمعية 30+ طالب هندسة في UTT تصمم قارب هيدروجين هجين لتحدي قوارب الطاقة في موناكو. مسؤول القياس عن بُعد." },
  proj_aiadventure_desc: { en: "Full-stack ride-hailing application built with Flutter iOS and Node.js/MongoDB. 23-screen mobile app with Google Maps, real-time GPS tracking, automated pricing, and corporate invoicing.", fr: "Application VTC full-stack construite avec Flutter iOS et Node.js/MongoDB. App mobile 23 écrans avec Google Maps, suivi GPS temps réel, tarification automatique et facturation entreprise.", ar: "تطبيق نقل شامل مبني بـ Flutter iOS و Node.js/MongoDB. تطبيق موبايل من 23 شاشة مع خرائط Google وتتبع GPS في الوقت الفعلي." },
  proj_greatteachers_desc: { en: "Showcase website for a car garage specializing in window tinting, featuring an interactive price simulator allowing customers to estimate costs based on vehicle type and window selection.", fr: "Site vitrine pour un garage auto spécialisé en vitres teintées, avec un simulateur de prix interactif permettant aux clients d'estimer les coûts selon le type de véhicule et la sélection de vitres.", ar: "موقع عرض لكراج سيارات متخصص في تظليل النوافذ، مع محاكي أسعار تفاعلي للعملاء." },
  proj_visit:         { en: "Visit ↗",                fr: "Voir ↗",                 ar: "زيارة ↗" },

  /* ── Tech Stack ── */
  tech_intro:         { en: "Technologies, frameworks & competencies I work with.", fr: "Technologies, frameworks & compétences avec lesquels je travaille.", ar: "التقنيات والأطر والكفاءات التي أعمل بها." },
  tech_frontend:      { en: "Frontend",                fr: "Frontend",               ar: "الواجهة الأمامية" },
  tech_backend:       { en: "Backend",                 fr: "Backend",                ar: "الخلفية" },
  tech_aidata:        { en: "AI & Data",               fr: "IA & Data",              ar: "الذكاء الاصطناعي والبيانات" },
  tech_tools:         { en: "Tools & DevOps",          fr: "Outils & DevOps",        ar: "الأدوات و DevOps" },
  tech_profSkills:    { en: "Professional Skills",     fr: "Compétences Professionnelles", ar: "المهارات المهنية" },
  tech_webMobile:     { en: "Web & Mobile",            fr: "Web & Mobile",           ar: "الويب والموبايل" },
  tech_dataAnalytics: { en: "Networking",              fr: "Réseaux",                ar: "الشبكات" },
  tech_softSkills:    { en: "Soft Skills",             fr: "Savoir-être",            ar: "المهارات الشخصية" },
  skill_fullstack:    { en: "Full-Stack Development",  fr: "Développement Full-Stack", ar: "التطوير الشامل" },
  skill_restapi:      { en: "REST APIs",               fr: "APIs REST",              ar: "REST API" },
  skill_realtime:     { en: "Real-time Systems",       fr: "Systèmes Temps Réel",    ar: "أنظمة الوقت الفعلي" },
  skill_datapipe:     { en: "TCP/IP & Routing",        fr: "TCP/IP & Routage",       ar: "TCP/IP والتوجيه" },
  skill_statanalysis: { en: "Network Security",        fr: "Sécurité Réseau",        ar: "أمن الشبكات" },
  skill_visualization:{ en: "Systems Administration",  fr: "Administration Systèmes",ar: "إدارة الأنظمة" },
  skill_leadership:   { en: "Team Leadership",         fr: "Leadership d'Équipe",    ar: "قيادة الفريق" },
  skill_speaking:     { en: "Communication",           fr: "Communication",          ar: "التواصل" },
  skill_crosscultural:{ en: "Adaptability",            fr: "Adaptabilité",           ar: "القدرة على التكيف" },

  /* ── Passions ── */
  passions_intro:     { en: "Interests & passions that shape who I am beyond code.", fr: "Intérêts & passions qui me définissent au-delà du code.", ar: "الاهتمامات والشغف التي تشكلني خارج البرمجة." },
  passion_football:   { en: "Athletics",               fr: "Athlétisme",             ar: "ألعاب القوى" },
  passion_football_d: { en: "UGSEL 2022: Regional champion in shot put, 2nd in triple jump, long jump, 4x100m relay. Qualified for French National Championships.", fr: "UGSEL 2022 : Champion régional au lancer de poids, 2e en triple saut, longueur, 4x100m. Qualifié aux Championnats de France.", ar: "UGSEL 2022: بطل إقليمي في رمي الجلة، المركز الثاني في الوثب الثلاثي والطويل و4×100م. مؤهل لبطولة فرنسا." },
  passion_volleyball: { en: "Handball",                fr: "Handball",               ar: "كرة اليد" },
  passion_volleyball_d: { en: "University regional champion (2025). Qualified for the French University National Championships 2026.", fr: "Champion régional universitaire (2025). Qualifié aux Championnats de France Universitaires 2026.", ar: "بطل جهوي جامعي (2025). مؤهل لبطولة فرنسا الجامعية 2026." },
  passion_art:        { en: "Cybersecurity",            fr: "Cybersécurité",          ar: "الأمن السيبراني" },
  passion_art_d:      { en: "Hands-on experience on TryHackMe platform. Passionate about ethical hacking and security.", fr: "Expérience pratique sur la plateforme TryHackMe. Passionné par le hacking éthique et la sécurité.", ar: "خبرة عملية على منصة TryHackMe. شغوف بالقرصنة الأخلاقية والأمن." },
  passion_entrepreneurship: { en: "Entrepreneurship",  fr: "Entrepreneuriat",        ar: "ريادة الأعمال" },
  passion_entrepreneurship_d: { en: "Founded Centrale Sneakers (50k€+ revenue). Managed dropshipping operations with 120k+ affiliated users. Private tutoring business (20k€+ revenue).", fr: "Fondateur de Centrale Sneakers (50k€+ de CA). Gestion d'opérations dropshipping avec 120k+ utilisateurs affiliés. Cours particuliers (20k€+ de CA).", ar: "مؤسس Centrale Sneakers (إيرادات 50 ألف يورو+). إدارة عمليات دروبشيبينغ مع 120 ألف+ مستخدم. دروس خصوصية (20 ألف يورو+)." },
  passion_humanlaw:   { en: "AFAD Association",        fr: "Association AFAD",        ar: "جمعية AFAD" },
  passion_humanlaw_d: { en: "Volunteer providing aid to underprivileged communities — food distribution and material support since 2024.", fr: "Bénévole apportant aide aux communautés défavorisées — distribution alimentaire et soutien matériel depuis 2024.", ar: "متطوع لتقديم المساعدة للمجتمعات المحتاجة — توزيع الغذاء والدعم المادي منذ 2024." },

  /* ── AI & Innovation ── */
  ai_intro:           { en: "Passionate about",        fr: "Passionné par l'",       ar: "شغوف بـ" },
  ai_keyword:         { en: "Artificial Intelligence", fr: "Intelligence Artificielle", ar: "الذكاء الاصطناعي" },
  ai_intro2:          { en: ", Machine Learning, and emerging technologies.", fr: ", le Machine Learning et les technologies émergentes.", ar: "، التعلم الآلي والتقنيات الناشئة." },
  ai_renault_title:   { en: "XTrading Bot",            fr: "XTrading Bot",           ar: "XTrading Bot" },
  ai_renault_desc:    { en: "AI-powered Forex trading bot using Python and ML models. Real-time market scanning with NLP and time-series analysis, autonomous trade execution, dynamic risk management, and performance dashboarding.", fr: "Bot de trading Forex alimenté par l'IA avec Python et modèles ML. Scan de marché en temps réel avec NLP et analyse de séries temporelles, exécution autonome, gestion dynamique du risque et dashboard de performance.", ar: "روبوت تداول فوركس بالذكاء الاصطناعي باستخدام Python ونماذج ML. مسح السوق في الوقت الفعلي مع NLP وتحليل السلاسل الزمنية." },
  ai_hera_title:      { en: "LinkBoost",               fr: "LinkBoost",              ar: "LinkBoost" },
  ai_hera_desc:       { en: "LinkedIn automation SaaS using Python and NLP for personalized outreach. Automates connection requests to recruiters and job applications at scale with tracking dashboard.", fr: "SaaS d'automatisation LinkedIn utilisant Python et NLP pour des approches personnalisées. Automatise les demandes de connexion aux recruteurs et les candidatures à grande échelle avec dashboard de suivi.", ar: "SaaS لأتمتة LinkedIn باستخدام Python و NLP للتواصل المخصص. أتمتة طلبات الاتصال بالمسؤولين عن التوظيف." },
  ai_comingSoon:      { en: "More AI projects coming soon…", fr: "D'autres projets IA à venir…", ar: "المزيد من مشاريع الذكاء الاصطناعي قادمة قريباً…" },

  /* ── Certifications ── */
  cert_title:         { en: "Certifications",          fr: "Certifications",         ar: "الشهادات" },
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
