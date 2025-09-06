import { Search, MapPin, User, Calendar, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Sidebar = () => {
  const menuItems = [
    { icon: Search, label: "البحث عن الخدمات", active: true },
    { icon: MapPin, label: "حجوزاتي", active: false },
    { icon: Calendar, label: "برنامج الولاء", active: false },
    { icon: User, label: "الملف الشخصي", active: false },
    { icon: FileText, label: "تسجيل مقدم خدمة", active: false },
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
            <Button
              key={index}
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
          ))}
        </nav>

        {/* Quick Actions */}
        <Card className="card-elevated p-4 mt-8">
          <h3 className="font-semibold mb-3 text-foreground">إجراءات سريعة</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-3">
              <MapPin className="h-4 w-4" />
              <span>حجوزاتي</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Users className="h-4 w-4" />
              <span>برنامج الولاء</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <FileText className="h-4 w-4" />
              <span>تسجيل مقدم خدمة</span>
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
};

export default Sidebar;