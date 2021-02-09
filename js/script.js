"use strict";

window.addEventListener("DOMContentLoaded", () => {         
 const calc = require('./modules/calc'),
       cards = require('./modules/cards'),
       mainSlider = require('./modules/mainSlider'),
       modal = require('./modules/modal'),
       sendMessage = require('./modules/sendMessage'),
       tabs = require('./modules/tabs'),
       timer = require('./modules/timer');

    calc();
    cards();
    mainSlider();
    modal();
    sendMessage();
    tabs();
    timer();   
});