export default function aosGradationCases() {
  const aosContiners = document.querySelectorAll(".aos-cases");

  if (aosContiners.length && window.matchMedia("(min-width: 576px)").matches) {
    aosContiners.forEach((container) => {
      const aosItems = container.querySelectorAll("[data-aos]");

      let delay = 100;
      aosItems.forEach((item, index) => {
        
        item.setAttribute("data-aos-delay", delay);
        if (window.matchMedia("(max-width: 991px)").matches) {
          if (delay === 200) {
            delay = 100;
          } else {
            delay += 100;
          }
        } else {
          if (delay === 300) {
            delay = 100;
          } else {
            delay += 100;
          }
        }

      });
    });
  }
}
