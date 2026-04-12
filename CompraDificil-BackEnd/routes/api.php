<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmpleadoController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\VentaController;
use App\Http\Controllers\Api\SucursalController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\ClienteController;

/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // --- AUTH ---
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- CATÁLOGOS ---
    Route::get('/roles', function() {
        return \App\Models\Rol::all();
    });
    Route::get('/sucursales', [SucursalController::class, 'index']);
    Route::get('/categorias', [CategoriaController::class, 'index']);

    // --- SOLO ADMIN ---
    Route::middleware('role:Admin')->group(function () {
        Route::apiResource('empleados', EmpleadoController::class);
        Route::post('/empleados/{id_empleado}/activar', [EmpleadoController::class, 'activar']);
        Route::post('/empleados/{id_empleado}/desactivar', [EmpleadoController::class, 'desactivar']);
        Route::apiResource('productos', ProductoController::class);
    });

    // --- ADMIN O VENDEDOR ---
    Route::middleware('role:Admin,Vendedor')->group(function () {
        Route::post('/ventas', [VentaController::class, 'store']);
        Route::get('/ventas', [VentaController::class, 'index']);
        Route::get('/ventas/{id_venta}', [VentaController::class, 'show']);
    });

    // --- ADMIN O ANALISTA ---
    Route::middleware('role:Admin,Analista')->group(function () {
        Route::get('/ventas/resumen', [VentaController::class, 'resumen']);
        Route::get('/ventas/por-sucursal', [VentaController::class, 'ventasPorSucursal']);
        Route::get('/ventas/mensuales-2026', [VentaController::class, 'ventasMensuales2026']);
    });

    // --- TODOS ---
    Route::get('/inventario/{id_sucursal}', [ProductoController::class, 'stockPorSucursal']);
    Route::get('/productos', [ProductoController::class, 'index']);
    Route::get('/clientes', [ClienteController::class, 'index']);
    
    // Actualizar stock)
    Route::middleware('role:Admin')->put('/inventario/actualizar', [ProductoController::class, 'updateStock']);
});