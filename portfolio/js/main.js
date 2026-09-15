/* ==========================================================================
   PORTFOLIO SCRIPTS - MAIN.JS
   Interatividade, Background Animado, Filtros, Modal e Toasts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavbar();
  initProjectsFilter();
  initProjectModals();
  initClipboard();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. BACKGROUND CANVAS INTERATIVO (Partículas / Constelações)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 70;
  const maxDistance = 140;

  let mouse = {
    x: null,
    y: null,
    radius: 150
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(99, 102, 241,' : 'rgba(6, 182, 212,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Interação com o mouse
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.6)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Conectar nós próximos com linhas translúcidas
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVBAR, SCROLLSPY & MENU MOBILE
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect na navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fechar ao clicar em link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   3. FILTRAGEM DINÂMICA DE PROJETOS
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Inserir animação de fadeIn nos cards
const styleElem = document.createElement('style');
styleElem.innerHTML = `
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleElem);

/* ==========================================================================
   4. MODAL DE DETALHES DOS PROJETOS
   ========================================================================== */
const projectsData = {
  finapp: {
    title: "FinApp Mobile - Gestão Financeira",
    category: "Mobile (Flutter / Android Studio)",
    image: "assets/images/finapp.jpg",
    description: "Aplicativo mobile desenvolvido em Flutter com foco em controle financeiro pessoal, categorização inteligente de despesas e geração de relatórios visuais dinâmicos.",
    details: [
      "Desenvolvido no Android Studio utilizando Flutter e Dart com arquitetura limpa (Clean Architecture).",
      "Gerenciamento de estado otimizado com Provider/ChangeNotifier para resposta instantânea da interface.",
      "Componentização modular de gráficos com CustomPainter e biblioteca FL Chart.",
      "Persistência local de dados com SQLite (sqflite) e suporte a modo offline integral.",
      "Interface baseada em Material You com modo escuro nativo e animações fluidas."
    ],
    techs: ["Flutter", "Dart", "Android Studio", "SQLite", "Clean Architecture", "FL Chart"],
    repoLink: "https://github.com/",
    demoLink: "#"
  },
  taskflow: {
    title: "TaskFlow Pro - Kanban de Produtividade",
    category: "Web (HTML5, CSS3, JavaScript ES6+)",
    image: "assets/images/taskflow.jpg",
    description: "Aplicação web no padrão Kanban com suporte a criação, movimentação com arrastar e soltar (Drag & Drop), priorização e persistência de tarefas sem bibliotecas externas pesadas.",
    details: [
      "Construído 100% com JavaScript Vanilla moderno, aplicando conceitos sólidos de manipulação de DOM.",
      "Implementação nativa da HTML5 Drag and Drop API para experiência ágil.",
      "Armazenamento e sincronização com LocalStorage para retenção de dados entre sessões.",
      "Design responsivo feito com CSS Grid e Flexbox, adaptável a monitores e dispositivos móveis.",
      "Filtros rápidos por tags, níveis de urgência e busca dinâmica de cartões."
    ],
    techs: ["JavaScript ES6+", "HTML5 Semântico", "CSS3 Moderno", "LocalStorage API", "Drag & Drop"],
    repoLink: "https://github.com/",
    demoLink: "#"
  },
  senai_hub: {
    title: "SENAI Academic Hub - Portal do Aluno",
    category: "Web & Lógica (Sistema de Gestão)",
    image: "assets/images/senai_hub.jpg",
    description: "Plataforma acadêmica inspirada nas rotinas do curso Técnico em Desenvolvimento de Sistemas do SENAI para acompanhamento de horários de aula, entregas de código e notas.",
    details: [
      "Simulação completa de rotas e consumo de API REST para carregamento dinâmico de cronograma.",
      "Validação robusta de formulários de entrega de atividades com regex e tratamento de erros amigável.",
      "Cálculo automático de médias e status de aprovação de acordo com as regras do curso.",
      "Design System consistente com tema escuro elegante, cards de alto contraste e glassmorphism."
    ],
    techs: ["JavaScript", "APIs REST", "HTML5", "CSS3", "Lógica de Programação", "Git"],
    repoLink: "https://github.com/",
    demoLink: "#"
  },
  devradar: {
    title: "DevRadar - Clima & Geolocalização",
    category: "Web (Consumo de APIs REST)",
    image: "assets/images/devradar.jpg",
    description: "Dashboard meteorológico interativo que consome dados em tempo real da OpenWeather API e Geolocation API, exibindo previsões detalhadas, radares e alertas.",
    details: [
      "Consumo de dados assíncronos utilizando Fetch API e async/await com tratamento rigoroso de exceções.",
      "Geolocalização via navegador com fallback para busca de qualquer cidade global.",
      "Formatação inteligente de datas, temperaturas e fusos horários.",
      "Interface rica em micro-interações visuais que reagem ao clima atual (chuva, ensolarado, tempestade)."
    ],
    techs: ["JavaScript Assíncrono", "REST API", "OpenWeather", "Fetch API", "CSS Animations"],
    repoLink: "https://github.com/",
    demoLink: "#"
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const detailBtns = document.querySelectorAll('.btn-project-details');

  if (!modalBackdrop) return;

  const modalImg = modalBackdrop.querySelector('.modal-img');
  const modalTitle = modalBackdrop.querySelector('.modal-title');
  const modalCategory = modalBackdrop.querySelector('.modal-category');
  const modalDesc = modalBackdrop.querySelector('.modal-desc');
  const modalFeatures = modalBackdrop.querySelector('.modal-features-list');
  const modalTechs = modalBackdrop.querySelector('.modal-tech-tags');
  const modalRepo = modalBackdrop.querySelector('.modal-repo-link');
  const modalDemo = modalBackdrop.querySelector('.modal-demo-link');

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectsData[projectId];

      if (data) {
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDesc.textContent = data.description;

        modalFeatures.innerHTML = data.details.map(item => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${item}</span>
          </li>
        `).join('');

        modalTechs.innerHTML = data.techs.map(tech => `
          <span class="tech-tag">${tech}</span>
        `).join('');

        modalRepo.href = data.repoLink;
        modalDemo.href = data.demoLink;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. CÓPIA RÁPIDA DE E-MAIL E TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function initClipboard() {
  const copyBtns = document.querySelectorAll('.btn-copy-email');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'viniciusborges.dev@gmail.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('E-mail copiado para a área de transferência!');
        }).catch(() => {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });
  });

  function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('E-mail copiado com sucesso!');
  }
}

/* ==========================================================================
   6. FORMULÁRIO DE CONTATO FUNCIONAL (SIMULAÇÃO PROFISSIONAL)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('Por favor, preencha todos os campos.');
      return;
    }

    // Feedback no botão
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
      </svg>
      Enviando...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('Mensagem enviada com sucesso! Responderei em breve.');
    }, 1200);
  });
}

/* ==========================================================================
   7. BOTÃO VOLTAR AO TOPO
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
