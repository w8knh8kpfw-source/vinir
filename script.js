/* =========================================================
   ВИНИР — INTERACTIVE WEBSITE
   ========================================================= */


/* =========================================================
   МОБИЛЬНОЕ МЕНЮ
   ========================================================= */

const mobileMenuButton =
    document.querySelector('.mobile-menu-button');

const mobileNavigation =
    document.querySelector('.mobile-navigation');


if (mobileMenuButton && mobileNavigation) {

    mobileMenuButton.addEventListener('click', () => {

        mobileNavigation.classList.toggle('active');

    });

}


document
    .querySelectorAll('.mobile-navigation a')
    .forEach(link => {

        link.addEventListener('click', () => {

            mobileNavigation.classList.remove('active');

        });

    });


/* =========================================================
   ПЛАВНАЯ ПРОКРУТКА
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener('click', function (event) {

            const targetId =
                this.getAttribute('href');

            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({

                    behavior: 'smooth',

                    block: 'start'

                });

            }

        });

    });


/* =========================================================
   МОДАЛЬНОЕ ОКНО ЗАПИСИ
   ========================================================= */

const appointmentModal =
    document.getElementById('appointment-modal');


const openAppointmentButtons =
    document.querySelectorAll('[data-open-appointment]');


const closeModalButtons =
    document.querySelectorAll('[data-close-modal]');


function openAppointmentModal() {

    if (!appointmentModal) return;


    appointmentModal.classList.add('active');


    document.body.classList.add('modal-open');

}


function closeAppointmentModal() {

    if (!appointmentModal) return;


    appointmentModal.classList.remove('active');


    document.body.classList.remove('modal-open');

}


openAppointmentButtons.forEach(button => {

    button.addEventListener(

        'click',

        openAppointmentModal

    );

});


closeModalButtons.forEach(button => {

    button.addEventListener(

        'click',

        closeAppointmentModal

    );

});


document.addEventListener('keydown', event => {

    if (

        event.key === 'Escape' &&

        appointmentModal.classList.contains('active')

    ) {

        closeAppointmentModal();

    }

});


/* =========================================================
   КАРУСЕЛЬ ВРАЧЕЙ
   ========================================================= */

const doctorsCarousel =
    document.getElementById('doctors-carousel');


const doctorsPrevious =
    document.getElementById('doctors-prev');


const doctorsNext =
    document.getElementById('doctors-next');


if (

    doctorsCarousel &&

    doctorsPrevious &&

    doctorsNext

) {


    doctorsPrevious.addEventListener(

        'click',

        () => {

            doctorsCarousel.scrollBy({

                left: -340,

                behavior: 'smooth'

            });

        }

    );


    doctorsNext.addEventListener(

        'click',

        () => {

            doctorsCarousel.scrollBy({

                left: 340,

                behavior: 'smooth'

            });

        }

    );


}


/* =========================================================
   УВЕДОМЛЕНИЕ
   ========================================================= */

const notification =
    document.getElementById('notification');


function showNotification() {

    if (!notification) return;


    notification.classList.add('active');


    setTimeout(() => {

        notification.classList.remove('active');

    }, 5000);

}


/* =========================================================
   ОСНОВНАЯ ФОРМА
   ========================================================= */

const appointmentForm =
    document.getElementById('appointment-form');


if (appointmentForm) {


    appointmentForm.addEventListener(

        'submit',

        event => {


            event.preventDefault();


            const formData =
                new FormData(appointmentForm);


            const name =
                formData.get('name');


            const phone =
                formData.get('phone');


            const service =
                formData.get('service');


            const complaint =
                formData.get('complaint');


            console.log({

                name,

                phone,

                service,

                complaint

            });


            showNotification();


            appointmentForm.reset();


        }

    );

}


/* =========================================================
   ФОРМА В МОДАЛЬНОМ ОКНЕ
   ========================================================= */

const modalForm =
    document.querySelector('.modal-form');


if (modalForm) {


    modalForm.addEventListener(

        'submit',

        event => {


            event.preventDefault();


            showNotification();


            modalForm.reset();


            closeAppointmentModal();


        }

    );

}


/* =========================================================
   ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
   ========================================================= */

const animatedElements = [

    '.section-heading',

    '.service-card',

    '.doctor-card',

    '.review-card',

    '.contact-card',

    '.advantage-item',

    '.appointment-container'

];


animatedElements.forEach(selector => {


    document
        .querySelectorAll(selector)
        .forEach(element => {


            element.classList.add(

                'scroll-hidden'

            );


        });


});


const scrollObserver =

    new IntersectionObserver(

        entries => {


            entries.forEach(entry => {


                if (

                    entry.isIntersecting

                ) {


                    entry.target.classList.add(

                        'scroll-visible'

                    );


                    scrollObserver.unobserve(

                        entry.target

                    );


                }


            });


        },

        {

            threshold: 0.1

        }

    );


document
    .querySelectorAll('.scroll-hidden')
    .forEach(element => {

        scrollObserver.observe(element);

    });


/* =========================================================
   ДВИЖЕНИЕ СВЕТОВЫХ ЭФФЕКТОВ ЗА КУРСОРОМ
   ========================================================= */

const movingReflection =
    document.querySelector('.moving-reflection');


if (movingReflection) {


    let mouseX = 0;

    let mouseY = 0;

    let currentX = 0;

    let currentY = 0;


    document.addEventListener(

        'mousemove',

        event => {


            mouseX =

                event.clientX -

                300;


            mouseY =

                event.clientY -

                300;


        }

    );


    function animateReflection() {


        currentX +=

            (mouseX - currentX) *

            0.03;


        currentY +=

            (mouseY - currentY) *

            0.03;


        movingReflection.style.transform =

            `translate(${currentX}px, ${currentY}px)`;


        requestAnimationFrame(

            animateReflection

        );

    }


    animateReflection();


}


/* =========================================================
   ЭФФЕКТ TILT ДЛЯ КАРТОЧЕК
   ========================================================= */

const tiltCards = document.querySelectorAll(

    '.service-card, .review-card, .contact-card'

);


tiltCards.forEach(card => {


    card.addEventListener(

        'mousemove',

        event => {


            const rect =

                card.getBoundingClientRect();


            const x =

                event.clientX -

                rect.left;


            const y =

                event.clientY -

                rect.top;


            const centerX =

                rect.width / 2;


            const centerY =

                rect.height / 2;


            const rotateX =

                ((y - centerY) /

                    centerY) *

                -2;


            const rotateY =

                ((x - centerX) /

                    centerX) *

                2;


            card.style.transform =

                `perspective(800px)

                 rotateX(${rotateX}deg)

                 rotateY(${rotateY}deg)

                 translateY(-5px)`;


        }

    );


    card.addEventListener(

        'mouseleave',

        () => {


            card.style.transform =

                'perspective(800px) rotateX(0) rotateY(0)';


        }

    );


});


/* =========================================================
   ЗАЩИТА ОТ СЛИШКОМ БЫСТРОГО НАЖАТИЯ
   ========================================================= */

let isSubmitting = false;


document
    .querySelectorAll('form')
    .forEach(form => {


        form.addEventListener(

            'submit',

            () => {


                if (isSubmitting) {

                    return;

                }


                isSubmitting = true;


                setTimeout(() => {

                    isSubmitting = false;

                }, 2000);


            }

        );


    });


/* =========================================================
   КОНСОЛЬ
   ========================================================= */

console.log(

    'ВИНИР — Ваша улыбка, наша забота ✦'

);
