<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Chirp;
use App\Models\User;

class ChirpPolicy
{
    /**
     * ตรวจสอบว่าผู้ใช้สามารถดูโมเดล ได้มั้ย.
     */
    public function viewAny(User $user): bool //กำหนดฟังชั่น viewany รับเป็น user และส่งค่าคืนเป็นบูลีน
    {
        return false;                        //ฟังชั่นจะรีเทินค่า false กลับให้เสมอ =ว่าผู้ใช้ไม่มีสิทดูโมดูลอื่นๆ เพราะอ่านได้อย่างเดียว
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Chirp $chirp): bool //เหมือนอันข้างบน แต่มีทั้ง  user กับ chirp
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool //ฟังชั่น create
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Chirp $chirp): bool
    {
        return $chirp->user()->is($user);//ฟังก์ชันจะส่งคืนค่า true ถ้าผู้ใช้ที่เป็นเจ้าของ Chirp ตรงกับผู้ใช้ที่กำลังตรวจสอบสิทธิ์อยู่ และส่งคืนค่า false ถ้าไม่ตรงกัน.
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Chirp $chirp): bool
    {
        return $this->update($user, $chirp);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Chirp $chirp): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Chirp $chirp): bool
    {
        return false;
    }
}
