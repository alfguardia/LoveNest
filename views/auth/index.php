<div class="contenedor-login">
    <h1 class="descripcion-pagina">Love<span>Nest</span></h1>
    <h2 class="subtitulo">Login</h2>
    <div id="alertas-container" class="alertas">
        <?php include_once  __DIR__ . '/../components/alertas.php'; ?>
    </div>
    <form class="form-login" method="POST" action="">
        <div class="campo">
            <label for="usuario">Usuario</label>
            <input type="text" name="usuario" id="usuario">
        </div>

        <div class="campo">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>
        <input type="submit" value="Iniciar sesión" class="btn-login">
    </form>

    <div class="acciones">
        <a class="enlaces" href="/create-account">Crear cuenta</a>
        <a class="enlaces" href="/forgot-password">Olvide mi password</a>
    </div>
</div>

<?php $script = '<script src="build/js/app.js"></script>'; ?>