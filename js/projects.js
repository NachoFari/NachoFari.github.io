/**
 * Catálogo de repositorios públicos de NachoFari (documentado desde sus READMEs)
 * + interacciones de galería, visor de capturas, lightbox y actualización en vivo vía GitHub API.
 */
(function () {
  const GITHUB_USER = 'NachoFari';
  const CONTACT_EMAIL = 'ifarias@usm.cl';

  const PUBLIC_PROJECTS = [
    {
      id: 'NaTex',
      name: 'NaTex Studio',
      emoji: '🦊',
      isStar: true,
      hasVisualMedia: true,
      hasPages: false,
      categories: ['all', 'visual', 'ai'],
      icon: 'assets/img/natex-logo.png',
      preview: 'assets/screenshots/natex-editor-fox.png',
      previewAlt: 'Captura de NaTex Studio en Tema Zorro Clásico',
      summary:
        'Herramienta de edición LaTeX pensada en la comodidad y la rapidez, sin instalaciones pesadas. Incluye vista previa en PDF, constructor visual de fórmulas, tablas rápidas, colaboración en vivo y asistente con IA.',
      tags: ['LaTeX Visual', 'Comodidad', 'Colaboración', 'Asistente IA'],
      repoUrl: 'https://github.com/NachoFari/NaTex',
      liveUrl: 'https://github.com/NachoFari/NaTex/releases/latest',
      liveLabel: 'Descargar v1.3.1',
      stars: 2,
    },
    {
      id: 'radar-icf',
      name: 'Radar ICF (Chile)',
      emoji: '📡',
      isStar: false,
      hasVisualMedia: true,
      hasPages: true,
      categories: ['all', 'visual', 'pages'],
      icon: 'assets/img/radar-icon.png',
      preview: 'assets/screenshots/radar-icf.png',
      previewAlt: 'Captura de la interfaz en vivo de Radar ICF (Chile)',
      summary:
        'Directorio interactivo con más de 105 oportunidades activas: prácticas industriales y profesionales, becas internacionales de investigación y beneficios universitarios para Ingeniería Física en Chile.',
      tags: ['HTML / CSS / JS', 'GitHub Pages', 'Ingeniería Física', 'UTFSM'],
      repoUrl: 'https://github.com/NachoFari/radar-icf',
      liveUrl: 'https://nachofari.github.io/radar-icf/',
      liveLabel: 'Abrir Sitio Web',
      stars: 0,
    },
    {
      id: 'LabVision',
      name: 'LabVision',
      emoji: '🧪',
      isStar: false,
      hasVisualMedia: true,
      hasPages: false,
      categories: ['all', 'visual', 'ai'],
      icon: 'assets/img/labvision-icon.png',
      preview: null,
      previewAlt: 'Ícono oficial de LabVision',
      summary:
        'Software de escritorio con visión artificial y OCR en tiempo real para digitalizar pantallas de equipos de laboratorio y registrar sus mediciones automáticamente en Excel y CSV.',
      tags: ['Visión Artificial', 'OCR en Vivo', 'Equipos de Lab', 'Excel / CSV'],
      repoUrl: 'https://github.com/NachoFari/LabVision',
      liveUrl: 'https://github.com/NachoFari/LabVision#readme',
      liveLabel: 'Ver Documentación',
      stars: 0,
    },
    {
      id: 'VirtualLab_N',
      name: 'VirtualLab_N',
      emoji: '🌌',
      isStar: false,
      hasVisualMedia: true,
      hasPages: true,
      categories: ['all', 'visual', 'pages'],
      icon: 'assets/img/virtuallab-icon.png',
      preview: null,
      previewAlt: 'Marcador fiducial WebAR de VirtualLab_N',
      summary:
        'Suite educativa abierta de laboratorios de física en Realidad Aumentada Web (WebAR sin instalación) y escritorio, con control maestro del docente en tiempo real, quizzes en vivo y exportación a Excel.',
      tags: ['WebAR', 'JavaScript', 'Física Educativa', 'GitHub Pages'],
      repoUrl: 'https://github.com/NachoFari/VirtualLab_N',
      liveUrl: 'https://nachofari.github.io/VirtualLab_N/',
      liveLabel: 'Abrir Portal WebAR',
      stars: 0,
    },
    {
      id: 'Poster-Saliency-IA',
      name: 'SaliencyVision IA',
      emoji: '👁️',
      isStar: false,
      hasVisualMedia: true,
      hasPages: false,
      categories: ['all', 'visual', 'ai'],
      icon: null,
      preview: 'assets/screenshots/saliency-ui.png',
      previewAlt: 'Interfaz de SaliencyVision IA con mapa de calor de atención visual',
      summary:
        'Herramienta 100% portable sin dependencias para predecir mapas de calor de atención visual, trayectorias sacádicas y diagnóstico cognitivo en pósters científicos.',
      tags: ['JavaScript', 'Canvas IA', 'Saliency Maps', '100% Portable'],
      repoUrl: 'https://github.com/NachoFari/Poster-Saliency-IA',
      liveUrl: 'https://github.com/NachoFari/Poster-Saliency-IA',
      liveLabel: 'Ver Repositorio',
      singleRepoButton: true,
      stars: 0,
    },
  ];

  const ACTIVITIES = [
    {
      title: 'Congreso Futuro en tu Comuna — “QuAntü: Computación cuántica desde Chile”',
      badge: 'Divulgación Científica',
      source: 'DGIIE · Universidad Técnica Federico Santa María',
      place: 'Liceo Eduardo de la Barra, Valparaíso',
      image: 'assets/activities/congreso-futuro-usm.jpg',
      imagePosition: 'center center',
      imageAlt: 'Participación en Congreso Futuro en tu Comuna junto al equipo de Computación Cuántica USM',
      summary:
        'Participación junto al Dr. Ariel Norambuena y estudiantes del Departamento de Física USM en la charla magistral “QuAntü: Computación cuántica desde Chile”, acercando los fundamentos de la mecánica cuántica y el control atómico a comunidades escolares en una jornada organizada por el Senado de la República y la Municipalidad de Valparaíso.',
      tags: ['Congreso Futuro', 'QuAntü', 'Divulgación', 'USM · Q|State⟩'],
      url: 'https://dgiie.usm.cl/noticias/usm-participa-en-congreso-futuro-en-tu-comuna-acercando-ciencia-y-tecnologia-al-sistema-escolar/',
      urlLabel: 'Leer Noticia Oficial USM',
    },
    {
      title: 'Puertas Abiertas — Departamento de Física USM',
      badge: 'Coordinación & Extensión',
      source: 'Departamento de Física · UTFSM',
      place: 'Campus San Joaquín, Santiago',
      image: 'assets/activities/puertas-abiertas-fisica-usm.jpg',
      imagePosition: 'center top',
      imageFit: 'contain',
      imageAlt: 'Ignacio Farías coordinando el Puertas Abiertas del Departamento de Física USM',
      summary:
        'Apoyo en la coordinación y difusión del Puertas Abiertas del Departamento de Física de la Universidad Técnica Federico Santa María, recibiendo a futuros estudiantes y mostrando el quehacer científico, laboratorios y experiencias prácticas de la carrera.',
      tags: ['Puertas Abiertas USM', 'Departamento de Física', 'Coordinación', 'Divulgación'],
      url: 'https://www.instagram.com/reel/Deh-X7Qx9YN/?exln=NnltNHYyZHEyb3ow',
      urlLabel: 'Ver Reel en Instagram',
    },
    {
      title: 'Intercambio Científico USM (Q|State⟩) × FCFM U. de Chile & MIRO',
      badge: 'Colaboración Académica',
      source: 'Q|State⟩ USM · FCFM UChile · Instituto Milenio MIRO',
      place: 'Santiago, Chile',
      image: 'assets/activities/encuentro-usm-uchile-miro.jpg',
      imagePosition: 'center center',
      imageAlt: 'Encuentro de colaboración científica entre grupos de la USM, FCFM Universidad de Chile y MIRO',
      summary:
        'Jornada de intercambio y visitas de laboratorio entre el grupo liderado por el Prof. Ariel Norambuena (USM San Joaquín) y el equipo de la Prof. Carla Hermann Avigliano (FCFM Universidad de Chile e Instituto Milenio de Investigación en Óptica MIRO), compartiendo proyectos y abriendo nuevas líneas de colaboración.',
      tags: ['Colaboración', 'Q|State⟩ USM', 'FCFM UChile', 'MIRO'],
      url: 'https://lnkd.in/p/ejdf2E5D',
      urlLabel: 'Ver Publicación en LinkedIn',
    },
    {
      title: '1ª Jornada de Investigación Estudiantil UC — Visión Computacional en Salmo salar',
      badge: 'Investigación Aplicada',
      source: 'USM × Pontificia Universidad Católica de Chile',
      place: 'Medicina Veterinaria UC',
      image: 'assets/activities/jornada-uc-salmo-salar.jpg',
      imagePosition: 'center center',
      imageFit: 'contain',
      imageBg: '#f8fafc',
      imageAlt: 'Presentación del modelo de comportamiento natatorio en smolts de Salmo salar con IA y visión computacional',
      summary:
        'Trabajo interdisciplinario junto a Osvaldo Greve (UC), Diego Yáñez y el Prof. Ariel Norambuena (USM), desarrollando redes neuronales y visión computacional (YOLO) para automatizar el monitoreo del comportamiento natatorio de smolts de Salmo salar.',
      tags: ['Computer Vision', 'YOLO', 'IA Aplicada', 'USM × UC'],
      url: 'https://lnkd.in/p/eH84TetD',
      urlLabel: 'Ver Publicación en LinkedIn',
    },
  ];

  // Agrega aquí más episodios o deja que GitHub Actions actualice data/podcast.json automáticamente
  let PODCAST_EPISODES = [
    {
      label: 'Ep. 01',
      windowTitle: 'Stemos Hablando · Ep. 01 (08:45)',
      badgePrimary: '🎙️ Próximamente Nuevos Episodios',
      badgeSecondary: 'Episodio 01 · Divulgación STEM',
      title: 'Conversando de Ciencia y Vida con David Zambrano',
      description:
        'En este episodio inaugural de Stemos Hablando conversamos con el Dr. David Zambrano, investigador y profesor del Departamento de Física de la UTFSM especializado en materia condensada, explorando su trayectoria académica, la investigación científica en Chile, anécdotas y hobbies.',
      tags: ['Podcast STEM', 'Divulgación Científica', 'UTFSM', '@stemos.hablando'],
      embedUrl: 'https://www.youtube-nocookie.com/embed/HGELD0yvy4c?start=525&rel=0',
      watchUrl: 'https://www.youtube.com/watch?v=HGELD0yvy4c&t=525s',
    },
  ];

  const projectsGrid = document.getElementById('projectsGrid');
  const activitiesGrid = document.getElementById('activitiesGrid');
  const activitiesPrevBtn = document.getElementById('activitiesPrevBtn');
  const activitiesNextBtn = document.getElementById('activitiesNextBtn');
  const activitiesCount = document.getElementById('activitiesCount');
  const podcastCard = document.getElementById('podcastCard');
  const podcastDots = document.getElementById('podcastDots');
  const podcastCounter = document.getElementById('podcastCounter');
  const podcastPrevBtn = document.getElementById('podcastPrevBtn');
  const podcastNextBtn = document.getElementById('podcastNextBtn');
  let activeEpisodeIdx = 0;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const toastEl = document.getElementById('toast');

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2600);
  }

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Vista previa';
    lightboxCaption.textContent = caption || 'Vista previa';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  function renderProjects(filterKey = 'all') {
    if (!projectsGrid) return;

    const list = PUBLIC_PROJECTS.filter((project) => {
      if (filterKey === 'all') return true;
      if (filterKey === 'visual') return project.hasVisualMedia;
      if (filterKey === 'pages') return project.hasPages;
      return project.categories.includes(filterKey);
    });

    projectsGrid.innerHTML = list
      .map((project) => {
        const mediaHtml = project.preview
          ? `
            <div class="project-media has-screenshot">
              <img src="${project.preview}" alt="${project.previewAlt}" class="project-cover" data-zoom-src="${project.preview}" data-zoom-caption="${project.name} — ${project.previewAlt}" loading="lazy" />
              ${project.icon ? `<img src="${project.icon}" alt="Ícono ${project.name}" class="media-floating-icon" />` : ''}
              ${project.isStar ? `<span class="media-badge-top media-badge-star">★ Proyecto Estrella</span>` : `<span class="media-badge-top">${project.emoji} Visual</span>`}
              ${project.hasPages ? `<span class="media-badge-live">● Live Page</span>` : ''}
            </div>
          `
          : project.icon
          ? `
            <div class="project-media">
              <div class="project-icon-stage">
                <img src="${project.icon}" alt="Ícono oficial de ${project.name}" class="project-icon-large" data-zoom-src="${project.icon}" data-zoom-caption="${project.name} — Ícono Oficial" />
              </div>
              <span class="media-badge-top">${project.emoji} Con Ícono</span>
              ${project.hasPages ? `<span class="media-badge-live">● Live Page</span>` : ''}
            </div>
          `
          : `
            <div class="project-media">
              <div class="project-svg-stage" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <span class="media-badge-top">${project.emoji} Web App</span>
              ${project.hasPages ? `<span class="media-badge-live">● Live Page</span>` : ''}
            </div>
          `;

        const tagsHtml = project.tags
          .map((tag) => `<span class="project-tag">${tag}</span>`)
          .join('');

        return `
          <article class="project-card ${project.isStar ? 'is-star' : ''}">
            ${mediaHtml}
            <div class="project-body">
              <div class="project-title-row">
                <h3 class="project-name">${project.emoji} ${project.name}</h3>
                <span class="project-stars" title="Estrellas en GitHub">★ ${project.stars}</span>
              </div>
              <p class="project-summary">${project.summary}</p>
              <div class="project-tags">${tagsHtml}</div>
              <div class="project-actions">
                ${
                  project.singleRepoButton
                    ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <span>Ver Repositorio</span>
                      </a>`
                    : `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <span>${project.liveLabel}</span>
                      </a>
                      <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-glass">
                        <span>Código</span>
                      </a>`
                }
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    // Vincular clic de zoom a imágenes de tarjetas
    projectsGrid.querySelectorAll('[data-zoom-src]').forEach((img) => {
      img.addEventListener('click', () => {
        openLightbox(img.dataset.zoomSrc, img.dataset.zoomCaption);
      });
    });
  }

  function renderActivityCard(act) {
    const tagsHtml = act.tags.map((t) => `<span class="project-tag">${t}</span>`).join('');
    return `
      <article class="activity-card">
        <div class="activity-media" style="${act.imageBg ? `background: ${act.imageBg};` : ''}${act.imageFit === 'contain' ? ' padding: 40px 10px 10px;' : ''}">
          <img src="${act.image}" alt="${act.imageAlt}" style="object-fit: ${act.imageFit || 'cover'}; object-position: ${act.imagePosition || 'center center'};${act.imageFit === 'contain' ? ' border-radius: 8px;' : ''}" data-zoom-src="${act.image}" data-zoom-caption="${act.title}" />
          <span class="activity-badge">${act.badge}</span>
        </div>
        <div class="activity-body">
          <div class="activity-meta">
            <span>📍 ${act.place}</span>
          </div>
          <h3 class="activity-title">${act.title}</h3>
          <p class="activity-desc" title="${act.summary}">${act.summary}</p>
          <div class="activity-tags">${tagsHtml}</div>
          <div class="activity-actions">
            <a href="${act.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>${act.urlLabel}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
            </a>
            <button type="button" class="btn btn-glass" data-zoom-src="${act.image}" data-zoom-caption="${act.title}">
              <span>Ver Foto</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  let activitiesAutoPaused = false;
  let activitiesPauseUntil = 0;
  let activitiesVirtualScroll = 0;
  let activitiesTickerStarted = false;

  function getActivityStep() {
    const card = activitiesGrid?.querySelector('.activity-card');
    if (!card) return 365;
    const style = window.getComputedStyle(activitiesGrid);
    const gap = parseFloat(style.columnGap || style.gap) || 18;
    return card.getBoundingClientRect().width + gap;
  }

  function startActivitiesAutoScroll() {
    if (activitiesTickerStarted || !activitiesGrid) return;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    activitiesTickerStarted = true;
    const SPEED_PX_PER_SEC = 28;
    let lastTime = performance.now();

    const step = (now) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;

      if (!activitiesAutoPaused && !document.hidden && now >= activitiesPauseUntil) {
        const cardStep = getActivityStep();
        const maxScroll = activitiesGrid.scrollWidth - activitiesGrid.clientWidth;

        if (maxScroll > 10 && activitiesGrid.children.length > 1) {
          if (Math.abs(activitiesVirtualScroll - activitiesGrid.scrollLeft) > 3) {
            activitiesVirtualScroll = activitiesGrid.scrollLeft;
          }
          activitiesVirtualScroll += SPEED_PX_PER_SEC * dt;

          // Bucle infinito sin tarjetas repetidas: cuando la primera tarjeta salió por completo a la izquierda,
          // pasa al final de la fila restando su ancho exacto para mantener continuidad visual de 0px de salto.
          if (activitiesVirtualScroll >= cardStep) {
            const firstCard = activitiesGrid.firstElementChild;
            if (firstCard) {
              activitiesGrid.appendChild(firstCard);
              activitiesVirtualScroll -= cardStep;
            }
          }

          activitiesGrid.scrollLeft = activitiesVirtualScroll;
        }
      } else {
        activitiesVirtualScroll = activitiesGrid.scrollLeft;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  function renderActivities() {
    if (!activitiesGrid) return;
    if (activitiesCount) {
      activitiesCount.textContent = `${ACTIVITIES.length} eventos`;
    }
    activitiesGrid.innerHTML = ACTIVITIES.map((act) => renderActivityCard(act)).join('');

    activitiesGrid.querySelectorAll('[data-zoom-src]').forEach((el) => {
      el.addEventListener('click', () => {
        openLightbox(el.dataset.zoomSrc, el.dataset.zoomCaption);
      });
    });

    startActivitiesAutoScroll();
  }

  if (activitiesGrid) {
    activitiesGrid.addEventListener('mouseenter', () => { activitiesAutoPaused = true; });
    activitiesGrid.addEventListener('mouseleave', () => { activitiesAutoPaused = false; });
    activitiesGrid.addEventListener('focusin', () => { activitiesAutoPaused = true; });
    activitiesGrid.addEventListener('focusout', () => { activitiesAutoPaused = false; });
    activitiesGrid.addEventListener('pointerdown', () => { activitiesAutoPaused = true; });
    window.addEventListener('pointerup', () => {
      if (activitiesAutoPaused) {
        activitiesAutoPaused = false;
        activitiesPauseUntil = performance.now() + 900;
      }
    });
  }

  if (activitiesPrevBtn && activitiesGrid) {
    activitiesPrevBtn.addEventListener('click', () => {
      const cardStep = getActivityStep();
      if (activitiesGrid.scrollLeft <= cardStep * 0.6 && activitiesGrid.lastElementChild) {
        activitiesGrid.prepend(activitiesGrid.lastElementChild);
        activitiesGrid.scrollLeft += cardStep;
      }
      activitiesPauseUntil = performance.now() + 1200;
      activitiesGrid.scrollBy({ left: -Math.round(cardStep), behavior: 'smooth' });
    });
  }
  if (activitiesNextBtn && activitiesGrid) {
    activitiesNextBtn.addEventListener('click', () => {
      const cardStep = getActivityStep();
      const maxScroll = activitiesGrid.scrollWidth - activitiesGrid.clientWidth;
      if (activitiesGrid.scrollLeft >= maxScroll - cardStep * 0.6 && activitiesGrid.firstElementChild) {
        activitiesGrid.appendChild(activitiesGrid.firstElementChild);
        activitiesGrid.scrollLeft = Math.max(0, activitiesGrid.scrollLeft - cardStep);
      }
      activitiesPauseUntil = performance.now() + 1200;
      activitiesGrid.scrollBy({ left: Math.round(cardStep), behavior: 'smooth' });
    });
  }

  function renderPodcastCarousel(index = 0) {
    if (!podcastCard || PODCAST_EPISODES.length === 0) return;

    const total = PODCAST_EPISODES.length;
    activeEpisodeIdx = ((index % total) + total) % total;
    const ep = PODCAST_EPISODES[activeEpisodeIdx];

    const tagsHtml = ep.tags.map((t) => `<span class="tech-pill">${t}</span>`).join('');

    podcastCard.innerHTML = `
      <div class="podcast-video-wrap">
        <div class="preview-window">
          <div class="preview-topbar">
            <div class="preview-dots"><span></span><span></span><span></span></div>
            <span class="preview-filename">${ep.windowTitle}</span>
            <span class="podcast-live-tag">▶ YouTube</span>
          </div>
          <div class="podcast-frame">
            <iframe
              src="${ep.embedUrl}"
              title="Stemos Hablando — ${ep.title}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>

      <div class="podcast-info">
        <div class="podcast-badges">
          <span class="badge-star">${ep.badgePrimary}</span>
          <span class="badge-version">${ep.badgeSecondary}</span>
        </div>

        <h3 class="podcast-title">${ep.title}</h3>
        <p class="podcast-desc">${ep.description}</p>
        <div class="podcast-tags">${tagsHtml}</div>

        <div class="podcast-actions">
          <a href="${ep.watchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <span>Ver Episodio en YouTube</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
          </a>
          <a href="https://www.youtube.com/@Stemos.Hablando" target="_blank" rel="noopener noreferrer" class="btn btn-glass">
            <span>Canal @Stemos.Hablando</span>
          </a>
          <a href="https://www.instagram.com/stemos.hablando/" target="_blank" rel="noopener noreferrer" class="btn btn-subtle">
            <span>Instagram</span>
          </a>
        </div>
      </div>
    `;

    if (podcastCounter) {
      const curStr = String(activeEpisodeIdx + 1).padStart(2, '0');
      const totStr = String(total).padStart(2, '0');
      podcastCounter.textContent = `${curStr} / ${totStr}`;
    }

    if (podcastPrevBtn) podcastPrevBtn.disabled = total <= 1;
    if (podcastNextBtn) podcastNextBtn.disabled = total <= 1;

    if (podcastDots) {
      podcastDots.innerHTML = PODCAST_EPISODES.map(
        (item, idx) => `
          <button type="button" class="podcast-dot-btn ${idx === activeEpisodeIdx ? 'active' : ''}" data-ep-idx="${idx}" role="tab" aria-selected="${idx === activeEpisodeIdx}">
            <span>${item.label}</span>
          </button>
        `
      ).join('');

      podcastDots.querySelectorAll('[data-ep-idx]').forEach((btn) => {
        btn.addEventListener('click', () => {
          renderPodcastCarousel(Number(btn.dataset.epIdx));
        });
      });
    }
  }

  if (podcastPrevBtn) {
    podcastPrevBtn.addEventListener('click', () => renderPodcastCarousel(activeEpisodeIdx - 1));
  }
  if (podcastNextBtn) {
    podcastNextBtn.addEventListener('click', () => renderPodcastCarousel(activeEpisodeIdx + 1));
  }

  // Switcher de capturas de NaTex (Proyecto Estrella)
  const natexActiveImg = document.getElementById('natexActiveImg');
  const natexPreviewLabel = document.getElementById('natexPreviewLabel');
  const natexZoomBtn = document.getElementById('natexZoomBtn');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (natexActiveImg) {
        natexActiveImg.src = btn.dataset.src;
        natexActiveImg.alt = btn.dataset.label || 'NaTex';
      }
      if (natexPreviewLabel) {
        natexPreviewLabel.textContent = 'NaTex';
      }
    });
  });

  if (natexActiveImg) {
    natexActiveImg.addEventListener('click', () => {
      openLightbox(natexActiveImg.src, natexActiveImg.alt || 'NaTex');
    });
  }
  if (natexZoomBtn && natexActiveImg) {
    natexZoomBtn.addEventListener('click', () => {
      openLightbox(natexActiveImg.src, natexActiveImg.alt || 'NaTex');
    });
  }

  // Cerrar lightbox
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  // Copiar correo al portapapeles
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        showToast(`Correo copiado: ${CONTACT_EMAIL}`);
      } catch {
        showToast(`Contacto: ${CONTACT_EMAIL}`);
      }
    });
  }

  // Menú móvil
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Resaltado activo de navegación al hacer scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach((sec) => observer.observe(sec));

  // Hidratación opcional en vivo de estrellas públicas desde GitHub API (con fallback local)
  async function refreshGitHubStars() {
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?type=public&per_page=100`);
      if (!res.ok) return;
      const repos = await res.json();
      if (!Array.isArray(repos)) return;

      const publicOnly = repos.filter((r) => !r.private);
      const countEl = document.getElementById('publicRepoCount');
      if (countEl && publicOnly.length > 0) {
        countEl.textContent = String(publicOnly.length);
      }

      let updated = false;
      PUBLIC_PROJECTS.forEach((proj) => {
        const match = publicOnly.find((r) => r.name.toLowerCase() === proj.id.toLowerCase());
        if (match && typeof match.stargazers_count === 'number' && match.stargazers_count !== proj.stars) {
          proj.stars = match.stargazers_count;
          updated = true;
        }
      });
      if (updated) {
        renderProjects('all');
      }
    } catch {
      // Mantiene los datos estáticos verificados si no hay red o hay rate-limit
    }
  }

  async function loadSyncedPodcast() {
    try {
      const res = await fetch('data/podcast.json', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.episodes) && data.episodes.length > 0) {
        PODCAST_EPISODES = data.episodes;
        renderPodcastCarousel(0);
      }
    } catch {
      // Usa los episodios locales integrados si falla el JSON
    }
  }

  const FOX_QUOTES = [
    'Si se puede automatizar, mejor.',
    'Vibe codeando',
    '¡Hey! Qué bueno verte por acá.',
    'Guarda la página, siempre aparece algo nuevo.',
    'Asumiendo una vaca esférica y sin roce...',
    'Probabilidad de encontrar errores: baja, pero nunca nula.',
    'Si algo no cuadra, faltó multiplicar por π o por un signo menos.',
    'El orden de magnitud está bueno… el resto es detalle.',
    'sin(x) ≈ x y con fe.',
    'En condiciones ideales, esto compila a la primera.',
    'Automatizar 5 minutos una tarea de 2: valió cada segundo.',
    'Si funciona en local, ya es física experimental.',
    'Abriendo una nueva pestaña… otra vez.',
    'Nivel de entropía actual: estable (por ahora).'
  ];

  const foxSpeechBubble = document.getElementById('foxSpeechBubble');
  const foxSpeechText = document.getElementById('foxSpeechText');
  const foxFrameTrigger = document.getElementById('foxFrameTrigger');
  const foxOrbCard = document.querySelector('.fox-orb-card');
  const gravityResetBar = document.getElementById('gravityResetBar');
  const gravityResetBtn = document.getElementById('gravityResetBtn');
  let activeFoxQuote = '';
  let foxClickStreak = 0;
  let lastFoxClickAt = 0;
  let gravityActive = false;
  let gravityRafId = 0;
  let gravityBodies = [];
  let draggedBody = null;
  let dragLastX = 0;
  let dragLastY = 0;
  let dragMoved = false;

  const FOX_CHARGE_HINTS = {
    11: '¿Mmm? ¿Sentiste esa vibración...?',
    12: 'Oye, estás alterando la constante gravitacional...',
    13: '¡Cuidado! El sistema está perdiendo equilibrio...',
    14: '¡Última advertencia antes de romper g!'
  };

  function spawnShockwave(x, y) {
    const wave1 = document.createElement('div');
    wave1.className = 'gravity-shockwave';
    wave1.style.left = `${x}px`;
    wave1.style.top = `${y}px`;
    document.body.appendChild(wave1);

    const wave2 = document.createElement('div');
    wave2.className = 'gravity-shockwave is-secondary';
    wave2.style.left = `${x}px`;
    wave2.style.top = `${y}px`;
    document.body.appendChild(wave2);

    setTimeout(() => {
      wave1.remove();
      wave2.remove();
    }, 1150);
  }

  function restoreGravityWorld() {
    if (!gravityActive) return;
    gravityActive = false;
    cancelAnimationFrame(gravityRafId);
    draggedBody = null;

    if (gravityResetBar) gravityResetBar.hidden = true;
    document.body.classList.remove('gravity-active', 'gravity-rumble');

    gravityBodies.forEach((b) => {
      b.el.classList.remove('gravity-falling');
      b.el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      b.el.style.transform = '';
      b.el.style.zIndex = '';
      setTimeout(() => {
        if (!gravityActive) b.el.style.transition = '';
      }, 650);
    });
    gravityBodies = [];
    activitiesAutoPaused = false;
    foxClickStreak = 0;
    updateFoxQuote(true);
  }

  function triggerGravityCollapse() {
    if (gravityActive) return;
    gravityActive = true;
    activitiesAutoPaused = true;

    const triggerRect = (foxFrameTrigger || foxOrbCard || document.body).getBoundingClientRect();
    const ox = triggerRect.left + triggerRect.width / 2;
    const oy = triggerRect.top + triggerRect.height / 2;

    if (foxSpeechText) {
      foxSpeechText.textContent = '¡Colapso gravitacional! Alguien encendió g = 9.8 m/s² 💥';
    }

    spawnShockwave(ox, oy);
    document.body.classList.add('gravity-active', 'gravity-rumble');
    setTimeout(() => document.body.classList.remove('gravity-rumble'), 380);
    if (gravityResetBar) gravityResetBar.hidden = false;

    const selector = [
      '.navbar .brand',
      '.navbar .nav-link',
      '.navbar .nav-actions > *',
      '.hero-kicker',
      '.hero-title',
      '.hero-handle',
      '.hero-bio',
      '.hero-pill',
      '.hero-links .btn',
      '.metric-card',
      '.fox-speech-bubble',
      '.fox-orb-card',
      '#estrella .section-header',
      '#estrella .flagship-card',
      '#proyectos .section-header',
      '.project-card',
      '#qstate .qstate-card',
      '#actividades .section-header-row',
      '.activity-card',
      '#podcast .section-header-row',
      '.podcast-card',
      '#contacto .contact-card',
      'footer'
    ].join(', ');

    const candidates = Array.from(document.querySelectorAll(selector));
    const rects = candidates.map((el) => el.getBoundingClientRect());
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    gravityBodies = [];
    candidates.forEach((el, idx) => {
      const rect = rects[idx];
      if (rect.width <= 0 || rect.height <= 0) return;
      if (rect.bottom < -40 || rect.top > vh + 180) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = cx - ox;
      const ry = cy - oy;
      const dist = Math.hypot(rx, ry) || 1;
      const force = Math.max(180, 950 - dist * 0.65);

      const elWidthFactor = rect.width > 420 ? 0.65 : 1;
      const vx = (rx / dist) * force * 0.72 * elWidthFactor + (Math.random() - 0.5) * 90;
      const vy = (ry / dist) * force * 0.55 - 240 - Math.random() * 140;
      const va = (vx >= 0 ? 1 : -1) * (20 + Math.random() * 55) * elWidthFactor;

      el.style.transition = 'none';
      el.classList.add('gravity-falling');

      gravityBodies.push({
        el,
        rect,
        dx: 0,
        dy: 0,
        vx,
        vy,
        angle: 0,
        va,
        restitution: 0.42 + Math.random() * 0.14,
        minDx: -rect.left + 6,
        maxDx: vw - rect.right - 6,
        minDy: -rect.top + 6,
        maxDy: Math.max(20, vh - rect.bottom - 8)
      });
    });

    const GRAVITY = 2100;
    let lastTs = performance.now();

    const stepPhysics = (now) => {
      if (!gravityActive) return;
      const dt = Math.min(0.04, Math.max(0.001, (now - lastTs) / 1000));
      lastTs = now;

      for (const b of gravityBodies) {
        if (b === draggedBody) continue;

        b.vy += GRAVITY * dt;
        b.dx += b.vx * dt;
        b.dy += b.vy * dt;
        b.angle += b.va * dt;

        if (b.dx < b.minDx) {
          b.dx = b.minDx;
          b.vx = Math.abs(b.vx) * 0.55;
        } else if (b.dx > b.maxDx) {
          b.dx = b.maxDx;
          b.vx = -Math.abs(b.vx) * 0.55;
        }

        if (b.dy < b.minDy) {
          b.dy = b.minDy;
          b.vy = Math.abs(b.vy) * 0.45;
        } else if (b.dy >= b.maxDy) {
          b.dy = b.maxDy;
          if (Math.abs(b.vy) > 90) {
            b.vy = -b.vy * b.restitution;
          } else {
            b.vy = 0;
          }
          b.vx *= 0.84;
          b.va *= 0.78;
          if (Math.abs(b.vx) < 4) b.vx = 0;
          if (Math.abs(b.va) < 2) b.va = 0;
        }

        b.el.style.transform = `translate3d(${b.dx.toFixed(1)}px, ${b.dy.toFixed(1)}px, 0) rotate(${b.angle.toFixed(1)}deg)`;
      }

      gravityRafId = requestAnimationFrame(stepPhysics);
    };

    gravityRafId = requestAnimationFrame(stepPhysics);
  }

  document.addEventListener('pointerdown', (e) => {
    if (!gravityActive) return;
    if (e.target.closest('#gravityResetBar')) return;
    const targetEl = e.target.closest('.gravity-falling');
    if (!targetEl) return;
    const body = gravityBodies.find((b) => b.el === targetEl);
    if (!body) return;

    draggedBody = body;
    dragLastX = e.clientX;
    dragLastY = e.clientY;
    dragMoved = false;
    body.vx = 0;
    body.vy = 0;
    body.va = 0;
    e.preventDefault();
  });

  window.addEventListener('pointermove', (e) => {
    if (!gravityActive || !draggedBody) return;
    const mx = e.clientX - dragLastX;
    const my = e.clientY - dragLastY;
    if (Math.abs(mx) > 2 || Math.abs(my) > 2) dragMoved = true;
    draggedBody.dx = Math.max(draggedBody.minDx, Math.min(draggedBody.maxDx, draggedBody.dx + mx));
    draggedBody.dy = Math.max(draggedBody.minDy, Math.min(draggedBody.maxDy, draggedBody.dy + my));
    draggedBody.vx = mx * 28;
    draggedBody.vy = my * 28;
    draggedBody.el.style.transform = `translate3d(${draggedBody.dx.toFixed(1)}px, ${draggedBody.dy.toFixed(1)}px, 0) rotate(${draggedBody.angle.toFixed(1)}deg)`;
    dragLastX = e.clientX;
    dragLastY = e.clientY;
  });

  window.addEventListener('pointerup', () => {
    if (draggedBody) {
      draggedBody = null;
    }
  });

  document.addEventListener('click', (e) => {
    if (!gravityActive) return;
    if (e.target.closest('#gravityResetBar')) return;
    if (e.target.closest('.gravity-falling')) {
      e.preventDefault();
      if (dragMoved) e.stopPropagation();
    }
  }, true);

  if (gravityResetBtn) {
    gravityResetBtn.addEventListener('click', restoreGravityWorld);
  }

  function shuffleArray(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickNextFoxQuote() {
    if (FOX_QUOTES.length === 0) return '';
    const BAG_KEY = 'nachofari_fox_quote_bag';
    const LAST_KEY = 'nachofari_last_fox_quote';
    let lastQuote = activeFoxQuote;
    let bag = [];

    try {
      lastQuote = lastQuote || localStorage.getItem(LAST_KEY) || '';
      const raw = localStorage.getItem(BAG_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          bag = parsed.filter((q) => FOX_QUOTES.includes(q));
        }
      }
    } catch {
      bag = [];
    }

    if (bag.length === 0) {
      bag = shuffleArray(FOX_QUOTES);
      // Evita repetir la última frase inmediatamente al reiniciar el ciclo
      if (bag.length > 1 && bag[0] === lastQuote) {
        bag.push(bag.shift());
      }
    }

    let chosen = bag.shift();
    if (chosen === lastQuote && bag.length > 0) {
      const alt = bag.shift();
      bag.push(chosen);
      chosen = alt;
    }

    activeFoxQuote = chosen;
    try {
      localStorage.setItem(BAG_KEY, JSON.stringify(bag));
      localStorage.setItem(LAST_KEY, chosen);
    } catch {
      // Ignora si el navegador bloquea localStorage
    }
    return chosen;
  }

  function updateFoxQuote(animate = false) {
    if (!foxSpeechText) return;
    foxSpeechText.textContent = pickNextFoxQuote();
    if (animate && foxSpeechBubble) {
      foxSpeechBubble.classList.remove('is-popping');
      void foxSpeechBubble.offsetWidth;
      foxSpeechBubble.classList.add('is-popping');
    }
  }

  function handleFoxInteraction() {
    if (gravityActive) return;
    const now = performance.now();
    if (now - lastFoxClickAt > 4500) {
      foxClickStreak = 0;
    }
    lastFoxClickAt = now;
    foxClickStreak += 1;

    if (foxClickStreak >= 15) {
      triggerGravityCollapse();
      return;
    }

    if (FOX_CHARGE_HINTS[foxClickStreak] && foxSpeechText) {
      foxSpeechText.textContent = FOX_CHARGE_HINTS[foxClickStreak];
      if (foxSpeechBubble) {
        foxSpeechBubble.classList.remove('is-popping');
        void foxSpeechBubble.offsetWidth;
        foxSpeechBubble.classList.add('is-popping');
      }
    } else {
      updateFoxQuote(true);
    }

    if (foxClickStreak >= 10 && foxOrbCard) {
      foxOrbCard.classList.remove('is-charging');
      void foxOrbCard.offsetWidth;
      foxOrbCard.classList.add('is-charging');
    }
  }

  if (foxSpeechText) {
    updateFoxQuote(false);
  }
  if (foxSpeechBubble) {
    foxSpeechBubble.addEventListener('click', () => updateFoxQuote(true));
  }
  if (foxFrameTrigger) {
    foxFrameTrigger.addEventListener('click', handleFoxInteraction);
    foxFrameTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFoxInteraction();
      }
    });
  }

  renderProjects('all');
  renderActivities();
  renderPodcastCarousel(0);
  loadSyncedPodcast();
  refreshGitHubStars();
})();
