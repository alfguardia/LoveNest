/// --- Alertas -----
const alertasContainer = document.querySelector('#alertas-container');
if (alertasContainer) {
    setTimeout(() => {
        alertasContainer.remove();
    }, 3000);
}
/// ------- Crear menu de Navegacion

const navBtn = document.querySelector('#home-btn');
if (navBtn) {
    const aside = document.querySelector('.aside');
    navBtn.addEventListener('click', function () {
        aside.classList.toggle('mostrar');
    })

    aside.addEventListener('click', function () {
        aside.classList.remove('mostrar');
        aside.classList.add('ocultar');
        setTimeout(() => {
            aside.classList.remove('ocultar');
        }, 1000);
    })


}


