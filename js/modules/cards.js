function cards() {
    
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

module.exports = cards;