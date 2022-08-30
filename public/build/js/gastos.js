const cuotas=document.querySelector("#categoria"),cantidadCuotas=document.querySelector("#div-cuotas"),gastosForm=document.querySelector("#gastos-form"),listaSelect=document.querySelector("#option-list-select");let gastos=[];function mostrarCuotas(){"cuotas"===cuotas.value?(cantidadCuotas.classList.remove("gasto-cuotas"),cantidadCuotas.classList.add("gasto-cuotas-show")):(cantidadCuotas.classList.add("gasto-cuotas"),cantidadCuotas.classList.remove("gasto-cuotas-show"))}function validarCampos(t){t.preventDefault();if([...document.querySelectorAll(".gasto-input")].some(t=>""===t.value)){const t=document.createElement("P");t.classList.add("alerta"),t.textContent="Falta informacion",gastosForm.appendChild(t),setTimeout(()=>{t.remove()},2e3)}else confirmacion()}function confirmacion(){try{Swal.fire({title:"Registrar Gasto?",icon:"question",showCancelButton:"Cancelar",confirmButtonText:"Guardar"}).then(t=>{t.isConfirmed&&guardarGastos()})}catch(t){console.log(t)}}async function guardarGastos(){try{const t=new FormData(gastosForm),a="https://lovenest-app.herokuapp.com/gastos",o=await fetch(a,{method:"POST",body:t});await o.json()?(Swal.fire("Registrado con exito!","","success"),gastosForm.reset()):Swal.fire("Ha ocurrido un error","","error")}catch(t){console.log(t)}}async function obtenerGastos(){try{const t=await fetch("https://lovenest-app.herokuapp.com//API/obtener-gastos"),a=await t.json();gastos=[...a],offLoader(),totalGastos(a),limpiarListaGastos(),ordenarGastos(a)}catch(t){console.log(t)}}function offLoader(){const t=document.querySelector(".loader-page");t&&t.remove()}function limpiarListaGastos(){const t=document.querySelector("#lista_articulos");if(t)for(;t.firstChild;)t.removeChild(t.firstChild)}function ordenarGastos(t){t.sort((t,a)=>t.producto<a.producto?-1:t.producto>a.producto?1:t.producto===a.producto?0:void 0),mostrarListas(t)}function mostrarListas(t){const a=document.querySelector("#lista_articulos");t.forEach((function(t){const o=document.createElement("LI"),e=document.createElement("LI"),s=document.createElement("DIV"),n=document.createElement("DIV"),c=document.createElement("LABEL"),i=document.createElement("LABEL"),r=document.createElement("INPUT"),l=document.createElement("DIV"),u=document.createElement("DIV"),d=document.createElement("DIV");o.classList.add("articulos"),s.classList.add("div-product"),n.classList.add("div-icono"),c.classList.add("label-producto"),i.classList.add("label-producto"),l.classList.add("editar-producto"),u.classList.add("eliminar-producto"),d.classList.add("opciones"),"cuotas"===t.categoria?i.textContent=`${t.categoria}(${t.cuotas})`:i.textContent=t.categoria,c.textContent=t.gasto,c.setAttribute("for",t.gasto),r.setAttribute("type","checkbox"),r.setAttribute("name",t.gasto),l.onclick=()=>{confirmarEdicion(t)},u.onclick=()=>{confirmarEliminar(t)},s.appendChild(r),s.appendChild(c),n.appendChild(i),o.appendChild(s),e.appendChild(n),d.appendChild(l),d.appendChild(u),a.appendChild(o),a.appendChild(e),a.appendChild(d)}))}async function confirmarEdicion(t){const{gasto:a,monto:o,id:e,cuotas:s,categoria:n}=t,c=parseInt(s),{value:i}=await Swal.fire({title:"Actualizar Producto",html:`<form id="updateForm" method="POST" class="updateForm"><label for="gasto">Gasto</label><input name="gasto" id="swal-input1" value=${a}  class="swal2-input"><label for="monto">Monto</label><input name="monto" id="swal-input2" value=${o} class="swal2-input"><label for="categoria">Categoria</label><select name="categoria" id="swal-input3" class="swal2-input select-text" onchange="conCuotas()">\n            <option selected disable value="${n}">${n}</option>\n            <option value="mensual">Mensual</option>\n            <option value="extra">Extra</option>\n            <option value="cuotas">Cuotas</option>\n            </select><label id ="labelCuotas" for="cuotas" class="cuotasOff">N° Cuotas</label><input name="cantidad-cuotas" type="number" id="swal-input4" value=${c} class="swal2-input cuotasOff"><input type="hidden" name="id" value=${e} ></form>`}),r=document.querySelector("#updateForm"),l=new FormData;if(l.append("gasto",r[0].value.toLowerCase()),l.append("monto",r[1].value.toLowerCase()),l.append("categoria",r[2].value.toLowerCase()),l.append("cantidad-cuotas",r[3].value),l.append("id",r[4].value),i)try{Swal.fire({title:"Actualizar?",icon:"question",showCancelButton:"Cancelar",confirmButtonText:"Guardar"}).then(t=>{t.isConfirmed&&finalizarEdicion(l)})}catch(t){console.log(t)}}async function finalizarEdicion(t){const a=await fetch("https://lovenest-app.herokuapp.com/API/editar-gastos",{method:"POST",body:t});await a.json()&&(Swal.fire("Actualizado con exito!","","success"),limpiarListaGastos(),obtenerGastos())}function totalGastos(t){const a=document.querySelector("#total__span");let o=0;t.length>0&&(t.forEach(t=>o+=Number(t.monto)),a.classList.add("total-gasto"),a.textContent=o+" $")}function conCuotas(){const t=document.querySelector("#swal-input3"),a=document.querySelector("#swal-input4"),o=document.querySelector("#labelCuotas");"cuotas"===t.value?(o.classList.remove("cuotasOff"),o.classList.add("cuotas"),a.classList.remove("cuotasOff"),a.classList.add("cuotas")):(o.classList.add("cuotasOff"),o.classList.remove("cuotas"),a.classList.add("cuotasOff"),a.classList.remove("cuotas"))}function imagenDefault(t){t.target.src="build/img/default.webp"}function filtrar(){limpiarListaGastos();let t=[];t=gastos.filter(t=>t.categoria===listaSelect.value),t.length<=0&&(t=gastos),ordenarGastos(t)}function confirmarEliminar(t){Swal.fire({title:"Eliminar?",icon:"question",showCancelButton:"Cancelar",confirmButtonText:"Guardar"}).then(a=>{a.isConfirmed&&finalizarEliminado(t)})}async function finalizarEliminado(t){const{id:a}=t,o=new FormData;o.append("id",a);try{const t="https://lovenest-app.herokuapp.com/API/eliminar-gasto",a=await fetch(t,{method:"POST",body:o});await a.json()&&(Swal.fire("Producto eliminado","","success"),limpiarListaGastos(),obtenerGastos())}catch(t){console.log(t)}}document.addEventListener("DOMContentLoaded",(function(){filtrar&&obtenerGastos()})),cuotas&&cuotas.addEventListener("change",mostrarCuotas),gastosForm&&gastosForm.addEventListener("submit",validarCampos),listaSelect&&listaSelect.addEventListener("change",(function(){filtrar()}));