/**
 * Sistema bilingüe (ES / EN) para el portafolio de NachoFari y Natu.exe.
 * Persiste la preferencia en localStorage y sincroniza pestañas mediante ?lang=.
 */
(function () {
  const STORAGE_KEY = 'nachofari_lang';
  const listeners = new Set();

  const TRANSLATIONS = {
    es: {
      // Meta titles
      'meta.index.title': 'NachoFari | Ignacio Farías — Mis Proyectos & Ciencia Computacional',
      'meta.index.desc':
        'Portafolio y galería de proyectos públicos de Ignacio Farías (NachoFari): NaTex Studio, Radar ICF, LabVision, VirtualLab_N y SaliencyVision IA. Estudiante de Ingeniería Civil Física UTFSM y miembro de QState.',
      'meta.natu.title': 'Conoce a Natu (Natu.exe) — Lore, Wallpapers & Stickers · NachoFari',
      'meta.natu.desc':
        'Historia y lore oficial de Natu, el zorro pixel-art de NachoFari. Descarga wallpapers en 4K / celular y stickers para WhatsApp o imprimir.',

      // Navbar (index)
      'nav.brandSub': 'Ignacio Farías · Physics & Dev',
      'nav.inicio': 'Inicio',
      'nav.estrella': 'Proyecto Estrella',
      'nav.proyectos': 'Mis Proyectos',
      'nav.qstate': 'Q|State⟩',
      'nav.qstateMobile': 'Miembro Q|State⟩',
      'nav.actividades': 'Actividades',
      'nav.podcast': 'Stemos Hablando',
      'nav.contacto': 'Contacto',
      'nav.cta': 'Contactar',
      'nav.openMenu': 'Abrir menú',
      'nav.langAria': 'Cambiar idioma entre Español e Inglés',
      'nav.langTitle': 'Switch to English',

      // Hero
      'hero.kicker': 'Ingeniería Civil Física · UTFSM · Software & IA',
      'hero.titleHtml': 'Hola, soy <span class="text-gradient">Ignacio Farías</span><span class="hero-handle">@NachoFari</span>',
      'hero.descHtml':
        'Soy estudiante de <strong>Ingeniería Civil Física en la USM</strong>. Me apasiona hacer <strong>divulgación científica</strong> y crear <strong>herramientas de automatización y comodidad usando inteligencia artificial</strong>, transformando ideas y flujos complejos en software rápido, visual y abierto.',
      'hero.trait1': '🎓 Estudiante de Ingeniería Civil Física · USM',
      'hero.trait2': '🔭 Divulgación científica y extensión',
      'hero.trait3': '🤖 Herramientas de automatización y comodidad con IA',
      'hero.copyEmail': 'Copiar correo',
      'hero.copyEmailTitle': 'Copiar correo al portapapeles',
      'hero.metricRepos': 'Repos Públicos',
      'hero.metricApps': 'Apps Web en Vivo',
      'hero.metricQstate': 'Área Computacional · USM',
      'hero.bubbleTitle': 'Haz clic para cambiar la frase de Natu',
      'hero.foxTriggerTitle': 'Toca a Natu para otra frase',
      'hero.foxTriggerAria': 'Cambiar frase de Natu',
      'hero.natuBtn': 'Conoce a Natu',
      'hero.natuBtnTitle': 'Abre una nueva pestaña con el lore de Natu, wallpapers y stickers',

      // Flagship NaTex
      'estrella.tagHtml': '<span>★</span> Proyecto Estrella',
      'estrella.subtitle':
        'Entorno de edición LaTeX rápido, visual, libre y colaborativo — compilación instantánea sin configuraciones pesadas.',
      'estrella.badge': '★ Proyecto Estrella',
      'estrella.tagline': 'Editor de texto LaTeX pensado en la comodidad, rapidez y experiencia visual',
      'estrella.desc':
        'Herramienta de edición de documentos LaTeX pensada en la comodidad y en ahorrar tiempo, sin instalaciones pesadas ni configuraciones complicadas. Abres, escribes y ves tu PDF actualizado al instante, con un constructor visual de fórmulas, editor rápido de tablas, trabajo colaborativo en vivo, asistente con IA y más de 20 temas personalizables.',
      'estrella.feat1': '⚡ Abre, escribe y compila en segundos',
      'estrella.feat2': '🧮 Teclado visual para fórmulas sin memorizar comandos',
      'estrella.feat3': '🌐 Colaboración en tiempo real mediante enlace o QR',
      'estrella.feat4': '🤖 Asistente con IA y dictáfono inteligente de clases',
      'estrella.tech1': 'Edición LaTeX Visual',
      'estrella.tech2': 'Vista PDF Instantánea',
      'estrella.tech3': 'Trabajo Colaborativo',
      'estrella.tech4': 'Asistente IA',
      'estrella.tech5': '21 Temas',
      'estrella.repoBtn': 'Ver Repositorio',
      'estrella.dlBtn': 'Descargar v1.3.1 (.exe)',
      'estrella.zoomTitle': 'Ampliar captura',
      'estrella.thumb1': 'Editor Fox',
      'estrella.thumb2': 'Inicio',
      'estrella.thumb3': 'KaTeX',
      'estrella.thumb4': 'Tablas',
      'estrella.thumb5': 'Temas',

      // Proyectos
      'projects.tag': 'Repositorios Públicos',
      'projects.title': 'Galería de Proyectos',
      'projects.subtitleHtml':
        'Solo repositorios públicos de <code>github.com/NachoFari</code>, documentados desde sus READMEs oficiales con sus íconos, vistas previas y enlaces directos.',

      // QState
      'qstate.tag': 'Computación & Software Científico',
      'qstate.titleHtml': 'Miembro de <span class="q-braket-inline">Q|State⟩</span>',
      'qstate.subtitle': 'Quantum Systems Theory and Technology · Universidad Técnica Federico Santa María (UTFSM)',
      'qstate.descHtml':
        'Formo parte del grupo <strong>Q|State⟩</strong> en el Departamento de Física de la UTFSM, aportando desde el área computacional en el desarrollo de software científico, herramientas de automatización, visión por computador e inteligencia artificial aplicada.',
      'qstate.area1': 'Desarrollo Computacional',
      'qstate.area2': 'Software Científico',
      'qstate.area3': 'Visión por Computador',
      'qstate.area4': 'IA & Automatización',
      'qstate.visitBtn': 'Visitar qstate.cl',
      'qstate.groupBtn': 'Ver Grupo y Proyectos',

      // Actividades
      'activities.tag': 'Divulgación & Participación',
      'activities.title': 'Actividades y Eventos',
      'activities.subtitle': 'Charlas, instancias de divulgación científica y noticias junto a la USM y Q|State⟩.',
      'activities.prevAria': 'Actividades anteriores',
      'activities.nextAria': 'Siguientes actividades',

      // Podcast
      'podcast.tag': '🎙️ Divulgación STEM · Podcast',
      'podcast.subtitle':
        'Proyecto de entrevistas y conversaciones cercanas sobre ciencia, tecnología, investigación en Chile y el lado humano detrás de quienes hacen ciencia.',
      'podcast.prevAria': 'Episodio anterior',
      'podcast.nextAria': 'Siguiente episodio',

      // Contacto
      'contact.tag': 'Conecta conmigo',
      'contact.title': '¿Trabajamos en algo juntos?',
      'contact.subtitle':
        'Abierto a colaboraciones en física computacional, desarrollo de herramientas científicas, IA aplicada y proyectos open source.',
      'contact.emailLabel': 'Correo Institucional',
      'contact.groupLabel': 'Grupo de Investigación',

      // Footer & Lightbox & Gravity
      'footer.indexHtml': '<strong>NachoFari</strong> · Ignacio Farías · Ingeniería Civil Física UTFSM',
      'lightbox.default': 'Vista previa',
      'lightbox.closeAria': 'Cerrar vista ampliada',
      'gravity.barText': '⚡ g = 9.8 m/s² activado (puedes arrastrar las tarjetas)',
      'gravity.resetBtn': '↻ Restaurar página',

      // NATU PAGE (natu.html)
      'natu.nav.brandSub': 'Mascota Oficial · NachoFari',
      'natu.nav.lore': 'Lore de Natu',
      'natu.nav.wallpapers': 'Wallpapers',
      'natu.nav.whatsapp': 'Stickers WhatsApp',
      'natu.nav.print': 'Para Imprimir',
      'natu.nav.back': '← Portafolio',
      'natu.nav.backMobile': '← Volver al Portafolio',
      'natu.header.tag': '🦊 Bitácora #00 · Conoce a Natu',
      'natu.header.subtitle':
        'La historia detrás del zorrito pixel-art que acompaña los proyectos de NachoFari — más sus wallpapers y stickers oficiales de descarga libre.',
      'natu.zoomTitle': 'Ampliar sprite de Natu',
      'natu.pose.bolita': 'Bolita',
      'natu.pose.cuadrupedo': '4 Patas',
      'natu.pose.sentado': 'Sentado',
      'natu.pose.saltando': 'Saltando',
      'natu.pose.cafe': 'Café',
      'natu.badgeLore': '🦊 Lore Oficial',
      'natu.badgeVersion': 'v1.0 · Cafeína Pura',
      'natu.whoTitle': '¿Quién es Natu?',
      'natu.whoTagline': 'Un zorro culpeo pixelado atrapado entre física, código y LaTeX',
      'natu.loreP1Html':
        '<strong>Natu</strong> emergió por accidente una madrugada frente al terminal cuando una compilación de <strong>NaTex Studio</strong> y una simulación en Python convergieron en el mismo puerto local. En lugar de tirar un error, apareció este zorrito naranja pixelado inspirado en el zorro culpeo chileno.',
      'natu.loreP2Html':
        'Vive entre repositorios open source, pantallas oscuras y tazas de café. Pasa el día alternando entre su estado de mínima energía (<code>|bolita⟩</code>), supervisando ecuaciones sospechosas sin paréntesis y recordando que todo mejora si se puede automatizar.',
      'natu.quoteHint': '↻ Otra frase',
      'natu.quoteTitle': 'Haz clic para cambiar la frase de Natu',
      'natu.stat1Label': 'Especie',
      'natu.stat1Val': 'Vulpes pixelata · Culpeo Cuántico',
      'natu.stat2Label': 'Combustible',
      'natu.stat2ValHtml': 'Café negro, <code>\\frac{}{}</code> y modo oscuro',
      'natu.stat3Label': 'Debilidad',
      'natu.stat3ValHtml': 'Olvidar multiplicar por <code>π</code> o un <code>(−)</code>',
      'natu.stat4Label': 'Superpoder',
      'natu.stat4ValHtml': 'Aproximar <code>sin(x) ≈ x</code> con absoluta fe',
      'natu.ctaWp': '🖼️ Ver Wallpapers (10)',
      'natu.ctaWa': '💬 Stickers WhatsApp (20)',
      'natu.ctaPrint': '🖨️ Para Imprimir (18)',

      // Natu Downloads Header
      'natu.dl.tag': '📦 Llévate a Natu contigo',
      'natu.dl.title': 'Descargas Oficiales de Natu',
      'natu.dl.subtitle':
        'Elige qué pack quieres bajar y sigue las instrucciones paso a paso para instalarlo en tu PC, celular, WhatsApp o llevarlo a imprenta.',
      'natu.dl.filterAllHtml': '✨ Ver Todo <span class="dl-count-pill">48</span>',
      'natu.dl.filterWpHtml': '🖼️ Wallpapers PC &amp; Celular <span class="dl-count-pill">10</span>',
      'natu.dl.filterWaHtml': '💬 Stickers WhatsApp <span class="dl-count-pill">20</span>',
      'natu.dl.filterPrintHtml': '🖨️ Stickers para Imprimir <span class="dl-count-pill">18</span>',

      // Natu Wallpapers
      'natu.wp.tag': '🖼️ Fondos de Pantalla',
      'natu.wp.title': 'Wallpapers de Natu · PC (4K) & Celular',
      'natu.wp.subtitle':
        'Diseñados con espacio despejado para los íconos del escritorio y el reloj de la pantalla de bloqueo.',
      'natu.wp.pcBadge': 'En tu PC (Windows / macOS)',
      'natu.wp.pcTitle': '1. Descarga e instala en 2 clics',
      'natu.wp.pcDescHtml':
        'Pulsa <strong>⬇ 4K PNG</strong> en tu favorito. En Windows haz <strong>clic derecho → «Establecer como fondo de escritorio»</strong>; en Mac arrástralo a <em>Ajustes → Fondo de pantalla</em>.',
      'natu.wp.mobBadge': 'En tu Celular (Android / iPhone)',
      'natu.wp.mobTitle': '2. Aplica en Bloqueo o Inicio',
      'natu.wp.mobDescHtml':
        'Desde tu teléfono toca <strong>⬇ PNG Celular</strong>, abre la foto en Galería/Fotos y elige <strong>«Usar como fondo de pantalla»</strong> (el #05 trae el QR listo para eventos).',
      'natu.wp.pcSubhead': '🖥️ PC Escritorio · Ultra HD 4K',
      'natu.wp.mobSubhead': '📱 Celular · Pantalla OLED 20:9',
      'natu.wp.viewBtn': 'Ver',
      'natu.wp.dlMobBtn': '⬇ PNG Celular',

      // Natu WhatsApp
      'natu.wa.tag': '💬 Pack Oficial Animado',
      'natu.wa.title': '20 Stickers de Natu para WhatsApp',
      'natu.wa.subtitle': 'Todas las reacciones pixel-art animadas de Natu para tus chats.',
      'natu.wa.dlPack': '⬇ Descargar Pack (.wastickers)',
      'natu.wa.dlZip': '📦 20 GIFs (.zip)',
      'natu.wa.step1Badge': 'Paso 1 · Android & iPhone',
      'natu.wa.step1Title': 'Instala «Sticker Maker»',
      'natu.wa.step1DescHtml':
        'Baja gratis la app <strong>Sticker Maker</strong> (por Viko &amp; Co) desde Google Play o App Store.',
      'natu.wa.step2Badge': 'Paso 2 · Pack de 20 en 1 toque',
      'natu.wa.step2TitleHtml': 'Abre el archivo <code>.wastickers</code>',
      'natu.wa.step2DescHtml':
        'Toca el botón naranjo <strong>Descargar Pack (.wastickers)</strong>, ábrelo con <em>Sticker Maker</em> y pulsa <strong>«Añadir a WhatsApp»</strong>.',
      'natu.wa.step3Badge': 'Alternativa · WhatsApp Web',
      'natu.wa.step3Title': 'Baja uno por uno en PC',
      'natu.wa.step3DescHtml':
        'Descarga cualquier <code>.webp</code> con el botón <code>⬇</code> o el <code>.zip</code> de GIFs y súbelo desde <strong>+ → Crear sticker</strong> en WhatsApp Web.',

      // Natu Print
      'natu.pr.tag': '🖨️ Alta Resolución · 300 DPI',
      'natu.pr.title': '18 Stickers de Natu para Imprimir',
      'natu.pr.subtitle':
        'Incluye las 4 poses elegidas de Natu (Bolita #5, 4 Patas #3, Sentado #6, Saltando #9), café, code y QRs escaneables.',
      'natu.pr.dlSheet': '⬇ PDF Pliego 100 u. (1m²)',
      'natu.pr.dlLetter': '📄 PDF 2 Hojas Carta',
      'natu.pr.dlZip': '📦 18 PNGs (.zip)',
      'natu.pr.opt1Badge': 'Opción Imprenta · Vinilo PVC',
      'natu.pr.opt1Title': 'Pliego 1 m² (100 stickers)',
      'natu.pr.opt1DescHtml':
        'Descarga el <strong>PDF Pliego 100 u. (1m²)</strong> y pide en imprenta <em>«vinilo adhesivo con medio corte»</em>. Al ir todo en 1 archivo no cobran recargo por variedad.',
      'natu.pr.opt2Badge': 'Opción Casa · Papel Adhesivo',
      'natu.pr.opt2Title': 'Hojas Carta al 100%',
      'natu.pr.opt2DescHtml':
        'Descarga <strong>PDF 2 Hojas Carta</strong>, imprime en tamaño real (<strong>100% sin escalar</strong>) y recorta siguiendo el contorno blanco de Natu.',

      'natu.footerHtml': '<strong>Natu.exe</strong> · Mascota oficial de <strong>NachoFari</strong>',
    },

    en: {
      // Meta titles
      'meta.index.title': 'NachoFari | Ignacio Farías — Projects & Computational Science',
      'meta.index.desc':
        'Portfolio and open-source project showcase of Ignacio Farías (NachoFari): NaTex Studio, Radar ICF, LabVision, VirtualLab_N and SaliencyVision AI. Engineering Physics student at UTFSM and QState member.',
      'meta.natu.title': 'Meet Natu (Natu.exe) — Lore, Wallpapers & Stickers · NachoFari',
      'meta.natu.desc':
        'Official story and lore of Natu, NachoFari’s pixel-art fox. Download 4K desktop & mobile wallpapers, animated WhatsApp stickers and print-ready sheets.',

      // Navbar (index)
      'nav.brandSub': 'Ignacio Farías · Physics & Dev',
      'nav.inicio': 'Home',
      'nav.estrella': 'Flagship Project',
      'nav.proyectos': 'Projects',
      'nav.qstate': 'Q|State⟩',
      'nav.qstateMobile': 'Q|State⟩ Member',
      'nav.actividades': 'Activities',
      'nav.podcast': 'Stemos Hablando',
      'nav.contacto': 'Contact',
      'nav.cta': 'Get in Touch',
      'nav.openMenu': 'Open menu',
      'nav.langAria': 'Switch language between Spanish and English',
      'nav.langTitle': 'Cambiar a Español',

      // Hero
      'hero.kicker': 'Engineering Physics · UTFSM · Software & AI',
      'hero.titleHtml': "Hi, I'm <span class=\"text-gradient\">Ignacio Farías</span><span class=\"hero-handle\">@NachoFari</span>",
      'hero.descHtml':
        "I'm an <strong>Engineering Physics student at USM</strong>. I'm passionate about <strong>science outreach</strong> and building <strong>AI-powered automation and developer-comfort tools</strong>, turning complex workflows and ideas into fast, visual, open-source software.",
      'hero.trait1': '🎓 Engineering Physics Student · USM',
      'hero.trait2': '🔭 Science outreach & community engagement',
      'hero.trait3': '🤖 AI automation & workflow-comfort tools',
      'hero.copyEmail': 'Copy email',
      'hero.copyEmailTitle': 'Copy email address to clipboard',
      'hero.metricRepos': 'Public Repos',
      'hero.metricApps': 'Live Web Apps',
      'hero.metricQstate': 'Computational Area · USM',
      'hero.bubbleTitle': "Click to change Natu's quote",
      'hero.foxTriggerTitle': 'Tap Natu for another quote',
      'hero.foxTriggerAria': "Change Natu's quote",
      'hero.natuBtn': 'Meet Natu',
      'hero.natuBtnTitle': "Opens a new tab with Natu's lore, wallpapers and stickers",

      // Flagship NaTex
      'estrella.tagHtml': '<span>★</span> Flagship Project',
      'estrella.subtitle':
        'A fast, visual, free and collaborative LaTeX editing environment — instant compilation with zero heavy setup.',
      'estrella.badge': '★ Flagship Project',
      'estrella.tagline': 'LaTeX text editor built for comfort, speed and a crisp visual workflow',
      'estrella.desc':
        'A LaTeX document editor crafted for comfort and saving time, with no bulky installations or painful setup. Open, type, and see your PDF update live, featuring a visual formula builder, rapid table editor, real-time collaboration, AI assistant, and 20+ customizable themes.',
      'estrella.feat1': '⚡ Open, write and compile in seconds',
      'estrella.feat2': '🧮 Visual formula keyboard without memorizing commands',
      'estrella.feat3': '🌐 Real-time collaboration via share link or QR',
      'estrella.feat4': '🤖 AI assistant and smart lecture dictation',
      'estrella.tech1': 'Visual LaTeX Editing',
      'estrella.tech2': 'Instant PDF Preview',
      'estrella.tech3': 'Live Collaboration',
      'estrella.tech4': 'AI Assistant',
      'estrella.tech5': '21 Themes',
      'estrella.repoBtn': 'View Repository',
      'estrella.dlBtn': 'Download v1.3.1 (.exe)',
      'estrella.zoomTitle': 'Expand screenshot',
      'estrella.thumb1': 'Fox Editor',
      'estrella.thumb2': 'Home',
      'estrella.thumb3': 'KaTeX',
      'estrella.thumb4': 'Tables',
      'estrella.thumb5': 'Themes',

      // Projects
      'projects.tag': 'Public Repositories',
      'projects.title': 'Project Gallery',
      'projects.subtitleHtml':
        'Public repositories from <code>github.com/NachoFari</code>, documented from their official READMEs with icons, previews and direct links.',

      // QState
      'qstate.tag': 'Computation & Scientific Software',
      'qstate.titleHtml': 'Member of <span class="q-braket-inline">Q|State⟩</span>',
      'qstate.subtitle': 'Quantum Systems Theory and Technology · Universidad Técnica Federico Santa María (UTFSM)',
      'qstate.descHtml':
        "I'm part of the <strong>Q|State⟩</strong> research group in the Physics Department at UTFSM, contributing from the computational side in scientific software development, automation tooling, computer vision and applied AI.",
      'qstate.area1': 'Computational Dev',
      'qstate.area2': 'Scientific Software',
      'qstate.area3': 'Computer Vision',
      'qstate.area4': 'AI & Automation',
      'qstate.visitBtn': 'Visit qstate.cl',
      'qstate.groupBtn': 'Explore Group & Projects',

      // Activities
      'activities.tag': 'Outreach & Participation',
      'activities.title': 'Activities & Events',
      'activities.subtitle': 'Talks, science outreach initiatives and highlights alongside USM and Q|State⟩.',
      'activities.prevAria': 'Previous activities',
      'activities.nextAria': 'Next activities',

      // Podcast
      'podcast.tag': '🎙️ STEM Outreach · Podcast',
      'podcast.subtitle':
        'Interview project featuring approachable conversations on science, technology, research in Chile and the human side of scientists.',
      'podcast.prevAria': 'Previous episode',
      'podcast.nextAria': 'Next episode',

      // Contact
      'contact.tag': 'Connect with me',
      'contact.title': "Let's build something together",
      'contact.subtitle':
        'Open to collaborations in computational physics, scientific tooling, applied AI and open-source software.',
      'contact.emailLabel': 'Institutional Email',
      'contact.groupLabel': 'Research Group',

      // Footer & Lightbox & Gravity
      'footer.indexHtml': '<strong>NachoFari</strong> · Ignacio Farías · Engineering Physics UTFSM',
      'lightbox.default': 'Preview',
      'lightbox.closeAria': 'Close preview',
      'gravity.barText': '⚡ g = 9.8 m/s² active (you can drag the cards around)',
      'gravity.resetBtn': '↻ Restore page',

      // NATU PAGE (natu.html)
      'natu.nav.brandSub': 'Official Mascot · NachoFari',
      'natu.nav.lore': "Natu's Lore",
      'natu.nav.wallpapers': 'Wallpapers',
      'natu.nav.whatsapp': 'WhatsApp Stickers',
      'natu.nav.print': 'Print-Ready',
      'natu.nav.back': '← Portfolio',
      'natu.nav.backMobile': '← Back to Portfolio',
      'natu.header.tag': '🦊 Devlog #00 · Meet Natu',
      'natu.header.subtitle':
        "The story behind the pixel-art fox accompanying NachoFari's projects — plus free official wallpapers and stickers.",
      'natu.zoomTitle': "Expand Natu's sprite",
      'natu.pose.bolita': 'Loaf',
      'natu.pose.cuadrupedo': '4-Legged',
      'natu.pose.sentado': 'Sitting',
      'natu.pose.saltando': 'Leaping',
      'natu.pose.cafe': 'Coffee',
      'natu.badgeLore': '🦊 Official Lore',
      'natu.badgeVersion': 'v1.0 · Pure Caffeine',
      'natu.whoTitle': 'Who is Natu?',
      'natu.whoTagline': 'A pixelated culpeo fox trapped between physics, code and LaTeX',
      'natu.loreP1Html':
        '<strong>Natu</strong> emerged by accident late one night at the terminal when a <strong>NaTex Studio</strong> build and a Python simulation collided on the exact same local port. Instead of throwing an error, out popped this pixelated orange fox inspired by the Chilean culpeo.',
      'natu.loreP2Html':
        'He lives between open-source repositories, dark-mode screens and cups of black coffee. His days alternate between his ground-state loaf (<code>|loaf⟩</code>), eyeing suspicious equations missing parentheses and reminding everyone that everything improves if you automate it.',
      'natu.quoteHint': '↻ Another quote',
      'natu.quoteTitle': "Click to switch Natu's quote",
      'natu.stat1Label': 'Species',
      'natu.stat1Val': 'Vulpes pixelata · Quantum Culpeo',
      'natu.stat2Label': 'Fuel',
      'natu.stat2ValHtml': 'Black coffee, <code>\\frac{}{}</code> and dark mode',
      'natu.stat3Label': 'Weakness',
      'natu.stat3ValHtml': 'Forgetting a <code>π</code> factor or a minus sign <code>(−)</code>',
      'natu.stat4Label': 'Superpower',
      'natu.stat4ValHtml': 'Approximating <code>sin(x) ≈ x</code> with pure faith',
      'natu.ctaWp': '🖼️ View Wallpapers (10)',
      'natu.ctaWa': '💬 WhatsApp Stickers (20)',
      'natu.ctaPrint': '🖨️ Print-Ready (18)',

      // Natu Downloads Header
      'natu.dl.tag': '📦 Take Natu with you',
      'natu.dl.title': "Natu's Official Downloads",
      'natu.dl.subtitle':
        'Pick a pack below and follow the step-by-step instructions to install it on your PC, phone, WhatsApp or take it to a print shop.',
      'natu.dl.filterAllHtml': '✨ View All <span class="dl-count-pill">48</span>',
      'natu.dl.filterWpHtml': '🖼️ PC &amp; Mobile Wallpapers <span class="dl-count-pill">10</span>',
      'natu.dl.filterWaHtml': '💬 WhatsApp Stickers <span class="dl-count-pill">20</span>',
      'natu.dl.filterPrintHtml': '🖨️ Print-Ready Stickers <span class="dl-count-pill">18</span>',

      // Natu Wallpapers
      'natu.wp.tag': '🖼️ Wallpapers',
      'natu.wp.title': 'Natu Wallpapers · PC (4K) & Mobile',
      'natu.wp.subtitle': 'Designed with clean negative space for desktop icons and your lockscreen clock.',
      'natu.wp.pcBadge': 'On PC (Windows / macOS)',
      'natu.wp.pcTitle': '1. Download & apply in 2 clicks',
      'natu.wp.pcDescHtml':
        'Click <strong>⬇ 4K PNG</strong> on your favorite. On Windows, <strong>right-click → "Set as desktop background"</strong>; on macOS drag it into <em>Settings → Wallpaper</em>.',
      'natu.wp.mobBadge': 'On Phone (Android / iPhone)',
      'natu.wp.mobTitle': '2. Apply on Lockscreen or Home',
      'natu.wp.mobDescHtml':
        'On your phone tap <strong>⬇ Mobile PNG</strong>, open it in Photos/Gallery and choose <strong>"Use as wallpaper"</strong> (#05 includes a scannable QR code for events).',
      'natu.wp.pcSubhead': '🖥️ Desktop PC · Ultra HD 4K',
      'natu.wp.mobSubhead': '📱 Mobile · OLED 20:9 Display',
      'natu.wp.viewBtn': 'View',
      'natu.wp.dlMobBtn': '⬇ Mobile PNG',

      // Natu WhatsApp
      'natu.wa.tag': '💬 Official Animated Pack',
      'natu.wa.title': '20 Animated Natu Stickers for WhatsApp',
      'natu.wa.subtitle': 'All animated pixel-art reactions of Natu ready for your chats.',
      'natu.wa.dlPack': '⬇ Download Pack (.wastickers)',
      'natu.wa.dlZip': '📦 20 GIFs (.zip)',
      'natu.wa.step1Badge': 'Step 1 · Android & iPhone',
      'natu.wa.step1Title': 'Install "Sticker Maker"',
      'natu.wa.step1DescHtml':
        'Get the free <strong>Sticker Maker</strong> app (by Viko &amp; Co) from Google Play or the App Store.',
      'natu.wa.step2Badge': 'Step 2 · All 20 in 1 tap',
      'natu.wa.step2TitleHtml': 'Open the <code>.wastickers</code> file',
      'natu.wa.step2DescHtml':
        'Tap the orange <strong>Download Pack (.wastickers)</strong> button, open it with <em>Sticker Maker</em> and tap <strong>"Add to WhatsApp"</strong>.',
      'natu.wa.step3Badge': 'Alternative · WhatsApp Web',
      'natu.wa.step3Title': 'Grab them individually on PC',
      'natu.wa.step3DescHtml':
        'Download any <code>.webp</code> with <code>⬇</code> or grab the <code>.zip</code> GIF pack and upload from <strong>+ → Create sticker</strong> in WhatsApp Web.',

      // Natu Print
      'natu.pr.tag': '🖨️ High Resolution · 300 DPI',
      'natu.pr.title': '18 Die-Cut Natu Stickers for Printing',
      'natu.pr.subtitle':
        'Includes Natu’s 4 chosen poses (Loaf #5, 4-Legged #3, Sitting #6, Leaping #9), coffee, code and scannable QRs.',
      'natu.pr.dlSheet': '⬇ 1m² Sheet PDF (100 pcs)',
      'natu.pr.dlLetter': '📄 2-Page US Letter PDF',
      'natu.pr.dlZip': '📦 18 PNGs (.zip)',
      'natu.pr.opt1Badge': 'Print Shop · PVC Vinyl',
      'natu.pr.opt1Title': '1 m² Plotter Sheet (100 stickers)',
      'natu.pr.opt1DescHtml':
        'Download the <strong>1m² Sheet PDF (100 pcs)</strong> and request <em>"kiss-cut adhesive vinyl"</em>. Everything sits on one sheet with no variety surcharge.',
      'natu.pr.opt2Badge': 'At Home · Sticker Paper',
      'natu.pr.opt2Title': 'US Letter Pages at 100%',
      'natu.pr.opt2DescHtml':
        'Download the <strong>2-Page US Letter PDF</strong>, print at actual size (<strong>100% no scaling</strong>) and cut along Natu’s white outline.',

      'natu.footerHtml': '<strong>Natu.exe</strong> · Official mascot of <strong>NachoFari</strong>',
    },
  };

  function detectInitialLang() {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = (params.get('lang') || '').toLowerCase();
      if (q === 'en' || q === 'es') return q;
      const saved = (localStorage.getItem(STORAGE_KEY) || '').toLowerCase();
      if (saved === 'en' || saved === 'es') return saved;
    } catch {
      // ignore storage errors
    }
    return 'es';
  }

  let currentLang = detectInitialLang();

  function t(key) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.es;
    return dict[key] ?? TRANSLATIONS.es[key] ?? key;
  }

  function applyDomTranslations() {
    document.documentElement.lang = currentLang;

    const isNatuPage = Boolean(document.getElementById('natuThumbs'));
    document.title = t(isNatuPage ? 'meta.natu.title' : 'meta.index.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t(isNatuPage ? 'meta.natu.desc' : 'meta.index.desc'));

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const val = t(el.dataset.i18n);
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const val = t(el.dataset.i18nHtml);
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const val = t(el.dataset.i18nTitle);
      if (val !== undefined) el.setAttribute('title', val);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const val = t(el.dataset.i18nAria);
      if (val !== undefined) el.setAttribute('aria-label', val);
    });

    document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
      btn.setAttribute('aria-label', t('nav.langAria'));
      btn.setAttribute('title', t('nav.langTitle'));
      btn.querySelectorAll('[data-lang-opt]').forEach((chip) => {
        chip.classList.toggle('is-active', chip.dataset.langOpt === currentLang);
      });
    });

    // Propaga idioma actual al link de Natu (útil incluso en vista file:// local)
    document.querySelectorAll('[data-natu-link]').forEach((link) => {
      link.href = currentLang === 'en' ? 'natu.html?lang=en' : 'natu.html';
    });
    document.querySelectorAll('[data-portfolio-link]').forEach((link) => {
      link.href = currentLang === 'en' ? 'index.html?lang=en' : 'index.html';
    });
  }

  function setLang(nextLang) {
    const normalized = nextLang === 'en' ? 'en' : 'es';
    currentLang = normalized;
    try {
      localStorage.setItem(STORAGE_KEY, normalized);
    } catch {
      // ignore storage errors
    }
    applyDomTranslations();
    listeners.forEach((cb) => {
      try {
        cb(normalized);
      } catch {
        // isolate subscriber errors
      }
    });
  }

  function toggleLang() {
    setLang(currentLang === 'es' ? 'en' : 'es');
  }

  function onChange(cb) {
    if (typeof cb === 'function') listeners.add(cb);
  }

  window.NachoI18n = {
    getLang: () => currentLang,
    setLang,
    toggleLang,
    onChange,
    t,
    applyDomTranslations,
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', toggleLang);
    });
    applyDomTranslations();
  });
})();
