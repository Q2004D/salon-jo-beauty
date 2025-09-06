import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  Share2,
  Heart,
  Users,
  CheckCircle
} from "lucide-react";
import { useParams, Link } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();
  
  // Sample service details
  const service = {
    name: "صالون الجمال الملكي",
    category: "صالون نسائي",
    rating: 4.8,
    reviewCount: 127,
    description: "صالون نسائي راقي يقدم جميع خدمات التجميل والعناية بالشعر والبشرة مع أحدث التقنيات والمعدات العالمية. فريق من الخبيرات المتخصصات في جميع مجالات التجميل والعناية.",
    address: "شارع الملكة رانيا، الدوار الرابع، عمان",
    phone: "962791234567+",
    email: "info@royalbeauty.jo",
    workingHours: {
      weekdays: "9:00 صباحاً - 9:00 مساءً",
      weekend: "10:00 صباحاً - 8:00 مساءً"
    },
    services: [
      "قص وتصفيف الشعر",
      "صبغ الشعر الطبيعي",
      "عناية بالبشرة",
      "مكياج العرائس",
      "علاج الشعر بالكيراتين",
      "تنظيف البشرة العميق"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400"
    ],
    reviews: [
      {
        name: "سارة أحمد",
        rating: 5,
        comment: "خدمة ممتازة وفريق محترف جداً. أنصح به بشدة!",
        date: "منذ أسبوعين"
      },
      {
        name: "منى محمد",
        rating: 4,
        comment: "صالون راقي ونظيف، لكن الأسعار مرتفعة قليلاً",
        date: "منذ شهر"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">الرئيسية</Link>
              <span className="mx-2">/</span>
              <Link to="/search" className="hover:text-primary">نتائج البحث</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{service.name}</span>
            </nav>

            {/* Service Header */}
            <Card className="card-elevated p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{service.name}</h1>
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(service.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{service.rating}</span>
                      <span className="text-muted-foreground">({service.reviewCount} تقييم)</span>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      متاح الآن
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex gap-3">
                    <Button className="btn-gradient">
                      <Calendar className="ml-2 h-4 w-4" />
                      احجز موعد
                    </Button>
                    <Button variant="outline">
                      <Phone className="ml-2 h-4 w-4" />
                      اتصل الآن
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Services */}
                <Card className="card-elevated p-6">
                  <h2 className="text-xl font-bold mb-4">الخدمات المتاحة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.services.map((serviceItem, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{serviceItem}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Reviews */}
                <Card className="card-elevated p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">التقييمات والمراجعات</h2>
                    <Button variant="outline" size="sm">
                      إضافة تقييم
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {service.reviews.map((review, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mr-11">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card className="card-elevated p-6">
                  <h3 className="font-bold mb-4">معلومات الاتصال</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-sm">الهاتف</p>
                        <p className="text-sm text-muted-foreground font-mono">{service.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-sm">العنوان</p>
                        <p className="text-sm text-muted-foreground">{service.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-sm">ساعات العمل</p>
                        <p className="text-sm text-muted-foreground">الأحد - الخميس: {service.workingHours.weekdays}</p>
                        <p className="text-sm text-muted-foreground">الجمعة - السبت: {service.workingHours.weekend}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Map Placeholder */}
                <Card className="card-elevated p-6">
                  <h3 className="font-bold mb-4">الموقع على الخريطة</h3>
                  <div className="bg-accent h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">خريطة الموقع</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceDetails;