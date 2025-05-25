"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // هنا يمكن إضافة منطق تسجيل الدخول الحقيقي
      // حالياً سنستخدم بيانات وهمية للتوضيح
      if (email === 'test@example.com' && password === 'password') {
        // تخزين حالة تسجيل الدخول
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/');
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-md px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              ليس لديك حساب؟{' '}
              <Link href="/auth/register" className="text-black hover:underline">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 