import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chirp from '@/Components/Chirp';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, chirps }) { //ฟังก์ชัน Index คือ React component หลักของไฟล์นี้
    //รับ props สองตัว:
    //auth: ข้อมูลผู้ใช้ที่ล็อกอิน
    //chirps: รายการข้อความโพสต์ทั้งหมดที่ต้องแสดง

    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });
    //ใช้ useForm สร้าง state และ method ต่าง ๆ สำหรับจัดการฟอร์ม:
//data: เก็บข้อมูลฟอร์ม (ค่าเริ่มต้น message: '')
//setData: ฟังก์ชันสำหรับอัปเดตข้อมูลใน data
//post: ใช้ส่งข้อมูลฟอร์มไปยัง backend
//processing: สถานะที่บอกว่ากำลังประมวลผลการส่งข้อมูล
//reset: ฟังก์ชันสำหรับเคลียร์ข้อมูลฟอร์ม
//errors: เก็บข้อผิดพลาดจาก backend
    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };
    //ฟังก์ชัน submit ทำงานเมื่อผู้ใช้กดปุ่มส่ง:
//e.preventDefault(): ป้องกันไม่ให้หน้าโหลดซ้ำ
//post(): ส่งข้อมูลในฟอร์มไปยัง route chirps.store
//onSuccess: () => reset(): ถ้าส่งสำเร็จให้เคลียร์ฟอร์ม
    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>

                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
//ผู้ใช้พิมพ์ข้อความในแบบฟอร์ม

//มีช่องให้ผู้ใช้พิมพ์ข้อความใหม่ และปุ่มสำหรับส่งโพสต์
//ถ้าข้อความผิดพลาด (เช่น เว้นว่างไว้) จะมีข้อความแสดงข้อผิดพลาด
//ส่งข้อความไปยังระบบหลังบ้าน (Backend)

//เมื่อผู้ใช้กดปุ่มส่ง ข้อความจะถูกส่งไปยังเซิร์ฟเวอร์
//ถ้าส่งสำเร็จ ช่องข้อความจะถูกล้าง (clear)
//แสดงรายการข้อความที่มีอยู่

//ข้อความที่เคยโพสต์จะแสดงเป็นรายการข้างล่างแบบเรียงลำดับ
//ใช้ Component Chirp เพื่อแสดงข้อความแต่ละอัน
//จัดรูปแบบหน้าตา (UI)

//ใช้ CSS จาก Tailwind เพื่อทำให้หน้าเว็บดูเรียบง่ายและใช้งานสะดวก
//Layout จะเหมาะกับผู้ใช้ที่ล็อกอินอยู่เท่านั้น
//สรุปง่าย ๆ:
//หน้าเว็บนี้ให้ผู้ใช้โพสต์ข้อความใหม่และดูข้อความที่โพสต์ไปแล้วได้ในหน้าเดียวแบบใช้ง่ายและเป็นระเบียบ!






