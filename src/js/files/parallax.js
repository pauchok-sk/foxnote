export default function parallax() {
  const containers = document.querySelectorAll(".parallax-container");

  if (containers.length) {
    containers.forEach((container) => {
      const items = container.querySelectorAll(".parallax-item");
      const baseIntensity = 0.5;

      // Состояние для плавности
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let isMoving = false;
      let animationId = null;

      // Генерируем случайные коэффициенты
      items.forEach((item) => {
        item.dataset.randomX = 0.8 + Math.random() * 0.4;
        item.dataset.randomY = 0.8 + Math.random() * 0.4;
      });

      // Функция плавного обновления позиций
      const smoothUpdate = () => {
        // Плавное приближение к целевой позиции
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        // Применяем к каждому элементу
        items.forEach((item, index) => {
          const speed = baseIntensity + index / 10;
          const moveX = currentX * speed * item.dataset.randomX;
          const moveY = currentY * speed * item.dataset.randomY;

          item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // Продолжаем анимацию, если есть движение
        if (
          Math.abs(targetX - currentX) > 0.01 ||
          Math.abs(targetY - currentY) > 0.01
        ) {
          animationId = requestAnimationFrame(smoothUpdate);
        } else {
          isMoving = false;
        }
      };

      container.addEventListener("mousemove", (e) => {
        container.classList.remove("_refund");

        // Обновляем целевые позиции
        targetX =
          ((e.clientX - container.offsetWidth / 2) / container.offsetWidth) *
          100;
        targetY =
          ((e.clientY - container.offsetHeight / 2) / container.offsetHeight) *
          100;

        // Запускаем анимацию, если она не активна
        if (!isMoving) {
          isMoving = true;
          animationId = requestAnimationFrame(smoothUpdate);
        }
      });

      container.addEventListener("mouseleave", () => {
        container.classList.add("_refund");

        // Плавный возврат в исходное положение
        targetX = 0;
        targetY = 0;

        // Если анимация еще не запущена, запускаем
        if (!isMoving) {
          isMoving = true;
          animationId = requestAnimationFrame(smoothUpdate);
        }
      });

      // Очистка анимации при демонтировании
      container.addEventListener("DOMNodeRemoved", () => {
        if (animationId) cancelAnimationFrame(animationId);
      });
    });
  }
}
