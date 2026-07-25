document.addEventListener("DOMContentLoaded", () => {


    const modal =
        document.getElementById("appointment-modal");


    const notification =
        document.getElementById("notification");


    const openButtons =
        document.querySelectorAll(
            "[data-open-appointment]"
        );


    const closeButton =
        document.querySelector(
            "[data-close-modal]"
        );


    /*
    =====================================================
    ОТКРЫТИЕ ОКНА ЗАПИСИ
    =====================================================
    */


    openButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                modal.classList.add("active");

                document.body.style.overflow =
                    "hidden";

            }

        );

    });


    /*
    =====================================================
    ЗАКРЫТИЕ ОКНА
    =====================================================
    */


    closeButton.addEventListener(
        "click",
        closeModal
    );


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


    function closeModal() {

        modal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    /*
    =====================================================
    ESC ДЛЯ ЗАКРЫТИЯ
    =====================================================
    */


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


    /*
    =====================================================
    ФОРМА НА СТРАНИЦЕ
    =====================================================
    */


    const mainForm =
        document.getElementById(
            "appointment-form"
        );


    mainForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            showNotification();

            mainForm.reset();

        }

    );


    /*
    =====================================================
    ФОРМА В МОДАЛЬНОМ ОКНЕ
    =====================================================
    */


    const modalForm =
        document.querySelector(
            ".modal-form"
        );


    modalForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            showNotification();

            modalForm.reset();

            closeModal();

        }

    );


    /*
    =====================================================
    УВЕДОМЛЕНИЕ
    =====================================================
    */


    function showNotification() {

        notification.classList.add(
            "active"
        );


        setTimeout(
            () => {

                notification.classList.remove(
                    "active"
                );

            },

            4000

        );

    }


    /*
    =====================================================
    ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ
    =====================================================
    */


    const animatedElements =
        document.querySelectorAll(
            ".glass-card, .section-heading, .hero-content"
        );


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
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

            observer.observe(
                element
            );

        }

    );


});
