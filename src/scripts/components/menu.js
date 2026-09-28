//Fungsi untuk membuka/menutup menu hamburger (Mobile Responsive)
export function initMenu() {
  const navMenu = document.getElementById("navMenu");
  const closeBtn = document.getElementById("closeBtn");
  const hamburgerBtn = document.getElementById("hamburger");
  const navOverlay = document.getElementById("navOverlay");
  const navLinks = document.querySelectorAll(".navbar-link");

  function openMenu() {
    navMenu.classList.add("is-open");
    navOverlay.classList.add("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navOverlay.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  hamburgerBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  navOverlay.addEventListener("click", closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
