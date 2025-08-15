<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('person', PersonController::class);
    Route::match(['PUT', 'PATCH', 'POST'], '/person/{person}', [PersonController::class, 'update'])
        ->name('person.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
