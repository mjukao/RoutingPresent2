import '../css/app.css';//นำเข้าสตไตล์จากไฟล์ CSS
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';//จาก Inertia.js เพื่อเริ่มต้นแอปที่ใช้ Inertia.js ร่วมกับ React.
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
//สร้างตัวแปร appName โดยดึงชื่อแอปพลิเคชันจากตัวแปรสภาพแวดล้อม (VITE_APP_NAME) ถ้าไม่มี จะใช้ค่าเริ่มต้นเป็น Laravel
createInertiaApp({
    title: (title) => `${title} - ${appName}`,//ตั้งค่า title ของหน้าโดยแสดงชื่อหน้าตามด้วยชื่อแอป เช่น Dashboard - Laravel.
    resolve: (name) =>//ใช้ฟังก์ชัน resolvePageComponent เพื่อกำหนดวิธีค้นหาและโหลดไฟล์คอมโพเนนต์จากโฟลเดอร์ Pages.
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),//ดึงไฟล์ทั้งหมดในโฟลเดอร์ Pages ที่ลงท้ายด้วย .jsx.
        ),
    setup({ el, App, props }) {//App: คอมโพเนนต์หลักของ Inertia.js.//props: ข้อมูลเริ่มต้นที่ส่งมาจากเซิร์ฟเวอร์.
        const root = createRoot(el);//el: อ้างอิงถึง DOM ที่จะเรนเดอร์แอป.

        root.render(<App {...props} />);//เพื่อสร้าง root สำหรับเรนเดอร์ React และเรียก root.render(<App {...props} />) เพื่อแสดงคอมโพเนนต์หลักพร้อม props.
    },
    progress: {
        color: '#4B5563',
    },
});

//โค้ดนี้ทำหน้าที่ตั้งค่า Inertia.js ร่วมกับ React และ Laravel
//โหลดคอมโพเนนต์จากโฟลเดอร์ Pages.
//ตั้งค่า DOM Root ด้วย React
//กำหนดชื่อหน้า (title) และสีของแถบโหลด (progress).
//ใช้ Vite และ Inertia.js เพื่อปรับปรุงการโหลดหน้าเว็บแบบ SPA (Single Page Application).
