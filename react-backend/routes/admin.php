<?php

use App\Http\Controllers\CreateEventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('createEvent', [CreateEventController::class, 'storeData'])
        ->name('createEvent');
});


Route::get('createEvent', function () {
    return Inertia::render('Admin/CreateEvent');
})->middleware(['auth', 'admin'])->name('createEvent');
