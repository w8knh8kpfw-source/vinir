document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("appointment-modal");
    const notification = document.getElementById("notification");

    const openButtons = document.querySelectorAll(
        "[data-open-appointment]"
    );

    const closeButton = document.querySelector(
        "[data-close-modal]"
    );

    const sphereStage = document.getElementById(
        "sphere-stage"
    );


    /* =========================
       ОКНО ЗАПИСИ
    ========================= */

    function openModal() {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    openButtons.forEach((button) => {
        button.addEventListener("click", openModal);
    });

    closeButton.addEventListener(
        "click",
        closeModal
    );

    modal.addEventListener(
        "click",
        (event) => {
            if (event.target === modal) {
                closeModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        }
    );


    /* =========================
       УВЕДОМЛЕНИЕ
    ========================= */

    function showNotification() {

        notification.classList.add("active");

        setTimeout(() => {
            notification.classList.remove(
                "active"
            );
        }, 4500);

    }


    /* =========================
       ФОРМЫ
    ========================= */

    const forms = document.querySelectorAll(
        "form"
    );

    forms.forEach((form) => {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                showNotification();

                form.reset();

                if (
                    form.classList.contains(
                        "modal-form"
                    )
                ) {
                    closeModal();
                }

            }
        );

    });


    /* =========================
       ДВИЖЕНИЕ ШАРА
    ========================= */

    if (sphereStage) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;

        sphereStage.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    sphereStage.getBoundingClientRect();

                mouseX =
                    (event.clientX -
                        rect.left -
                        rect.width / 2) /
                    25;

                mouseY =
                    (event.clientY -
                        rect.top -
                        rect.height / 2) /
                    25;

            }
        );


        sphereStage.addEventListener(
            "mouseleave",
            () => {

                mouseX = 0;
                mouseY = 0;

            }
        );


        function animateSphere() {

            currentX +=
                (mouseX - currentX) *
                0.05;

            currentY +=
                (mouseY - currentY) *
                0.05;


            const sphere =
                sphereStage.querySelector(
                    ".sphere"
                );


            const glow =
                sphereStage.querySelector(
                    ".sphere-glow"
                );


            if (sphere) {

                sphere.style.transform =
                    `translate(${currentX}px, ${currentY}px)`;

            }


            if (glow) {

                glow.style.transform =
                    `translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;

            }


            requestAnimationFrame(
                animateSphere
            );

        }

        animateSphere();

    }


    /* =========================
       ДВИЖЕНИЕ ПРИ НАКЛОНЕ ТЕЛЕФОНА
    ========================= */

    if (
        window.DeviceOrientationEvent
    ) {

        window.addEventListener(
            "deviceorientation",
            (event) => {

                const sphere =
                    document.querySelector(
                        ".sphere"
                    );

                if (!sphere) return;


                const gamma =
                    Math.max(
                        -20,
                        Math.min(
                            20,
                            event.gamma || 0
                        )
                    );


                const beta =
                    Math.max(
                        -20,
                        Math.min(
                            20,
                            event.beta || 0
                        )
                    );


                sphere.style.transform =
                    `translate(${gamma / 3}px, ${beta / 5}px)`;

            }
        );

    }


    /* =========================
       ПОЯВЛЕНИЕ КАРТОЧЕК
    ========================= */

    const animatedElements =
        document.querySelectorAll(
            ".glass-card, .section-heading, .hero-content, .sphere-stage"
        );


    animatedElements.forEach(
        (element) => {

            element.style.opacity = "0";

            element.style.transform +=
                " translateY(25px)";

            element.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

        }
    );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(
        (element) => {

            observer.observe(element);

        }
    );


    /* =========================
       ЭФФЕКТ НА КАРТОЧКАХ
    ========================= */

    const cards =
        document.querySelectorAll(
            ".glass-card"
        );


    cards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        }
    );


    /* =========================
       ПЛАВНАЯ АНИМАЦИЯ ВАЖНЫХ СЛОВ
    ========================= */

    const gradientTexts =
        document.querySelectorAll(
            ".gradient-text"
        );


    gradientTexts.forEach(
        (text) => {

            text.addEventListener(
                "mouseenter",
                () => {

                    text.style.filter =
                        "brightness(1.15)";

                }
            );


            text.addEventListener(
                "mouseleave",
                () => {

                    text.style.filter =
                        "brightness(1)";

                }
            );

        }
    );

});
