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

module.exports = calc;