document.addEventListener("DOMContentLoaded", () => {

    const API_URL =
        "https://vinir-api.onrender.com/api/appointment";

    const modal =
        document.getElementById("appointment-modal");

    const notification =
        document.getElementById("notification");

    const closeButton =
        document.querySelector("[data-close-modal]");


    /* =========================
       МОДАЛЬНОЕ ОКНО ЗАПИСИ
    ========================= */

    function openModal() {

        if (!modal) {
            console.error(
                "Модальное окно appointment-modal не найдено"
            );

            return;
        }

        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";
    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow =
            "";
    }


    document
        .querySelectorAll(
            "[data-open-appointment]"
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    openModal();

                }
            );

        });


    /*
       Дополнительное открытие
       кнопок с текстом "Записаться"
    */

    document.addEventListener(
        "click",
        (event) => {

            const element =
                event.target.closest(
                    "button, a"
                );

            if (!element) return;

            const text =
                element.textContent
                    .toLowerCase()
                    .trim();

            if (
                text.includes("записаться") ||
                text.includes("запись на приём") ||
                text.includes("запись на прием")
            ) {

                event.preventDefault();

                openModal();

            }

        }
    );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );


    /* =========================
       УВЕДОМЛЕНИЯ
    ========================= */

    function showNotification(
        message
    ) {

        if (!notification) {

            alert(message);

            return;

        }

        notification.textContent =
            message;

        notification.classList.add(
            "active"
        );

        setTimeout(
            () => {

                notification.classList.remove(
                    "active"
                );

            },
            5000
        );

    }


    /* =========================
       ОТПРАВКА ЗАЯВКИ
    ========================= */

    const forms =
        document.querySelectorAll(
            "form"
        );


    forms.forEach(
        (form) => {

            form.addEventListener(
                "submit",
                async (event) => {

                    event.preventDefault();


                    const nameInput =
                        form.querySelector(
                            '[name="name"]'
                        ) ||
                        form.querySelector(
                            'input[type="text"]'
                        );


                    const phoneInput =
                        form.querySelector(
                            '[name="phone"]'
                        ) ||
                        form.querySelector(
                            'input[type="tel"]'
                        );


                    const serviceInput =
                        form.querySelector(
                            '[name="service"]'
                        ) ||
                        form.querySelector(
                            "select"
                        );


                    const complaintInput =
                        form.querySelector(
                            '[name="complaint"]'
                        ) ||
                        form.querySelector(
                            "textarea"
                        );


                    const name =
                        nameInput
                            ? nameInput.value.trim()
                            : "";


                    const phone =
                        phoneInput
                            ? phoneInput.value.trim()
                            : "";


                    const service =
                        serviceInput
                            ? serviceInput.value
                            : "";


                    const complaint =
                        complaintInput
                            ? complaintInput.value.trim()
                            : "";


                    if (
                        !name ||
                        !phone
                    ) {

                        showNotification(
                            "Пожалуйста, заполните имя и телефон"
                        );

                        return;

                    }


                    const submitButton =
                        form.querySelector(
                            'button[type="submit"]'
                        );


                    const originalText =
                        submitButton
                            ? submitButton.textContent
                            : "";


                    if (
                        submitButton
                    ) {

                        submitButton.disabled =
                            true;

                        submitButton.textContent =
                            "Отправляем...";

                    }


                    try {

                        const response =
                            await fetch(
                                API_URL,
                                {

                                    method:
                                        "POST",

                                    headers:
                                        {
                                            "Content-Type":
                                                "application/json"
                                        },

                                    body:
                                        JSON.stringify(
                                            {

                                                name:
                                                    name,

                                                phone:
                                                    phone,

                                                service:
                                                    service,

                                                complaint:
                                                    complaint

                                            }
                                        )

                                }
                            );


                        const result =
                            await response.json();


                        if (
                            !response.ok
                        ) {

                            throw new Error(
                                result.message ||
                                "Ошибка сервера"
                            );

                        }


                        showNotification(
                            "Заявка отправлена! Мы свяжемся с вами."
                        );


                        form.reset();


                        closeModal();


                    } catch (
                        error
                    ) {

                        console.error(
                            error
                        );


                        showNotification(
                            error.message ||
                            "Не удалось отправить заявку"
                        );


                    } finally {

                        if (
                            submitButton
                        ) {

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                originalText ||
                                "Отправить заявку";

                        }

                    }

                }
            );

        }
    );


    /* =========================
       ДВИЖЕНИЕ ШАРА
    ========================= */

    const sphereStage =
        document.getElementById(
            "sphere-stage"
        );


    if (
        sphereStage
    ) {

        let mouseX =
            0;

        let mouseY =
            0;

        let currentX =
            0;

        let currentY =
            0;


        sphereStage.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    sphereStage.getBoundingClientRect();


                mouseX =
                    (
                        event.clientX -
                        rect.left -
                        rect.width / 2
                    ) / 25;


                mouseY =
                    (
                        event.clientY -
                        rect.top -
                        rect.height / 2
                    ) / 25;

            }
        );


        sphereStage.addEventListener(
            "mouseleave",
            () => {

                mouseX =
                    0;

                mouseY =
                    0;

            }
        );


        function animateSphere() {

            currentX +=
                (
                    mouseX -
                    currentX
                ) * 0.05;


            currentY +=
                (
                    mouseY -
                    currentY
                ) * 0.05;


            const sphere =
                sphereStage.querySelector(
                    ".sphere"
                );


            const glow =
                sphereStage.querySelector(
                    ".sphere-glow"
                );


            if (
                sphere
            ) {

                sphere.style.transform =
                    `translate(${currentX}px, ${currentY}px)`;

            }


            if (
                glow
            ) {

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


                if (
                    !sphere
                ) return;


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
       ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ
    ========================= */

    const animatedElements =
        document.querySelectorAll(
            ".glass-card, .section-heading, .hero-content, .sphere-stage"
        );


    animatedElements.forEach(
        (element) => {

            element.style.opacity =
                "0";


            element.style.transform +=
                " translateY(25px)";


            element.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

        }
    );


    if (
        "IntersectionObserver"
        in window
    ) {

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
                    threshold:
                        0.12
                }
            );


        animatedElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    }


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
       ГРАДИЕНТНЫЕ СЛОВА
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
