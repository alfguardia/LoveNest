<div class="contenedor-login">
    <h1 class="descripcion-pagina">Love<span>Nest</span></h1>
    <h2 class="subtitulo">Olvide mi password</h2>

    <div id="alertas-container" class="alertas">
        <?php include_once  __DIR__ . '/../components/alertas.php'; ?>
    </div>

    <form class="form-login" method="POST" action="">
        <div class="campo">
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
        </div>

        <input type="submit" value="Enviar email" class="btn-login">
    </form>

    <div class="acciones">
        <a class="enlaces" href="/">Iniciar Sesión</a>
        <a class="enlaces" href="/create-account">Crear cuenta</a>
    </div>
</div>

<?php $script = '<script src="build/js/app.js"></script>' ?>