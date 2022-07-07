<?php 

require_once __DIR__ . '/../includes/app.php';

use MVC\Router;
use Controller\UserController;
use Controller\DashboardController;

$router = new Router();

// -------- AUTORIZACIÓN DE CUENTA -------------------------
// Login
$router->get('/',[UserController::class,'index']);
$router->post('/',[UserController::class,'index']);
// Crear cuenta
$router->get('/create-account',[UserController::class,'createAccount']);
$router->post('/create-account',[UserController::class,'createAccount']);
// Olvide clave (falta)
$router->get('/forgot-password',[UserController::class,'forgotPassword']);
$router->post('/forgot-password',[UserController::class,'forgotPassword']);
// reestablecer password
$router->get('/reestablecer',[UserController::class,'changePassword']);
$router->post('/reestablecer',[UserController::class,'changePassword']);
// Mensaje
$router->get('/confirmar',[UserController::class,'confirmAccount']);
// --------------------------------------------------------------------------

// ------------- VISTA DASHBOARD ------------------------------
$router->get('/dashboard',[DashboardController::class,'index']);
// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();