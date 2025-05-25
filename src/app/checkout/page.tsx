"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // هنا يمكن إضافة منطق معالجة الدفع
    // حالياً سنستخدم بيانات وهمية للتوضيح
    
    // مسح السلة بعد إتمام الطلب
    clearCart();
    
    // توجيه المستخدم إلى صفحة تأكيد الطلب
    router.push('/checkout/success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
            <p className="text-gray-600 mb-4">يرجى إضافة منتجات إلى السلة قبل إتمام الطلب</p>
            <button
              onClick={() => router.push('/')}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">إتمام الطلب</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">معلومات الشحن</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  العنوان
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  المدينة
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">معلومات الدفع</h2>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  رقم البطاقة
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ الانتهاء
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    رمز الأمان
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition mt-6"
              >
                إتمام الطلب
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">الكمية: {item.quantity}</p>
                  </div>
                  <span className="font-medium">{item.price * item.quantity} ريال</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>المجموع:</span>
                  <span className="text-red-600">{total} ريال</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 