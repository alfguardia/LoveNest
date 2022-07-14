<div class="contenedor">
    <h1 class="descripcion-pagina">Love<span>Nest</span></h1>
    <h2 class="subtitulo">Registrar Productos</h2>
</div>

<?php include_once __DIR__ . '/../components/navBar_mercado.php'; ?>

<div class="contenedor">
    <div class="mercado">
        <form name="registro_producto_mercado" id="registro_producto_mercado" method="POST">
            <div class="mercado__campo">
                <label for="Producto">Producto</label>
                <input type="text" name="producto" id="producto">
            </div>

            <div class="mercado__campo">
                <label for="marca">Marca</label>
                <input type="text" name="marca" id="marca">
            </div>

            <div class="mercado__campo">
                <label for="precio">Precio</label>
                <input type="number" name="precio" id="precio">
            </div>

            <div class="mercado__campo">
                <label for="cantidad">Cantidad</label>
                <input type="number" name="cantidad" id="cantidad">
            </div>

            <div class="mercado__campo">
                <label for="categoria">Categoria</label>
                <input type="text" name="categoria" id="categoria">
            </div>

            <div class="mercado__campo">
                <label for="observacion">Nota</label>
                <input type="text" name="observacion" id="observacion">
            </div>

            <div class="mercado__campo">
                <input type="submit" name="submit" id="submit" class="btn-submit" value="Guardar producto">
            </div>
        </form>
    </div>
</div>

<?php $script = '<script src="build/js/mercado.js"></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>' ?>