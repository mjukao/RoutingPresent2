import { Link } from '@inertiajs/react';

export default function Show({ product }) {
    // คำนวณราคาก่อนลดโดยเพิ่มจากราคาที่ลดแล้ว 2900
    const oldPrice = product.price + 2900;

    return (
        <div className="product-detail-container mx-auto max-w-3xl p-6 bg-white shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row items-center">
                {/* ภาพสินค้า */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full md:w-1/2 rounded-lg shadow-sm"
                />
                {/* รายละเอียดสินค้า */}
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                    <p className="mt-2 text-gray-600">{product.description}</p>
                    <div className="mt-4">
                        <p className="text-gray-500 line-through">฿{oldPrice.toLocaleString()}</p>
                        <p className="text-xl font-bold text-green-600">฿{product.price.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            {/* ปุ่มย้อนกลับ */}
            <div className="mt-6 text-center">
                <Link
                    href="/products"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                >
                    ย้อนกลับ
                </Link>
            </div>
        </div>
    );
}
