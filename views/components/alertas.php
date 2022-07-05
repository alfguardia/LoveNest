<?php

foreach ($alertas as $alerta => $tipo) {
    foreach ($tipo as $mensaje) { ?>
        <div class="alerta <?php echo $alerta; ?>"><?php echo $mensaje; ?></div>
<?php
    }
}
?>