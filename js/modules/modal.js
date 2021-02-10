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

export default modal;
export {modalWision,modalHide};