<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
class ChirpController extends Controller
{
    /**
     * แสดงรายการ.
     */
    public function index(): Response
    {
        return Inertia::render('Chirps/Index', [
            'chirps' => Chirp::with('user:id,name')->latest()->get(),
        ]);//จะดึกข้อมูลของโมเดล ยูสเซอร์ เฉพาะ id กับ เนม

    }

    /**
     * แสดงแบบฟอร์มสำหรับสร้าง.
     */
    public function create()
    {
        //
    }

    /**
     * เก็บข้อมูลที่สร้างขึ้นใหม่ไว้ในที่เก็บข้อมูล.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([//ฟังชั่นตรวจสอบขอมูล Validated
            'message' => 'required|string|max:255',
        ]);//ตรวจสอบข้อมูล แมสเสดต้องมีข้อมูล ค่่าต้องเป็น string ไม่เกิน225ตัว

        $request->user()->chirps()->create($validated);//ดึงข้อมูลทจากผู้ใช้

        return redirect(route('chirps.index'));
    } //กลับมาหน้าหลักที่บันทึกแล้ว return

    /**
     * แสดงฟังชั่นแสดงข้อมูลเฉพาะ.
     */
    public function show(Chirp $chirp)
    {
        //
    }

    /**
     * แสดงแบบฟอร์มแก้ไขข้อมูลเฉพาะ.
     */
    public function edit(Chirp $chirp)
    {
        //
    }

    /**
     * อัปเดตที่ระบุในที่เก็บข้อมูล.
     */
    public function update(Request $request, Chirp $chirp): RedirectResponse
    {//อัพเดตข้อความในฐานข้อมูล
        Gate::authorize('update', $chirp);
        //ตรวจสอบว่าผู้ใช้อัพเดตได้มั้ย
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);//ตรวจสอบว่าข้อมูลที่ส่งมาถูกตามเกนมั้ย ข้อความ ไม่เกิน225

        $chirp->update($validated);
        //ใช้อัพเดตข้อมูลโมเดล
        return redirect(route('chirps.index'));
    }   //รีเทินไปที่หน้าเชิบ

    /**
     * ลบสิ่งที่ระบุออกจากที่เก็บข้อมูล.
     */
    public function destroy(Chirp $chirp): RedirectResponse
    {//ฟังชั่นลบข้อมูล
        Gate::authorize('delete', $chirp);
        //ตรวจสอบสิทว่าลบได้มั้ย
        $chirp->delete();
        //คำสั่งลบเชิบ
        return redirect(route('chirps.index'));
    }   //รีเทินหน้าไปหน้าindex
}
