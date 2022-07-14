//  ---- Registro de productos ----
const registroProducto = document.querySelector('#registro_producto_mercado');

if (registroProducto) {
    registroProducto.addEventListener('submit', function (e) {
        mostrarMensaje(e);
    })
}
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

    if (!producto.value || !precio.value) {
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
        if (respuesta) {
            setTimeout(() => {
                document.querySelector('.swal2-container').remove();
                const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
                inputs.forEach(function (fields) {
                    fields.value = '';
                })
            }, 2000);
        }
    } catch (error) {
        Swal.fire('Error!', '', 'error');
    }
}
// ---- Fin del registro de productos ----


//  ---- Obtener y listar los productos- ----
const listaSelect = document.querySelector('#option-list-select');
let productos = {
    id: '',
    fecha: '',
    producto: '',
    marca: '',
    precio: '',
    cantidad: '',
    categoria: '',
    foto: '',
    observacion: '',
    usuarioId: ''
};
listaSelect.addEventListener('change', function () {
    filtrar();
})

document.addEventListener('DOMContentLoaded', function () {
    obtenerProductos();
})

async function obtenerProductos() {
    try {
        const url = 'http://localhost:3000/API/obtener-producto';
        const resultado = await fetch(url);
        const respuesta = await resultado.json();

        if (respuesta) {
            productos = [...respuesta];
            limpiarLista();
            ordenarProductos(respuesta);

            // if (listaSelect.value === '' || listaSelect.value === 'todos') {
            //     limpiarLista();
            //     ordenarProductos(respuesta);
            // } else {
            //     filtrar(respuesta, listaSelect.value);
            // }
        }
    } catch (error) {
        console.log(error);
    }
}

// Ordena los productos en orden por categorias
function ordenarProductos(productos) {
    // Ordenar productos por categoria
    productos.sort((producto1, producto2) => {
        if (producto1.categoria < producto2.categoria) {
            return -1;
        }
        if (producto1.categoria > producto2.categoria) {
            return 1;
        }
        if (producto1.categoria === producto2.categoria) {
            return 0;
        }
    });
    // Muestra la lista de productos por categoria
    mostrarListas(productos);
}
// Muestra la lista de productos por categoria
function mostrarListas(productos) {
    const listaProductos = document.querySelector('#lista_articulos');
    productos.forEach(function (producto) {
        const product = document.createElement('LI');
        product.classList.add('articulos');

        const category = document.createElement('LI');
        category.classList.add('articulos-categoria');

        const divProduct = document.createElement('DIV');
        divProduct.classList.add('div-product');

        const divCategory = document.createElement('DIV');
        divCategory.classList.add('div-category');

        const labelProducto = document.createElement('LABEL');
        labelProducto.textContent = producto.producto;
        labelProducto.classList.add('label-producto');
        labelProducto.setAttribute('for', producto.producto);

        const labelDescripcionProducto = document.createElement('LABEL');
        labelDescripcionProducto.textContent = producto.categoria;
        labelDescripcionProducto.classList.add('label-categoria');

        const checkbox = document.createElement('INPUT');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', producto.producto);


        divProduct.appendChild(checkbox);
        divProduct.appendChild(labelProducto);
        divCategory.appendChild(labelDescripcionProducto);

        product.appendChild(divProduct);
        category.appendChild(divCategory);
        listaProductos.appendChild(product);
        listaProductos.appendChild(category);
    });
}
// ---- fin de mostrar lista de productos ----

function filtrar() {
    limpiarLista();
    let array = [];
    productos.forEach(element => {
        if (element.categoria === listaSelect.value) {
            array.push(element);
        } else if (listaSelect.value === 'todos') {
            array.push(element);
        }
    });
    mostrarListas(array);
}

function limpiarLista() {
    const listaProductos = document.querySelector('#lista_articulos');
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
}
