import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ServiceCard from "@/components/home/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchResults = () => {
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"
  
  // Sample search results data
  const searchResults = [
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
      distance: "0.8",
      category: "صالون نسائي"
    },
    {
      name: "مركز الإشراق للسبا",
      rating: 4.7,
      reviewCount: 203,
      description: "مركز سبا متكامل يقدم خدمات الاسترخاء والعلاج الطبيعي والتدليك العلاجي",
      address: "شارع الحسين، عمان",
      phone: "962791234566+",
      distance: "2.1",
      category: "مركز سبا"
    },
    {
      name: "عيادة الجمال الطبية",
      rating: 4.5,
      reviewCount: 94,
      description: "عيادة متخصصة في الجراحة التجميلية وعلاج البشرة بالليزر والتقنيات الحديثة",
      address: "شارع الأردن، عمان",
      phone: "962791234565+",
      distance: "1.7",
      category: "عيادة تجميل"
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Search Header */}
            <Card className="card-elevated p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-foreground">
                  نتائج البحث
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {searchResults.length} نتيجة
                </Badge>
              </div>
              
              {/* Search Bar */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="البحث في النتائج..."
                    className="h-12 pr-10"
                    defaultValue="صالون تجميل"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Select dir="rtl" defaultValue="all">
                  <SelectTrigger className="w-48 h-12">
                    <SelectValue placeholder="الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="beauty">صالونات التجميل</SelectItem>
                    <SelectItem value="hair">صالونات الشعر</SelectItem>
                    <SelectItem value="spa">مراكز السبا</SelectItem>
                    <SelectItem value="clinic">عيادات التجميل</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="h-12 px-6">
                  <SlidersHorizontal className="ml-2 h-4 w-4" />
                  تصفية
                </Button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    📋 قائمة
                  </Button>
                  <Button 
                    variant={viewMode === "map" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                  >
                    🗺️ خريطة
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>عمان، الأردن</span>
                </div>
              </div>
            </Card>

            {/* Results Section */}
            {viewMode === "list" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {searchResults.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            ) : (
              <Card className="card-elevated p-8 h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">عرض الخريطة</h3>
                  <p>ستظهر الخدمات على الخريطة هنا</p>
                </div>
              </Card>
            )}

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                تحميل المزيد من النتائج
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResults;