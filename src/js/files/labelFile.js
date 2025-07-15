export default function labelFile() {
  const inputs = document.querySelectorAll(".input-file");

  if (inputs.length) {
    inputs.forEach(input => {
      const id = input.id;
      const label = document.querySelector(`label[for="${id}"]`);

      if (!label) return;

      const currentText = label.querySelector("span");
      const nextText = label.dataset.changeText || "Файл выбран";

      input.addEventListener("change", (e) => {
        if (e.target.files[0]) {
          currentText.textContent = nextText;
        }
      })
    })
  }
}