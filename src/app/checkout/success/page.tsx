"use client"

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-4">تم إتمام الطلب بنجاح!</h1>
          <p className="text-gray-600 mb-8">
            شكراً لك على التسوق معنا. تم استلام طلبك وسيتم شحنه في أقرب وقت ممكن.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              العودة للرئيسية
            </Link>
            
            <button
              onClick={() => router.back()}
              className="block w-full bg-gray-100 text-gray-800 py-3 rounded hover:bg-gray-200 transition"
            >
              العودة للخلف
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 