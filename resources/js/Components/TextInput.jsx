import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';//นำเข้า hooks และฟังก์ชันสำคัญจาก React

export default forwardRef(function TextInput(//ประกาศ component TextInput และใช้ forwardRef เพื่อรองรับการส่งต่อ reference จาก parent
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);//สร้าง local reference (localRef) เพื่อเชื่อมกับ DOM ของ <input>.

    useImperativeHandle(ref, () => ({  //กำหนดให้ reference (ref) สามารถเรียก method focus ได้.
       // เมื่อเรียก focus จะไปเรียก focus ของ DOM element (localRef.current).
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {  //ใช้ useEffect เพื่อตรวจสอบว่า isFocused เปลี่ยนแปลงหรือไม่
        if (isFocused) {
            localRef.current?.focus(); //ถ้า isFocused เป็น true จะเรียก focus กับ DOM element (localRef.current).
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={localRef}
        />
    );
});//ใช้ ...props เพื่อกระจาย props ทั้งหมดที่ไม่ได้กำหนดไว้.
//type={type} กำหนดประเภทของ input.
//className={...} รวมคลาส CSS เริ่มต้นและคลาสเพิ่มเติม (className).
//ref={localRef} เชื่อม localRef กับ <input>.
