import { gsap } from "gsap";

function mobileNav() {
  const navBtn = document.querySelector(".mobile-nav-btn");
  const nav = document.querySelector(".mobile-nav");
  const menuIcon = document.querySelector(".nav-icon");

  navBtn.addEventListener("click", () => {
    nav.classList.toggle("mobile-nav--open");
    menuIcon.classList.toggle("nav-icon--active");
    document.body.classList.toggle("no-scroll");

    gsap.fromTo(
      ".mobile-nav a",
      { opacity: 0, y: -50 },
      { opacity: 1, duration: 1, y: 0, stagger: 0.2 }
    );
  });
}

export default mobileNav;
