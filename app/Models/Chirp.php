<?php

namespace App\Models;
use App\Events\ChirpCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Chirp extends Model
{
    protected $fillable = [ //ระบุว่าฟิลด์ message สามารถกำหนดค่าได้ (Mass Assignment)

        'message',
    ];
    protected $dispatchesEvents = [
        'created' => ChirpCreated::class,//กำหนดว่าเมื่อมีการสร้าง (created) Chirp ใหม่ จะเรียกใช้ Event ChirpCreated
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);//เม็ดธอดนี้กำหนดความสัมพันธ์ BelongsTo ระหว่าง Chirp กับ User
        //หมายความว่า Chirp เป็นของ (belongs to) User คนใดคนหนึ่ง
        //User::class คือการอ้างอิงไป Model User ที่เกี่ยวข้อง
    }
}
