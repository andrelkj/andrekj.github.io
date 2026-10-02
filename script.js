const root = document.documentElement;
const themeButton = document.querySelector('.theme-btn');
const themeIcon = document.querySelector('.theme-icon');
const langButtons = document.querySelectorAll('.lang-btn');
const navLinks = document.querySelectorAll('.primary-nav a');

// Theme management
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  themeButton.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  localStorage.setItem('theme', theme);
};

// Language management
const applyLanguage = (lang) => {
  const nodes = document.querySelectorAll('[data-lang]');
  nodes.forEach((node) => {
    const key = `data-${lang}`;
    const value = node.getAttribute(key);
    if (value) node.textContent = value;
  });

  langButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });

  document.documentElement.lang = lang === 'pt-br' ? 'pt-BR' : 'en';
  localStorage.setItem('lang', lang);
};

// Navigation active state
const setActiveNav = () => {
  const sections = [...document.querySelectorAll('main section[id]')];
  const scrollY = window.scrollY + 150;

  let activeId = 'top';
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', isActive);
  });
};

// Initialize theme
const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

// Initialize language
const savedLang = localStorage.getItem('lang') || 'en';
applyLanguage(savedLang);

// Event listeners
themeButton.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});

langButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyLanguage(button.dataset.lang);
  });
});

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
