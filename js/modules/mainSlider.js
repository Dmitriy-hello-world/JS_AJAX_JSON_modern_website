import {getZero} from './timer';

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

    total.textContent = getZero(slides.length);
    curent.textContent = getZero(i);


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
    curent.textContent = getZero(i);

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
    curent.textContent = getZero(i);

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
            curent.textContent = getZero(i);
        });
    });
}

export default mainSlider;