"use strict";

window.addEventListener("DOMContentLoaded", () => {
    
    // TABS HERE

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParents = document.querySelector(".tabheader__items");

        function hide() {
            tabsContent.forEach( item => {
                item.classList.add("hide", "fade");
                item.classList.remove("wision");
            });

            tabs.forEach( item => {
                item.classList.remove("tabheader__item_active");
            });
        }

        function wision(i = 0) {
            tabsContent[i].classList.add("wision");
            tabsContent[i].classList.remove("hide");

            tabs[i].classList.add("tabheader__item_active");
        }

        function mainTabs() {
            tabsParents.addEventListener("click", event => {
                const target = event.target;

                if (target && target.classList.contains("tabheader__item")) {
                    tabs.forEach( (item, i) => {
                        if ( item == target) {
                            hide();
                            wision(i);
                        }
                    });
                }
            });            
        }

        hide();
        wision();
        mainTabs();


    // TIMER HERE

    const deadlineTime = "2021-01-31";
    
    function getTime(deadlineTime) {
        const t = Date.parse(deadlineTime) - Date.parse(new Date()),
              days = Math.floor( t / (1000 * 60 * 60 * 24)),
              hours = Math.floor( (t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor( (t / (1000 * 60)) % 60),
              seconds = Math.floor( (t / 1000) % 60);

        return {
            t: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function mainTimer(selector, deadlineTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              clockInterval = setInterval(updateClock,1000);

        updateClock();      

        function updateClock() {
            const obj = getTime(deadlineTime);

            days.innerHTML = getZero(obj.days);
            hours.innerHTML = getZero(obj.hours);
            minutes.innerHTML = getZero(obj.minutes);
            seconds.innerHTML = getZero(obj.seconds);

            if ( obj.t <= 0 ) {
                clearInterval(clockInterval);
            }
        }
    }

    mainTimer(".timer", deadlineTime);

    //CLASS DAY MENU

    const menu = document.querySelector(".menu .container");

    class DayMenuCard {
        constructor(src,alt,title,text,price,parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.transer = 28;
            this.parent = document.querySelector(parentSelector);
            this.getUAH();
        }

        getUAH() {
            this.price = this.price * this.transer;
        }

        render() {
            const div = document.createElement("div");

            div.innerHTML = `
            <div class="menu__item">
                <img src="${this.src}" alt="${this.alt}">                    
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;

            this.parent.append(div);
        }
    }

    menu.innerHTML = "";

    // new DayMenuCard(
    //     "img/tabs/vegy.jpg",
    //     "Меню фитнес",
    //     "Фитнес",
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     5,
    //     ".menu .container"
    // ).render();
    
    // new DayMenuCard(
    //     "img/tabs/elite.jpg",
    //     "Меню Премиум",
    //     "Премиум",
    //     'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     9,
    //     ".menu .container"
    // ).render();

    // new DayMenuCard(
    //     "img/tabs/post.jpg",
    //     "Меню Постное",
    //     "Постное",
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     14,
    //     ".menu .container"
    // ).render();

    // async function getData(url) {
    //     const response = await fetch(url);

    //     return response.json();
    // }

    function showCardsWithClass(url,parentSelector) {
        axios.get(url)
        .then( response => {
            response.data.forEach( ({img,altimg,title,descr,price}) => {
                new DayMenuCard(img,altimg,title,descr,price,parentSelector).render();
            });
        });
    }

    showCardsWithClass('http://localhost:3000/menu', '.menu .container');

    // async function showCards(url) {
    //     const response = await getData(url);
        
    //     response.forEach( ({img,altimg,title,descr,price}) => {
    //         const div = document.createElement('div');

    //         div.classList.add('menu__item');
            
    //         price = price * 28;

    //         div.innerHTML = `
    //             <img src="${img}" alt="${altimg}">                    
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu__field .container').append(div);
    //     });
    // }

    // showCards('http://localhost:3000/menu');

    // MODAL WINDOW

        const modal = document.querySelector("[data-modal]"),
              modalOpen = document.querySelectorAll("[data-modalopen]"),
              timerModalOpen = setTimeout( modalWision, 1000 * 50 );

        function modalHide() {
            modal.classList.add('hide');
            modal.classList.remove('wision');

            document.documentElement.style.overflow = '';
        }

        function modalWision() {
            modal.classList.add('wision');
            modal.classList.remove('hide');

            document.documentElement.style.overflow = 'hidden';

            clearInterval(timerModalOpen);
        }

        modalOpen.forEach(item => {
            item.addEventListener('click', () => {
                modalWision();
            });
        });

        modal.addEventListener('click', event => {
            if ( event.target == modal || event.target.getAttribute('data-modalClose') == '') {
                modalHide();
            }
        });

        document.documentElement.addEventListener('keydown', event => {
            if (modal.classList.contains('wision') && event.code == 'Escape') {
                modalHide();
            }
        });

        window.addEventListener('scroll', function scroll() {
            if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                modalWision();
                window.removeEventListener('scroll',scroll);
            }            
        });
        console.log(window.pageYOffset + document.documentElement.clientHeight);
        console.log(document.documentElement.scrollHeight);
        // SEND MESSAGE

        const forms = document.querySelectorAll('form');

        async function postData(url,body) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            });

            return response.json(); 
        }

        function sendMessage(form) {
            form.addEventListener('submit', event => {
                event.preventDefault();
                const formData = new FormData(form),
                      status = {
                        complete: 'Все готово! Скоро мы с вами свяжемся.',
                        loading: 'img/forms/spinner.svg',
                        error: 'Что-то пошло не так.. Попробуйте немного позже.'
                      },
                      loadingDiv = document.createElement('img');
                
                loadingDiv.src = status.loading;
                loadingDiv.style.cssText = "display: block; margin: 5px auto;";
                form.insertAdjacentElement("afterend", loadingDiv);

                const jsonObj = JSON.stringify(Object.fromEntries(formData.entries()));      

                postData('http://localhost:3000/requests', jsonObj)
                .then( response => {
                    showThanksModal(status.complete);
                    loadingDiv.remove();
                    console.log(response);
                })
                .catch( () => {
                    loadingDiv.remove();
                    showThanksModal(status.error);
                })
                .finally( () => {
                    form.reset();
                });
            });
        }

        function showThanksModal(message) {
            const modalDialog = document.querySelector('.modal__dialog'),
                  thanksModalDiv = document.createElement('div');

            thanksModalDiv.classList.add('modal__dialog');
            thanksModalDiv.innerHTML = `
            <div class="modal__content">
                <form action="#">
                    <div data-modalClose class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>
            `;      

            modalWision();
            modalDialog.classList.add('hide');
            
            document.querySelector('[data-modal]').append(thanksModalDiv);

            setTimeout( ()=> {
                modalHide();
                modalDialog.classList.remove('hide');
                thanksModalDiv.remove();
            }, 4000 );
        }
       
        forms.forEach(item => {
            sendMessage(item);
        });

            
    // SLIDER HERE

    const slides = document.querySelectorAll('.offer__slide'),
    curent = document.querySelector('#current'),
    total = document.querySelector('#total'),
    slideLeft = document.querySelector('.offer__slider-prev'),
    slideRight = document.querySelector('.offer__slider-next'),
    sliderInner = document.querySelector('.offer__slider-inner'),
    sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(sliderWrapper).width;

    let i = 1;
    let offset = 0;

    total.textContent = getZero(slides.length);
    curent.textContent = getZero(i);


        sliderInner.style.width = 100 * slides.length + '%';
        sliderInner.style.display = 'flex'; 
        sliderInner.style.transition = '0.5s all';
        sliderWrapper.style.overflow = 'hidden';

    slides.forEach( slide => {
    slide.style.width = width;
    });

    slideRight.addEventListener('click', () => {

    if ( offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;

    if(i == slides.length) {
        i = 1;
    } else {
        i++;
    }
    curent.textContent = getZero(i);
    });

    slideLeft.addEventListener('click', () => {

    if ( offset == 0 ) {
        offset = width.slice(0, width.length - 2) * (slides.length - 1);
    } else { 
        offset -= width.slice(0, width.length - 2);
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;

    if (i == 1) {
        i = slides.length;
    } else {
        i--;
    }
    curent.textContent = getZero(i);
    });

        







    // total.textContent = getZero(slides.length);

    // function showSlide(i) {
    //     slides[i].classList.add('wision');
    //     slides[i].classList.remove('hide');
    // }

    // function hideSlide() {
    //     slides.forEach( slide => {
    //         slide.classList.add('hide');
    //         slide.classList.remove('wision');
    //     });
    // }

    // function slider(i) {
    //     hideSlide();
    //     showSlide(i);
    //     curent.textContent = getZero(i + 1);
    // }
    // slider(i);

    // slideLeft.addEventListener('click', () => {
    //     --i;
    //     if (i < 0) {
    //         i = slides.length - 1;
    //     }
    //     slider(i);
    //     console.log(i);
    //     console.log(slides[i]);
    // });

    // slideRight.addEventListener('click', () => {
    //     ++i;
    //     if (i > 3) {
    //         i = 0;
    //     }
    //     slider(i);
    // });

});