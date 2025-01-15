import Swiper from "swiper/bundle";
import "swiper/css/bundle";

let swiper1, swiper2, swiper3, swiperHorizontal;

const configVertical = {
  direction: "vertical",
  // slidesPerView: 4,
  slidesPerView: "auto",
  spaceBetween: 0,
  grabCursor: true,
  a11y: false,
  freeMode: true,
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 0.0,
    disableOnInteraction: false,
  },
};

const configHorizontal = {
  direction: "horizontal",
  slidesPerView: 1,

  spaceBetween: 32,

  grabCursor: true,
  a11y: false,
  freeMode: true,
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 0.0,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
};

const breakpoint = window.matchMedia("(max-width:1023px)");

const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    swiperHorizontal = new Swiper("#testimonials-horizontal", configHorizontal);
    if (swiper1 !== undefined) swiper1.destroy(true, true);
    if (swiper2 !== undefined) swiper2.destroy(true, true);
    if (swiper3 !== undefined) swiper3.destroy(true, true);
    return;
  } else if (breakpoint.matches === false) {
    swiper1 = new Swiper("#testimonials-col-1", configVertical);
    swiper2 = new Swiper("#testimonials-col-2", configVertical);
    swiper3 = new Swiper("#testimonials-col-3", configVertical);
    if (swiperHorizontal !== undefined) swiperHorizontal.destroy(true, true);
    return;
  }
};

breakpoint.addListener(breakpointChecker);
breakpointChecker();

export default swiperFunc;
