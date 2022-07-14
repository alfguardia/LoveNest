<div class="contenedor">
    <h1 class="descripcion-pagina">Love<span>Nest</span></h1>
    <h2 class="subtitulo">Listas de Productos</h2>

    <div class="lista_opcion">
        <select name="option-list-select" id="option-list-select">
            <option selected disabled value=""> Filtrar por :</option>
            <option value="todos">todos</option>
            <?php
            foreach ($categorias as $categoria) {
                echo "<option value='" . $categoria->categoria . "'>" . $categoria->categoria . "</option>";
            }
            ?>
        </select>
    </div>

    <div id="lista_productos" class="">
        <p class="lista__articulos__label">Lista de productos</p>
        <div class="lista__articulos__head">
            <p>Nombre</p>
            <p>Categoria</p>
        </div>
        <ul class="lista_articulos" id="lista_articulos">
        </ul>
    </div>

</div>



<?php $script = '<script src="build/js/mercado.js"></script>' ?>