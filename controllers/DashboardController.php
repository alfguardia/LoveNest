<?php

namespace Controller;

use Model\Product;
use MVC\Router;

class DashboardController
{

    public static function index(Router $router)
    {


        $router->render('dashboard/index', []);
    }

    public static function mercado(Router $router)
    {

        $router->render('register/mercado', []);
    }

    public static function listaMercado(Router $router)
    {
        $opciones = new Product();
        $categorias = $opciones->getColumn('categoria');
      

        $router->render('products/lista-mercado', [
            'categorias' => $categorias
        ]);
    }
}
