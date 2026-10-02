const root = document.documentElement;
const themeButton = document.querySelector('.theme-btn');
const themeIcon = document.querySelector('.theme-icon');
const langButtons = document.querySelectorAll('.lang-btn');
const navLinks = document.querySelectorAll('.primary-nav .nav-link');

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

const applyLanguage = (lang) => {
  const translationNodes = document.querySelectorAll('[data-en][data-pt-br]');

  translationNodes.forEach((node) => {
    const translation = lang === 'pt-br' ? node.getAttribute('data-pt-br') : node.getAttribute('data-en');
    if (translation) {
      node.textContent = translation;
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });

  document.documentElement.lang = lang === 'pt-br' ? 'pt-BR' : 'en';
  localStorage.setItem('lang', lang);
};

const setActiveNav = () => {
  const sections = [...document.querySelectorAll('main section[id]')];
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const isAtBottom = window.scrollY + viewportHeight >= documentHeight - 40;

  let activeId = 'top';

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const threshold = section.offsetTop - 180;
    if (window.scrollY >= threshold) {
      activeId = section.id;
      break;
    }
  }

  if (isAtBottom && sections.length > 0) {
    activeId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${activeId}`);
  });
};

const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

const savedLang = localStorage.getItem('lang') || 'en';
applyLanguage(savedLang);

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
window.addEventListener('load', setActiveNav);
setActiveNav();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || !document.querySelector(href)) return;

    event.preventDefault();
    const target = document.querySelector(href);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(setActiveNav, 150);
  });
});
