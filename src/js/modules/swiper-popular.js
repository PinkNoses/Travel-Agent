import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

// init Swiper:
function popularSwiper() {
  const swiper = new Swiper("#popular", {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 32,
    breakpoints: {
      425: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },

    navigation: {
      nextEl: "#nextEl",
      prevEl: "#prevEl",
    },
  });
}

export default popularSwiper;
