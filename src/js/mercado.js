
//  ---- Registro de productos ----
const registroProducto = document.querySelector('#registro_producto_mercado');




registroProducto.addEventListener('submit', function (e) {
    mostrarMensaje(e);
})
// 1er paso
function mostrarMensaje(e) {
    e.preventDefault();
    const respuesta = validarCampos();

    if (respuesta) {
        Swal.fire({
            title: 'Registrar Producto?',
            icon: 'question',
            showCancelButton: 'Cancelar',
            confirmButtonText: 'Guardar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Guardado con exito!', '', 'success')
                registerProduct(e);
            }
        })
    }
}

// 2do paso
function validarCampos() {
    const producto = document.querySelector('#producto');
    const marca = document.querySelector('#marca');
    const precio = document.querySelector('#precio');

    if (!producto.value || !marca.value || !precio.value) {
        Swal.fire('Falta información!', '', 'error');
        return false;
    } else {
        return true;
    }
}

// 3er paso
async function registerProduct() {
    //Fetch API
    try {
        const data = new FormData(registroProducto);
        const url = 'http://localhost:3000/API/registro-producto';
        const resultado = await fetch(url, {
            method: 'POST',
            body: data
        });
        const respuesta = await resultado.json();
        console.log(respuesta);
        if (respuesta) {
            setTimeout(() => {
                document.querySelector('.swal2-container').remove();
                const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
                inputs.forEach(function(fields) {
                    fields.value = '';
                })
            }, 2000);
        }
    } catch (error) {
        Swal.fire('Error!', '', 'error');
    }
}
// ---- Fin del registro de productos ----