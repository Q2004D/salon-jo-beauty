import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import SearchSection from "@/components/home/SearchSection";
import ServiceCard from "@/components/home/ServiceCard";

const Index = () => {
  // Sample service data matching the reference design
  const services = [
    {
      name: "عيادة النور للتجميل",
      rating: 4.9,
      reviewCount: 156,
      description: "عيادة تجميل متطورة تقدم أحدث تقنيات التجميل غير الجراحي والعناية بالبشرة",
      address: "شارع المدينة المنورة، عمان",
      phone: "962791234569+",
      distance: "1.2",
      category: "عيادة تجميل"
    },
    {
      name: "مركز الأناقة للرجال",
      rating: 4.6,
      reviewCount: 89,
      description: "صالون رجالي عصري متخصص في قص الشعر والحلاقة والعناية بالذقن",
      address: "شارع الجامعة، عمان",
      phone: "962791234568+",
      distance: "1.0",
      category: "صالون رجالي"
    },
    {
      name: "صالون الجمال الملكي",
      rating: 4.8,
      reviewCount: 127,
      description: "صالون نسائي راقي يقدم جميع خدمات التجميل والعناية بالشعر والبشرة",
      address: "شارع الملكة رانيا، عمان",
      phone: "962791234567+",
      distance: "0",
      category: "صالون نسائي"
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl">
            <SearchSection />
            
            {/* Services Grid */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">
                الخدمات المتاحة
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;