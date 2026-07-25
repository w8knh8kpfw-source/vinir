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

    function openModal() {
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    openButtons.forEach((button) => {
        button.addEventListener("click", openModal);
    });

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
                if (event.target === modal) {
                    closeModal();
                }
            }
        );
    }

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        }
    );


    function showNotification(message) {

        if (!notification) return;

        notification.textContent = message;

        notification.classList.add("active");

        setTimeout(() => {
            notification.classList.remove(
                "active"
            );
        }, 4500);

    }


    /* =========================
       ОТПРАВКА ЗАЯВКИ В TELEGRAM
    ========================= */

    const forms = document.querySelectorAll(
        "form"
    );

    forms.forEach((form) => {

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


                if (!name || !phone) {

                    showNotification(
                        "Пожалуйста, заполните имя и телефон"
                    );

                    return;

                }


                const submitButton =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Отправляем...";

                }


                try {

                    const response =
                        await fetch(
                            "https://vinir-api.onrender.com/api/appointment",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    name: name,

                                    phone: phone,

                                    service: service,

                                    complaint: complaint

                                })

                            }
                        );


                    const result =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            result.message ||
                            "Ошибка отправки"
                        );

                    }


                    showNotification(
                        "Заявка отправлена! Мы свяжемся с вами."
                    );


                    form.reset();


                    if (
                        form.classList.contains(
                            "modal-form"
                        )
                    ) {

                        closeModal();

                    }


                } catch (error) {

                    console.error(
                        "Ошибка:",
                        error
                    );


                    showNotification(
                        "Не удалось отправить заявку. Попробуйте ещё раз."
                    );


                } finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Отправить заявку";

                    }

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
       ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ
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
       АНИМАЦИЯ ГРАДИЕНТА
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
