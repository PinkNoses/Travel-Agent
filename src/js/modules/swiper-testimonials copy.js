import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

const configVertical = {
  direction: "vertical",
  loop: true,
  speed: 2000,
  slidesPerView: "auto",
  spaceBetween: 0,
  grabCursor: true,
  autoplay: {
    enabled: true,
    delay: 0,
    disableOnInteraction: false,
  },
  freeMode: {
    enabled: true,
  },
};

const configHorizontal = {
  loop: true,
  speed: 2000,
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  autoplay: {
    enabled: true,
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    425: {
      slidesPerView: 2,
    },
    899: {
      slidesPerView: 3,
    },
  },
  freeMode: {
    enabled: true,
  },
};

let swiper1;
let swiper2;
let swiper3;
let swiperHorizontal;

// 1023px
const breakpoint = window.matchMedia("(max-width:1023px)");

// Ф-ия, которая проверяет выполнение медиа запроса в breakpoint

const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    if (swiper1 !== undefined) swiper1.destroy(true, true);
    if (swiper2 !== undefined) swiper2.destroy(true, true);
    if (swiper3 !== undefined) swiper3.destroy(true, true);
    swiperHorizontal = new Swiper("#testimonials-horizontal", configHorizontal);;
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