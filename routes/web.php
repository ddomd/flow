<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubtaskController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Guest Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => ["auth"]], function() {

    //BOARD ROUTES
    Route::get('/boards', [BoardController::class, 'index'])->name('boards');
    Route::get('/boards/{board}', [BoardController::class, 'show'])->name('boards.show');
    
    Route::post('/boards', [BoardController::class, 'store'])->name('boards.store');

    Route::put('/boards/{board}/edit', [BoardController::class, 'edit'])->name('boards.edit');
    Route::put('/boards/{board}/pin', [BoardController::class, 'pin'])->name('boards.pin');

    Route::delete('/boards/{board}/delete', [BoardController::class, 'delete'])->name('boards.delete');

    //COLUMN ROUTES
    Route::post('/boards/{board}/columns', [ColumnController::class, 'store'])->name('columns.store');
    Route::put('/columns/{column}/edit', [ColumnController::class, 'edit'])->name('columns.edit');
    Route::delete('/columns/{column}/delete', [ColumnController::class, 'delete'])->name('columns.delete');

    //TASK ROUTES
    Route::post('{board}/{column}/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('{column}/tasks/{task}/move', [TaskController::class, 'move'])->name('tasks.move');
    Route::put('/tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
    
    Route::delete('/tasks/{task}/delete', [TaskController::class, 'delete'])->name('tasks.delete');

    //SUBTASK ROUTES
    Route::post('/{task}/subtasks', [SubtaskController::class, 'store'])->name('subtasks.store');
    Route::put('/subtasks/{subtask}/edit', [SubtaskController::class, 'edit'])->name('subtasks.edit');
    Route::put('/subtasks/{subtask}/done', [SubtaskController::class, 'done'])->name('subtasks.done');
    Route::delete('/subtasks/{subtask}/delete', [SubtaskController::class, 'delete'])->name('subtasks.delete');

    //TAG ROUTES
    Route::post('/{board}/tags', [TagController::class, 'store'])->name('tags.store');
    Route::put('/{task}/tags/{tag}/attach', [TagController::class, 'attach'])->name('tags.attach');
    Route::put('/{task}/tags/{tag}/detach', [TagController::class, 'detach'])->name('tags.detach');
    Route::delete('/tags/{tag}/delete', [TagController::class, 'delete'])->name('tags.delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
