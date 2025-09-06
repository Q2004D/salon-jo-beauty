import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-center text-foreground mb-8">
              الملف الشخصي
            </h1>
            
            <Card className="card-elevated p-8">
              <form className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-right">
                      الاسم الأخير *
                    </Label>
                    <Input 
                      id="lastName"
                      type="text" 
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-right">
                      الاسم الأول *
                    </Label>
                    <Input 
                      id="firstName"
                      type="text" 
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right">
                    البريد الإلكتروني
                  </Label>
                  <Input 
                    id="email"
                    type="email" 
                    className="text-right"
                    dir="rtl"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    لا يمكن تغيير البريد الإلكتروني
                  </p>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-right">
                    رقم الهاتف
                  </Label>
                  <Input 
                    id="phone"
                    type="tel" 
                    placeholder="07xxxxxxxx"
                    className="text-right font-mono"
                    dir="rtl"
                  />
                </div>

                {/* Birth Date and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-right">الجنس</Label>
                    <Select dir="rtl">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الجنس" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-right">
                      تاريخ الميلاد
                    </Label>
                    <Input 
                      id="birthDate"
                      type="text" 
                      placeholder="mm/dd/yyyy"
                      className="text-right"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Preferred Language */}
                <div className="space-y-2">
                  <Label className="text-right">اللغة المفضلة</Label>
                  <Select dir="rtl" defaultValue="arabic">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arabic">العربية</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Save Button */}
                <Button className="btn-gradient w-full h-12 font-medium">
                  حفظ التغييرات
                </Button>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;