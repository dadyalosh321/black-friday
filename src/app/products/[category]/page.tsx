"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
  subcategory: string;
  description: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "فستان أسود أنيق",
    price: 199,
    originalPrice: 299,
    image: "/images/women/dress1.jpg",
    category: "women",
    subcategory: "dresses",
    description: "فستان أسود أنيق مناسب للمناسبات",
    features: ["قماش عالي الجودة", "مريح للارتداء", "تصميم عصري"]
  },
  {
    id: 2,
    name: "قميص رجالي كلاسيكي",
    price: 149,
    originalPrice: 249,
    image: "/images/men/shirt1.jpg",
    category: "men",
    subcategory: "shirts",
    description: "قميص رجالي كلاسيكي بألوان متنوعة",
    features: ["قطن 100%", "مقاوم للتجاعيد", "متوفر بأحجام مختلفة"]
  },
];

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { addToCart } = useCartStore();

  useEffect(() => {
    let filtered = products.filter(product => product.category === category);
    
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }
    
    filtered = filtered.filter(product => product.price <= priceRange);
    
    setFilteredProducts(filtered);
  }, [category, selectedSubcategory, priceRange]);

  const subcategories = ['all', ...new Set(products
    .filter(product => product.category === category)
    .map(product => product.subcategory)
  )];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          {category === 'women' ? 'منتجات النساء' : 'منتجات الرجال'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">التصفية</h2>
              
              {/* Subcategory Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">الفئة الفرعية</h3>
                <div className="space-y-2">
                  {subcategories.map((subcategory) => (
                    <label key={subcategory} className="flex items-center">
                      <input
                        type="radio"
                        name="subcategory"
                        value={subcategory}
                        checked={selectedSubcategory === subcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="ml-2"
                      />
                      {subcategory === 'all' ? 'الكل' : subcategory}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-2">السعر</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0 ريال</span>
                  <span>{priceRange} ريال</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-600">لم يتم العثور على منتجات تطابق معايير البحث</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
                        <p className="text-gray-600 mb-2">{product.subcategory}</p>
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
        </div>
      </div>
    </main>
  );
} 