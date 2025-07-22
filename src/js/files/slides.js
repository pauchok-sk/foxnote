export default function slides() {
  const teamSlider = document.querySelector(".s-team__slider");

  if (teamSlider) {
    const swiper = new Swiper(teamSlider, {
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 1600,
      autolay: {
        delay: 3500,
      },
      breakpoints: {
        992: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },
      },
    });
  }

  const reviewsSlider = document.querySelector(".s-reviews__slider");

  if (reviewsSlider) {
    const swiper = new Swiper(reviewsSlider, {
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 1600,
      autoplay: {
        delay: 3500,
      },
    });
  }

  const gallerySlider = document.querySelector(".s-gallery-slider__slider");

  if (gallerySlider) {
    const swiper = new Swiper(gallerySlider, {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 1600,
      autoplay: {
        delay: 3500,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }
}
