<?php

namespace Controller;

use Model\Bills;
use MVC\Router;

class GastosController
{
    public static function index(Router $router)
    {

        $router->render('bills/index', []);
    }

    public static function registrarGasto()
    {
        session_start();

        $gasto = new Bills($_POST);
        $alertas = $gasto->validarGastos();
        $fecha = date('Y-m-d');
        if (empty($alertas)) {
            // Guardar el gasto
            $gasto->usuarioId = $_SESSION['usuarioId'];
            $gasto->fecha = $fecha;
            $gasto->guardar();
            $alertas = Bills::getAlertas();

            echo json_encode('Gasto Registrado');
        } else {
            echo json_encode('Gasto No Registrado');
        }
    }

    public static function listaGastos(Router $router)
    {
        $categoria = new Bills();
        $categorias = $categoria->getColumn('categoria');


        $router->render('bills/bills_list', [
            'categorias' => $categorias
        ]);
    }
}
