(function () {
  "use strict";

  const root = document.documentElement;

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  /* ---------- i18n ----------
   * English lives in the HTML. On load we snapshot it, so only Portuguese
   * needs to be kept here. Keys match the data-i18n attributes.
   */
  const PT = {
    skip: "Pular para o conteúdo",
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.work": "Projetos",
    "nav.stack": "Stack",
    "nav.contact": "Contato",

    "hero.status": "Aberto a vagas de Sr QA / SDET · Remoto · Curitiba, BR (UTC−3)",
    "hero.role": "Sr. QA Engineer / Software Engineer in Test",
    "hero.lede": "Construo automação de testes em que o time pode confiar, em web, iOS e Android, para produtos de fintech e iGaming.",
    "hero.interestLabel": "interesses:",
    "hero.interest": "testes de IA · engenharia de IA",
    "cta.contact": "Entre em contato",
    "cta.resume": "Baixar currículo",

    "run.header": "Executando 5 testes com 1 worker",
    "run.t1": "4+ anos · fintech &amp; iGaming",
    "run.t3": "tempo de regressão reduzido em 80%+",
    "run.t4": "planejamento de testes: 3–4 dias → ~2 horas",
    "run.t5": "migração de site com 500+ páginas validada",
    "run.summary": "5 passaram",

    "about.title": "Qualidade que vai junto com o código.",
    "about.p1": "Sou Sr. QA Engineer e Software Engineer in Test com <strong>4+ anos</strong> construindo e mantendo automação de testes para plataformas de fintech e iGaming. Escrevo testes em <strong>Playwright (C#/.NET e TypeScript)</strong> e <strong>Cypress</strong>, testo e simulo APIs com Postman, Charles Proxy e Mockoon, e automatizo apps mobile nativos com <strong>XCUITest</strong> e <strong>Espresso</strong>.",
    "about.p2": "Gosto de ser responsável pela qualidade de ponta a ponta em times remotos: estratégia de testes, regressão multiplataforma e migração de frameworks. Cada vez mais meu trabalho envolve <strong>QA assistido por IA</strong>, como gerar suítes de teste com servidores MCP, transformar requisitos em planos de teste e usar IA para revisar código. É nessa área que quero crescer: <strong>testar produtos com IA e construir ferramentas de IA</strong> para times de engenharia.",
    "about.c1.t": "Automação web",
    "about.c1.d": "Playwright (C# e TypeScript, POM), testes E2E e de componentes com Cypress, verificações de acessibilidade com cypress-axe.",
    "about.c2.t": "Mobile nativo",
    "about.c2.d": "XCUITest e Espresso, BrowserStack e Sauce Labs, regressão multiplataforma em iOS, Android e web.",
    "about.c3.t": "APIs &amp; mocks",
    "about.c3.d": "Validação REST e testes de integração de backend, inspeção de tráfego com Charles Proxy, mocks de API com Mockoon.",
    "about.c4.t": "QA com IA",
    "about.c4.d": "Geração de testes via MCP, automação de requisitos para planos de teste e revisão de código assistida por IA.",

    "exp.title": "Experiência",
    "exp.head": "HEAD → atual",
    "exp.k.role": "Software Engineer in Test",
    "exp.k.date": "Jan 2025 – Atual",
    "exp.k.loc": "Atenas, Grécia (Remoto)",
    "exp.k.b1": "Iniciei um projeto de <strong>QA Revamp</strong> para refatorar e limpar a suíte de testes automatizados e acompanhar seus resultados, para que o time possa confiar no que os testes reportam.",
    "exp.k.b2": "Criei suítes de automação web do zero e desenhei <strong>estratégias de mock para interfaces com dados ao vivo</strong> (estatísticas de jogadores, gráficos ao vivo), resolvendo falhas recorrentes de mock no Playwright. Ampliei a cobertura da integração de backend até Web, Android e iOS.",
    "exp.k.b3": "Substituí verificações manuais de tradução por uma <strong>suíte automatizada de regressão de localização</strong>.",
    "exp.k.b4": "Responsável pela regressão completa semanal em <strong>iOS, Android e Web</strong> do produto de streaming ao vivo do sportsbook por <strong>12+ meses</strong>, e conduzi spikes técnicos que embasaram decisões de arquitetura.",
    "exp.q.role": "Sr. QA Engineer",
    "exp.q.date": "Mar 2023 – Set 2026",
    "exp.q.loc": "Toronto, Canadá (Remoto)",
    "exp.q.b1": "Liderei o QA da <strong>migração completa de um site com 500+ páginas</strong>, cobrindo funcionalidade, acessibilidade, SEO, paridade inglês/francês e conformidade de consentimento. Encontrei <strong>10+ defeitos de produção</strong>, incluindo uma falha crítica de privacidade, e fui responsável pela decisão de go/no-go do lançamento.",
    "exp.q.b2": "Liderei duas migrações de framework de testes (Robot Framework → Playwright → Cypress) e migrei o CI para o Cypress Cloud, reduzindo o tempo de regressão em <strong>80%+</strong>.",
    "exp.q.b3": "Desenhei do zero a arquitetura de QA de um novo produto: suítes de smoke, sanity e regressão, varreduras automáticas de acessibilidade, testes de redirecionamento orientados a dados e suporte a múltiplos ambientes.",
    "exp.q.b4": "Construí fluxos com IA e servidores MCP que geram suítes E2E completas <strong>em menos de 1 hora</strong>, além de uma ferramenta de apoio ao QA que reduziu o planejamento de testes de <strong>3–4 dias para ~2 horas</strong>.",
    "exp.q.b5": "Automatizei <strong>200+ testes funcionais</strong> e implementei revisão de código assistida por IA antes dos PRs, reduzindo idas e vindas nas revisões.",
    "exp.t.role": "Analista de QA de Software",
    "exp.t.date": "Jun 2020 – Jan 2023",
    "exp.t.b1": "Responsável pelo planejamento de testes e pela cobertura de casos extremos nos lançamentos de produto, encontrando defeitos antes do lançamento.",
    "exp.t.b2": "Melhorei os fluxos de testes funcionais, mantendo múltiplas plataformas estáveis ao longo dos ciclos de release.",
    "exp.t.chip": "Testes funcionais",

    "work.title": "Projetos em destaque",
    "lbl.context": "contexto",
    "lbl.approach": "abordagem",
    "lbl.result": "resultado",
    "work.w1.m": "500+ páginas",
    "work.w1.t": "Migração de plataforma do site",
    "work.w1.c": "Um site público com mais de 500 páginas migrando para um novo CMS e front-end (Contentful + Next.js), com requisitos bilíngues, de acessibilidade e de privacidade.",
    "work.w1.a": "Shift-left: testes rodando localmente durante o desenvolvimento, testes de componente escritos junto com os novos componentes e a regressão E2E em Cypress desenhada com apoio de IA desde os requisitos.",
    "work.w1.r": "<strong>10+ defeitos de produção</strong> encontrados antes do lançamento, incluindo um problema crítico em que o tracking disparava antes do consentimento do usuário. Fui responsável pela aprovação de QA para o go-live.",
    "work.w2.m": "−80% no tempo de regressão",
    "work.w2.t": "Duas migrações de framework",
    "work.w2.c": "Uma suíte de automação em Robot Framework que precisava migrar para uma stack moderna que o time conseguisse manter.",
    "work.w2.a": "Migração de Robot Framework → Playwright e depois Playwright → Cypress, incluindo a troca do CI para o Cypress Cloud.",
    "work.w2.r": "Tempo de execução da regressão reduzido em <strong>mais de 80%</strong>.",
    "work.w3.m": "3–4 dias → ~2 h",
    "work.w3.t": "Fluxos de QA com IA",
    "work.w3.c": "O planejamento de testes levava de 3 a 4 dias, e as suítes E2E eram escritas totalmente à mão.",
    "work.w3.a": "Conectei servidores MCP ao fluxo de automação para gerar suítes E2E e de página completas, criei uma ferramenta de apoio ao QA que transforma requisitos em planos de teste e adicionei revisão de código com IA antes dos PRs.",
    "work.w3.r": "Suítes completas geradas <strong>em menos de 1 hora</strong>, planejamento de testes reduzido para <strong>~2 horas</strong> e menos retrabalho nas revisões.",
    "work.w4.t": "Sportsbook &amp; streaming ao vivo",
    "work.w4.c": "Uma plataforma de apostas esportivas com dados ao vivo e streaming de vídeo em Web, iOS e Android, onde os testes dependem de dados em tempo real.",
    "work.w4.a": "Estratégias de mock para interfaces com dados ao vivo, suítes de automação criadas do zero, verificações automáticas de localização e um <strong>QA Revamp</strong> em andamento, que iniciei para refatorar a suíte e acompanhar os resultados para que as falhas sejam confiáveis.",
    "work.w4.r": "<strong>12+ meses</strong> responsável pela regressão semanal em todas as plataformas, além de spikes técnicos que embasaram decisões de arquitetura, incluindo uma prova de conceito para um endpoint de streaming unificado.",
    "work.training": "$ ls ~/projetos-de-curso",

    "stack.title": "Ferramentas que uso",
    "stack.web": "web",
    "stack.mobile": "mobile",
    "stack.api": "api",
    "stack.lang": "linguagens &amp; dados",
    "stack.ci": "ci/cd &amp; observabilidade",
    "stack.ai": "qa com ia",
    "stack.practice": "prática",
    "stack.sim": "Simuladores iOS",
    "stack.rest": "Validação REST",
    "stack.integration": "Integração de backend",
    "stack.ai1": "Geração de testes via MCP",
    "stack.ai2": "Revisão de código com IA",
    "stack.ai3": "Requisitos → planos de teste",
    "stack.p1": "Estratégia &amp; planejamento de testes",
    "stack.p2": "Testes exploratórios",
    "stack.p3": "Regressão multiplataforma",
    "stack.p4": "Testes de acessibilidade",
    "stack.p5": "Melhoria de processos",

    "edu.title": "Formação &amp; reconhecimento",
    "edu.k1": "formação",
    "edu.degree": "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    "edu.degreeMeta": "Descomplica · 2025 · Média 9,36/10",
    "edu.courses": "Também: CS50x (Harvard), QA Automation Training Program, Cypress eXpress, OneBitCode.",
    "edu.k2": "prêmio",
    "edu.award": "Por iniciativa e liderança na criação e manutenção de testes automatizados em um dos principais fluxos do projeto.",
    "edu.k3": "idiomas",
    "edu.pt": "Português",
    "edu.native": "nativo",
    "edu.en": "Inglês",
    "edu.full": "profissional completo",
    "edu.es": "Espanhol",
    "edu.basic": "básico",

    "contact.title": "Vamos falar sobre qualidade.",
    "contact.text": "Procurando um Sr. QA Engineer ou SDET para cuidar da automação em web, mobile e APIs, ou alguém animado para testar produtos com IA? Vou gostar de conversar."
  };

  const UI = {
    en: { menuOpen: "Open menu", menuClose: "Close menu", toLight: "Switch to light theme", toDark: "Switch to dark theme", lang: "Language" },
    pt: { menuOpen: "Abrir menu", menuClose: "Fechar menu", toLight: "Mudar para tema claro", toDark: "Mudar para tema escuro", lang: "Idioma" }
  };

  const nodes = Array.from(document.querySelectorAll("[data-i18n]"));
  const EN = {};
  nodes.forEach((el) => { EN[el.dataset.i18n] = el.innerHTML; });

  let lang = "en";

  function setLang(next) {
    lang = next === "pt" ? "pt" : "en";
    const dict = lang === "pt" ? PT : EN;
    nodes.forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    root.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll(".lang-switch button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    document.querySelector(".lang-switch").setAttribute("aria-label", UI[lang].lang);
    syncThemeLabel();
    syncMenuLabel();
    store("lang", lang);
  }

  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  /* ---------- Theme ---------- */
  const themeBtn = document.querySelector(".theme-btn");

  function syncThemeLabel() {
    const dark = root.dataset.theme !== "light";
    themeBtn.setAttribute("aria-label", dark ? UI[lang].toLight : UI[lang].toDark);
  }

  themeBtn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    store("theme", root.dataset.theme);
    syncThemeLabel();
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.getElementById("nav-links");

  function syncMenuLabel() {
    const open = navLinks.classList.contains("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? UI[lang].menuClose : UI[lang].menuOpen);
  }

  function closeMenu() {
    navLinks.classList.remove("open");
    syncMenuLabel();
  }

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    syncMenuLabel();
  });
  navLinks.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ---------- Active section in nav ---------- */
  const links = Array.from(navLinks.querySelectorAll("a"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function markActive(id) {
    links.forEach((a) => {
      const on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  function updateActive() {
    // At the bottom of the page the last sections can't reach the top, so pick the last one.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      markActive(sections[sections.length - 1].id);
      return;
    }
    const line = window.innerHeight * 0.35;
    let current = null;
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= line) current = s.id;
    });
    markActive(current);
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateActive(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", updateActive);
  updateActive();

  /* ---------- Init ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  const saved = store("lang");
  const initial = saved || ((navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en");
  setLang(initial);
})();
