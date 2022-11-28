<?php

require_once __DIR__ ;

use MVC\Router;
use Controller\APIController;
use Controller\UserController;
use Controller\DashboardController;
use Controller\GastosController;

$router = new Router();

// -------- AUTORIZACIÓN DE CUENTA -------------------------
// Login
$router->get('/', [UserController::class, 'index']);
$router->post('/', [UserController::class, 'index']);
// Crear cuenta
$router->get('/create-account', [UserController::class, 'createAccount']);
$router->post('/create-account', [UserController::class, 'createAccount']);
// Olvide clave (falta)
$router->get('/forgot-password', [UserController::class, 'forgotPassword']);
$router->post('/forgot-password', [UserController::class, 'forgotPassword']);
// reestablecer password
$router->get('/reestablecer', [UserController::class, 'changePassword']);
$router->post('/reestablecer', [UserController::class, 'changePassword']);
// Mensaje
$router->get('/confirmar', [UserController::class, 'confirmAccount']);
// --------------------------------------------------------------------------

// ------------- VISTA DASHBOARD ------------------------------
$router->get('/dashboard', [DashboardController::class, 'index']);


// Mercado
$router->get('/mercado', [DashboardController::class, 'mercado']);
$router->get('/lista-mercado', [DashboardController::class, 'listaMercado']);

// API
    // --- Productos --- 
$router->post('/API/registro-producto', [APIController::class, 'registrarProducto']);
$router->get('/API/obtener-producto', [APIController::class, 'obtenerProductos']);
$router->post('/API/editar-producto', [APIController::class, 'editarProductos']);
$router->post('/API/eliminar-producto', [APIController::class, 'eliminarProducto']);

// --- Gastos ---
$router->get('/API/obtener-gastos', [APIController::class, 'obtenerGastos']);
$router->post('/API/editar-gastos', [APIController::class, 'editarGasto']);
$router->post('/API/eliminar-gasto', [APIController::class, 'eliminarGasto']);
$router->post('/API/registro-gastos', [GastosController::class, 'registrarGasto']);
// --------------------------------------------------------------

// ------------- VISTA GASTOS ------------------------------
// Registrar gastos
$router->get('/gastos', [GastosController::class, 'index']);

// Lista de gastos
$router->get('/lista-gastos', [GastosController::class, 'listaGastos']);


// --------------------------------------------------------------


// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
