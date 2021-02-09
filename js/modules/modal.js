function modal() {

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
    if ( window.pageYOffset + document.documentElement.clientHeight >= (document.documentElement.scrollHeight - 1)) {
        modalWision();
        window.removeEventListener('scroll',scroll);
    }            
    });
}

module.exports = modal;