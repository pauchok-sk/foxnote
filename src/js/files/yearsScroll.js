export default function yearsScroll() {
  const years = document.querySelector(".s-years");

  if (years) {
    gsap.registerPlugin(ScrollTrigger);

    // Функция для обновления анимации при изменении размеров
    function setupYearsAnimation() {
      const years = document.querySelector(".s-years");
      if (!years) return;

      const yearsContainer = years.querySelector(".container");
      const yearsWrapper = years.querySelector(".s-years__wrapper");
      const star = years.querySelector(".s-years__line-star"); // Ваше изображение для масштабирования
      const starWidth = star.clientWidth;


      const childrens = yearsWrapper.children;
      const childrensOffset =
        parseFloat(getComputedStyle(yearsWrapper).gap) || 0;

      const wrapperWidth =
        Array.from(childrens).reduce(
          (current, item) => current + item.offsetWidth,
          0
        ) +
        (childrens.length - 1) * childrensOffset;

      const containerWidth = yearsContainer.offsetWidth;
      const offsetLeftWrapper = Math.max(0, wrapperWidth - containerWidth + 40);

      // Анимируем только если контент не помещается
      if (offsetLeftWrapper > 0) {
        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut" },
        });

        // Горизонтальная прокрутка (ваш оригинальный код)
        tl.fromTo(
          yearsWrapper,
          { x: 0 },
          {
            x: -offsetLeftWrapper,
            ease: "power1.inOut",
          },
          0
        );

        // Добавляем масштабирование изображения
        if (star) {
          tl.fromTo(
            star,
            { width: starWidth },
            {
              rotation: 360,
              width: starWidth * 2,
              ease: "power1.out",
              transformOrigin: "center center", // Масштабирование из центра
            },
            0
          );
        }

        ScrollTrigger.create({
          animation: tl,
          trigger: years,
          start: "bottom bottom",
          end: () => `+=${wrapperWidth * 0.7}`,
          scrub: 1.5,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          touch: { sensitivity: 0.5 },
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress > 0.3 && progress < 0.7) {
              tl.timeScale(0.8);
            } else {
              tl.timeScale(1);
            }
          },
        });
      }
    }

    // Инициализация
    setupYearsAnimation();

    // Обновление при ресайзе
    // window.addEventListener("resize", () => {
    //   setTimeout(setupYearsAnimation, 100); // Небольшая задержка для стабилизации размеров
    // });
  }
}
