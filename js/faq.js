/* FAQはHTML標準のdetails/summaryで開閉。JS無効でも回答を閲覧できます。 */
(() => {
  "use strict";
  function init() {
    const root = document.querySelector("#dass-college-faq");
    if (!root || root.dataset.dcfaqReady === "true") return;
    root.dataset.dcfaqReady = "true";
    const items = Array.from(root.querySelectorAll("details.dcfaq-item"));
    function openHashTarget() {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (_) { return; }
      const item = items.find((entry) => entry.id === id);
      if (item) item.open = true;
    }
    openHashTarget();
    window.addEventListener("hashchange", openHashTarget);

    const toggle = document.querySelector("#dcfaq-menu-toggle");
    const nav = document.querySelector("#dcfaq-menu");
    if (toggle && nav) {
      toggle.hidden = false;
      const setOpen = (open) => {
        nav.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      };
      setOpen(false);
      toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
      nav.addEventListener("click", (event) => { if (event.target.closest("a")) setOpen(false); });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !nav.hidden) { setOpen(false); toggle.focus(); }
      });
    }

    let printState = null;
    window.addEventListener("beforeprint", () => {
      if (printState) return;
      printState = items.map((item) => item.open);
      items.forEach((item) => { item.open = true; });
    });
    window.addEventListener("afterprint", () => {
      if (!printState) return;
      items.forEach((item, i) => { item.open = printState[i]; });
      printState = null;
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
