(() => {
    "use strict";
    function aosGradationCases() {
        const aosContiners = document.querySelectorAll(".aos-container");
        if (aosContiners.length && window.matchMedia("(min-width: 576px)").matches) aosContiners.forEach(container => {
            const aosItems = container.querySelectorAll("[data-aos]");
            let delay = 100;
            aosItems.forEach((item, index) => {
                item.setAttribute("data-aos-delay", delay);
                if (window.matchMedia("(max-width: 991px)").matches) if (delay === 200) delay = 100; else delay += 100; else if (delay === 300) delay = 100; else delay += 100;
            });
        });
    }
    function burger() {
        const burgerOpen = document.querySelector("#burger-open");
        const burgerClose = document.querySelector("#burger-close");
        const burger = document.querySelector("#burger");
        const burgerOverlay = document.querySelector("#burger-overlay");
        if (burger) {
            burger.addEventListener("click", e => e.stopPropagation());
            burgerOverlay.addEventListener("click", handlerBurgerClose);
            burgerOpen.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerOpen();
            });
            burgerClose.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerClose();
            });
            function handlerBurgerClose() {
                burger.classList.remove("_open");
                burgerOverlay.classList.remove("_active");
                document.body.classList.remove("body-hidden");
                document.body.removeEventListener("click", burgerClose);
            }
            function handlerBurgerOpen() {
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                document.body.classList.add("body-hidden");
                document.body.addEventListener("click", burgerClose);
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function footerScroll() {
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
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop && scrollTop >= header.clientHeight) {
                    header.classList.add("_hide");
                    header.classList.remove("_shadow");
                } else {
                    header.classList.remove("_hide");
                    header.classList.add("_shadow");
                }
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            });
        }
    }
    function labelFile() {
        const inputs = document.querySelectorAll(".input-file");
        if (inputs.length) inputs.forEach(input => {
            const id = input.id;
            const label = document.querySelector(`label[for="${id}"]`);
            if (!label) return;
            const currentText = label.querySelector("span");
            const nextText = label.dataset.changeText || "Файл выбран";
            input.addEventListener("change", e => {
                if (e.target.files[0]) currentText.textContent = nextText;
            });
        });
    }
    function modal() {
        const buttons = document.querySelectorAll("[data-modal-btn]");
        if (buttons.length) {
            const modals = document.querySelectorAll(".modal");
            const buttonsClose = document.querySelectorAll(".modal__close");
            const modalOverlay = document.querySelector("#modal-overlay");
            modals.forEach(m => m.addEventListener("click", e => e.stopPropagation()));
            modalOverlay.addEventListener("click", () => closeModal());
            buttonsClose.forEach(btn => {
                btn.addEventListener("click", () => {
                    const modalId = btn.closest(".modal").dataset.modal;
                    closeModal(modalId);
                });
            });
            buttons.forEach(btn => {
                btn.addEventListener("click", e => {
                    const modalId = btn.dataset.modalBtn;
                    e.stopPropagation();
                    openModal(modalId);
                });
            });
            function openModal(modalId) {
                const currentModal = document.querySelector(`.modal[data-modal="${modalId}"]`);
                document.body.classList.add("body-hidden");
                currentModal.classList.add("_open");
                modalOverlay.classList.add("_active");
            }
            function closeModal(modalId) {
                let currentModal;
                document.body.classList.remove("body-hidden");
                if (modalId) currentModal = document.querySelector(`.modal[data-modal="${modalId}"]`); else currentModal = document.querySelector(".modal._open");
                currentModal.classList.remove("_open");
                modalOverlay.classList.remove("_active");
            }
        }
    }
    function parallax() {
        const containers = document.querySelectorAll(".parallax-container");
        if (containers.length) containers.forEach(container => {
            const items = container.querySelectorAll(".parallax-item");
            const baseIntensity = .5;
            let targetX = 0;
            let targetY = 0;
            let currentX = 0;
            let currentY = 0;
            let isMoving = false;
            let animationId = null;
            items.forEach(item => {
                item.dataset.randomX = .8 + Math.random() * .4;
                item.dataset.randomY = .8 + Math.random() * .4;
            });
            const smoothUpdate = () => {
                currentX += (targetX - currentX) * .1;
                currentY += (targetY - currentY) * .1;
                items.forEach((item, index) => {
                    const speed = baseIntensity + index / 10;
                    const moveX = currentX * speed * item.dataset.randomX;
                    const moveY = currentY * speed * item.dataset.randomY;
                    item.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
                if (Math.abs(targetX - currentX) > .01 || Math.abs(targetY - currentY) > .01) animationId = requestAnimationFrame(smoothUpdate); else isMoving = false;
            };
            container.addEventListener("mousemove", e => {
                container.classList.remove("_refund");
                targetX = (e.clientX - container.offsetWidth / 2) / container.offsetWidth * 100;
                targetY = (e.clientY - container.offsetHeight / 2) / container.offsetHeight * 100;
                if (!isMoving) {
                    isMoving = true;
                    animationId = requestAnimationFrame(smoothUpdate);
                }
            });
            container.addEventListener("mouseleave", () => {
                container.classList.add("_refund");
                targetX = 0;
                targetY = 0;
                if (!isMoving) {
                    isMoving = true;
                    animationId = requestAnimationFrame(smoothUpdate);
                }
            });
        });
    }
    function reviewCheck() {
        const buttons = document.querySelectorAll("[data-modal-review]");
        if (buttons.length) {
            const modalContent = document.querySelector("#content-review");
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    modalContent.innerHTML = btn.dataset.modalReview;
                });
            });
        }
    }
    function slides() {
        const teamSlider = document.querySelector(".s-team__slider");
        if (teamSlider) {
            new Swiper(teamSlider, {
                slidesPerView: "auto",
                spaceBetween: 20,
                speed: 800,
                autolay: {
                    delay: 3500
                },
                breakpoints: {
                    992: {
                        slidesPerView: "auto",
                        spaceBetween: 40
                    }
                }
            });
        }
        const reviewsSlider = document.querySelector(".s-reviews__slider");
        if (reviewsSlider) {
            new Swiper(reviewsSlider, {
                slidesPerView: "auto",
                spaceBetween: 20,
                speed: 800,
                autoplay: {
                    delay: 3500
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
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
    Fancybox.bind("[data-fancybox]");
    AOS.init();
})();