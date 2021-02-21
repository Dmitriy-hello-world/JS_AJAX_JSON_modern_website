'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calc from './modules/calc';
import cards from './modules/cards';
import mainSlider from './modules/mainSlider';
import modal from './modules/modal';
import sendMessage from './modules/sendMessage';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {modalWision} from './modules/modal';

window.addEventListener("DOMContentLoaded", () => {     
    
    const timerModalOpen = setTimeout( () => modalWision("[data-modal]",timerModalOpen), 1000 * 50 );

    calc();
    cards(".menu .container");
    mainSlider({
        allSlides: '.offer__slide',
        number: '#current',
        fullNumber: '#total',
        arrowRight: '.offer__slider-next',
        arrowLeft: '.offer__slider-prev',
        inner: '.offer__slider-inner',
        wrapper: '.offer__slider-wrapper',
        offerSlider: '.offer__slider'
    });
    modal("[data-modal]","[data-modalopen]",timerModalOpen);
    sendMessage("[data-modal]",timerModalOpen, 'form');
    tabs({
        allTabs: ".tabheader__item" ,
        content: ".tabcontent",
        allParent: ".tabheader__items",
        activeClass: "tabheader__item_active",
        hideClass: "hide",
        wisionClass: "wision",
        animateClass: "fade"
    });
    timer(".timer", '2021-02-28');   
});