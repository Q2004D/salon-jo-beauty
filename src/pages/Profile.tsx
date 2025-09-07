import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { LogOut, Edit, Save, Star, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@example.com",
    phone: "0791234567",
    birthDate: "1990-01-15",
    gender: "male",
    language: "arabic",
    loyaltyPoints: 250
  });

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving user data:", userData);
    setIsEditing(false);
    // Here you would integrate with your PHP API
    alert("تم حفظ التغييرات بنجاح!");
  };

  const handleLogout = () => {
    if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
      console.log("User logged out");
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">الملف الشخصي</h1>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  {isEditing ? "إلغاء التعديل" : "تعديل المعلومات"}
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  تسجيل الخروج
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <div className="lg:col-span-2">
                <Card className="card-elevated p-8">
                  <h2 className="text-xl font-bold mb-6 text-center">المعلومات الشخصية</h2>
                  
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
                          value={userData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          disabled={!isEditing}
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
                          value={userData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          disabled={!isEditing}
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
                        className="text-right bg-muted"
                        dir="rtl"
                        value={userData.email}
                        disabled={true}
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
                        value={userData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Birth Date and Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-right">الجنس</Label>
                        <Select 
                          dir="rtl" 
                          value={userData.gender}
                          onValueChange={(value) => handleInputChange('gender', value)}
                          disabled={!isEditing}
                        >
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
                          type="date" 
                          className="text-right"
                          dir="rtl"
                          value={userData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {/* Preferred Language */}
                    <div className="space-y-2">
                      <Label className="text-right">اللغة المفضلة</Label>
                      <Select 
                        dir="rtl" 
                        value={userData.language}
                        onValueChange={(value) => handleInputChange('language', value)}
                        disabled={!isEditing}
                      >
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
                    {isEditing && (
                      <Button 
                        onClick={handleSave}
                        className="btn-gradient w-full h-12 font-medium flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        حفظ التغييرات
                      </Button>
                    )}
                  </form>
                </Card>
              </div>

              {/* Loyalty Program Card */}
              <div className="space-y-6">
                <Card className="card-elevated p-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">برنامج الولاء</h3>
                      <p className="text-muted-foreground">عضو ذهبي</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-2xl font-bold text-primary">{userData.loyaltyPoints}</p>
                      <p className="text-sm text-muted-foreground">نقطة متاحة</p>
                    </div>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      استبدال النقاط
                    </Button>
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="card-elevated p-6">
                  <h3 className="font-bold mb-4">إجراءات سريعة</h3>
                  <div className="space-y-3">
                    <Link to="/bookings">
                      <Button variant="outline" className="w-full justify-start">
                        📅 حجوزاتي
                      </Button>
                    </Link>
                    <Link to="/favorites">
                      <Button variant="outline" className="w-full justify-start">
                        ❤️ المفضلة
                      </Button>
                    </Link>
                    <Link to="/reviews">
                      <Button variant="outline" className="w-full justify-start">
                        ⭐ تقييماتي
                      </Button>
                    </Link>
                    <Link to="/support">
                      <Button variant="outline" className="w-full justify-start">
                        🎧 الدعم الفني
                      </Button>
                    </Link>
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

export default Profile;