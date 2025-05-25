"use client"

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '../../store/cartStore';

// دمج منتجات الرجال والنساء في مصفوفة واحدة
const allProducts = [
  // منتجات النساء
  {
    id: 1,
    name: "عطر فاخر",
    price: 299,
    originalPrice: 499,
    image: "/images/perfume.jpg",
    category: "عطور",
    description: "عطر نسائي فاخر برائحة مميزة تدوم طويلاً. مناسب للاستخدام اليومي والمناسبات الخاصة.",
    features: [
      "رائحة تدوم طويلاً",
      "زجاجة أنيقة",
      "حجم 100 مل",
      "مناسب لجميع المناسبات"
    ]
  },
  {
    id: 2,
    name: "طقم مكياج",
    price: 199,
    originalPrice: 399,
    image: "/images/makeup.jpg",
    category: "مكياج",
    description: "طقم مكياج احترافي يحتوي على جميع الأساسيات. مناسب للمبتدئات والمحترفات.",
    features: [
      "ألوان متناسقة",
      "جودة عالية",
      "مناسب لجميع أنواع البشرة",
      "حقيبة أنيقة"
    ]
  },
  {
    id: 3,
    name: "ساعة يد",
    price: 399,
    originalPrice: 699,
    image: "/images/watch.jpg",
    category: "إكسسوارات",
    description: "ساعة يد أنيقة بتصميم عصري. مناسبة للاستخدام اليومي والمناسبات.",
    features: [
      "تصميم عصري",
      "مقاومة للماء",
      "سوار جلدي مريح",
      "ضمان لمدة سنة"
    ]
  },
  {
    id: 4,
    name: "كريم ترطيب",
    price: 149,
    originalPrice: 249,
    image: "/images/skincare.jpg",
    category: "العناية بالبشرة",
    description: "كريم ترطيب عميق للبشرة. يغذي البشرة ويحافظ على نضارتها.",
    features: [
      "ترطيب عميق",
      "مناسب لجميع أنواع البشرة",
      "خالي من العطور",
      "نتائج سريعة"
    ]
  },
  // منتجات الرجال
  {
    id: 5,
    name: "عطر رجالي",
    price: 349,
    originalPrice: 599,
    image: "/images/men-perfume.jpg",
    category: "عطور",
    description: "عطر رجالي فاخر برائحة قوية ومميزة. مناسب للاستخدام اليومي والمناسبات.",
    features: [
      "رائحة قوية",
      "زجاجة أنيقة",
      "حجم 100 مل",
      "مناسب لجميع المناسبات"
    ]
  },
  {
    id: 6,
    name: "ساعة يد فاخرة",
    price: 799,
    originalPrice: 1299,
    image: "/images/men-watch.jpg",
    category: "إكسسوارات",
    description: "ساعة يد فاخرة بتصميم كلاسيكي. مناسبة للاستخدام اليومي والمناسبات الرسمية.",
    features: [
      "تصميم كلاسيكي",
      "مقاومة للماء",
      "سوار جلدي فاخر",
      "ضمان لمدة سنتين"
    ]
  },
  {
    id: 7,
    name: "طقم عناية شخصية",
    price: 249,
    originalPrice: 399,
    image: "/images/men-grooming.jpg",
    category: "العناية الشخصية",
    description: "طقم عناية شخصية متكامل للرجال. يحتوي على جميع الأساسيات للعناية اليومية.",
    features: [
      "شامبو للشعر",
      "جل للشعر",
      "معطر للجسم",
      "حقيبة أنيقة"
    ]
  },
  {
    id: 8,
    name: "نظارة شمسية",
    price: 299,
    originalPrice: 499,
    image: "/images/men-sunglasses.jpg",
    category: "إكسسوارات",
    description: "نظارة شمسية أنيقة بتصميم عصري. تحمي العين من أشعة الشمس الضارة.",
    features: [
      "حماية من الأشعة فوق البنفسجية",
      "تصميم عصري",
      "إطار خفيف",
      "حقيبة حماية"
    ]
  }
];

export default function ProductDetails() {
  const params = useParams();
  const productId = Number(params.id);
  const product = allProducts.find(p => p.id === productId);
  const { addToCart } = useCartStore();

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">المنتج غير موجود</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative h-96">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.category}</p>
              <div className="mb-6">
                <span className="text-2xl font-bold text-red-600">{product.price} ريال</span>
                <span className="text-gray-400 line-through mr-2">{product.originalPrice} ريال</span>
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">المميزات:</h2>
                <ul className="list-disc list-inside space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
              >
                أضف للسلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 