<div class="contenedor-login">
    <h1 class="descripcion-pagina">Love<span>Nest</span></h1>
    <h2 class="subtitulo">Crear cuenta</h2>
    <div id="alertas-container" class="alertas">
        <?php include_once __DIR__ . '/../components/alertas.php'; ?>
    </div>

    <form class="form-login" method="POST" action="">
        <div class="campo">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre" value="<?php echo $usuario->nombre ?>">
        </div>

        <div class="campo">
            <label for="apellido">Apellido</label>
            <input type="text" name="apellido" id="apellido" value="<?php echo $usuario->apellido ?>">
        </div>

        <div class="campo">
            <label for="usuario">Usuario</label>
            <input type="text" name="usuario" id="usuario" value="<?php echo $usuario->usuario ?>">
        </div>

        <div class="campo">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="<?php echo $usuario->email ?>">
        </div>

        <div class="campo">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>

        <input type="submit" value="Crear cuenta" class="btn-login">
    </form>

    <div class="acciones">
        <a class="enlaces" href="/">Iniciar Sesión</a>
        <a class="enlaces" href="/forgot-password">Olvide mi password</a>
    </div>
</div>

<?php $script = '<script src="build/js/app.js"></script>'; ?>