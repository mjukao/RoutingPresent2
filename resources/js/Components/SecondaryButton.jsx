// ซึ่งใช้สำหรับแสดงปุ่มแบบรอง (secondary button)
export default function SecondaryButton({ //สร้างและ export คอมโพเนนต์ SecondaryButton ที่รับ props หลายตัว เช่น:
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
//  type: ประเภทของปุ่ม (ค่าเริ่มต้นคือ 'button').
//className: คลาส CSS เพิ่มเติม (ค่าเริ่มต้นคือ '').
//disabled: บอกว่าปุ่มถูกปิดใช้งานหรือไม่.
 //children: เนื้อหาภายในปุ่ม (เช่น ข้อความหรือไอคอน).
//...props: Props อื่น ๆ ที่ไม่ได้ระบุโดยตรง.

    return (
        <button   //คอมโพเนนต์จะคืนค่าปุ่ม (<button>) พร้อมด้วยการตั้งค่าและเนื้อหาตามที่ได้รับจาก props.
            {...props}
            type={type} //กำหนดประเภทของปุ่มจาก prop type (ค่าเริ่มต้นคือ 'button').
            className={
                `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}//กำหนดสถานะปุ่ม (disabled) ตาม prop disabled
        >
            {children}
        </button>
    );
}
