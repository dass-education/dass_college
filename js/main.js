document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("details.mobile-nav").forEach((menu) => {
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => menu.removeAttribute("open")));
    document.addEventListener("pointerdown", (event) => { if (menu.open && !menu.contains(event.target)) menu.removeAttribute("open"); });
  });
});
