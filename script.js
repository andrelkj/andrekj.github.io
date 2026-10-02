const root = document.documentElement;
const themeButton = document.querySelector('.theme-btn');
const themeIcon = document.querySelector('.theme-icon');
const langButtons = document.querySelectorAll('.lang-btn');
const navLinks = document.querySelectorAll('.primary-nav .nav-link');

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
  const nodes = document.querySelectorAll('[data-en][data-pt-br]');
  nodes.forEach((node) => {
    const content = lang === 'pt-br' ? node.getAttribute('data-pt-br') : node.getAttribute('data-en');
    if (content) {
      node.textContent = content;
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });

  document.documentElement.lang = lang === 'pt-br' ? 'pt-BR' : 'en';
  localStorage.setItem('lang', lang);
};

// Navigation active state - improved to handle all sections
const setActiveNav = () => {
  const sections = [...document.querySelectorAll('main section[id]')];
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Check if scrolled to bottom
  const isAtBottom = scrollY + viewportHeight >= documentHeight - 50;
  
  let activeId = 'top';
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    if (scrollY >= section.offsetTop - 200) {
      activeId = section.id;
      break;
    }
  }
  
  // If at bottom, highlight the last section
  if (isAtBottom && sections.length > 0) {
    activeId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === `#${activeId}`;
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
      // Update active nav after scroll
      setTimeout(setActiveNav, 100);
    }
  });
});
