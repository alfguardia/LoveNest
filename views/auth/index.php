<div class="contenedor-login">
    <h1 class="descripcion-pagina">Love<span>Nest</span></h1>
    <h2 class="subtitulo">Login</h2>

    <form class="form-login" method="POST" action="">
        <div class="campo">
            <label for="usuario">Usuario</label>
            <input type="text" name="usuario" id="usuario">
        </div>

        <div class="campo">
            <label for="password">Password</label>
            <input type="text" name="password" id="password">
        </div>
        <input type="submit" value="Iniciar sesión" class="btn-login">
    </form>

    <div class="acciones">
        <a class="enlaces" href="/create-account">Crear cuenta</a>
        <a class="enlaces" href="/forgot">Olvide mi password</a>
    </div>
</div>