<?php 

require_once __DIR__ . '/../includes/app.php';

use Controller\UserController;
use MVC\Router;

$router = new Router();

// Login
$router->get('/',[UserController::class,'index']);
$router->post('/',[UserController::class,'index']);

// Crear cuenta
$router->get('/create-account',[UserController::class,'createAccount']);
$router->post('/create-account',[UserController::class,'createAccount']);

// Autorizar cuenta


// Olvide clave
$router->get('/forgot-password',[UserController::class,'forgotPassword']);
$router->post('/forgot-password',[UserController::class,'forgotPassword']);


// Mensaje
$router->get('/mensaje',[UserController::class,'mensaje']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();