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
  const PT = {};

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
