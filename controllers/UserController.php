<?php

namespace Controller;

use Model\User;
use MVC\Router;
use Classes\Email;

class UserController
{
    public static function index(Router $router)
    {
        $alertas = [];
        $usuario = new User();
        $usuario->sincronizar($_POST);

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $alertas = $usuario->validarLogin();
            if (empty($alertas)) {
                //Revisar que el usuario exista
                $usuario = $usuario->where('usuario', $usuario->usuario);
                // Que el usuario exista y que este confirmado
                if (!$usuario || !$usuario->confirmado) {
                    $alertas = User::setAlerta('error', 'El usuario no existe y/o no esta confirmado');
                } else {
                    //Revisar password
                    if (password_verify($_POST['password'], $usuario->password)) {
                        session_start();

                        $_SESSION['nombre'] = $usuario->nombre;
                        $_SESSION['apellido'] = $usuario->apellido;
                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['usuarioId'] = $usuario->id;
                        $_SESSION['login'] = true;

                        //Redireccionar a la pagina
                        header('Location: /dashboard');
                    } else {
                        $alertas = User::setAlerta('error', 'Usuario y/o Password incorrecta');
                    }
                }
            }
        }

        $alertas = User::getAlertas();
        $router->render('auth/index', [
            'alertas' => $alertas
        ]);
    }

    public static function createAccount(Router $router)
    {
        $usuario = new User();
        $alertas = [];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);
            $alertas = $usuario->verificarCampos();

            if (empty($alertas)) {
                // Verificar que el usuario no exista
                $resultado = User::where('email', $usuario->email);
                if ($resultado) {
                    User::sweetAlert('Esta cuenta ya existe', 'Por favor usa otro correo', 'error', false);
                } else {
                    //Hashear password
                    $usuario->hashPassword();
                    //Crear token
                    $token = $usuario->generarToken();
                    // Crear la cuenta
                    $respuesta = $usuario->guardar();
                    if ($respuesta) {
                        //Mensaje
                        User::sweetAlert('Por favor revisa tu correo', 'Activa tu cuenta!', 'success', true);
                        // Enviar correo
                        $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                        $email->enviarCorreo();
                    }
                }
            }
        }

        $alertas = User::getAlertas();
        $router->render('auth/create_account', [
            'alertas' => $alertas,
            'usuario' => $usuario
        ]);
    }

    public static function forgotPassword(Router $router)
    {
        $alertas = [];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario = new User($_POST);
            $alertas = $usuario->validarEmail();

            if (empty($alertas)) {
                //Buscamos que el usuario exista
                $usuario = User::where('email', $usuario->email);

                if ($usuario) {
                    $usuario->generarToken();

                    //Guardar cambios
                    $usuario->guardar();

                    //Enviar el correo de cambio de password
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                    $email->reestablecerPassword();
                    //Mostrar mensaje
                    User::sweetAlert('Por favor revisa tu correo', 'Reestablece tu cuenta!', 'success', true);
                }
            }
        }
        $alertas = User::getAlertas();
        $router->render('auth/forgot-password', [
            'alertas' => $alertas
        ]);
    }

    public static function confirmAccount(Router $router)
    {
        $alertas = [];
        $token = s($_GET['token']);
        $usuario = User::where('token', $token);
        if ($usuario) {
            $usuario->token = '';
            $usuario->confirmado = 1;
            $usuario->guardar();
        } else {
            $alertas = User::setAlerta('error', 'Token Invalido');
        }
        $alertas = User::getAlertas();

        $router->render('auth/confirmar', [
            'alertas' => $alertas
        ]);
    }

    public static function changePassword(Router $router)
    {
        $alertas = [];
        $token = s($_GET['token']);
        $mostrar = true;
        if (!$token) {
            header('Location: /');
        }

        $usuario = User::where('token', $token);
        if (!$usuario) {
            $alertas = User::setAlerta('error', 'Token inválido');
            $mostrar = false;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarPassword();
            if (empty($alertas)) {
                $usuario->password = $usuario->password;
                $usuario->hashPassword();
                $usuario->token = '';
                $resultado = $usuario->guardar();

                if ($resultado) {
                    User::sweetAlert('Password cambiada con exito', 'Redireccionando...', 'success', true);
                }
            }
        }


        $alertas = User::getAlertas();
        $router->render('auth/change-password', [
            'alertas' => $alertas,
            'mostrar' => $mostrar
        ]);
    }
}
