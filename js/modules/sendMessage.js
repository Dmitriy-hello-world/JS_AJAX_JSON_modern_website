import {modalWision, modalHide} from './modal';
import {postData} from '../workfunc/data';

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

        modalWision(modalSelector,timerModalOpen);
        modalDialog.classList.add('hide');
        
        document.querySelector('[data-modal]').append(thanksModalDiv);

        setTimeout( ()=> {
            modalHide(modalSelector);
            modalDialog.classList.remove('hide');
            thanksModalDiv.remove();
        }, 4000 );
    }
   
    forms.forEach(item => {
        sendMessage(item);
    });
}

export default sendMessage;