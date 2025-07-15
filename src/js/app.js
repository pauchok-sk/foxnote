import "../scss/style.scss";
import burger from "./files/burger.js";
import labelFile from "./files/labelFile.js";
import modal from "./files/modal.js";
import parallax from "./files/parallax.js";
import spoller from "./files/spoller.js";

spoller();
burger();
labelFile();
modal();
parallax();

Fancybox.bind("[data-fancybox]");
