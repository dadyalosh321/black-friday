"use client"

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">سلة التسوق فارغة</h1>
            <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
            <button
              onClick={() => router.push('/')}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              تصفح المنتجات
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.product.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.product.price * item.quantity} ريال</p>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 text-sm hover:underline"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>عدد المنتجات</span>
                  <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>المجموع</span>
                  <span>{totalPrice} ريال</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
                >
                  متابعة الشراء
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 text-gray-600 py-3 rounded hover:bg-gray-50 transition"
                >
                  تفريغ السلة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 