"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const router = useRouter();
  const { items } = useCartStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              Black Friday
            </Link>
            <Link href="/products/women" className="text-gray-600 hover:text-black">
              منتجات نسائية
            </Link>
            <Link href="/products/men" className="text-gray-600 hover:text-black">
              منتجات رجالية
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="ابحث عن منتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            <Link href="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-600 hover:text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-black"
              >
                تسجيل الخروج
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-black"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 