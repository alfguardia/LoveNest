<?php

namespace Controller;

use Model\Bills;
use Model\Product;

class APIController
{
    public static function registrarProducto()
    {
        session_start();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $producto = new Product($_POST);
            $producto->producto = strtolower($producto->producto);

            $fecha = date('Y-m-d');
            $producto->fecha = $fecha;
            $producto->usuarioId = $_SESSION['id'];
            $producto->guardar();
            echo json_encode($producto);
        }
    }

    public static function obtenerProductos()
    {
        session_start();
        $usuarioId = $_SESSION['id'];
        $producto = new Product();
        $producto->usuarioId = $usuarioId;
        $resultado = $producto->orderBy('categoria', $producto->usuarioId);

        echo json_encode($resultado);
    }

    public static function editarProductos()
    {
        $productoNuevo = new Product($_POST);
        // Buscar el producto
        $producto = $productoNuevo->where('id', $productoNuevo->id);
        if ($producto) {
            $producto->producto = $productoNuevo->producto;
            $producto->marca = $productoNuevo->marca;
            $producto->categoria = $productoNuevo->categoria;

            $resultado = $producto->guardar();
        }
        echo json_encode($resultado);
    }

    public static function eliminarProducto()
    {
        $producto = new Product($_POST);
        // Buscar el producto
        echo json_encode($producto);
        $respuesta = $producto->where('id', $producto->id);
        if ($respuesta) {
            $resultado = $producto->eliminar();
        }
    }

    public static function obtenerGastos()
    {
        session_start();
        $usuarioId = $_SESSION['id'];
        $gastos = new Bills();
        $gastos->usuarioId = $usuarioId;
        $resultado = $gastos->orderBy('categoria', $gastos->$usuarioId);

        echo json_encode('Enviando resultados...');
    }

    public static function editarGasto()
    {
        $gastoEditado = new Bills($_POST);
        // Buscar el producto
        $gasto = $gastoEditado->where('id', $gastoEditado->id);
        if ($gasto) {
            $gasto->gasto = $gastoEditado->gasto;
            $gasto->monto = $gastoEditado->monto;
            $gasto->categoria = $gastoEditado->categoria;
            $gasto->cuotas = $gastoEditado->cuotas;

            $resultado = $gasto->guardar();
        }
        echo json_encode($gastoEditado);
    }

    public static function eliminarGasto()
    {
        $gastoEliminar = new Bills($_POST);
        $respuesta = $gastoEliminar->where('id', $gastoEliminar->id);
        echo json_encode($gastoEliminar);
        if ($respuesta) {
            $resultado = $gastoEliminar->eliminar();
        }
    }
}
