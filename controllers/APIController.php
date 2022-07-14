<?php

namespace Controller;

use Model\Product;

class APIController
{
    public static function registrarProducto()
    {
        session_start();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $producto = new Product($_POST);
            $fecha = date('Y-m-d');
            $producto->fecha = $fecha;
            $producto->usuarioId = $_SESSION['id'];

            $producto->guardar();

            echo json_encode($producto);
        }
    }

    public static function obtenerProductos()
    {
        $producto = new Product();
        $resultado = $producto->orderBy('categoria');
       
        echo json_encode($resultado);
    }
}
