import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchSection = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <Card className="card-elevated p-8 mb-8 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            هل تملك صالون أو مركز تجميل؟
          </h2>
          <p className="text-lg text-white/90">
            انضم إلى منصتنا واستقبل المزيد من العملاء في الأردن
          </p>
        </div>
        <div className="flex justify-center">
          <Link to="/provider-register">
            <Button 
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90 font-medium px-8"
            >
              🛍️ سجل موسسيتك الآن
            </Button>
          </Link>
        </div>
      </Card>

      {/* Search Form */}
      <Card className="card-elevated p-6">
        <h3 className="text-xl font-bold mb-6 text-center text-foreground">
          البحث عن الخدمات في الأردن
        </h3>
        
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">الفئة</label>
              <Select dir="rtl">
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="جميع الفئات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="beauty">صالونات التجميل</SelectItem>
                  <SelectItem value="hair">صالونات الشعر</SelectItem>
                  <SelectItem value="spa">مراكز السبا</SelectItem>
                  <SelectItem value="clinic">عيادات التجميل</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">البحث</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث عن صالون أو خدمة..."
                  className="h-12 pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button type="submit" className="btn-gradient w-full h-12 font-medium">
                <Search className="ml-2 h-4 w-4" />
                بحث
              </Button>
            </div>
          </div>
        </form>

        {/* Location */}
        <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
          <div className="flex items-center gap-3">
            <Link to="/search?view=map">
              <Button variant="outline" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                خريطة
              </Button>
            </Link>
            <Link to="/search?view=list">
              <Button variant="outline" size="sm" className="gap-2">
                📋 قائمة
              </Button>
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            <Button variant="outline" className="btn-gradient text-white border-0">
              📍 تحديد الموقع
            </Button>
          </div>
        </div>

        {/* Location Error */}
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <span>❌</span>
          <span className="text-sm">لا يمكن الوصول للموقع</span>
        </div>
      </Card>
    </div>
  );
};

export default SearchSection;