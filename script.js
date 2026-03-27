const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);

  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
};

const savedTheme = localStorage.getItem('themePreference');
if (savedTheme === 'dark' || savedTheme === 'light') {
  applyTheme(savedTheme);
} else {
  applyTheme('light');
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('themePreference', nextTheme);
  });
}

const revealTargets = document.querySelectorAll(
  '.section, .hero-content, .hero-photo-card, .card, .timeline-item, .cert-card, .contact-card'
);

if (revealTargets.length > 0) {
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');

    const delayLevel = index % 4;
    if (delayLevel > 0) {
      element.classList.add(`reveal-delay-${delayLevel}`);
    }
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }
}