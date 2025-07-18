export default function modal() {
  const buttons = document.querySelectorAll("[data-modal-btn]");

  if (buttons.length) {
    const modals = document.querySelectorAll(".modal");
    const buttonsClose = document.querySelectorAll(".modal__close");
    const modalOverlay = document.querySelector("#modal-overlay");

    modals.forEach((m) =>
      m.addEventListener("click", (e) => e.stopPropagation())
    );

    modalOverlay.addEventListener("click", () => closeModal());

    buttonsClose.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalId = btn.closest(".modal").dataset.modal;

        closeModal(modalId);
      });
    });

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modalId = btn.dataset.modalBtn;

        e.stopPropagation();

        openModal(modalId);
      });
    });

    function openModal(modalId) {
      const currentModal = document.querySelector(
        `.modal[data-modal="${modalId}"]`
      );

      document.body.classList.add("body-hidden");
      currentModal.classList.add("_open");
      modalOverlay.classList.add("_active");
    }

    function closeModal(modalId) {
      let currentModal;

      document.body.classList.remove("body-hidden");

      if (modalId) {
        currentModal = document.querySelector(
          `.modal[data-modal="${modalId}"]`
        );
      } else {
        currentModal = document.querySelector(".modal._open");
      }

      currentModal.classList.remove("_open");
      modalOverlay.classList.remove("_active");
    }
  }
}
