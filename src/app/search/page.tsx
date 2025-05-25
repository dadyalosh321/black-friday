"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

const products: Product[] = [
  // ... existing code ...
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (query) {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(products);
    }
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          {query ? `نتائج البحث عن "${query}"` : 'جميع المنتجات'}
        </h1>

        {searchResults.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">لم يتم العثور على منتجات تطابق بحثك</p>
            <Link href="/" className="text-blue-600 hover:underline">
              العودة للصفحة الرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
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
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
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
        )}
      </div>
    </main>
  );
} 