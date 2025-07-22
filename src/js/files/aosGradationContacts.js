export default function aosGradationContacts() {
  const aosContiners = document.querySelectorAll(".aos-contacts");

  if (aosContiners.length && window.matchMedia("(min-width: 576px)").matches) {
    aosContiners.forEach((container) => {
      const aosItems = container.querySelectorAll("[data-aos]");

      console.log(aosItems)

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
