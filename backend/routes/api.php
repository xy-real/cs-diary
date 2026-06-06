<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/posts', [\App\Http\Controllers\PostController::class, 'index']);
Route::post('/posts', [\App\Http\Controllers\PostController::class, 'store'])->middleware('auth:sanctum');
Route::get('/posts/{post}', [\App\Http\Controllers\PostController::class, 'show']);
Route::put('/posts/{post}', [\App\Http\Controllers\PostController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/posts/{post}', [\App\Http\Controllers\PostController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');
