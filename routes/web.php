<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('typing');
});

Route::post('/word/validate', [\App\Http\Controllers\WordCheckController::class, 'validate'])->name('validate');

Route::get('/typing', function () {
    return Inertia::render('Typing');
})->name('typing');

require __DIR__.'/auth.php';
