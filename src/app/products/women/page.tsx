"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
}

const womenProducts: Product[] = [
  {
    id: 1,
    name: "عطر فاخر",
    price: 299,
    originalPrice: 499,
    image: "/images/perfume.jpg",
    category: "عطور"
  },
  {
    id: 2,
    name: "طقم مكياج",
    price: 199,
    originalPrice: 399,
    image: "/images/makeup.jpg",
    category: "مكياج"
  },
  {
    id: 3,
    name: "ساعة يد",
    price: 399,
    originalPrice: 699,
    image: "/images/watch.jpg",
    category: "إكسسوارات"
  },
  {
    id: 4,
    name: "كريم ترطيب",
    price: 149,
    originalPrice: 249,
    image: "/images/skincare.jpg",
    category: "العناية بالبشرة"
  }
];

export default function WomenProducts() {
  const { addToCart } = useCartStore();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">منتجات النساء</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-red-600 font-bold text-xl">{product.price} ريال</span>
                      <span className="text-gray-400 line-through mr-2">{product.originalPrice} ريال</span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  أضف للسلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 