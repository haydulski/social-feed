<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/reaction/{type}/{id}', [PostController::class, 'addReaction'])->name('api.addlike');
Route::middleware('auth:sanctum')->get('/reactions/show/{post_id}', [PostController::class, 'showReactions']);

Route::get('/posts', [PostController::class, 'index'])->name('api.posts');
