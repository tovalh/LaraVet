<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Pacientes - requiere permisos
    Route::middleware('can:ver-pacientes')->group(function () {
        Route::get('/pacientes', function () {
            return Inertia::render('pacientes/index');
        })->name('pacientes.index');
    });

    // Citas - requiere permisos
    Route::middleware('can:ver-citas')->group(function () {
        Route::get('/citas', function () {
            return Inertia::render('citas/index');
        })->name('citas.index');
    });

    // Historial Médico - requiere permisos
    Route::middleware('can:ver-historial')->group(function () {
        Route::get('/historial', function () {
            return Inertia::render('historial/index');
        })->name('historial.index');
    });

    // Gestión de Usuarios - requiere permisos
    Route::middleware('can:gestionar-usuarios')->group(function () {
        Route::get('/usuarios', function () {
            return Inertia::render('usuarios/index');
        })->name('usuarios.index');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
