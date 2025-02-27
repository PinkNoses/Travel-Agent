import mobileNav from "./modules/mobile-nav.js";
mobileNav();

import autoComplete from "./modules/autoComplete.js";
autoComplete();

import easepick from "./modules/easepick.js";
easepick();

import popularSwiper from "./modules/swiper-popular.js";
popularSwiper();

import swiperTestimonials from "./modules/swiper-testimonials.js";

import scrollReveal from "./modules/scrollReveal.js";
scrollReveal();

// Scroll to Popular section

const pictureScroll = document.querySelector(".discover__picture-scroll");

pictureScroll.addEventListener("click", () => {
  const popularSection = document.querySelector(".popular");
  window.scroll({
    top: popularSection.offsetTop,
    behavior: "smooth",
  });
});

// Email validation
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const form = document.querySelector(".subscribe-form");
const input = document.querySelector(".subscribe-form__input");
const inputBtn = document.querySelector(".subscribe-form__btn");
const privacy = document.querySelector(".subscribe__form-privacy");

function onInput() {
  if (isEmailValid(input.value)) {
    input.style.borderColor = "green";
    privacy.style.display = "block";
    inputBtn.classList.remove("disabled");
    resetForm();
  } else {
    input.style.borderColor = "red";
  }
}

input.addEventListener("input", onInput);

function isEmailValid(value) {
  return EMAIL_REGEXP.test(value);
}

function resetForm() {
  form.addEventListener("submit", (e) => {
    alert("Thanks for subscribing!");
    e.preventDefault();
    e.target.reset();
  });
}

