/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span'),
    parentsForCalc = document.querySelectorAll('.calculating__choose');
    let ratio,weight,height,sex,age;

    if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
    } else {
    localStorage.setItem('sex', 'female');
    sex = localStorage.getItem('sex');
    }

    if (localStorage.getItem('ratio')) {
    ratio = +localStorage.getItem('ratio');
    } else {
    localStorage.setItem('ratio', 1.2);
    ratio = +localStorage.getItem('ratio');
    }

    function calcColories() {
    if(!ratio || !weight || !height || !sex || !age) {
        result.textContent = '____';
        return;
    }

    if (sex === 'male') {
        result.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * ratio);
    } else if (sex === 'female') {
        result.textContent =  Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * ratio);
    }
    }

    function getVariablesForCalc(parent) {
    const inputs = parent.querySelectorAll('.calculating__choose-item');
    
    inputs.forEach(item => {
        if (item.id === 'height' || item.id === 'weight' || item.id === 'age') {
            item.value = '';
            item.addEventListener('input', event => {

                if (event.target.value.match(/\D/g)) {
                    event.target.style.border = '1px solid red';
                } else {
                    event.target.style.border = '';
                }

                switch (event.target.id) {
                    case 'height':
                        height = +event.target.value;
                        break;
                    case 'weight':
                        weight = +event.target.value;
                        break;
                    case 'age':
                        age = +event.target.value;
                        break;
                }
                
                calcColories();
            });
        } else { 
            item.addEventListener('click', event => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                }

                if (event.target.id === 'male') {
                    sex = 'male';
                    localStorage.setItem('sex', 'male');
                } else if (event.target.id === 'female') {
                    sex = 'female';
                    localStorage.setItem('sex', 'female');
                }

                inputs.forEach(item => {
                    item.classList.remove('calculating__choose-item_active');
                });

                event.target.classList.add('calculating__choose-item_active');

                calcColories();
            });    
        }
    });
    }

    function getDataFromLocalStorage(parentClass) {
    const items = document.querySelectorAll(`${parentClass} .calculating__choose-item`); 

    items.forEach(item => {
        item.classList.remove('calculating__choose-item_active');

        if (item.id === localStorage.getItem('sex')) {
            item.classList.add('calculating__choose-item_active');
        } else if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            item.classList.add('calculating__choose-item_active');
        }
    });
    }

    getDataFromLocalStorage('#gender');
    getDataFromLocalStorage('.calculating__choose_big');
    calcColories();
    parentsForCalc.forEach(parent => {
    getVariablesForCalc(parent);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(menuConteiner) {
    
    const menu = document.querySelector(menuConteiner);

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

    async function getData(url) {
        const response = await fetch(url);

        return response.json();
    }

    async function showCardsWithClass(url,parentSelector) {
        getData(url)
            .then( response => { response.forEach( ({img,altimg,title,descr,price}) => {
                new DayMenuCard(img,altimg,title,descr,price,parentSelector).render();
            });
        });
    }

    showCardsWithClass('http://localhost:3000/menu', '.menu .container');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/mainSlider.js":
/*!**********************************!*\
  !*** ./js/modules/mainSlider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function mainSlider({allSlides, number, fullNumber, arrowRight, arrowLeft, inner, wrapper, offerSlider}) {
    const slides = document.querySelectorAll(allSlides),
    curent = document.querySelector(number),
    total = document.querySelector(fullNumber),
    slideLeft = document.querySelector(arrowLeft),
    slideRight = document.querySelector(arrowRight),
    sliderInner = document.querySelector(inner),
    sliderWrapper = document.querySelector(wrapper),
    width = window.getComputedStyle(sliderWrapper).width;

    let i = 1;
    let offset = 0;

    total.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);
    curent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(i);


    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.transition = '0.5s all';

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
    curent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(i);

    slidePointActive(i);
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
    curent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(i);

    slidePointActive(i);
    });

    //  SLIDER-POINT HERE

    const sliderArea = document.querySelector(offerSlider);
    const sliderPointDiv = document.createElement('div');
    const dots = [];
     
    sliderArea.style.position = 'relative';
    sliderPointDiv.classList.add('carousel-indicators');

    slides.forEach( (slide,id) => {
        const point = document.createElement('div');
         
        point.classList.add('dot');

        point.setAttribute(`data-id`, id + 1);

        sliderPointDiv.insertAdjacentElement('beforeend', point);
        dots.push(point);
    });

    sliderArea.insertAdjacentElement('beforeend',sliderPointDiv);

    function slidePointActive(i = 1) {
        dots.forEach( (dot, id) => {
            if (id === i - 1) {
                dot.classList.add('dot-active');
            } else {
                dot.classList.remove('dot-active');
            }
        });
    }
    slidePointActive();

    dots.forEach( (dot,id) => {
        dot.addEventListener('click', event => {
            const dataId = event.target.getAttribute('data-id');

            i = dataId;

            offset = +width.slice(0, width.length - 2) * (dataId - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;

            dots.forEach( dot => {
                dot.classList.remove('dot-active');
            });
            dots[id].classList.add('dot-active');
            curent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(i);
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainSlider);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalWision": () => (/* binding */ modalWision),
/* harmony export */   "modalHide": () => (/* binding */ modalHide)
/* harmony export */ });
function modalWision(modalSelector,timerModalOpen) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('wision');
    modal.classList.remove('hide');

    document.documentElement.style.overflow = 'hidden';

    if (timerModalOpen) {
        clearInterval(timerModalOpen);
    }
}

