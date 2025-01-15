//ScrollReveal
import ScrollReveal from "scrollreveal";

function initScrollReveal() {
  ScrollReveal({
    distance: "60px",
    duration: 2000,
  });

  ScrollReveal().reveal(".discover__title, .discover__text", {
    origin: "top",
  });

  ScrollReveal().reveal(".discover__form", {
    origin: "bottom",
  });
  ScrollReveal().reveal(".discover__picture-img", {
    origin: "right",
  });

  ScrollReveal().reveal(".discover__picture-hint", {
    origin: "left",
    delay: 1000,
  });
}

export default initScrollReveal;
