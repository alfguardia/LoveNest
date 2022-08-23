<div class="contenedor">
    <?php include __DIR__ . '/../components/encabezado.php'; ?>
    <h2 class="subtitulo">Lista de Gastos</h2>
    <?php include_once __DIR__ . '/../components/aside.php'; ?>
    <?php include_once __DIR__ . '/../components/navBar_gastos.php'; ?>

    <div class="loader-page">
        <div class="loader">
            <div></div>
        </div>
    </div>

    <div class="total">
        <p class="total-gasto">Total Gastado: <span id="total__span"></span></p>
    </div>

    <div class="lista_opcion">
        <select name="option-list-select" id="option-list-select" class="lista_select">
            <option selected disabled value=""> Filtrar por :</option>
            <option value="todos">Todos</option>
            <?php
            foreach ($categorias as $categoria) {
                echo "<option value='" . $categoria->categoria . "'>" . $categoria->categoria . "</option>";
            }
            ?>
        </select>
    </div>

    <div id="lista_productos" class="">
        <p class="lista__articulos__label">Lista de gastos</p>
        <div class="lista__articulos__head">
            <p>Nombre</p>
            <p>Categoria</p>
            <p>Opciones</p>
        </div>
        <ul class="lista_articulos" id="lista_articulos">
        </ul>
    </div>
</div>

<?php $script = '<script src="build/js/gastos.js"></script>
<script src="build/js/app.js"></script>' ?>


</div>