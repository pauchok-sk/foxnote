export default function reviewCheck() {
  const buttons = document.querySelectorAll("[data-modal-review]");
  
  if (buttons.length) {
    const modalContent = document.querySelector("#content-review");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        modalContent.innerHTML = btn.dataset.modalReview;
      })
    })
  }
}