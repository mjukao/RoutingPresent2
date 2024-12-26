import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';

export default function ProductGrid({ products }) {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <a href="/dashboard" className="text-3xl font-extrabold tracking-wider hover:scale-110 transition duration-300">
                        Sneaker Football Shop
                    </a>
                    <ul className="flex space-x-6">
                        <li>
                            <a href="/dashboard" className="hover:text-gray-200 hover:underline transition duration-200">หน้าแรก</a>
                        </li>
                        <li>
                            <a href="/products" className="hover:text-gray-200 hover:underline transition duration-200">สินค้า</a>
                        </li>

                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center">
                <div className="container mx-auto">
                    <h1 className="text-6xl font-extrabold tracking-wide animate-pulse">
                        รองเท้าฟุตบอลสุดพรีเมียม
                    </h1>
                    <p className="text-lg mt-4 italic animate-fadeIn">
                        ค้นหารองเท้าฟุตบอลที่เหมาะกับคุณที่สุดในราคาที่ใช่
                    </p>
                </div>
            </header>

            {/* Product Grid */}
            <main className="container mx-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="relative bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* ภาพสินค้า */}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            {/* รายละเอียดสินค้า */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800 hover:text-blue-500 transition duration-300">
                                    {product.name}
                                </h3>
                                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                                    {product.description}
                                </p>
                                <p className="mt-4 text-blue-600 font-bold hover:text-blue-400 transition duration-300">
                                    ฿{product.price.toLocaleString()}
                                </p>
                            </div>
                            {/* ปุ่มดูสินค้า */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <Link
                    href={`/products/${product.id}`}
                    className="view-details-btn bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    ดูสินค้า
                  </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto text-center">
                    <p className="text-lg font-bold tracking-wide hover:scale-105 transition duration-300">
                        Sneaker Football Shop
                    </p>
                    <p className="text-sm mt-2 hover:text-gray-400 transition duration-200">
                        &copy; 2025. All rights reserved.
                    </p>
                    <ul className="flex justify-center space-x-4 mt-4">
                        <li><a href="/" className="hover:text-gray-400 transition duration-200">หน้าแรก</a></li>
                        <li><a href="/products" className="hover:text-gray-400 transition duration-200">สินค้า</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}





{/* <Link
                    href={`/products/${product.id}`}
                    className="view-details-btn bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    ดูสินค้า
                  </Link> */}
