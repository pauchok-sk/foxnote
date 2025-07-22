import "../scss/style.scss";
import aosGradationCases from "./files/aosGradationCases.js";
import burger from "./files/burger.js";
import footerScroll from "./files/footerScroll.js";
import headerScroll from "./files/headerScroll.js";
import labelFile from "./files/labelFile.js";
import modal from "./files/modal.js";
import parallax from "./files/parallax.js";
import reviewCheck from "./files/reviewCheck.js";
import slides from "./files/slides.js";
import spoller from "./files/spoller.js";
import yearsScroll from "./files/yearsScroll.js";

spoller();
burger();
labelFile();
modal();
parallax();
aosGradationCases();
slides();
headerScroll();
reviewCheck();
footerScroll();
yearsScroll();

Fancybox.bind("[data-fancybox]");
AOS.init();
