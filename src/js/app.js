import "../scss/style.scss";
import aosGradationCases from "./files/aosGradationCases.js";
import burger from "./files/burger.js";
import headerScroll from "./files/headerScroll.js";
import labelFile from "./files/labelFile.js";
import modal from "./files/modal.js";
import parallax from "./files/parallax.js";
import slides from "./files/slides.js";
import spoller from "./files/spoller.js";

spoller();
burger();
labelFile();
modal();
parallax();
aosGradationCases();
slides();
headerScroll();

Fancybox.bind("[data-fancybox]");
AOS.init();