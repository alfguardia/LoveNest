
// Variables
const cuotas = document.querySelector('#categoria');
const cantidadCuotas = document.querySelector('#div-cuotas');
const gastosForm = document.querySelector('#gastos-form');
const listaSelect = document.querySelector('#option-list-select');
let gastos = [];
// Listeners
document.addEventListener('DOMContentLoaded', function () {
    if (filtrar) {
        obtenerGastos();
    }
})

if (cuotas) {
    cuotas.addEventListener('change', mostrarCuotas);
}

if (gastosForm) {
    gastosForm.addEventListener('submit', validarCampos);
}

if (listaSelect) {
    listaSelect.addEventListener('change', function () {
        filtrar();
    })
}

// Funciones
// si selecciona cuotas, despliega cuantas cuotas
function mostrarCuotas() {
    if (cuotas.value === 'cuotas') {
        cantidadCuotas.classList.remove('gasto-cuotas');
        cantidadCuotas.classList.add('gasto-cuotas-show');
    } else {
        cantidadCuotas.classList.add('gasto-cuotas');
        cantidadCuotas.classList.remove('gasto-cuotas-show');
    }
}
// Validar Campos
function validarCampos(e) {
    e.preventDefault();
    const campos = document.querySelectorAll('.gasto-input');
    let fields = [...campos];
    const resultado = fields.some(campo => campo.value === '');
    if (resultado) {
        const alerta = document.createElement('P');
        alerta.classList.add('alerta');
        alerta.textContent = 'Falta informacion';
        gastosForm.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 2000);
    } else {
        confirmacion();
    }
}
// Confirmación de registro del gasto
function confirmacion() {
    try {
        Swal.fire({
            title: 'Registrar Gasto?',
            icon: 'question',
            showCancelButton: 'Cancelar',
            confirmButtonText: 'Guardar',
        }).then((result) => {
            if (result.isConfirmed) {
                guardarGastos();
            }
        })
    } catch (error) {
        console.log(error);
    }
}
// Registra el gasto
async function guardarGastos() {
    try {
        const data = new FormData(gastosForm);
        const url = 'http://localhost:3000/gastos'
        const resultado = await fetch(url, {
            method: 'POST',
            body: data
        })
        const respuesta = await resultado.json();
        if (respuesta) {
            Swal.fire('Registrado con exito!', '', 'success');
            gastosForm.reset();
        } else {
            Swal.fire('Ha ocurrido un error', '', 'error');
        }
    } catch (error) {
        console.log(error);
    }
}

// Lista de gastos

async function obtenerGastos() {
    const url = 'http://localhost:3000/API/obtener-gastos';
    try {
        const resultado = await fetch(url);
        const respuesta = await resultado.json();
        gastos = [...respuesta];
        // Saca el loader
        offLoader();
        // Calcula el total de gastos
        totalGastos(respuesta);
        // Actualiza el HTML
        limpiarListaGastos();
        // Ordena los gastos por orden alfabetico
        ordenarGastos(respuesta);
    }
    catch (error) {
        console.log(error);
    }
}

function offLoader() {
    const loader = document.querySelector('.loader-page');
    if (loader) {
        loader.remove();
    }
}

function limpiarListaGastos() {
    const listaProductos = document.querySelector('#lista_articulos');
    if (listaProductos) {
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
    }
}

function ordenarGastos(gastos) {
    // Ordenar productos por categoria
    gastos.sort((gasto1, gasto2) => {
        if (gasto1.producto < gasto2.producto) {
            return -1;
        }
        if (gasto1.producto > gasto2.producto) {
            return 1;
        }
        if (gasto1.producto === gasto2.producto) {
            return 0;
        }
    });
    // Muestra la lista de productos por categoria
    mostrarListas(gastos);
}

function mostrarListas(gastos) {
    const listaProductos = document.querySelector('#lista_articulos');
    gastos.forEach(function (gasto) {
        //Crear los elementos
        const nombreGasto = document.createElement('LI');
        const icono = document.createElement('LI');
        const divGasto = document.createElement('DIV');
        const divCategoria = document.createElement('DIV');
        const labelGasto = document.createElement('LABEL');
        const categoria = document.createElement('LABEL');
        const checkbox = document.createElement('INPUT');
        const editarGasto = document.createElement('DIV');
        const eliminarGasto = document.createElement('DIV');
        const divOpciones = document.createElement('DIV');


        // Agregando las clases
        nombreGasto.classList.add('articulos');
        divGasto.classList.add('div-product');
        divCategoria.classList.add('div-icono');
        labelGasto.classList.add('label-producto');
        categoria.classList.add('label-producto');

        editarGasto.classList.add('editar-producto');
        eliminarGasto.classList.add('eliminar-producto');
        divOpciones.classList.add('opciones');

        // Otras propiedades y funciones
        if (gasto.categoria === 'cuotas') {
            categoria.textContent = `${gasto.categoria}(${gasto.cuotas})`;
        } else {
            categoria.textContent = gasto.categoria;
        }
        labelGasto.textContent = gasto.gasto;
        labelGasto.setAttribute('for', gasto.gasto);
        // Iconos

        // CheckBox
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', gasto.gasto);

        // Funcion para editar
        editarGasto.onclick = () => {
            confirmarEdicion(gasto);
        }

        eliminarGasto.onclick = () => {
            confirmarEliminar(gasto);
        }

        // Funcion para eliminar

        //Adjuntando al HTML
        divGasto.appendChild(checkbox);
        divGasto.appendChild(labelGasto);
        divCategoria.appendChild(categoria);

        nombreGasto.appendChild(divGasto);
        icono.appendChild(divCategoria);
        divOpciones.appendChild(editarGasto);
        divOpciones.appendChild(eliminarGasto);

        listaProductos.appendChild(nombreGasto);
        listaProductos.appendChild(icono);
        listaProductos.appendChild(divOpciones);

    });
}

