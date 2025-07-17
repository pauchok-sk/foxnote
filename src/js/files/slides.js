export default function slides() {
  const teamSlider = document.querySelector(".s-team__slider");

  if (teamSlider) {
    const swiper = new Swiper(teamSlider, {
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 800,
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
}
