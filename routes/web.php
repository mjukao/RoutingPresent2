<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChirpController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

Route::get('/greeting', function () {
    return 'Hello World';
}); // return ค่าคงที่ #2 returnค่าออกมาเป็น hello ถ้าพิม /greeting ใช้ postmanได้ (post)(error)

Route::get('/user/{id}', function (string $id) {
    return 'User ' . $id;
}); // เวลาแสงuser ตามด้วย id ในเว็ป



Route::get('/products', [ProductController::class, 'index'])->middleware(['auth', 'verified'])->name('products.index'); // เพิ่มมา
Route::get('/products/{id}', [ProductController::class, 'show'])->middleware(['auth', 'verified']); // /products ตามด้วย id ในเว็ป จะขึ้นเลขidสินค่า

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy']) // เพิ่มการแก้ไข และ ลบหัวข้อ
    ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
