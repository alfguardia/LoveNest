<?php

namespace Controller;

use Model\User;
use MVC\Router;

class UserController
{

    public static function index(Router $router)
    {

        $usuario = new User();
        $usuario->sincronizar($_POST);


        $router->render('auth/index', []);
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
                    User::sweetAlert('Esta cuenta ya existe', 'Por favor usa otro correo','error', false);
                } else {
                    // Crear la cuenta
                    $respuesta = $usuario->guardar();
                    if ($respuesta) {
                        User::sweetAlert('Por favor revisa tu correo', 'Activa tu cuenta!','success', true);
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


        $router->render('auth/forgot-password', []);
    }

    public static function mensaje(Router $router)
    {

        $router->render('auth/mensaje', []);
    }
}
