import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/react';
dayjs.extend(relativeTime);//เปิดใช้ relativeTime plugin ใน dayjs
export default function Chirp({ chirp }) { //ประกาศคอมโพเนนต์ Chirp
    const { auth } = usePage().props;//ดึงข้อมูล ผู้ใช้ที่ล็อกอินอยู่ จาก usePage().props

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({ //กำหนดค่าฟอร์มเริ่มต้น

        //data: เก็บค่าปัจจุบันในฟอร์ม
        //setData: ฟังก์ชันสำหรับปรับค่าฟิลด์ในฟอร์ม
        //patch: ใช้ส่งคำขอแบบ HTTP PATCH
        //clearErrors: ลบข้อผิดพลาด
        //reset: คืนค่าฟอร์มกลับไปยังสถานะเริ่มต้น
        //errors: เก็บข้อความข้อผิดพลาดจากการตรวจสอบข้อมูล

        message: chirp.message,
    });

    const submit = (e) => {//กำหนดฟังก์ชั่น submit รับพารามิเตอร์ e (event) ที่ถูกส่งมาจากการเรียกใช้งาน เช่น การคลิกปุ่มส่งแบบฟอร์ม.
        e.preventDefault();//ป้องกันพฤติกรรมเริ่มต้นของเบราว์เซอร์ เช่น การโหลดหน้าใหม่เมื่อกดปุ่มส่งแบบฟอร์ม
        patch(route('chirps.update', chirp.id), { onSuccess: () => setEditing(false) });
    };
    //เรียกใช้ฟังก์ชัน patch เพื่อส่งคำขอ HTTP แบบ PATCH ไปยัง back end

    return (
        <div className="p-6 flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{chirp.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600">{dayjs(chirp.created_at).fromNow()}</small>
                        { chirp.created_at !== chirp.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                    </div>
                    {chirp.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('chirps.destroy', chirp.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
                {editing
                    ? <form onSubmit={submit}>
                        <textarea value={data.message} onChange={e => setData('message', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                        </div>
                    </form>
                    : <p className="mt-4 text-lg text-gray-900">{chirp.message}</p>
                }
            </div>
        </div>
    );
}

//แสดงฟอร์มให้แก้ไขข้อความ.
//มีปุ่ม Save สำหรับบันทึก และ Cancel เพื่อยกเลิก.
//โหมดปกติ:

//แสดงข้อความที่ไม่สามารถแก้ไขได้.
//ใช้ dayjs เพื่อจัดการเวลา และ auth เพื่อตรวจสอบสิทธิ์การแก้ไข/ลบ.
