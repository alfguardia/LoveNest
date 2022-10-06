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
    if (!producto.value) {
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
        data.append('producto', registroProducto[0].value.toLowerCase());
        data.append('marca', registroProducto[1].value.toLowerCase());
        data.append('cantidad', registroProducto[2].value);
        data.append('categoria', registroProducto[3].value.toLowerCase());
        data.append('observacion', registroProducto[4].value.toLowerCase());

        const url = 'https://lovenest-app.herokuapp.com/API/registro-producto';
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
let productos; // variable para guardar copia de los productos
const listaSelect = document.querySelector('#option-list-select');

if (listaSelect) {
    listaSelect.addEventListener('change', function () {
        filtrar();
    })
}

document.addEventListener('DOMContentLoaded', function () {
    if (listaSelect) {
        obtenerProductos();
    }
})

function offLoader() {
    const loader = document.querySelector('.loader-page');
    if (loader) {
        loader.remove();
    }
}

async function obtenerProductos() {
    try {
        const url = 'https://lovenest-app.herokuapp.com/API/obtener-producto';
        const resultado = await fetch(url);
        const respuesta = await resultado.json();
        console.log(respuesta);
        if (respuesta) {
            offLoader();
            productos = [...respuesta];
            limpiarLista();
            ordenarProductos(respuesta);
        }
    } catch (error) {
        console.log(error);
    }
}

// Ordena los productos en orden por categorias
function ordenarProductos(productos) {
    // Ordenar productos por categoria
    productos.sort((producto1, producto2) => {
        if (producto1.producto < producto2.producto) {
            return -1;
        }
        if (producto1.producto > producto2.producto) {
            return 1;
        }
        if (producto1.producto === producto2.producto) {
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
        //Crear los elementos
        const product = document.createElement('LI');
        const icono = document.createElement('LI');
        const cantidad = document.createElement('LI');
        const divProduct = document.createElement('DIV');
        const divIcono = document.createElement('DIV');
        const labelProducto = document.createElement('LABEL');
        const iconoProducto = document.createElement('IMG');
        const checkbox = document.createElement('INPUT');
        const editarProducto = document.createElement('DIV');
        const eliminarProducto = document.createElement('DIV');
        const divOpciones = document.createElement('DIV');
        const cantidadProducto = document.createElement('P');



        // Agregando las clases
        product.classList.add('articulos');
        divProduct.classList.add('div-product');
        divIcono.classList.add('div-icono');
        labelProducto.classList.add('label-producto');
        iconoProducto.classList.add('img-categoria');
        editarProducto.classList.add('editar-producto');
        eliminarProducto.classList.add('eliminar-producto');
        divOpciones.classList.add('opciones');
        cantidadProducto.style.color = 'black';
        cantidadProducto.style.fontWeight = 'bold';

        // Otras propiedades y funciones
        cantidadProducto.textContent = producto.cantidad;

        labelProducto.textContent = producto.producto;
        labelProducto.setAttribute('for', producto.producto);
        // Iconos
        iconoProducto.src = `build/img/${producto.producto}.webp`;
        iconoProducto.onerror = function (e) {
            imagenDefault(e);
        }
        // CheckBox
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', producto.producto);

        // Funcion para editar
        editarProducto.onclick = () => {
            confirmarEdicion(producto);
        }

        eliminarProducto.onclick = () => {
            confirmarEliminar(producto);
        }

        // Funcion para eliminar

        //Adjuntando al HTML
        divProduct.appendChild(checkbox);
        divProduct.appendChild(labelProducto);
        divIcono.appendChild(iconoProducto);

        product.appendChild(divProduct);
        icono.appendChild(divIcono);
        cantidad.appendChild(cantidadProducto);
        divOpciones.appendChild(editarProducto);
        divOpciones.appendChild(eliminarProducto);

        listaProductos.appendChild(product);
        listaProductos.appendChild(icono);
        listaProductos.appendChild(cantidad);
        listaProductos.appendChild(divOpciones);


    });
}
// ---- fin de mostrar lista de productos ----

function imagenDefault(e) {
    e.target.src = 'build/img/default.webp';
}

// ---- Filtra los productos segun la elección ---
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
    ordenarProductos(array);
}
// ----- Fin de filtrar ------

function limpiarLista() {
    const listaProductos = document.querySelector('#lista_articulos');
    if (listaProductos) {
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
    }
}


// --- Editar producto ---
async function confirmarEdicion(producto) {
    const { value: formValues } = await Swal.fire({
        title: 'Actualizar Producto',
        html:
            '<form id="updateForm" method="POST" class="updateForm">' +
            '<label for="producto">Producto</label>' +
            '<input name="producto" id="swal-input1" class="swal2-input">' +
            '<label for="marca">Marca</label>' +
            '<input name="marca" id="swal-input2" class="swal2-input">' +
            '<label for="categoria">Categoria</label>' +
            '<input name="categoria" id="swal-input3" class="swal2-input">' +
            `<input type="hidden" name="id" value=${producto.id} >` +
            '</form>',
    })
    const updateForm = document.querySelector('#updateForm');
    const data = new FormData();
    data.append('producto', updateForm[0].value.toLowerCase());
    data.append('marca', updateForm[1].value.toLowerCase());
    data.append('categoria', updateForm[2].value.toLowerCase());
    data.append('id', updateForm[3].value);

    if (formValues) {
        try {
            Swal.fire({
                title: 'Actualizar Producto?',
                icon: 'question',
                showCancelButton: 'Cancelar',
                confirmButtonText: 'Guardar',
            }).then((result) => {
                if (result.isConfirmed) {
                    finalizarEdicion(data);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

async function finalizarEdicion(data) {
    const url = 'https://lovenest-app.herokuapp.com/API/editar-producto';
    const resultado = await fetch(url, {
        method: 'POST',
        body: data
    });
    const respuesta = await resultado.json();
    if (respuesta) {
        Swal.fire('Actualizado con exito!', '', 'success');
        limpiarLista();
        obtenerProductos();
    }
}

// --- Eliminar ---
async function confirmarEliminar(data) {

    try {
        Swal.fire({
            title: 'Eliminar Producto?',
            icon: 'question',
            showCancelButton: 'Cancelar',
            confirmButtonText: 'Eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminar(data);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function eliminar(producto) {
    const data = new FormData();
    data.append('id', producto.id);

    try {
        const url = 'https://lovenest-app.herokuapp.com/API/eliminar-producto';
        const resultado = await fetch(url, {
            method: 'POST',
            body: data
        });
        const respuesta = await resultado.json();
        if (respuesta) {
            Swal.fire('Producto eliminado!', '', 'success');
            limpiarLista();
            obtenerProductos();
        }
    }
    catch (error) {
        console.log(error);
    }
}

