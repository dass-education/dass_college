"use strict";

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');
const header = document.querySelector('.site-header');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    if (header) header.classList.toggle('menu-open', open);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'メニューを開く');
      if (header) header.classList.remove('menu-open');
    });
  });
}

document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

// スマホのファーストビュー：写真が画面外に出たらヘッダーを白背景に切り替える
const heroPhoto = document.querySelector('.hero-photo');
if (header && heroPhoto && 'IntersectionObserver' in window) {
  const headerScrollObserver = new IntersectionObserver(
    ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
    { rootMargin: '-72px 0px 0px 0px', threshold: 0 }
  );
  headerScrollObserver.observe(heroPhoto);
}
