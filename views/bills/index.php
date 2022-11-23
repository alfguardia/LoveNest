<div class="contenedor">
    <?php include __DIR__ . '/../components/encabezado.php'; ?>
    <h2 class="subtitulo">Registrar Gastos</h2>
    <?php include_once __DIR__ . '/../components/aside.php'; ?>
    <?php include_once __DIR__ . '/../components/navBar_gastos.php'; ?>

    <div class="gastos">
        <form class="gasto-form" id="gastos-form" method="POST">
            <div class="gasto-campo">
                <label for="gasto">Nombre</label>
                <input class="gasto-input" type="text" id="gasto" name="gasto">
            </div>

            <div class="gasto-campo">
                <label for="monto">Cantidad</label>
                <input class="gasto-input" type="number" id="monto" name="monto">
            </div>

            <div class="gasto-campo">
                <label for="metodo">Metodo de Pago</label>
                <select id="metodo" name="metodo" class="gasto-input gasto-select">
                    <option value="efectivo">Efectivo</option>
                    <option value="debito">Debito</option>
                    <option value="credito">Credito</option>
                </select>
            </div>

            <div class="gasto-campo">
                <label for="categoria">Categoria</label>
                <select name="categoria" id="categoria" class="gasto-input gasto-select">
                    <option selected disabled value="">-- Tipo de gasto --</option>
                    <option value="mensual">Mensual</option>
                    <option value="extra">Extra</option>
                    <option value="cuotas">Cuotas</option>
                </select>
            </div>

            <div id="div-cuotas" class="gasto-campo gasto-cuotas">
                <label for="cantidad-cuotas">Número de cuotas</label>
                <input class="gasto-input-cuotas" id="cantidad-cuotas" type="number" name="cantidad-cuotas">
            </div>


            <div class="gasto-campo">
                <input type="submit" class="btn-submit" value="Guardar">
            </div>
        </form>
    </div>
</div>


<?php $script = '<script src="build/js/gastos.js"></script>
<script src="build/js/app.js"></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>' ?>