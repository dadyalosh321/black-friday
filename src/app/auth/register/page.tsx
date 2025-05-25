"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    try {
      // هنا يمكن إضافة منطق التسجيل الحقيقي
      // حالياً سنستخدم بيانات وهمية للتوضيح
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحساب');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-md px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                الاسم
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                تأكيد كلمة المرور
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              إنشاء حساب
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="text-black hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 