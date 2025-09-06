import { Search, MapPin, User, Calendar, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Search, label: "البحث عن الخدمات", path: "/", active: location.pathname === "/" },
    { icon: MapPin, label: "نتائج البحث", path: "/search", active: location.pathname === "/search" },
    { icon: Calendar, label: "حجوزاتي", path: "/bookings", active: location.pathname === "/bookings" },
    { icon: User, label: "الملف الشخصي", path: "/profile", active: location.pathname === "/profile" },
    { icon: FileText, label: "تسجيل مقدم خدمة", path: "/provider-register", active: location.pathname === "/provider-register" },
  ];

  return (
    <aside className="w-80 bg-white border-l border-border h-full p-6 overflow-y-auto">
      <div className="space-y-4">
        {/* Active Search Card */}
        <Card className="card-elevated p-4 border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium text-primary">البحث عن الخدمات</span>
          </div>
        </Card>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-12 ${
                  item.active 
                    ? "btn-gradient text-white" 
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <Card className="card-elevated p-4 mt-8">
          <h3 className="font-semibold mb-3 text-foreground">إجراءات سريعة</h3>
          <div className="space-y-2">
            <Link to="/bookings">
              <Button variant="outline" className="w-full justify-start gap-3">
                <MapPin className="h-4 w-4" />
                <span>حجوزاتي</span>
              </Button>
            </Link>
            <Link to="/loyalty">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Users className="h-4 w-4" />
                <span>برنامج الولاء</span>
              </Button>
            </Link>
            <Link to="/provider-register">
              <Button variant="outline" className="w-full justify-start gap-3">
                <FileText className="h-4 w-4" />
                <span>تسجيل مقدم خدمة</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </aside>
  );
};

export default Sidebar;