function modalHide(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('wision');

    document.documentElement.style.overflow = '';
}

function modal(modalSelector, btnOpen, timerModalOpen) {

    const modal = document.querySelector(modalSelector),
    modalOpen = document.querySelectorAll(btnOpen);

    modalOpen.forEach(item => {
        item.addEventListener('click', () => {
            modalWision(modalSelector,timerModalOpen);
        });
    });

    modal.addEventListener('click', event => {
        if ( event.target == modal || event.target.getAttribute('data-modalClose') == '') {
            modalHide(modalSelector);
        }
    });

    document.documentElement.addEventListener('keydown', event => {
    if (modal.classList.contains('wision') && event.code == 'Escape') {
        modalHide(modalSelector);
    }
    });

    window.addEventListener('scroll', function scroll() {
    if ( window.pageYOffset + document.documentElement.clientHeight >= (document.documentElement.scrollHeight - 1)) {
        modalWision(modalSelector,timerModalOpen);
        window.removeEventListener('scroll',scroll);
    }            
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/sendMessage.js":
/*!***********************************!*\
  !*** ./js/modules/sendMessage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _workfunc_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../workfunc/data */ "./js/workfunc/data.js");



function sendMessage(modalSelector,timerModalOpen, form) {
    const forms = document.querySelectorAll(form);

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

            (0,_workfunc_data__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', jsonObj)
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

        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalWision)(modalSelector,timerModalOpen);
        modalDialog.classList.add('hide');
        
        document.querySelector('[data-modal]').append(thanksModalDiv);

        setTimeout( ()=> {
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalHide)(modalSelector);
            modalDialog.classList.remove('hide');
            thanksModalDiv.remove();
        }, 4000 );
    }
   
    forms.forEach(item => {
        sendMessage(item);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMessage);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(allTabs,content,allParent) {

    const tabs = document.querySelectorAll(allTabs),
    tabsContent = document.querySelectorAll(content),
    tabsParents = document.querySelector(allParent);

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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
    if (num >= 0 && num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

function timer(classSelector,deadlineTime) {
    
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

    mainTimer(classSelector, deadlineTime);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_mainSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/mainSlider */ "./js/modules/mainSlider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_sendMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/sendMessage */ "./js/modules/sendMessage.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











window.addEventListener("DOMContentLoaded", () => {     
    
    const timerModalOpen = setTimeout( () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalWision)("[data-modal]",timerModalOpen), 1000 * 50 );

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)(".menu .container");
    (0,_modules_mainSlider__WEBPACK_IMPORTED_MODULE_2__.default)({
        allSlides: '.offer__slide',
        number: '#current',
        fullNumber: '#total',
        arrowRight: '.offer__slider-next',
        arrowLeft: '.offer__slider-prev',
        inner: '.offer__slider-inner',
        wrapper: '.offer__slider-wrapper',
        offerSlider: '.offer__slider'
    });
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)("[data-modal]","[data-modalopen]",timerModalOpen);
    (0,_modules_sendMessage__WEBPACK_IMPORTED_MODULE_4__.default)("[data-modal]",timerModalOpen, 'form');
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)(".tabheader__item",".tabcontent",".tabheader__items");
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)(".timer", '2021-02-28');   
});

/***/ }),

/***/ "./js/workfunc/data.js":
/*!*****************************!*\
  !*** ./js/workfunc/data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map