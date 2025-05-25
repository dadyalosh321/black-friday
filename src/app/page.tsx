export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Black Friday</h1>
        <p className="text-lg">أقوى العروض والتخفيضات للرجال والنساء!</p>
      </div>
      <section className="container mx-auto py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <a href="/products/women" className="block bg-white rounded-lg shadow hover:shadow-lg transition p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">منتجات النساء</h2>
            <ul className="text-gray-700 space-y-2">
              <li>مكياج</li>
              <li>إكسسوارات</li>
              <li>عطور</li>
              <li>العناية بالبشرة</li>
            </ul>
          </a>
          <a href="/products/men" className="block bg-white rounded-lg shadow hover:shadow-lg transition p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">منتجات الرجال</h2>
            <ul className="text-gray-700 space-y-2">
              <li>إكسسوارات</li>
              <li>عطور</li>
              <li>العناية الشخصية</li>
            </ul>
          </a>
        </div>
      </section>
    </main>
  );
}