async function confirmarEdicion(gastos) {
    const { gasto, monto, id, cuotas, categoria } = gastos;
    const cuotasInt = parseInt(cuotas);
    const { value: formValues } = await Swal.fire({
        title: 'Actualizar Producto',
        html:
            '<form id="updateForm" method="POST" class="updateForm">' +

            '<label for="gasto">Gasto</label>' +
            `<input name="gasto" id="swal-input1" value=${gasto}  class="swal2-input">` +

            '<label for="monto">Monto</label>' +
            `<input name="monto" id="swal-input2" value=${monto} class="swal2-input">` +

            '<label for="categoria">Categoria</label>' +
            `<select name="categoria" id="swal-input3" class="swal2-input select-text" onchange="conCuotas()">
            <option selected disable value="${categoria}">${categoria}</option>
            <option value="mensual">Mensual</option>
            <option value="extra">Extra</option>
            <option value="cuotas">Cuotas</option>
            </select>` +


            '<label id ="labelCuotas" for="cuotas" class="cuotasOff">N° Cuotas</label>' +
            `<input name="cantidad-cuotas" type="number" id="swal-input4" value=${cuotasInt} class="swal2-input cuotasOff">` +

            `<input type="hidden" name="id" value=${id} >` +
            '</form>',
    })
    const updateForm = document.querySelector('#updateForm');
    const data = new FormData();
    data.append('gasto', updateForm[0].value.toLowerCase());
    data.append('monto', updateForm[1].value.toLowerCase());
    data.append('categoria', updateForm[2].value.toLowerCase());
    data.append('cantidad-cuotas', updateForm[3].value);
    data.append('id', updateForm[4].value);

    if (formValues) {
        try {
            Swal.fire({
                title: 'Actualizar?',
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

// Finalizar edición de cuotas
async function finalizarEdicion(data) {
    const url = 'http://localhost:3000/API/editar-gastos';
    const resultado = await fetch(url, {
        method: 'POST',
        body: data
    });
    const respuesta = await resultado.json();
    if (respuesta) {
        Swal.fire('Actualizado con exito!', '', 'success');
        limpiarListaGastos();
        obtenerGastos();
    }
}


// Funciones helper


function totalGastos(gastos) {
    const totalSpan = document.querySelector('#total__span');
    let total = 0;
    gastos.forEach(gasto => total += Number(gasto.monto));
    totalSpan.classList.add('total-gasto');
    totalSpan.textContent = `${total} $`;
}

// Mostrar cantidad de cuotas
function conCuotas() {
    const categoria = document.querySelector('#swal-input3');
    const cuotas = document.querySelector('#swal-input4')
    const labelCuotas = document.querySelector('#labelCuotas');
    if (categoria.value === 'cuotas') {
        labelCuotas.classList.remove('cuotasOff');
        labelCuotas.classList.add('cuotas');
        cuotas.classList.remove('cuotasOff');
        cuotas.classList.add('cuotas');
    } else {
        labelCuotas.classList.add('cuotasOff');
        labelCuotas.classList.remove('cuotas');
        cuotas.classList.add('cuotasOff');
        cuotas.classList.remove('cuotas');
    }
}

// Imagen por default cuando no se tiene icono
function imagenDefault(e) {
    e.target.src = 'build/img/default.webp';
}


// Filtra gastos
function filtrar() {
    limpiarListaGastos();
    let array = [];
    array = gastos.filter(gasto => gasto.categoria === listaSelect.value);
    if (array.length <= 0) {
        array = gastos
    }
    ordenarGastos(array);
}

// Eliminar Gastos
function confirmarEliminar(gasto) {
    Swal.fire({
        title: 'Eliminar?',
        icon: 'question',
        showCancelButton: 'Cancelar',
        confirmButtonText: 'Guardar',
    }).then((result) => {
        if (result.isConfirmed) {
            finalizarEliminado(gasto);
        }
    })
}

async function finalizarEliminado(gasto) {
    const { id } = gasto;
    const data = new FormData();
    data.append('id', id);

    try {
        const url = 'http://localhost:3000/API/eliminar-gasto';
        const resultado = await fetch(url, {
            method: 'POST',
            body: data
        });
        const respuesta = await resultado.json();
        if (respuesta) {
            Swal.fire('Producto eliminado', '', 'success');
            limpiarListaGastos();
            obtenerGastos();
        }

    } catch (error) {
        console.log(error);
    }
}

