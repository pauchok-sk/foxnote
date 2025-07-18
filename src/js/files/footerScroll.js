export default function footerScroll() {
  const footer = document.querySelector(".footer");

  if (footer) {
    const footerHeight = document.querySelector(".footer-height");

    heightFooterChange();

    window.addEventListener("resize", heightFooterChange);

    function heightFooterChange() {
      footerHeight.style.height = footer.offsetHeight + "px";

      if (footer.offsetHeight >= window.innerHeight) {
        footer.style.position = "static";
        footerHeight.style.display = "none";
      } else {
        footer.style.position = "fixed";
        footerHeight.style.display = "block";
      }
    }
  }
}
